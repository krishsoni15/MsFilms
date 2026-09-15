const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 75;
const PNG_QUALITY = 75;
const MIN_SIZE_BYTES = 500 * 1024; // Only compress files > 500KB

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  const stat = fs.statSync(filePath);
  if (stat.size < MIN_SIZE_BYTES) {
    return; // Skip small files
  }

  const originalSize = stat.size;
  const tempPath = filePath + '.tmp';

  try {
    let pipeline = sharp(filePath).rotate(); // Auto-rotate based on EXIF

    // Get metadata to check dimensions
    const meta = await sharp(filePath).metadata();
    
    // Resize only if wider than MAX_WIDTH
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    if (ext === '.png') {
      await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toFile(tempPath);
    } else {
      await pipeline.jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true }).toFile(tempPath);
    }

    const newStat = fs.statSync(tempPath);
    const savings = ((1 - newStat.size / originalSize) * 100).toFixed(1);

    if (newStat.size < originalSize) {
      fs.renameSync(tempPath, filePath);
      console.log(`✅ ${path.relative(PUBLIC_DIR, filePath)}: ${(originalSize / 1024 / 1024).toFixed(1)}MB → ${(newStat.size / 1024 / 1024).toFixed(1)}MB (${savings}% saved)`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`⏭️  ${path.relative(PUBLIC_DIR, filePath)}: already optimal`);
    }
  } catch (err) {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
    console.error(`❌ ${path.relative(PUBLIC_DIR, filePath)}: ${err.message}`);
  }
}

function walkDir(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function main() {
  console.log('🔧 Compressing images in /public ...\n');
  
  const allFiles = walkDir(PUBLIC_DIR);
  const imageFiles = allFiles.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  
  console.log(`Found ${imageFiles.length} image files to check.\n`);

  // Sort by size desc to compress biggest first
  imageFiles.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);

  for (const file of imageFiles) {
    await compressImage(file);
  }

  console.log('\n✅ Done! All images optimized.');
}

main().catch(console.error);
