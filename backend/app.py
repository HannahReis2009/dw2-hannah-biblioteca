from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from models import Livro
from database import get_db, engine
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime

class LivroCreate(BaseModel):
    titulo: str
    autor: str
    ano: Optional[int] = None
    genero: Optional[str] = None
    isbn: Optional[str] = None

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/livros")
def listar_livros(
    busca: Optional[str] = Query(None),
    genero: Optional[str] = Query(None),
    ano: Optional[int] = Query(None),
    status: Optional[str] = Query(None)
):
    db = next(get_db())
    query = db.query(Livro)
    if busca:
        query = query.filter(
            (Livro.titulo.ilike(f"%{busca}%")) |
            (Livro.autor.ilike(f"%{busca}%"))
        )
    if genero:
        query = query.filter(Livro.genero == genero)
    if ano:
        query = query.filter(Livro.ano == ano)
    if status:
        query = query.filter(Livro.status == status)
    livros = query.all()
    return [livro.to_dict() for livro in livros]

@app.post("/livros")
def criar_livro(livro: LivroCreate):
    db = next(get_db())
    novo_livro = Livro(
        titulo=livro.titulo,
        autor=livro.autor,
        ano=livro.ano,
        genero=livro.genero,
        isbn=livro.isbn,
        status='disponivel',
        data_emprestimo=None
    )
    db.add(novo_livro)
    db.commit()
    db.refresh(novo_livro)
    return novo_livro.to_dict()

@app.put("/livros/{livro_id}")
def atualizar_livro(livro_id: int, livro: LivroCreate):
    db = next(get_db())
    db_livro = db.query(Livro).filter(Livro.id == livro_id).first()
    if not db_livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    db_livro.titulo = livro.titulo
    db_livro.autor = livro.autor
    db_livro.ano = livro.ano
    db_livro.genero = livro.genero
    db_livro.isbn = livro.isbn
    db.commit()
    db.refresh(db_livro)
    return db_livro.to_dict()

@app.delete("/livros/{livro_id}")
def deletar_livro(livro_id: int):
    db = next(get_db())
    livro = db.query(Livro).filter(Livro.id == livro_id).first()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    db.delete(livro)
    db.commit()
    return {"message": "Livro deletado com sucesso"}

@app.post("/livros/{livro_id}/emprestar")
def emprestar_livro(livro_id: int):
    db = next(get_db())
    livro = db.query(Livro).filter(Livro.id == livro_id).first()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    if livro.status == "emprestado":
        raise HTTPException(status_code=400, detail="Livro já está emprestado")
    livro.status = "emprestado"
    livro.data_emprestimo = datetime.now().isoformat()
    db.commit()
    db.refresh(livro)
    return livro.to_dict()

@app.post("/livros/{livro_id}/devolver")
def devolver_livro(livro_id: int):
    db = next(get_db())
    livro = db.query(Livro).filter(Livro.id == livro_id).first()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    if livro.status == "disponivel":
        raise HTTPException(status_code=400, detail="Livro já está disponível")
    livro.status = "disponivel"
    livro.data_emprestimo = None
    db.commit()
    db.refresh(livro)
    return livro.to_dict()

@app.get("/export/csv")
def exportar_csv(
    busca: Optional[str] = Query(None),
    genero: Optional[str] = Query(None),
    ano: Optional[int] = Query(None),
    status: Optional[str] = Query(None)
):
    db = next(get_db())
    query = db.query(Livro)
    
    if busca:
        query = query.filter(
            (Livro.titulo.ilike(f"%{busca}%")) | 
            (Livro.autor.ilike(f"%{busca}%"))
        )
    if genero:
        query = query.filter(Livro.genero == genero)
    if ano:
        query = query.filter(Livro.ano == ano)
    if status:
        query = query.filter(Livro.status == status)
        
    livros = query.all()
    
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["ID", "Título", "Autor", "Ano", "Gênero", "Status"])
    
    for livro in livros:
        writer.writerow([
            livro.id,
            livro.titulo,
            livro.autor,
            livro.ano,
            livro.genero,
            livro.status
        ])
    
    response = StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment;filename=livros.csv"}
    )
    return response

@app.get("/export/json")
def exportar_json(
    busca: Optional[str] = Query(None),
    genero: Optional[str] = Query(None),
    ano: Optional[int] = Query(None),
    status: Optional[str] = Query(None)
):
    db = next(get_db())
    query = db.query(Livro)
    
    if busca:
        query = query.filter(
            (Livro.titulo.ilike(f"%{busca}%")) | 
            (Livro.autor.ilike(f"%{busca}%"))
        )
    if genero:
        query = query.filter(Livro.genero == genero)
    if ano:
        query = query.filter(Livro.ano == ano)
    if status:
        query = query.filter(Livro.status == status)
        
    livros = query.all()
    dados = [livro.to_dict() for livro in livros]
    
    return JSONResponse(
        content=dados,
        headers={"Content-Disposition": "attachment;filename=livros.json"}
    )
