"use client";

import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import { useEffect, useRef } from 'react';

import './aurora.css';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  float amp = max(uAmplitude, 0.1);
  float height = snoise(vec2(uv.x * (2.0 / amp) + uTime * 0.4, uTime * 0.2)) * 0.5 + 0.5;
  float base = smoothstep(0.0, 1.0, uv.y);
  float noise = snoise(vec2(uv.x * (4.0 / amp) + uTime * 0.6, uv.y * (2.5 / amp) + uTime * 0.4));
  
  float aurora = smoothstep(height - 0.35, height + 0.35, uv.y + noise * 0.18) * (1.0 - base);

  vec3 color = rampColor * aurora * uBlend;

  fragColor = vec4(color, aurora * uBlend);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
}

export interface AuroraProps {
  colorStops?: string[];
  speed?: number;
  blend?: number;
  amplitude?: number;
  className?: string;
}

export function Aurora(props: AuroraProps) {
  const { colorStops = ['#c5a880', '#d6b78a', '#5c4524'], amplitude = 1.0, blend = 0.5, speed = 0.8, className = '' } = props;
  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement | null>(null);

  const cachedColorsRef = useRef<{ key: string; value: [number, number, number][] } | null>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      dpr: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 1) : 1
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.backgroundColor = 'transparent';

    let program: Program;

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    }
    window.addEventListener('resize', resize);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const initialColors = colorStops.map(hexToRgb);

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: amplitude },
        uColorStops: { value: initialColors },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: blend }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(canvas);

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(ctn);

    let animateId = 0;
    let lastRenderTime = 0;
    const FRAME_INTERVAL = 1000 / 30;

    const update = (t: number) => {
      animateId = requestAnimationFrame(update);

      if (!isVisible) return;

      const delta = t - lastRenderTime;
      if (delta < FRAME_INTERVAL) return;
      lastRenderTime = t - (delta % FRAME_INTERVAL);

      const { speed = 0.8 } = propsRef.current;
      program.uniforms.uTime.value = t * 0.001 * speed;
      program.uniforms.uAmplitude.value = propsRef.current.amplitude ?? 1.0;
      program.uniforms.uBlend.value = propsRef.current.blend ?? blend;

      const stops = propsRef.current.colorStops ?? colorStops;
      const stopsKey = stops.join(',');
      if (!cachedColorsRef.current || cachedColorsRef.current.key !== stopsKey) {
        cachedColorsRef.current = { key: stopsKey, value: stops.map(hexToRgb) };
      }
      program.uniforms.uColorStops.value = cachedColorsRef.current.value;

      renderer.render({ scene: mesh });
    };
    animateId = requestAnimationFrame(update);

    resize();

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
      if (ctn && canvas.parentNode === ctn) {
        ctn.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [amplitude, blend]);

  return <div ref={ctnDom} className={`aurora-container relative w-full h-full pointer-events-none ${className}`} />;
}

export default Aurora;
