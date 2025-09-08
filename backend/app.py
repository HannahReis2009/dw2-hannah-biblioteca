from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Livro
from database import get_db, engine
from sqlalchemy.orm import Session
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/livros", response_model=List[Livro])
def listar_livros():
    db = next(get_db())
    return db.query(Livro).all()
