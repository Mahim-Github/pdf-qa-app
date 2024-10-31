# pdf-qa-app

This is a FastAPI-based application that allows users to upload PDF files and ask questions about their content. The application uses natural language processing (NLP) to extract text from PDFs and provides answers based on the extracted content. It has both backend and frontend components.

## Project Structure

- **Backend**: Handles PDF uploads, processes questions, and provides answers using FastAPI, with NLP capabilities powered by Hugging Face's Transformers library.
- **Frontend**: Built with React, it provides a user-friendly interface for uploading PDFs and asking questions.

## Features

- PDF upload and text extraction.
- Question answering based on uploaded PDF content.
- SQLite database to manage uploaded PDF data.
- REST API endpoints for PDF upload and question answering.

---

## Project Setup

Follow the steps below to set up and run the project.

### 1. Clone the Repository
git clone https://github.com/Mahim-Github/pdf-qa-app.git
### 2. Navigate to the Backend Directory
bash
Copy code
cd pdf-qa-app/backend
### 3. Create a Virtual Environment
bash
Copy code
python -m venv env
### 4. Activate the Virtual Environment
On Windows:
bash
Copy code
env\Scripts\activate
On macOS/Linux:
bash
Copy code
source env/bin/activate
### 5. Install Dependencies
bash
Copy code
pip install -r requirements.txt
### 6. Run the Backend Application
Start the FastAPI application with Uvicorn:
bash
Copy code
uvicorn main:app --reload
The backend will be accessible at http://localhost:8000.

### 7. Navigate to the Frontend Directory
Open a new terminal, navigate to the frontend folder, and set up the frontend:

bash
Copy code
cd ../pdf-qa-frontend
### 8. Install Frontend Dependencies
bash
Copy code
npm install
### 9. Run the Frontend Application
bash
Copy code
npm start
The frontend will be live on http://localhost:3000.

Note: Ensure the frontend is configured to make requests to the backend's correct URL (http://127.0.0.1:8000).

## Endpoints
Backend Endpoints
GET / - Welcome message.
POST /upload-pdf/ - Upload a PDF file.
POST /ask-question/ - Ask questions based on the uploaded PDF content.
Frontend
Provides a web interface for uploading PDFs and asking questions.
Dependencies
Backend
fastapi - Web framework for building APIs.
uvicorn - ASGI server for running FastAPI.
pydantic - Data validation library.
langchain - For efficient language model orchestration.
transformers - Hugging Face’s library for NLP models.
PyMuPDF - PDF handling library.
sqlalchemy - ORM for managing SQLite database.
Frontend
React - Frontend framework for building UI.
axios - For making HTTP requests to the backend.
Database
The backend application uses an SQLite database (pdf_qa.db) to store information about uploaded PDF files.

## Project Structure
graphql
Copy code
pdf-qa-app/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── database.py          # Database connection and setup (replaces pdf_qa.db)
│   ├── uploads/             # Directory for storing uploaded PDF files
│   ├── requirements.txt     # Backend dependencies
│   └── .gitignore           # Git ignore file for backend (ignores virtual env, cache, etc.)
└── pdf-qa-frontend/
    ├── src/                 # React source files
    ├── public/              # Public assets directory for React (includes index.html, favicon, etc.)
    ├── package.json         # Frontend dependencies and scripts
    └── .gitignore           # Git ignore file for frontend (ignores node_modules, build files, etc.)

## License
This project is licensed under the MIT License. See the LICENSE file for details.
