from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Livro(Base):
    __tablename__ = 'livros'
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    autor = Column(String, nullable=False)
    ano = Column(Integer, nullable=True)
    genero = Column(String, nullable=True)
    isbn = Column(String, nullable=True)
    status = Column(String, nullable=False, default='disponivel')
    data_emprestimo = Column(String, nullable=True)
