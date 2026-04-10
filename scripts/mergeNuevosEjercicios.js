import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { espanolTemas2 } from '../src/data/temario_espanol_2.js';
import { espanolTemas3 } from '../src/data/temario_espanol_3.js';
import { fisicaTemas1 } from '../src/data/temario_fisica_1.js';
import { fisicaTemas2 } from '../src/data/temario_fisica_2.js';
import { fisicaTemas3 } from '../src/data/temario_fisica_3.js';
import { fisicaTemas4 } from '../src/data/temario_fisica_4.js';
import { quimicaTemas } from '../src/data/temario_quimica.js';
import { quimicaTemas2 } from '../src/data/temario_quimica_2.js';
import { matematicas1Temas } from '../src/data/temario_matematicas_1.js';
import { matematicas2Temas } from '../src/data/temario_matematicas_2.js';
import { matematicas3Temas } from '../src/data/temario_matematicas_3.js';
import { matematicas4Temas } from '../src/data/temario_matematicas_4.js';
import { matematicas5Temas } from '../src/data/temario_matematicas_5.js';
import { matematicas6Temas } from '../src/data/temario_matematicas_6.js';
import { matematicas7Temas } from '../src/data/temario_matematicas_7.js';
import { matematicas8Temas } from '../src/data/temario_matematicas_8.js';
import { biologiaTemas1 } from '../src/data/temario_biologia_1.js';
import { biologiaTemas2 } from '../src/data/temario_biologia_2.js';
import { historiaUniversalTemas } from '../src/data/temario_historia_universal.js';
import { historiaMexicoTemas1 } from '../src/data/temario_historia_mexico_1.js';
import { literaturaTemas } from '../src/data/temario_literatura.js';
import { geografiaTemas } from '../src/data/temario_geografia.js';
import { faltantesTemas } from '../src/data/temario_faltantes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '../src/data/temario_estructurado.json');
const temarioRaw = fs.readFileSync(jsonPath, 'utf8');
const temario = JSON.parse(temarioRaw);

const newExercises = [
  ...espanolTemas2, ...espanolTemas3, ...fisicaTemas1, ...fisicaTemas2, ...fisicaTemas3, ...fisicaTemas4, ...quimicaTemas, ...quimicaTemas2,
  ...matematicas1Temas, ...matematicas2Temas, ...matematicas3Temas, ...matematicas4Temas, ...matematicas5Temas,
  ...matematicas6Temas, ...matematicas7Temas, ...matematicas8Temas,
  ...biologiaTemas1, ...biologiaTemas2, ...historiaUniversalTemas, ...historiaMexicoTemas1, ...literaturaTemas, ...geografiaTemas, ...faltantesTemas
];

function inject(nodes) {
  for (const node of nodes) {
    const found = newExercises.find(e => e.id === node.id);
    if (found) {
      node.ejercicios = found.ejercicios;
      console.log(`Injected exercises for ${node.id} (${node.titulo})`);
    }
    
    // Check hijos or temas
    const children = node.temas || node.hijos || [];
    if (children.length > 0) {
      inject(children);
    }
  }
}

inject(temario);

fs.writeFileSync(jsonPath, JSON.stringify(temario, null, 2));
console.log(`Successfully merged ${newExercises.length} topics into temario_estructurado.json`);
