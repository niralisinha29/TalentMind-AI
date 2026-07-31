from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
import PyPDF2
import io

from backend.agents.chief_recruiter.agent import ChiefRecruiterAgent
from backend.agents.chief_recruiter.schema import RecruiterRequest

from backend.ranking_engine import (
    get_top_candidates,
    rank_candidates_for_jd,
    get_candidate_by_name
)

from backend.llm.gemini_client import (
    generate_interview_questions_llm
)

from backend.jd_parser import (
    parse_jd
)

from backend.capability_matcher import (
    get_required_capabilities
)


app = FastAPI(
    title="TalentMind AI",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ============================
# Request Models
# ============================

class JobRequest(BaseModel):

    job_description: str


class InterviewRequest(BaseModel):

    candidate_name: str

    job_description: str


# ============================
# Home
# ============================

@app.get("/")
def home():

    return {
        "message": "TalentMind AI API Running"
    }


# ============================
# Health Check
# ============================

@app.get("/health")
def health():

    return {

        "status": "healthy",

        "service": "TalentMind AI"

    }

@app.post("/upload-jd")
async def upload_job_description(file: UploadFile = File(...)):

    try:

        filename = file.filename.lower()

        # PDF
        if filename.endswith(".pdf"):

            pdf_bytes = await file.read()

            pdf_reader = PyPDF2.PdfReader(
                io.BytesIO(pdf_bytes)
            )

            text = ""

            for page in pdf_reader.pages:

                page_text = page.extract_text()

                if page_text:

                    text += page_text + "\n"

        # TXT
        elif filename.endswith(".txt"):

            text = (await file.read()).decode("utf-8")

        # DOCX
        elif filename.endswith(".docx"):

            from docx import Document

            contents = await file.read()

            document = Document(io.BytesIO(contents))

            text = "\n".join(

                paragraph.text

                for paragraph in document.paragraphs

            )

        else:

            return {

                "error": "Only PDF, DOCX and TXT files are supported."

            }

        return {

            "job_description": text

        }

    except Exception as e:

        return {

            "error": str(e)

        }

# ============================
# Top Candidates
# ============================

@app.get("/top-candidates")
def top_candidates():

    return get_top_candidates()


# ============================
# Rank Candidates
# ============================

@app.post("/rank-job")
def rank_job(request: JobRequest):

    results = rank_candidates_for_jd(
        request.job_description
    )

    return {

        "results": results

    }


# ============================
# Generate Interview Kit
# ============================

@app.post("/generate-interview-kit")
def generate_interview_kit(request: InterviewRequest):

    candidate = get_candidate_by_name(
        request.candidate_name
    )

    if candidate is None:

        return {

            "error": "Candidate not found"

        }

    parsed_jd = parse_jd(
        request.job_description
    )

    required_capabilities = get_required_capabilities(
        parsed_jd["skills"]
    )

    interview_result = generate_interview_questions_llm(

        candidate,

        request.job_description,

        required_capabilities

    )

    return {

        "candidate": request.candidate_name,

        "status": interview_result["status"],

        "source": interview_result["source"],

        "message": interview_result.get(

            "message",

            "Generated successfully using Gemini."

        ),

        "interview_questions":

            interview_result["interview_questions"]

    }

chief_recruiter = ChiefRecruiterAgent()


@app.post("/agents/chief-recruiter/plan")
def create_hiring_plan(request: RecruiterRequest):

    return chief_recruiter.plan(request.goal)