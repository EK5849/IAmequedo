export const matematicas4Temas = [
  {
    id: "m8_1", titulo: "8.1 Funciones exponenciales: Dominio y rango",
    ejercicios: [
      { pregunta: "En una función exponencial básica f(x) = a^x (con a > 1), ¿cuál es su dominio y rango respectivo?", opciones: ["Dominio: Todos los números reales (-∞, ∞). Rango: Todos los números reales mayores que cero (0, ∞).", "Dominio: Solo números positivos. Rango: Todos los números reales.", "Dominio y Rango se restringen mutuamente a números enteros positivos.", "El Dominio excluye estrictamente al cero para evitar indeterminaciones."], respuesta: "Dominio: Todos los números reales (-∞, ∞). Rango: Todos los números reales mayores que cero (0, ∞).", explicacion: "La variable x (potencia) puede ser positiva, negativa o cero. Sin embargo, una base positiva elevada a cualquier potencia jamás arrojará un valor negativo ni cero, garantizando que el rango siempre sea (0, ∞)." }
    ]
  },
  {
    id: "m10_1", titulo: "10.1 Circunferencia como lugar geométrico",
    ejercicios: [
      { pregunta: "Geométricamente, la circunferencia se define como el lugar geométrico o conjunto de todos los puntos en el plano que:", opciones: ["Equidistan (se mantienen a una distancia fija) de un punto central denominado 'centro'.", "Convergen y se intersectan simultáneamente en un par de ejes ordenados.", "Mantienen la misma pendiente constante respecto al eje de las abscisas.", "Poseen la misma distancia hacia el vértice y una directriz focal."], respuesta: "Equidistan (se mantienen a una distancia fija) de un punto central denominado 'centro'.", explicacion: "Esa distancia constante desde cualquier punto de la orilla hasta el centro se conoce algebraicamente como el radio (r). Esta es la definición universal de circunferencia." },
      { pregunta: "Si una circunferencia tiene centro C(h,k) y radio 'r', la ecuación ordinaria cartesiana que la describe es:", opciones: ["(x - h)² + (y - k)² = r²", "x²/a² - y²/b² = 1", "(x + h) / (y + k) = r", "y² = 4px"], respuesta: "(x - h)² + (y - k)² = r²", explicacion: "Esta es la ecuación ordinaria o canónica, directamente derivada de la fórmula de distancia entre dos puntos (Teorema de Pitágoras)." }
    ]
  },
  {
    id: "m11_4", titulo: "11.1 Parábola: Elementos",
    ejercicios: [
      { pregunta: "En la definición de una parábola, los puntos de la curva equidistan de una recta fija y de un punto fijo. ¿Cuáles son los nombres de estos dos elementos vitales?", opciones: ["Directriz (recta fija) y Foco (punto fijo).", "Eje de abscisas (recta principal) y Vértice (punto tangencial).", "Asíntota vertical (recta base) y Centro (punto base).", "Secante (recta de corte) e Intersección (punto de cruce)."], respuesta: "Directriz (recta fija) y Foco (punto fijo).", explicacion: "La parábola se construye de forma que cualquier punto en la curva se encuentra exactamente a la misma distancia de la línea directriz como del punto que llamamos foco." }
    ]
  },
  {
    id: "m12_1", titulo: "12.1 Elipse: Lugar geométrico",
    ejercicios: [
      { pregunta: "¿Cuál es la definición analítica de una elipse como lugar geométrico en el plano cartesiano?", opciones: ["Es el conjunto de puntos cuya SUMA de distancias a dos puntos fijos (Focos) es siempre un valor constante.", "Es el conjunto de puntos cuya DIFERENCIA absoluta de distancias a dos puntos fijos es constante.", "Es el conjunto de puntos que mantienen una proporción idéntica frente al origen y a una recta paralela.", "Es la rotación esférica de un semieje mayor cortado transversalmente."], respuesta: "Es el conjunto de puntos cuya SUMA de distancias a dos puntos fijos (Focos) es siempre un valor constante.", explicacion: "Al tomar un punto P(x,y) de una elipse y calcular su distancia hacia el Foco 1 y hacia el Foco 2, la suma de ambas distancias será siempre idéntica sin importar la posición del punto a lo largo de la curva." }
    ]
  }
];
