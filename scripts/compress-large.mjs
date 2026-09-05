import sharp from "sharp";
import { stat, copyFile, unlink } from "fs/promises";
import { join } from "path";

const GALERI = "./public/assets/galeri";
const MAX_WIDTH = 1920;
const QUALITY = 82;

const targets = ["StudiBanding2.webp", "StudiBanding3.webp"];

for (const file of targets) {
  const src = join(GALERI, file);
  const tmp = join(GALERI, `_tmp_${file}`);
  const meta = await sharp(src).metadata();
  const { size: before } = await stat(src);
  console.log(`\n${file}: ${meta.width}x${meta.height} (${(before/1024).toFixed(0)} KB)`);

  if (meta.width > MAX_WIDTH) {
    await sharp(src).resize(MAX_WIDTH).webp({ quality: QUALITY, effort: 5 }).toFile(tmp);
  } else {
    await sharp(src).webp({ quality: QUALITY, effort: 5 }).toFile(tmp);
  }

  const { size: after } = await stat(tmp);
  await copyFile(tmp, src);
  await unlink(tmp);
  console.log(`  ✓ ${(before/1024).toFixed(0)} KB → ${(after/1024).toFixed(0)} KB (${(((before-after)/before)*100).toFixed(1)}% saved)`);
}
