import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync(new URL('./diodati-1885.json',import.meta.url),'utf8'));
const template=fs.readFileSync(new URL('./template.html',import.meta.url),'utf8');
if(!template.includes('DATA_PLACEHOLDER'))throw Error('Segnaposto dataset mancante');
const html=template.replace('DATA_PLACEHOLDER',JSON.stringify(data).replaceAll('<','\\u003c'));
fs.writeFileSync(new URL('./index.html',import.meta.url),html);
console.log('index.html aggiornato');
