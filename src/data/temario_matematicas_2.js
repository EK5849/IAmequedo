export const matematicas2Temas = [
  {
    id: "m9_1",
    titulo: "9.1 Distancia entre dos puntos",
    ejercicios: [
      { 
        pregunta: "¿Cuál es la deducción geométrica fundamental que origina la fórmula d = √((x2-x1)² + (y2-y1)²) para hallar la distancia entre dos puntos (P1 y P2) en el plano cartesiano?", 
        opciones: [
          "El cálculo de la pendiente entre dos puntos equidistantes del origen.", 
          "La integración del área bajo la curva que conecta ambos puntos.", 
          "La deducción directa analítica del teorema de Pitágoras, al trazar un triángulo rectángulo imaginario entre ambos puntos.", 
          "El principio de la ley de cosenos aplicado a un ángulo llano."
        ], 
        respuesta: "La deducción directa analítica del teorema de Pitágoras, al trazar un triángulo rectángulo imaginario entre ambos puntos.", 
        explicacion: "Al ubicar P1(x1, y1) y P2(x2, y2), la diferencia de sus 'x' forma un cateto, la diferencia de sus 'y' el otro, y la distancia d es la hipotenusa." 
      },
      { 
        pregunta: "Si tienes P1(-3, 0) y P2(0, 4), al sustituirlos y resolver en la fórmula de distancia cartesiana, el resultado es:", 
        opciones: [
          "d = 7 unidades.", 
          "d = 1 unidades.", 
          "d = 5 unidades.", 
          "d = 12 unidades."
        ], 
        respuesta: "d = 5 unidades.", 
        explicacion: "Horizontal (0 - (-3)) = 3. Vertical (4 - 0) = 4. Por lo tanto d = √(3² + 4²) = √(9 + 16) = √(25) = 5 unidades cartesianas." 
      },
      { 
        pregunta: "¿Puede el resultado del cálculo de distancia entre dos puntos en el plano cartesiano arrojar un valor negativo?", 
        opciones: [
          "Sí, cuando ambos puntos se encuentran ubicados en el tercer cuadrante.", 
          "Depende de la convención de signos de las coordenadas elegidas como origen.", 
          "A veces, si el vector apunta hacia la izquierda del eje de las abscisas.", 
          "No, debido a que resulta de una raíz cuadrada de la suma de dos cuadrados, lo cual siempre resulta en un valor positivo o cero."
        ], 
        respuesta: "No, debido a que resulta de una raíz cuadrada de la suma de dos cuadrados, lo cual siempre resulta en un valor positivo o cero.", 
        explicacion: "Una longitud o distancia geométrica es siempre un escalar positivo. La fórmula asegura sumar los cuadrados y aplicar la raíz principal positiva." 
      }
    ]
  },
  {
    id: "m15_1",
    titulo: "15.1 Límites: Concepto intuitivo",
    ejercicios: [
      { 
        pregunta: "Intuitivamente en cálculo, evaluar el 'límite de f(x) cuando x se acerca a c' se refiere a:", 
        opciones: [
          "Sustituir obligatoriamente el valor exacto de 'c' en la función y obtener directamente una constante definida.", 
          "Revisar hacia qué valor de 'y' se encamina la función f(x) a medida que x se acerca a 'c', sin necesariamente tocarlo.", 
          "Encontrar las raíces de la función evaluando dónde cruza f(x) por el eje de las abscisas de x.", 
          "Diferenciar la ecuación principal y resolver su primera derivada igualada a cero."
        ], 
        respuesta: "Revisar hacia qué valor de 'y' se encamina la función f(x) a medida que x se acerca a 'c', sin necesariamente tocarlo.", 
        explicacion: "La aproximación es la base del límite; no importa evaluar qué pasa exactamente 'en c' a riesgo de provocar una indefinición matemática, sino entender hacia dónde se dirige la gráfica cuando te acercas infinito a ese punto." 
      },
      { 
        pregunta: "Si al acercarnos a un punto por la izquierda la función va hacia 5, y por la derecha hacia 10, podemos dictaminar que:", 
        opciones: [
          "El límite de f(x) en ese punto es 5, priorizando siempre la lectura de izquierda a derecha.", 
          "El límite no existe, ya que los límites laterales no convergen en un único valor común.", 
          "El límite es el promedio de ambos valores, en este caso 7.5.", 
          "El límite se declara como infinito debido a la discrepancia lateral."
        ], 
        respuesta: "El límite no existe, ya que los límites laterales no convergen en un único valor común.", 
        explicacion: "La condición ineludible para que exista límite en un punto es que los límites por la izquierda y la derecha apunten concurrentemente y sin discrepancias hacia el mismísimo número." 
      },
      { 
        pregunta: "¿Qué ocurre si al evaluar directamente un límite (por sustitución) obtenemos la forma 0/0?", 
        opciones: [
          "Resulta inevitablemente en valor cero por la presencia del cero en el numerador.", 
          "El límite automáticamente se establece como inexistente.", 
          "Debemos aplicar procedimientos algebraicos, como factorización, para simplificar e intentar remover dicha 'indeterminación'.", 
          "La función se denomina constante estática que tiende el valor a infinito."
        ], 
        respuesta: "Debemos aplicar procedimientos algebraicos, como factorización, para simplificar e intentar remover dicha 'indeterminación'.", 
        explicacion: "Al sustituir directamente si encontramos 0/0 (una forma indeterminada), no significa literalmente ni 0 ni infinito, sino que debemos usar factorización o métodos avanzados para despejar la incógnita algebraica." 
      }
    ]
  },
  {
    id: "m16_1",
    titulo: "16.1 La derivada: Definición y notaciones",
    ejercicios: [
      { 
        pregunta: "Geométricamente hablando, obtener la derivada f'(x) en un punto de una curva implica:", 
        opciones: [
          "Establecer rigurosamente la medida exacta del área encerrada entre la curva y el eje X.", 
          "Calcular el asintótico del salto infinito.", 
          "Determinar las posibles raíces del polinomio.", 
          "Encontrar la pendiente exacta de la recta que es tangente a la curva en ese punto."
        ], 
        respuesta: "Encontrar la pendiente exacta de la recta que es tangente a la curva en ese punto.", 
        explicacion: "En su concepción geométrica, toda derivada no es más que el coeficiente m (pendiente), de la línea recta que roza o toca tangencialmente a una curva en un punto evaluado." 
      },
      { 
        pregunta: "En cinemática, si f(t) representa la función de posición de un objeto en base al tiempo, ¿qué describe la derivada f'(t)?", 
        opciones: [
          "La velocidad instantánea del objeto, puesto que indica el ritmo de cambio de posición con el transcurrir del tiempo.", 
          "La aceleración general promedio lograda al terminar todo el viaje continuo.", 
          "La máxima velocidad permitida lograda al iniciar el recorrido base.", 
          "La integral del espacio vectorial."
        ], 
        respuesta: "La velocidad instantánea del objeto, puesto que indica el ritmo de cambio de posición con el transcurrir del tiempo.", 
        explicacion: "La razón de cambio instantáneo es la esencia de la derivada. Saber con qué ritmo altera un móvil su posición temporal por cada tic del segundero es lo que conocemos trivialmente como 'velocidad'." 
      },
      { 
        pregunta: "¿Cuál de las siguientes es la notación ideada por el matemático Gottfried Leibniz para simbolizar la derivada de y con respecto a x?", 
        opciones: [
          "D_x [y]", 
          "f'(x)", 
          "dy/dx", 
          "ẏ (y con un punto arriba)"
        ], 
        respuesta: "dy/dx", 
        explicacion: "Mientras Newton originó la notación de punto, y Lagrange f'(x), Leibniz creó dy/dx, enfatizando claramente que la derivada previene de calcular el límite del cociente de incrementos finitos entre 'y' y en 'x'." 
      }
    ]
  }
];
