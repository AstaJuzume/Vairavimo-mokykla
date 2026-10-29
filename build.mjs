import { build } from 'esbuild';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import { readFile, writeFile, readdir } from 'node:fs/promises';

await build({
  entryPoints: ['src/main.tsx'],
  outfile: 'app.js',
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'external',
});
const css = await readFile('src/styles.css', 'utf8');
const result = await postcss([tailwindcss()]).process(css, { from: 'src/styles.css', to: 'styles.css' });
let fontCss = '';
for (const folder of await readdir('fonts')) {
  fontCss += await readFile(`fonts/${folder}/style.css`, 'utf8');
}
await writeFile('styles.css', fontCss + '\n:root{--font-geist-sans:"Geist",Arial,sans-serif;--font-geist-mono:"Geist Mono",monospace}\n' + result.css);
console.log('Paruošta: index.html, app.js, styles.css ir vietiniai šriftai.');
