/**
 * convert-to-webp.mjs
 * Konversi semua gambar JPG/PNG di public/assets ke WebP
 * lalu hapus file aslinya.
 *
 * Jalankan: node scripts/convert-to-webp.mjs
 */

import sharp from "sharp";
import { readdir, unlink, stat } from "fs/promises";
import { join, extname, basename } from "path";

const ROOT = "./public/assets";
const SUPPORTED_EXT = [".jpg", ".jpeg", ".png"];

let converted = 0;
let failed = 0;

/**
 * Rekursif cari semua file gambar dalam folder
 */
async function findImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findImages(fullPath);
      files.push(...nested);
    } else if (SUPPORTED_EXT.includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Konversi satu file ke WebP
 */
async function convertToWebP(srcPath) {
  const ext = extname(srcPath);
  const outPath = srcPath.slice(0, -ext.length) + ".webp";

  try {
    await sharp(srcPath)
      .webp({ quality: 85, effort: 4 })
      .toFile(outPath);

    const srcStat = await stat(srcPath);
    const outStat = await stat(outPath);
    const saving = (((srcStat.size - outStat.size) / srcStat.size) * 100).toFixed(1);

    console.log(
      `✓ ${srcPath.replace("./public", "")}  →  .webp  ` +
      `(${(srcStat.size / 1024).toFixed(0)} KB → ${(outStat.size / 1024).toFixed(0)} KB, ${saving}% saved)`
    );

    // Hapus file asli
    await unlink(srcPath);
    converted++;
  } catch (err) {
    console.error(`✗ ${srcPath}: ${err.message}`);
    failed++;
  }
}

async function main() {
  console.log("🔍 Mencari gambar di public/assets...\n");

  const images = await findImages(ROOT);

  if (images.length === 0) {
    console.log("✅ Tidak ada gambar JPG/PNG yang ditemukan. Semua sudah WebP!");
    return;
  }

  console.log(`📦 Ditemukan ${images.length} file untuk dikonversi:\n`);

  for (const imgPath of images) {
    await convertToWebP(imgPath);
  }

  console.log("\n" + "─".repeat(60));
  console.log(`✅ Selesai!`);
  console.log(`   Berhasil dikonversi : ${converted} file`);
  console.log(`   Gagal               : ${failed} file`);
  console.log("─".repeat(60));
}

main().catch(console.error);
