import re
import os

def fix_file(filename, replacements):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = re.sub(old, new, content, flags=re.DOTALL)
        
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

rs_f3_4_1 = [
    (r'id:\s*"f4_1_1".*?}\s*\]\s*},',
     'id: "f4_1_1", titulo: "4.1.1 Calor vs Temperatura",\n    ejercicios: [\n      { pregunta: "¿Cuál es la principal diferencia conceptual entre Calor y Temperatura?", opciones: ["El calor es la energía térmica total en tránsito, mientras que la temperatura es la medida del nivel de energía cinética promedio molecular.", "El calor se mide de forma exacta e inmutable mediante un termómetro, y la temperatura es un volumen constante transitorio.", "La temperatura irradia energía desde cuerpos congelados y el calor absorbe masa sólida.", "Ambos son sinónimos que representan la misma constante estática de fricción atómica de estado base."], respuesta: "El calor es la energía térmica total en tránsito, mientras que la temperatura es la medida del nivel de energía cinética promedio molecular.", explicacion: "El calor (Joules/Calorías) fluye del cuerpo caliente al frío. La temperatura (Celsius/Kelvin) dicta ese nivel promedio de agitación molecular." }\n    ]\n  },'),
    (r'id:\s*"f4_1_2".*?}\s*\]\s*},',
     'id: "f4_1_2", titulo: "4.1.2 Equilibrio térmico",\n    ejercicios: [\n      { pregunta: "¿Qué sucede conceptualmente cuando dos cuerpos en contacto alcanzan el llamado equilibrio térmico?", opciones: ["Ambos cuerpos cesan el intercambio de energía al alcanzar idéntica temperatura compartida.", "Ambos cuerpos adquieren y ceden masa para convertirse en un plasma de estado neutro y polarizado.", "Uno de los cuerpos disuelve su radiación perdiendo temperatura inercial absorbente y oscura.", "El calor fluye constantemente hasta que uno baja al cero absoluto evaporándose."], respuesta: "Ambos cuerpos cesan el intercambio de energía al alcanzar idéntica temperatura compartida.", explicacion: "Al igualarse las temperaturas, el intercambio de calor neto cesa, lo que define el equilibrio térmico." }\n    ]\n  },'),
    (r'id:\s*"f4_1_3".*?}\s*\]\s*},',
     'id: "f4_1_3", titulo: "4.1.3 Temperaturas absolutas",\n    ejercicios: [\n      { pregunta: "¿Cuáles son las dos escalas reconocidas y empleadas formalmente para medir temperaturas absolutas en ciencias físicas?", opciones: ["La escala Kelvin y la escala Rankine.", "La escala Celsius y la temperatura Fahrenheit.", "Grados Newton y grados Réaumur isobáricos.", "Centígrados puros y Kelvin relativos."], respuesta: "La escala Kelvin y la escala Rankine.", explicacion: "Estas escalas parten desde el Cero Absoluto (donde cesa toda la vibración atómica molecular) sin emplear mediciones negativas." }\n    ]\n  },'),
    (r'id:\s*"f4_1_4".*?}\s*\]\s*},',
     'id: "f4_1_4", titulo: "4.1.4 Transferencia de calor",\n    ejercicios: [\n      { pregunta: "¿Cuáles son los tres medios fundamentales mediante los cuales el calor se puede propagar o transferir a otros cuerpos o medios térmicos?", opciones: ["Por conducción en sólidos, convección en fluidos, y radiación por ondas.", "Dilatación de sólidos, contracción térmica del vapor, y convección pesada de neutrones libres.", "Ondas fotónicas acústicas de calor elástico en nubes dispersas de radiación nuclear alfa.", "Inercia magnética calórica en vacío, efluvio atómico concentrado en masas densas radiantes y luz fría."], respuesta: "Por conducción en sólidos, convección en fluidos, y radiación por ondas.", explicacion: "Conducción implica contacto físico (principal en sólidos). Convección es transporte material de calor en fluidos. Radiación ocurre a través de emisión electromagnética hasta en el vacío absoluto." }\n    ]\n  },')
]

fix_file('src/data/temario_fisica_3.js', rs_f3_4_1)
