import sharp from "sharp";
import { readdir, stat, unlink, rename } from "fs/promises";
import { join } from "path";

const GALERI_DIR = "./public/assets/galeri";

async function main() {
  const files = await readdir(GALERI_DIR);
  
  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png)$/i) || file.includes("_opt")) continue;
    
    const srcPath = join(GALERI_DIR, file);
    const tempPath = join(GALERI_DIR, file.replace(/\.jpg$/i, "_opt.jpg"));
    const fileStat = await stat(srcPath);
    
    if (fileStat.size > 400 * 1024) {
      console.log(`Optimizing ${file}...`);
      await sharp(srcPath)
        .resize({ width: 800, withoutEnlargement: true }) // resize to max 800px width (plenty for marquee)
        .jpeg({ quality: 80, force: true })
        .toFile(tempPath);
      
      await unlink(srcPath);
      await rename(tempPath, srcPath);
      console.log(`✓ ${file} optimized!`);
    }
  }
  console.log("Optimization complete!");
}

main();
