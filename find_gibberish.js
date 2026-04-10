import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('temario_') && f.endsWith('.js') && f !== 'temario_estructurado.json');

const crutchWords = ['forzosa', 'asertiva', 'originaria', 'purificada', 'innegable', 'lúdica', 'caprichosa', 'fidedigna', 'estricta', 'vacua', 'inamovible', 'purista'];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  const lines = content.split('\n');
  let hasGibberish = false;
  
  lines.forEach((line, i) => {
    const lowerLine = line.toLowerCase();
    
    const singleLetterMatches = lowerLine.match(/\b([a-z]\s){3,}\b/gi);
    const hasCrutch = crutchWords.some(w => lowerLine.includes(w));
    
    if (singleLetterMatches || hasCrutch) {
      if (!hasGibberish) {
        console.log(`\n\n--- FILE: ${file} ---`);
        hasGibberish = true;
      }
      console.log(`Line ${i + 1}: ${line.trim().substring(0, 150)}...`);
    }
  });
});
