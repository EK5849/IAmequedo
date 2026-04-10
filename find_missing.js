import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/data/temario_estructurado.json', 'utf8'));

let missing = [];
function check(nodes) {
  for (const n of nodes) {
    if ((!n.hijos || n.hijos.length === 0) && (!n.ejercicios || n.ejercicios.length === 0)) {
      missing.push(`${n.id}: ${n.titulo}`);
    }
    if (n.hijos) check(n.hijos);
    if (n.temas) check(n.temas);
  }
}
check(data);

console.log(`Found ${missing.length} missing topics.`);
console.log(missing.join('\n'));
