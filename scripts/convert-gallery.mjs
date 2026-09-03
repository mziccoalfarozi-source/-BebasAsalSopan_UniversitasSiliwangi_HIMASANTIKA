import sharp from "sharp";
import { readdir, unlink } from "fs/promises";
import { join, extname, basename } from "path";

const GALERI_DIR = "./public/assets/galeri";

// Format yang didukung untuk konversi
const SUPPORTED = [".heic", ".heif", ".cr2", ".tiff", ".png", ".webp"];
// Format "jpg" tapi ternyata bukan valid JPEG (header bukan FF D8)
const FAKE_JPG = ["StudiBanding1.jpg", "StudiBanding3.jpg"];

async function isValidJpeg(filePath) {
  const { readFileSync } = await import("fs");
  const buf = readFileSync(filePath);
  return buf[0] === 0xff && buf[1] === 0xd8;
}

async function convertFile(srcPath, name, outNameOverride = null) {
  const outName = outNameOverride ?? (
    basename(name, extname(name))
      .replace(/[\s()]/g, "_")
      .replace(/_+/g, "_")
    + ".jpg"
  );
  const outPath = join(GALERI_DIR, outName);

  try {
    await sharp(srcPath).jpeg({ quality: 85 }).toFile(outPath);
    console.log(`✓ ${name} → ${outName}`);
    return outName;
  } catch (err) {
    console.error(`✗ ${name}: ${err.message}`);
    return null;
  }
}

async function main() {
  const files = await readdir(GALERI_DIR);

  for (const file of files) {
    const ext = extname(file).toLowerCase();
    const srcPath = join(GALERI_DIR, file);

    // Konversi file format non-JPG
    if (SUPPORTED.includes(ext)) {
      await convertFile(srcPath, file);
    }

    // Konversi file .jpg palsu (bukan JPEG valid)
    if (file.endsWith(".jpg") && FAKE_JPG.includes(file)) {
      const isValid = await isValidJpeg(srcPath);
      if (!isValid) {
        console.log(`⚠ ${file} bukan JPEG valid, mencoba konversi...`);
        const outName = basename(file, ".jpg") + "_fixed.jpg";
        await convertFile(srcPath, file, outName);
      }
    }
  }

  console.log("\n✅ Selesai! Cek folder public/assets/galeri untuk hasil konversi.");
}

main();
