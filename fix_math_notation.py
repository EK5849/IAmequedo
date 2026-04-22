import os
import re
import glob

superscripts = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾'
}

def to_superscript(match):
    text = match.group(1)
    return ''.join(superscripts.get(c, c) for c in text)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # ^2 -> ²
    content = re.sub(r'\^([-+]?[0-9]+)', to_superscript, content)
    # ^(1/2) -> ⁽¹/²⁾
    content = content.replace('^(1/2)', '⁽¹/²⁾')
    # x1, x2 where they mean subscript? Might be risky, let's just do x_1 -> x₁
    # No, we won't touch x1, x2 unless we are sure, but let's stick to exponents primarily as requested.
    
    # Let's also fix specific cases like: x2-x1 inside: x2 -> x₂, x1 -> x₁
    # This is seen in (x2-x1)²
    content = content.replace('x2-x1', 'x₂-x₁')
    content = content.replace('y2-y1', 'y₂-y₁')

    if content != original:
        print(f"Modifying {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

for filepath in glob.glob('src/data/*.js') + glob.glob('src/data/*.json'):
    process_file(filepath)

print("Done")
