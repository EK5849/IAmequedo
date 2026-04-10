import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fuentes = [
  { file: 'temario_espanol.txt', id: 'espanol', nombre: 'Español', color: 'bg-amber-500', prefix: 'e' },
  { file: 'temario_matematicas.txt', id: 'matematicas', nombre: 'Matemáticas', color: 'bg-blue-500', prefix: 'm' },
  { file: 'temario_fisica.txt', id: 'fisica', nombre: 'Física', color: 'bg-green-500', prefix: 'f' },
  { file: 'temario_quimica.txt', id: 'quimica', nombre: 'Química', color: 'bg-purple-500', prefix: 'q' },
  { file: 'temario_biologia.txt', id: 'biologia', nombre: 'Biología', color: 'bg-emerald-500', prefix: 'b' },
  { file: 'temario_historia_universal.txt', id: 'historia_universal', nombre: 'Historia Universal', color: 'bg-rose-500', prefix: 'hu' },
  { file: 'temario_historia_de_mexico.txt', id: 'historia_mexico', nombre: 'Historia de México', color: 'bg-orange-500', prefix: 'hm' },
  { file: 'temario_literatura.txt', id: 'literatura', nombre: 'Literatura', color: 'bg-yellow-500', prefix: 'l' },
  { file: 'temario_geografia.txt', id: 'geografia', nombre: 'Geografía', color: 'bg-teal-500', prefix: 'g' }
];

const jsonPath = path.join(__dirname, '../src/data/temario_estructurado.json');
let oldData = [];
try {
  oldData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {
  console.warn("Could not load old json");
}

const materias = [];

// Helper to find existing exercises from the previous build
function getEjerciciosFromOldFlatData(materiaId, nodeId) {
  const materia = oldData.find(m => m.id === materiaId);
  if (!materia) return [];
  // Flat search over old tree purely by ID
  let found = [];
  function search(nodes) {
    for (const n of nodes) {
      if (n.id === nodeId) {
        found = n.ejercicios || [];
      }
      if (n.hijos) search(n.hijos);
      if (n.temas) search(n.temas); // to catch top level
    }
  }
  search(materia.temas || []);
  return found;
}

for (const fuente of fuentes) {
  const txtPath = path.join(__dirname, '..', fuente.file);
  let text = '';
  try {
    text = fs.readFileSync(txtPath, 'utf8');
  } catch(e) {
    console.warn(`Could not read ${fuente.file}`);
    continue;
  }
  
  const lines = text.split('\n').map(l => l.trimEnd());
  
  const currentMateria = { id: fuente.id, nombre: fuente.nombre, color: fuente.color, temas: [] };
  materias.push(currentMateria);
  let stack = [];

  for (const line of lines) {
    const tLine = line.trim();
    if (!tLine) continue;
    
    // Ignore the top level subject name strings like "Física", "Matemáticas "
    if (tLine.toLowerCase().startsWith(fuente.nombre.toLowerCase())) continue;
    if (tLine.toLowerCase().startsWith('temas fundamentales')) continue;

    const match = line.match(/^(\s*)(\d+(?:\.\d+)*)\.?\s+(.+)$/);
    if (match) {
      const rawNumber = match[2];
      const title = match[3].trim();
      const depth = rawNumber.split('.').length - 1; 
      
      const cleanId = rawNumber.replace(/\./g, '_');
      const nodeId = `${fuente.prefix}${cleanId}`;
      
      const ejercicios = getEjerciciosFromOldFlatData(currentMateria.id, nodeId);

      const node = {
        id: nodeId,
        numero: rawNumber,
        titulo: `${rawNumber}. ${title}`,
        ejercicios: ejercicios,
        hijos: []
      };

      if (depth === 0) {
        currentMateria.temas.push(node);
        stack[0] = node;
        stack.splice(1);
      } else {
        let parentDepth = depth - 1;
        let parent = stack[parentDepth];
        
        while (!parent && parentDepth >= 0) {
          parentDepth--;
          parent = stack[parentDepth];
        }

        if (parent) {
          parent.hijos.push(node);
        } else {
          currentMateria.temas.push(node);
        }
        
        stack[depth] = node;
        stack.splice(depth + 1);
      }
    }
  }
}

const outPath = path.join(__dirname, '../src/data/temario_estructurado.json');
fs.writeFileSync(outPath, JSON.stringify(materias, null, 2));
console.log(`Successfully built nested multi-file tree mapping to ${outPath}`);
