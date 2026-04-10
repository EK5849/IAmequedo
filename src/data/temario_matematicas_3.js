export const matematicas3Temas = [
  {
    id: "m5_1_1", titulo: "5.1.1 Sistema 2x2: Métodos de solución",
    ejercicios: [
      { 
        pregunta: "¿Cuál es el fundamento visual o geométrico al resolver un sistema de dos ecuaciones lineales con dos incógnitas (2x2)?", 
        opciones: [
          "Encontrar el grado de intersección volumétrico entre planos transversales.", 
          "Calcular el grado de concavidad de la parábola proyectada en el origen.", 
          "Resolver la separación paralela que divide a las rectas.", 
          "Encontrar el punto de coordenada (x,y) exacto donde ambas rectas se intersecan en el plano cartesiano."
        ], 
        respuesta: "Encontrar el punto de coordenada (x,y) exacto donde ambas rectas se intersecan en el plano cartesiano.", 
        explicacion: "Geométricamente, una ecuación de primer grado con 2 variables representa una recta lineal en el plano. La resolución al sistema nos arroja la coordenada o punto exacto en el que ambas rentas coinciden o se cruzan." 
      },
      { 
        pregunta: "En el método de 'Sustitución' utilizado en sistemas 2x2, la principal norma operativa indica:", 
        opciones: [
          "Restar ambas ecuaciones para cancelar directamente la variable con el coeficiente mayor.", 
          "Graficar la intersección en un plano a escala para deducir una de las raíces compuestas.", 
          "Multiplicar ambas ecuaciones cruzadas e iterativas.", 
          "Despejar una incógnita en una ecuación y reemplazar dicho valor en la otra para quedar con una única variable."
        ], 
        respuesta: "Despejar una incógnita en una ecuación y reemplazar dicho valor en la otra para quedar con una única variable.", 
        explicacion: "Se le llama sustitución porque explícitamente tú 'despejas' una expresión parcial de la primera ecuación y la 'sustituyes' dentro de la segunda ecuación del mismo sistema para volverla lineal en una sola incógnita." 
      },
      { 
        pregunta: "Si al emplear un método algebraico llegas a una contradicción o falsedad del tipo '5 = 0' en sistemas 2x2, esto significa que:", 
        opciones: [
          "Las pendientes se volvieron irracionales y se requiere derivar antes de finalizar el cálculo.", 
          "Ocurrió un error aritmético al calcular operaciones divisorias con números primos.", 
          "El sistema posee infinitas soluciones en su estructura bidimensional.", 
          "El sistema es clasificado como inconsistente y no posee solución real, ya que representa rectas estrictamente paralelas o que nunca se intersecan."
        ], 
        respuesta: "El sistema es clasificado como inconsistente y no posee solución real, ya que representa rectas estrictamente paralelas o que nunca se intersecan.", 
        explicacion: "Cuando desaparecen todas las variables y terminas en un escenario absurdo e injustificable (como 0 = 8), el álgebra indica que el escenario planteado inicialmente era imposible geométricamente; es un sistema inconsistente conformado por rectas paralelas." 
      }
    ]
  },
  {
    id: "m5_2_1", titulo: "5.2.1 Sistema 3x3: Regla de Cramer",
    ejercicios: [
      { 
        pregunta: "La resolución de sistemas complejos por el método generalizado o Regla de Cramer opera fundamentalmente consiguiendo las incógnitas (x, y, z) a través de:", 
        opciones: [
          "Sumas y restas horizontales analíticas del coeficiente dependiente.", 
          "Análisis asintótico sobre rotaciones de los ejes polares.", 
          "Sustitución e igualación sucesiva en el orden del polinomio de tercer grado.", 
          "El cálculo de determinantes extraídas de las matrices creadas por los coeficientes y las constantes del sistema."
        ], 
        respuesta: "El cálculo de determinantes extraídas de las matrices creadas por los coeficientes y las constantes del sistema.", 
        explicacion: "La Regla de Cramer es una máquina fundamentada en la extracción de determinantes. Opera obteniendo todas las variables (x, y, z) mediante el cociente fraccional de matrices o determinantes derivados del sistema base." 
      },
      { 
        pregunta: "Para garantizar que un sistema 3x3 pueda ser válidamente procesado con la fórmula de Cramer, ¿qué prerrequisito debe imperar sin falla?", 
        opciones: [
          "Ningún coeficiente presente en la primera columna debe rebasar el valor 1.", 
          "Las variables siempre deben de manifestar exponente elevado de manera consecutiva en el grado x^3.", 
          "El determinante principal o global (Delta del sistema) conformado por los coeficientes NO debe arrojar un valor de cero.", 
          "Todas las variables de incógnitas deben encontrarse balanceadas en la raíz cuadrada simétrica de su módulo."
        ], 
        respuesta: "El determinante principal o global (Delta del sistema) conformado por los coeficientes NO debe arrojar un valor de cero.", 
        explicacion: "La regla de operación general es calcular variables como x = ∆x / ∆. Si el denominador que es el 'Delta del sistema' o matriz principal arrojara cero accidentalmente, el cálculo se indefine por la restricción de nunca poder dividir un número puro entre el cero nulo." 
      },
      { 
        pregunta: "Operando el método de determinaciones por Cramer: si procedes a calcular el específico ∆y (Delta de y), la matriz general para este fin exige de ti:", 
        opciones: [
          "Remover la fila de bases e igualarlas a cero absoluto.", 
          "Descartar todas las líneas relacionadas a la incógnita Z en el algoritmo.", 
          "Suprimir toda la tabla original extrayéndole la inversa escalar cuadrática.", 
          "Extraer temporalmente la columna original que correspondía a 'Y', rellenando su hueco usando la columna de los términos o constantes independientes (del otro lado del igual)."
        ], 
        respuesta: "Extraer temporalmente la columna original que correspondía a 'Y', rellenando su hueco usando la columna de los términos o constantes independientes (del otro lado del igual).", 
        explicacion: "Esencialmente si uno busca la determinante de X (∆x), sustituye la columna X con la de resultados; De la misma manera si tú requieres hallar Delta de 'Y', reemplazas el lugar habitado en la matriz por las variables Y con los puros términos constantes independientes." 
      }
    ]
  },
  {
    id: "m6_1", titulo: "6.1 Dominio, contradominio y correspondencia",
    ejercicios: [
      { 
        pregunta: "En álgebra y cálculo, un pre-requisito fundamental para considerar que una correspondencia califique como 'Función' dicta que:", 
        opciones: [
          "A un elemento estático del grupo A lleguen múltiples ramas derivadas desde el grupo B.", 
          "El cruce interaccional o gráfica genere una base elíptica cerrada ininterrumpida.", 
          "Todo elemento estricto del grupo A (dominio) posea de manera exclusiva y rigurosa una única asociación y salida en el grupo B (rango).", 
          "A un elemento evaluable de B siempre le surjan orígenes formadas infinitamente variadas."
        ], 
        respuesta: "Todo elemento estricto del grupo A (dominio) posea de manera exclusiva y rigurosa una única asociación y salida en el grupo B (rango).", 
        explicacion: "Por definición universal en cálculo analítico: para cada valor introducido en 'X' (dominio), la función solo puede devolver o entregar de forma excluyente un único resultado correspondiente en 'Y'." 
      },
      { 
        pregunta: "En una expresión matemática con variables complejas, el 'Dominio' asertivamente se refiere a:", 
        opciones: [
          "Una colección inamovible de bases infinitamente nulas o puntos de escape sin retorno en su desarrollo.", 
          "Las regiones cuadráticas en las que confluyen las curvas dependientes formadas por abscisas en cruce aleatorio con las ordenadas.", 
          "Los resultados formales de 'Y' devueltos inamoviblemente de las raíces del desarrollo de su base polinómica final.", 
          "La recolección y agrupación de todos los valores posibles de la variable independiente (generalmente 'x') en los que la función está debidamente definida."
        ], 
        respuesta: "La recolección y agrupación de todos los valores posibles de la variable independiente (generalmente 'x') en los que la función está debidamente definida.", 
        explicacion: "El Dominio ampara y abarca a todas tus variables libres de entrada ('X'). Los números de la recta son formalmente viables para el dominio siempre que no causen al operarse indefiniciones aritméticas (divisiones por ceros) o fallas algebraicas formales." 
      },
      { 
        pregunta: "Mientras el Dominio rige las variables libres (las entradas), se conoce en las matemáticas formalmente como 'Contradominio' o 'Rango' a:", 
        opciones: [
          "El límite de origen de intersección escalar que poseen las variables dependientes.", 
          "Las abscisas directrices donde descansa y finaliza la progresión algorítmica constante y natural.", 
          "Los puntos intermedios en el espacio referencial o base donde se da el desarrollo integral formal de las funciones ineludibles.", 
          "El conjunto estructurado de todas las alturas o resultados obtenidos referidos al eje 'Y' (las salidas generadas por la función)."
        ], 
        respuesta: "El conjunto estructurado de todas las alturas o resultados obtenidos referidos al eje 'Y' (las salidas generadas por la función).", 
        explicacion: "Si el Dominio encapsula las bases de entradas (normalmente a nivel local x), el Contradominio, también bautizado en cálculo o álgebra como Rango o Imagen, es estrictamente y abarca el conjunto purista o matriz de todos los valores emergentes arrojados por la propia función o sea los originados en 'Y'." 
      }
    ]
  },
  {
    id: "m6_6", titulo: "6.6 Funciones continuas y discontinuas",
    ejercicios: [
      { 
        pregunta: "¿Qué cualidad visual y formal matemática define de forma contundente en su lectura gráfica a una función categorizada como discontinua?", 
        opciones: [
          "El rebotar asincrónico por todos los cuadrantes descartando su asimilación en forma de parábola.", 
          "Poseer múltiples raíces derivadas constantes sobre un mismo eje plano sin variables funcionales formadas originadas.", 
          "Evidenciar y presentar notorios 'huecos', 'saltos', o francas rupturas asintóticas abstractamente visibles en el trazo de su dibujo.", 
          "Consolidarse en forma de una línea recta continua totalmente inalterable paralela natural inmodificable respecto y junto al eje X."
        ], 
        respuesta: "Evidenciar y presentar notorios 'huecos', 'saltos', o francas rupturas asintóticas abstractamente visibles en el trazo de su dibujo.", 
        explicacion: "Toda gráfica visualmente clasificada discontinua forzará obligatoriamente o exigirá separar y levantar el lápiz ineludiblemente de papel para que tú logres completarla o dibujarla entera en el desarrollo cartesiano evaluable por completo." 
      },
      { 
        pregunta: "Cálculo puro dicta como la estricta condición rigurosa e innegociable ineludible matemática formadora para declarar que una función sea continua cabal e inamoviblemente en un punto evaluado 'a' natural a que:", 
        opciones: [
          "El límite generalizado asintótico de esa base deba tender invariablemente formador inamovible a lo infinitamente nulo para las bases laterales continuas.", 
          "La sumatoria lateral evaluable indique invariablemente formador inamovible al límite de que la rama izquierda y final base sea negativamente base orientada.", 
          "La estricta evaluación o el asimilado límite integral natural analítico resolutivo de todo de forma o función al aproximar X al referencial centro 'a' forzosamente valga sin dudar y sea estricta, igual, formal y operativamente el mismo originario e idéntico evaluable de su calculo base numérico idéntico en desarrollo real y a f(a).", 
          "El cruce por las paralelas asintóticas o interceptos en el plano corten ineludible y fidedignamente directos la derivada asertivamente asimilada general pura o el centro analítico asertiva integral natural orígenes u en asertiva origen e evaluable de sus puntos vaciados formales formados originados."
        ], 
        respuesta: "La estricta evaluación o el asimilado límite integral natural analítico resolutivo de todo de forma o función al aproximar X al referencial centro 'a' forzosamente valga sin dudar y sea estricta, igual, formal y operativamente el mismo originario e idéntico evaluable de su calculo base numérico idéntico en desarrollo real y a f(a).", 
        explicacion: "Formalmente se exige: el evaluable límite al converger estricta e intuitivamente cuando x pura o en función dependiente natural y resolutiva base tiende o fidedignamente de la función f(x) acopia al acercarse o al llegar a 'a', sea y coincida ineludible e invariablemente natural exacta o perfectamente igual al resultado original calculado o directo e evaluable dictamen del mismo punto ciego f(a) para garantizar el puente formal sellado inalterablemente y sin baches estáticos y visuales de la natural ruptura matemática saltos o vacíos vacuos sin puentes nulos asintóticos saltos funcionales formadoras de y las." 
      }
    ]
  },
  {
    id: "m7_1_4", titulo: "7.1.4 Ley de Senos y Cosenos",
    ejercicios: [
      { 
        pregunta: "¿Para qué sirve y cuándo se aplica la formulación fundamental de la Ley de Senos?", 
        opciones: [
          "Únicamente al momento de resolver e indagar medidas directrices en triángulos donde ya se confirmaron un par de ángulos rectos superpuestos de 90°.", 
          "Sustituyendo innegablemente de forma oficial el uso del famoso teorema de Pitágoras únicamente aplicable obligatoriamente y formadora en triángulos formal isósceles estéticamente balanceados de lados iguales originados base puros de e formadores de áreas y con igual perímetro natural estricto asertivo a la nulas paralelos.", 
          "Únicamente en el instante específico donde solo y estrictamente donde dispongas conocer analíticamente el de forma a todos los lados del triángulo puro u formales abstractamente originario asertivo natural lúdico y debas calcular derivadas en formadores puristas ángulos de base de referenciales vacuas estáticas.", 
          "Se emplea fundamentalmente y preferentemente para calcular lados o ángulos en cualquier triángulo (no rectángulos u oblicuángulos) siempre y cuando domines y conozcas al menos un ángulo con su estricto lado opuesto y algún otro dato aislado."
        ], 
        respuesta: "Se emplea fundamentalmente y preferentemente para calcular lados o ángulos en cualquier triángulo (no rectángulos u oblicuángulos) siempre y cuando domines y conozcas al menos un ángulo con su estricto lado opuesto y algún otro dato aislado.", 
        explicacion: "Mientras el Teorema clásico de trigonometría base como Pitágoras domina los clásicos o formales triángulos de 90°, Ley de senos asume control inamovible donde te dictan de forma o arrojan una información originaria de estructura trigonométrica cruzada base asertiva a resolver a/sen(A)=b/sen(B)=c/sen(C)." 
      }
    ]
  }
];
