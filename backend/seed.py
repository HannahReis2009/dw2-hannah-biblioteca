from database import SessionLocal
from models import Livro

def seed():
    db = SessionLocal()
    livros = [
        Livro(titulo='Dom Casmurro', autor='Machado de Assis'),
        Livro(titulo='O Cortiço', autor='Aluísio Azevedo'),
        Livro(titulo='Memórias Póstumas de Brás Cubas', autor='Machado de Assis'),
        Livro(titulo='A Moreninha', autor='Joaquim Manuel de Macedo'),
        Livro(titulo='Senhora', autor='José de Alencar'),
        Livro(titulo='Iracema', autor='José de Alencar'),
        Livro(titulo='O Guarani', autor='José de Alencar'),
        Livro(titulo='Capitães da Areia', autor='Jorge Amado'),
        Livro(titulo='Vidas Secas', autor='Graciliano Ramos'),
        Livro(titulo='Grande Sertão: Veredas', autor='João Guimarães Rosa'),
        Livro(titulo='O Primo Basílio', autor='Eça de Queirós'),
        Livro(titulo='A Hora da Estrela', autor='Clarice Lispector'),
        Livro(titulo='O Ateneu', autor='Raul Pompeia'),
        Livro(titulo='O Mulato', autor='Aluísio Azevedo'),
        Livro(titulo='Lucíola', autor='José de Alencar'),
        Livro(titulo='O Seminarista', autor='Bernardo Guimarães'),
        Livro(titulo='A Escrava Isaura', autor='Bernardo Guimarães'),
        Livro(titulo='Triste Fim de Policarpo Quaresma', autor='Lima Barreto'),
        Livro(titulo='O Alienista', autor='Machado de Assis'),
        Livro(titulo='Sagarana', autor='João Guimarães Rosa'),
    ]
    db.add_all(livros)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed()
