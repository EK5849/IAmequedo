export const matematicas5Temas = [
 {
 id: "m13_1", titulo: "13.1 Hipérbola: Lugar geométrico",
 ejercicios: [
 { pregunta: "¿Cuál es la regla fundamental que define a la Hipérbola como conjunto de puntos geométricos en el plano?", opciones: ["El valor absoluto de la DIFERENCIA de sus distancias hacia dos puntos fijos (focos) siempre resulta en una constante.", "La multiplicación cruzada de sus asíntotas arroja siempre el número uno.", "La SUMATORIA absoluta de sus distancias hacia dos puntos fijos rinde un valor.", "Es un trazo donde todos sus ejes principales convergen en el infinito."], respuesta: "El valor absoluto de la DIFERENCIA de sus distancias hacia dos puntos fijos (focos) siempre resulta en una constante.", explicacion: "Si tomas cualquier punto en la hipérbola y restas la distancia hacia el Foco 1 de la distancia hacia el Foco 2, el resultado absoluto siempre será igual a la medida del eje transverso (2a)." }
 ]
 },
 {
 id: "m14_2", titulo: "14.2 Ecuación general de segundo grado",
 ejercicios: [
 { pregunta: "Dada la Ecuación General Ax² + Cy² + Dx + Ey + F = 0, ¿qué criterio te permite deducir rápidamente qué cónica representa basada en A y C?", opciones: ["La relación y el signo existente (si son iguales, distintos o si falta uno) de los coeficientes 'A' y 'C'.", "Solamente la magnitud positiva del término independiente 'F' frente al coeficiente 'E'.", "El sumatorio factorial de todo el trinomio dividido entre C.", "El cálculo de la integración de 'D' respecto a la derivada asintótica de 'E'."], respuesta: "La relación y el signo existente (si son iguales, distintos o si falta uno) de los coeficientes 'A' y 'C'.", explicacion: "Si A y C son iguales en signo y número, es Circunferencia. Si tienen diferente signo, es Hipérbola. Si uno de ellos es cero (solo hay A o C), es Parábola. Si tienen el mismo signo pero distinto número, es Elipse." }
 ]
 },
 {
 id: "m16_3", titulo: "16.3 Derivada: Regla de la cadena",
 ejercicios: [
 { pregunta: "Si nos enfrentamos a una función compuesta f(g(x)) como por ejemplo (3x² + 5)⁴, ¿qué dicta la 'Regla de la Cadena' para obtener su derivada?", opciones: ["Se deriva la función exterior ('potencia 4') respetando el interior, y luego se multiplica por la derivada de ese interior (lo de adentro del paréntesis).", "Se multiplica el exponente por el coeficiente principal, ignorando las variables secundarias.", "Se debe resolver primero la potencia distributiva y después aplicar integración básica constante.", "Se deriva el primer término interno aislado y se anula automáticamente el exponente exterior."], respuesta: "Se deriva la función exterior ('potencia 4') respetando el interior, y luego se multiplica por la derivada de ese interior (lo de adentro del paréntesis).", explicacion: "La regla de la cadena establece que d/dx [f(g(x))] = f'(g(x)) * g'(x). En este caso: bajas el 4, restas 1 al exponente, dejas (3x² + 5) igual, y multiplicas el total por 6x, dando como respuesta fina 24x(3x² + 5)³." }
 ]
 },
 {
 id: "m17_3", titulo: "17.3 La integral inmediata",
 ejercicios: [
 { pregunta: "Bajo el marco fundamental del cálculo diferencial e integral, ¿cuál es la función central operativa de una Integral Indefinida?", opciones: ["Actúa como una 'anti-derivada'; es decir, halla y reconstruye la función primitiva F(x) de la cual se deriva f(x).", "Sirve para calcular la máxima velocidad posible (Vmax) de un móvil acelerado.", "Encuentra directamente los puntos de tangencia máxima obligatorios de una curva cerrada.", "Calcula exclusivamente las áreas acotadas bajo secciones cuadráticas perfectas delimitadas."], respuesta: "Actúa como una 'anti-derivada'; es decir, halla y reconstruye la función primitiva F(x) de la cual se deriva f(x).", explicacion: "Mientras que la derivada nos otorga la tasa de cambio de una función (su velocidad instantánea), su integral nos devuelve a la función general madre original en el espacio añadiendo siempre la constante de integración (+C)." },
 { pregunta: "De acuerdo con la integral polinómica inmediata (para exponentes distintos de -1), al resolver ∫(xⁿ)dx, la regla algebraica aplicada al elemento 'x' es:", opciones: ["Se SUMA 1 a la potencia anterior (n+1) y ese mismo resultado se ubica dividiendo como denominador global final de la 'x'.", "Se RESTA 1 exponencialmente y ese número multiplica invariablemente al coeficiente general previo.", "Se elimina la variable principal 'x' si y solo si la constante C es un número entero positivo infinito.", "Se mantiene intacta la potencia y se reasignan las constantes acompañando con factoriales reducidos."], respuesta: "Se SUMA 1 a la potencia anterior (n+1) y ese mismo resultado se ubica dividiendo como denominador global final de la 'x'.", explicacion: "La fórmula directa es: (x^(n+1))/(n+1) + C. Dado que derivar consiste en bajar la potencia multiplicando y luego restarle 1, al integrar haces exactamente lo contrario: primero sumas 1 al exponente, y luego usas ese nuevo número para dividir la expresión." }
 ]
 }
];
