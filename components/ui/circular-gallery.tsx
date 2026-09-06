"use client";

import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';

import './circular-gallery.css';

function debounce(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance: any) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach(key => {
    if (key !== 'constructor' && typeof instance[key] === 'function') {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createCompositeCardTexture(
  gl: any,
  imageSrc: string,
  titleText: string,
  categoryText: string,
  durationText: string
) {
  const canvas = document.createElement("canvas");
  canvas.width = 960;
  canvas.height = 540; // 16:9 ratio
  const ctx = canvas.getContext("2d");

  if (ctx) {
    ctx.fillStyle = "#0d0a08";
    ctx.fillRect(0, 0, 960, 540);
  }

  const texture = new Texture(gl, { generateMipmaps: true });
  texture.image = canvas;

  if (!ctx) return { texture };

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageSrc;
  img.onload = () => {
    // 1. Crop & center image into 16:9 canvas
    const aspect = img.naturalWidth / img.naturalHeight;
    const targetAspect = 960 / 540;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (aspect > targetAspect) {
      sw = img.naturalHeight * targetAspect;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / targetAspect;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 960, 540);

    // 2. Subtle Dark Gradient Overlay at the bottom
    const grad = ctx.createLinearGradient(0, 260, 0, 540);
    grad.addColorStop(0, "rgba(0, 0, 0, 0)");
    grad.addColorStop(0.5, "rgba(8, 6, 5, 0.75)");
    grad.addColorStop(1, "rgba(6, 4, 3, 0.95)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 260, 960, 280);

    // 3. Gold Play Button Circle Badge in Center
    const cx = 480;
    const cy = 240;
    
    // Outer glass circle with glow
    ctx.beginPath();
    ctx.arc(cx, cy, 44, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(15, 12, 10, 0.65)";
    ctx.fill();
    ctx.strokeStyle = "rgba(197, 168, 128, 0.85)";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Play triangle
    ctx.beginPath();
    ctx.moveTo(cx - 9, cy - 17);
    ctx.lineTo(cx + 17, cy);
    ctx.lineTo(cx - 9, cy + 17);
    ctx.closePath();
    ctx.fillStyle = "#c5a880";
    ctx.fill();

    // 4. Category & Duration Tag at Bottom Left
    ctx.font = "600 16px sans-serif";
    ctx.fillStyle = "#c5a880";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    const tag = `${(categoryText || "FILM").toUpperCase()} ${durationText ? `• ${durationText}` : ""}`;
    ctx.fillText(tag, 36, 445);

    // 5. Title Text
    ctx.font = "600 26px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(titleText, 36, 475);

    // 6. Subtle Gold Border Accent Frame around 960x540
    ctx.strokeStyle = "rgba(197, 168, 128, 0.4)";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 956, 536);

    texture.image = canvas;
  };

  return { texture };
}

class Media {
  extra: number;
  geometry: any;
  gl: any;
  image: string;
  index: number;
  length: number;
  renderer: any;
  scene: any;
  screen: any;
  text: string;
  category: string;
  duration: string;
  viewport: any;
  bend: number;
  textColor: string;
  borderRadius: number;
  font: string;
  program: any;
  plane: any;
  speed = 0;
  widthTotal = 0;
  width = 0;
  padding = 0;
  scale = 0;
  x = 0;
  isBefore = false;
  isAfter = false;

  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    renderer,
    scene,
    screen,
    text,
    category = '',
    duration = '',
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }: any) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.category = category;
    this.duration = duration;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.onResize();
  }

  createShader() {
    const { texture } = createCompositeCardTexture(
      this.gl,
      this.image,
      this.text,
      this.category,
      this.duration
    );

    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 2.5 + uTime) * 0.8 + cos(p.y * 2.0 + uTime) * 0.8) * (0.04 + uSpeed * 0.2);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec4 color = texture2D(tMap, vUv);

          // Rounded corner mask
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [960, 540] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  update(scroll: any, direction: 'left' | 'right') {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.position.z = 0;
      this.plane.rotation.z = 0;
      this.plane.rotation.y = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const normalizedX = x / (H || 1);
      
      const arc = R - Math.sqrt(Math.max(0, R * R - Math.min(H, Math.abs(x)) ** 2));
      
      if (this.bend > 0) {
        this.plane.position.y = -arc * 0.45;
        this.plane.position.z = -Math.pow(Math.min(1.2, Math.abs(normalizedX)), 2) * 2.2;
        this.plane.rotation.y = -normalizedX * 0.28;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(Math.min(0.95, Math.abs(x) / R)) * 0.35;
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.03;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport }: any = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
      if (this.plane.program.uniforms.uViewportSizes) {
        this.plane.program.uniforms.uViewportSizes.value = [this.viewport.width, this.viewport.height];
      }
    }
    this.scale = this.screen.height / 1400;
    
    // Proportional 16:9 Widescreen Horizontal Film Frame Dimensions
    this.plane.scale.y = (this.viewport.height * (428 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (760 * this.scale)) / this.screen.width;

    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 1.6;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

export interface GalleryItem {
  image: string;
  text: string;
  category?: string;
  duration?: string;
  videoUrl?: string;
  [key: string]: any;
}

class App {
  container: HTMLDivElement;
  scrollSpeed: number;
  autoSpin: boolean;
  onItemClick?: (item: GalleryItem, index: number) => void;
  originalLength: number = 0;
  rawItems: GalleryItem[] = [];
  scroll: {
    ease: number;
    current: number;
    target: number;
    last: number;
    position?: number;
  };
  onCheckDebounce: () => void;
  renderer: any;
  gl: any;
  camera: any;
  scene: any;
  planeGeometry: any;
  mediasImages: GalleryItem[] = [];
  medias: Media[] = [];
  screen: any;
  viewport: any;
  isDown = false;
  startPos = { x: 0, y: 0 };
  raf = 0;

  boundOnResize: any;
  boundOnWheel: any;
  boundOnTouchDown: any;
  boundOnTouchMove: any;
  boundOnTouchUp: any;
  boundOnKeyDown: any;

  constructor(
    container: HTMLDivElement,
    {
      items = [],
      bend = 1.2,
      textColor = '#ffffff',
      borderRadius = 0.04,
      font = 'bold 28px sans-serif',
      scrollSpeed = 2,
      scrollEase = 0.05,
      autoSpin = true,
      onItemClick
    }: any = {}
  ) {
    document.documentElement.classList.remove('no-js');
    this.container = container;
    this.scrollSpeed = scrollSpeed;
    this.autoSpin = autoSpin;
    this.onItemClick = onItemClick;
    this.rawItems = items;
    this.originalLength = items.length;

    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 17;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 35,
      widthSegments: 70
    });
  }

  createMedias(items: GalleryItem[], bend = 1.2, textColor: string, borderRadius: number, font: string) {
    this.mediasImages = items.concat(items);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        category: data.category || '',
        duration: data.duration || '',
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });
  }

  onTouchDown(e: any) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    this.startPos = { x: clientX, y: clientY };
  }

  onTouchMove(e: any) {
    if (!this.isDown) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.startPos.x - clientX) * (this.scrollSpeed * 0.025);
    if (this.scroll.position !== undefined) {
      this.scroll.target = this.scroll.position + distance;
    }
  }

  onTouchUp(e: any) {
    const endX = e.changedTouches ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
    const endY = e.changedTouches ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
    const dist = Math.hypot(endX - this.startPos.x, endY - this.startPos.y);

    this.isDown = false;
    this.onCheck();

    // If tap/click with minimal drag distance, trigger click callback
    if (dist < 12 && this.onItemClick && this.medias.length > 0) {
      let closestMedia: Media | null = null;
      let minDistance = Infinity;

      this.medias.forEach((media) => {
        const distance = Math.abs(media.plane.position.x);
        if (distance < minDistance) {
          minDistance = distance;
          closestMedia = media;
        }
      });

      if (closestMedia) {
        const rawIndex = (closestMedia as Media).index;
        const actualIndex = rawIndex % this.originalLength;
        const selectedItem = this.rawItems[actualIndex];
        if (selectedItem) {
          this.onItemClick(selectedItem, actualIndex);
        }
      }
    }
  }

  onWheel(e: any) {
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onKeyDown(e: any) {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        this.scroll.target += this.scrollSpeed * 4;
        this.onCheckDebounce();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        this.scroll.target -= this.scrollSpeed * 4;
        this.onCheckDebounce();
        break;

      default:
        break;
    }
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) return;
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    if (!this.container) return;
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    if (!this.renderer || !this.gl || !this.scene) return;

    // Gentle continuous spin when idle & autoSpin enabled
    if (this.autoSpin && !this.isDown) {
      this.scroll.target += 0.035;
    }

    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    this.boundOnKeyDown = this.onKeyDown.bind(this);

    window.addEventListener('resize', this.boundOnResize);
    window.addEventListener('mousewheel', this.boundOnWheel);
    window.addEventListener('wheel', this.boundOnWheel);
    window.addEventListener('mousedown', this.boundOnTouchDown);
    window.addEventListener('mousemove', this.boundOnTouchMove);
    window.addEventListener('mouseup', this.boundOnTouchUp);
    window.addEventListener('touchstart', this.boundOnTouchDown);
    window.addEventListener('touchmove', this.boundOnTouchMove);
    window.addEventListener('touchend', this.boundOnTouchUp);

    this.container?.addEventListener('keydown', this.boundOnKeyDown);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    this.raf = 0;
    window.removeEventListener('resize', this.boundOnResize);
    window.removeEventListener('mousewheel', this.boundOnWheel);
    window.removeEventListener('wheel', this.boundOnWheel);
    window.removeEventListener('mousedown', this.boundOnTouchDown);
    window.removeEventListener('mousemove', this.boundOnTouchMove);
    window.removeEventListener('mouseup', this.boundOnTouchUp);
    window.removeEventListener('touchstart', this.boundOnTouchDown);
    window.removeEventListener('touchmove', this.boundOnTouchMove);
    window.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }

    if (this.container) {
      this.container.removeEventListener('keydown', this.boundOnKeyDown);
    }
  }
}

interface CircularGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  fontUrl?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  autoSpin?: boolean;
  onItemClick?: (item: GalleryItem, index: number) => void;
}

export default function CircularGallery({
  items,
  bend = 1.2,
  textColor = '#c5a880',
  borderRadius = 0.04,
  font = 'bold 28px sans-serif',
  fontUrl,
  scrollSpeed = 2,
  scrollEase = 0.05,
  autoSpin = true,
  onItemClick
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    let app: App;
    let isMounted = true;
    app = new App(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      autoSpin,
      onItemClick
    });

    return () => {
      isMounted = false;
      if (app) app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, fontUrl, scrollSpeed, scrollEase, autoSpin, onItemClick]);
  return (
    <div
      className="circular-gallery cursor-grab active:cursor-grabbing"
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="3D Film Reel Gallery. Click to play video film or drag/scroll to spin."
    />
  );
}
