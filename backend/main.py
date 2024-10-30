# main.py
import os
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import shutil
import fitz  # PyMuPDF for PDF text extraction
from transformers import pipeline  # Hugging Face pipeline for QA

# Initialize FastAPI app
app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Directory for storing uploaded PDF files
UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Enable CORS for frontend-backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the question-answering model
qa_pipeline = pipeline("question-answering", model="bert-large-uncased-whole-word-masking-finetuned-squad")

# Helper function to split the PDF text into smaller chunks
def split_text(text, max_length=1000):
    for i in range(0, len(text), max_length):
        yield text[i:i + max_length]

# Define the request body model
class QuestionRequest(BaseModel):
    filename: str
    question: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the PDF QA API"}

@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    logger.info(f"File {file.filename} uploaded successfully at {file_path}")
    return {"filename": file.filename, "status": "PDF uploaded successfully"}

@app.post("/ask-question/")
async def ask_question(data: QuestionRequest):
    file_path = os.path.join(UPLOAD_DIR, data.filename)
    logger.info(f"Checking for file at: {file_path}")

    # Check if PDF exists
    if not os.path.exists(file_path):
        logger.error("PDF not found")
        raise HTTPException(status_code=404, detail="PDF not found")
    
    # Extract text from PDF
    pdf_text = ""
    try:
        with fitz.open(file_path) as doc:
            for page in doc:
                pdf_text += page.get_text()
        logger.info("PDF content extracted successfully.")
    except Exception as e:
        logger.error(f"Error extracting text from PDF: {e}")
        raise HTTPException(status_code=500, detail="Error extracting PDF text")
    
    # Split the PDF text into chunks and find answers
    chunk_answers = []
    for chunk in split_text(pdf_text):
        try:
            result = qa_pipeline({"context": chunk, "question": data.question})
            chunk_answers.append((result['answer'], result['score']))
        except Exception as e:
            logger.error(f"Error processing chunk for question-answering: {e}")
            continue
    
    # Choose the answer with the highest confidence score
    if chunk_answers:
        best_answer = max(chunk_answers, key=lambda x: x[1])[0]
    else:
        best_answer = "No suitable answer found in the PDF."
    
    logger.info(f"Best answer found: {best_answer}")
    return {"answer": best_answer}
