# test_fitz.py
try:
    import fitz
    print("PyMuPDF (fitz) import successful.")
except ImportError as e:
    print(f"ImportError: {e}")
