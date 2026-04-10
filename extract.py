from pypdf import PdfReader
import sys

try:
    reader = PdfReader("guia_2026_A1.pdf")
    text = ""
    # Just read the first 40 pages to catch the index/syllabus
    for i, page in enumerate(reader.pages[:40]):
        text += f"--- PAGE {i} ---\n"
        text += page.extract_text() + "\n"
    
    with open("pdf_extracted.txt", "w", encoding="utf-8") as f:
        f.write(text)
    print("PDF Extracted successfully.")
except Exception as e:
    print(f"Error: {e}")
