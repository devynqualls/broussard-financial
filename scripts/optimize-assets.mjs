import sharp from 'sharp';
for (const [name,width] of [['bfs-logo',660],['frc-logo',480]]) {
  await sharp(`public/images/${name}-clean.png`).resize({width,withoutEnlargement:true}).webp({quality:95,effort:6}).toFile(`public/images/${name}-web.webp`);
}
console.log('Optimized logo delivery assets; original cleaned artwork retained.');
