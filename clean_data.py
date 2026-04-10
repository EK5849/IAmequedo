import os
import re

data_dir = 'src/data'
crutch_words = [
    r'\bforzosa(mente)?\b', 
    r'\basertiva(mente)?\b', 
    r'\boriginaria(mente)?\b', 
    r'\bpurificada(mente)?\b', 
    r'\binnegable(mente)?\b', 
    r'\blúdica(mente)?\b', 
    r'\bcaprichosa(mente)?\b', 
    r'\bfidedigna(mente)?\b', 
    r'\bestricta(mente)?\b',
    r'\bvacua(mente)?\b', 
    r'\binamovible(mente)?\b', 
    r'\bpurista(mente)?\b'
]
pattern = re.compile('|'.join(crutch_words), re.IGNORECASE)

single_letter_pattern = re.compile(r'\b([a-z]\s){3,}\b', re.IGNORECASE)

for file in os.listdir(data_dir):
    if file.startswith('temario_') and file.endswith('.js'):
        path = os.path.join(data_dir, file)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        matches = single_letter_pattern.findall(content)
        if matches:
            print(f'WARNING: Single letter loops found in {file}')

        new_content = pattern.sub('', content)
        new_content = re.sub(r' +', ' ', new_content) # fix spaces
        new_content = new_content.replace(' ,', ',').replace(' .', '.')
        
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Cleaned crutch words in {file}')
