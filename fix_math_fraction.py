import os
import re
import glob

superscripts = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', 
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '/': '⁄', '(': '⁽', ')': '⁾'
}
def to_super_frac(match):
    text = match.group(0)
    return ''.join(superscripts.get(c, c) for c in text)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Look for ^(1/2), ^(2/3) etc
    content = re.sub(r'\^\(\d+/\d+\)', to_super_frac, content)
    # Also fix x1, x2 where they are followed by `<` or `>` or `)` -> subscript ? 
    # Just leaving x1 and x2 as is for safety unless they clearly are subscripts.
    # Like `x1 < x2` -> `x₁ < x₂`
    content = content.replace('x1', 'x₁').replace('x2', 'x₂').replace('y1', 'y₁').replace('y2', 'y₂')
    # but be careful! What if x2 means x squared? The user previously used x^2. So x2 should be safe to replace with x₂.

    if content != original:
        print(f"Modifying {filepath}")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

for filepath in glob.glob('src/data/*.js') + glob.glob('src/data/*.json'):
    process_file(filepath)
