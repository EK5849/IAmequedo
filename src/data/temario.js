import temarioData from './temario_estructurado.json'

// Exportación directa del árbol gigante, agrupando jerárquicamente
export const temarioA1 = temarioData;

// Utilidad recursiva para sacar exclusivamente los 'nodos hoja' (los que no tienen hijos)
// Estos son los que el Quiz y el Simulador consumen
function getHojas(nodes) {
  let hojas = [];
  for (const node of nodes) {
    if (node.hijos && node.hijos.length > 0) {
      hojas = hojas.concat(getHojas(node.hijos));
    } else {
      hojas.push(node);
    }
  }
  return hojas;
}

export const hojasPlanas = temarioA1.flatMap(materia => 
  getHojas(materia.temas).map(hoja => ({
    ...hoja,
    materiaNombre: materia.nombre,
    materiaId: materia.id
  }))
);

// Alimentamos el simulador ignorando los nodos sin preguntas (como los pendientes)
export const mockFlashcards = hojasPlanas.flatMap(hoja => 
  (hoja.ejercicios || []).map(ej => ({
    question: ej.pregunta,
    answer: ej.respuesta,
    options: ej.opciones || [],
    subject: hoja.materiaNombre
  }))
);
