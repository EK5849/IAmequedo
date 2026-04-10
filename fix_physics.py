import re
import os

def fix_file(filename, replacements):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = re.sub(old, new, content, flags=re.DOTALL)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

# Regex to match entire question object blocks by their titulo text
rs_f3 = [
    (r'id:\s*"f4_2_1".*?}\s*\]\s*},', 
     'id: "f4_2_1", titulo: "4.2.1 Estructura de la materia",\n    ejercicios: [\n      { pregunta: "¿De qué constituyentes fundamentales está conformada toda la materia (sólidos, líquidos y gases) a nivel microscópico?", opciones: ["De átomos unidos y moléculas.", "Exclusivamente de protones y fotones inmutables.", "De ondas puras de calor solidificadas.", "De campos puros de gravedad estática sin masa."], respuesta: "De átomos unidos y moléculas.", explicacion: "Según el modelo cinético, toda materia se compone de agrupaciones discretas (átomos o moléculas) que están en permanente agitación térmica." }\n    ]\n  },'),
    (r'id:\s*"f4_2_2".*?}\s*\]\s*},',
     'id: "f4_2_2", titulo: "4.2.2 Cinética de los gases",\n    ejercicios: [\n      { pregunta: "Según el modelo cinético de los gases ideales, la energía cinética promedio de las moléculas de un gas ideal depende exclusivamente de:", opciones: ["Su temperatura absoluta.", "La presión total del recipiente contenedor.", "El volumen estático de sus masas molares integradas.", "De la masa total y peso gravitacional que experimentan."], respuesta: "Su temperatura absoluta.", explicacion: "La temperatura absoluta de un gas es directamente proporcional a la energía cinética promedio de sus partículas. A mayor agitación, mayor temperatura." }\n    ]\n  },'),
    (r'id:\s*"f4_2_3".*?}\s*\]\s*},',
     'id: "f4_2_3", titulo: "4.2.3 Ecuación del gas ideal",\n    ejercicios: [\n      { pregunta: "¿Cuál es la ecuación de estado general que describe matemáticamente el comportamiento de un gas ideal puro?", opciones: ["PV = nRT", "P = V/T", "E = mc²", "V = IR"], respuesta: "PV = nRT", explicacion: "La Ley general del Gas Ideal unifica las leyes de Boyle, Charles y Avogadro, indicando que la Presión por el Volumen (PV) equivale al número de moles por la constante R y la Temperatura (nRT)." }\n    ]\n  },'),
    (r'id:\s*"f5_1".*?}\s*\]\s*},',
     'id: "f5_1", titulo: "5.1 Características de ondas",\n    ejercicios: [\n      { pregunta: "¿Qué fórmula relaciona la velocidad de la propagación de una onda, su frecuencia y su longitud de onda fundamental?", opciones: ["v = λ × f", "v = d / t", "E = h × f", "v = λ + f"], respuesta: "v = λ × f", explicacion: "La velocidad de onda es el producto directo de la longitud de la onda (λ) multiplicada por la frecuencia (f)." }\n    ]\n  },')
]

rs_f4 = [
    (r'id:\s*"f9_2_4".*?}\s*\]\s*},',
     'id: "f9_2_4", titulo: "9.2.4 Fisión y fusión atómica",\n    ejercicios: [\n      { pregunta: "¿Cuál es la diferencia fundamental en la mecánica nuclear pura entre la fisión termodinámica atómica y la fusión?", opciones: ["La fisión consiste en dividir o fragmentar un núcleo inestable y pesado en ligeros, y la fusión en fundir u unir violentamente núcleos ligeros rindiendo una enorme masa de energía.", "La fusión fragmenta isótopos de plomo en calor, y la fisión genera hidrógeno libre estable congelado.", "Ambas unen núcleos pesados pero a distinta temperatura calórica solar termonuclear estable neta natural.", "No hay diferencia real, fisionar requiere irradiar neutrones y fusionar demanda enfriar positrones hasta el cero absoluto."], respuesta: "La fisión consiste en dividir o fragmentar un núcleo inestable y pesado en ligeros, y la fusión en fundir u unir violentamente núcleos ligeros rindiendo una enorme masa de energía.", explicacion: "Las bombas atómicas clásicas de uranio son de fisión (dividir núcleos pesados). Las estrellas y el Sol producen su energía mediante la fusión (unir núcleos de hidrógeno)." }\n    ]\n  },'),
    (r'pregunta:\s*"¿Al acelerarse súbitamente la velocidad laminar o horizontal recta fluida.*?}\s*\]\s*},',
     'pregunta: "¿Según el Principio de Bernoulli, qué sucede con la presión interna en un fluido ideal cuando su velocidad de flujo horizontal aumenta súbitamente a través de un tubo?", opciones: ["La presión interna hidrodinámica del fluido disminuye obligatoriamente y decae como compensación a la aceleración conservando el balance.", "La presión eleva bruscamente su temperatura neta para evaporar su carga masiva.", "Sencillamente la presión se anula para volverse una fuerza perpendicular de impacto libre.", "La presión y densidad de masa constante se cuadruplican sin excepción."], respuesta: "La presión interna hidrodinámica del fluido disminuye obligatoriamente y decae como compensación a la aceleración conservando el balance.", explicacion: "El teorema establece que en un fluido en movimiento horizontal, a mayor velocidad menor es la presión y viceversa (efecto venturi o de sustentación)." }\n    ]\n  },'),
    (r'pregunta:\s*"¿En mecánica viscosa de a qué la general a fluidos.*?}\s*\]\s*},',
     'pregunta: "¿Qué es la viscosidad en un fluido o sustancia en transición líquida pura?", opciones: ["La tendencia natural molecular a oponerse o resistir el libre flujo por fricción y cohesión interna de sus capas superficiales.", "La total y libre permeabilidad gravitacional que absorbe oxígeno.", "El peso neutro local de un caudal asintótico en reposo.", "Su falta de densidad que le permite ascender rápidamente sin límite."], respuesta: "La tendencia natural molecular a oponerse o resistir el libre flujo por fricción y cohesión interna de sus capas superficiales.", explicacion: "Por ejemplo, la miel tiene alta viscosidad porque la fricción entre las moléculas lentifica severamente su fluidez gravitatoria." }\n    ]\n  },'),
    (r'pregunta:\s*"¿Cuál a e el a s los a qué general fenómeno en principal el óptico los r.*?}\s*\]\s*},',
     'pregunta: "¿A qué fenómeno óptico nos referimos cuando un haz o rayo de luz cambia su velocidad y se dobla o curva al pasar o introducirse en una frontera translúcida de nuevo medio?", opciones: ["Transición por Refracción.", "Dispersión fotónica por Reflexión.", "Aislamiento por Difracción.", "Interferencia magnética de radiación."], respuesta: "Transición por Refracción.", explicacion: "La refracción ocurre porque la luz cambia su índice y velocidad de propagación al viajar, por ejemplo, de aire a agua, torciendo su ángulo original." }\n    ]\n  },'),
    (r'pregunta:\s*"¿A g v of at are q h To de c as m c d qué no o o do q he w p w he in I b For to l as by.*?}\s*\]\s*},',
     'pregunta: "¿Qué propiedad característica óptica nos indica el índice de refracción general ' + r"'n'" + ' de una materia pura translúcida o transparente?", opciones: ["Indica como un cociente exactamente qué tantas veces discurre o es más lenta la luz al propagarse allí interiormente en comparación frente a su velocidad pura en el vacío.", "Indica cuántos fotones luminosos refractan y se incendian térmicamente neutralizando metales densos magnéticos del fondo oceánico.", "Marca puramente si su masa desvía o atrae radiación beta ultravioleta inestable originaria pura infrarroja calórica libre.", "Define la pureza o concentración salina orgánica interna unificando átomos."], respuesta: "Indica como un cociente exactamente qué tantas veces discurre o es más lenta la luz al propagarse allí interiormente en comparación frente a su velocidad pura en el vacío.", explicacion: "La fórmula es n = c / v. Refiere la proporción o freno que ejerce el material contra el paso o trazo universal fotónico original C." }\n    ]\n  },')
]

fix_file('src/data/temario_fisica_3.js', rs_f3)
fix_file('src/data/temario_fisica_4.js', rs_f4)
