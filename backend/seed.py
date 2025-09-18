from database import SessionLocal
from models import Livro

def seed():
    db = SessionLocal()
    livros = [
        Livro(
            titulo='Boku no Hero Academia Vol. 1',
            autor='Kōhei Horikoshi',
            ano=2014,
            genero='Mangá',
            isbn='9788577878578',
            sinopse='O primeiro volume de Boku no Hero conta a história de Izuku Midoriya, um garoto que nasceu sem poderes em um mundo onde quase todos possuem "Quirks" (superpoderes). Inspirado pelo herói número um, All Might, Izuku sonha em se tornar um herói, mas sua falta de poder o impede. Um encontro inesperado com All Might, que está em busca de um sucessor, lhe dá uma oportunidade de mudar seu destino, apesar da frustração e bullying que sofre.\n\nO Mundo: Um universo onde a maioria da população possui Individualidades, ou poderes sobre-humanos, e a profissão de herói é comum.\nIzuku Midoriya: Um garoto gentil e sem poderes, conhecido como "Deku" pelos colegas, que sofre bullying na escola por isso.\nSeu Sonho: Mesmo desprovido de um Quirk, Izuku anseia por ser um herói, assim como seu ídolo, o sorridente e confiante All Might.\nO Encontro: Izuku tem um encontro fatídico com All Might, o maior herói de todos, que o vê como um potencial herdeiro de seu poder e do símbolo da paz.\nO Começo de Tudo: A história acompanha Izuku após esse encontro, sua jornada para dominar a individualidade que lhe foi concedida e sua entrada na prestigiosa Academia U.A. para heróis em formação.',
            status='disponivel'
        ),
        Livro(
            titulo='Boku no Hero Academia Vol. 2',
            autor='Kōhei Horikoshi',
            ano=2014,
            genero='Mangá',
            isbn='9788577878585',
            sinopse='Midoriya começa seu treinamento na U.A. e enfrenta seus colegas em batalhas de simulação. Ele precisa provar seu valor e aprender a trabalhar em equipe, enquanto descobre mais sobre seus poderes e sobre o mundo dos heróis.',
            status='disponivel'
        ),
        Livro(
            titulo='Boku no Hero Academia Vol. 3',
            autor='Kōhei Horikoshi',
            ano=2015,
            genero='Mangá',
            isbn='9788577878592',
            sinopse='A turma da U.A. enfrenta um ataque surpresa de vilões no USJ, colocando todos em perigo. Midoriya e seus amigos precisam se unir para sobreviver e proteger uns aos outros, mostrando o verdadeiro significado de ser um herói.',
            status='emprestado'
        ),
        Livro(
            titulo='Boku no Hero Academia Vol. 4',
            autor='Kōhei Horikoshi',
            ano=2015,
            genero='Mangá',
            isbn='9788577878608',
            sinopse='O festival esportivo da U.A. começa, e Midoriya precisa superar seus limites para se destacar entre os melhores alunos. Novos rivais surgem e a competição esquenta, trazendo desafios emocionantes.',
            status='disponivel'
        ),
        Livro(
            titulo='Boku no Hero Academia Vol. 5',
            autor='Kōhei Horikoshi',
            ano=2015,
            genero='Mangá',
            isbn='9788577878615',
            sinopse='A competição do festival esportivo continua, e Midoriya enfrenta grandes desafios para provar seu valor como herói. Novas amizades e rivalidades são formadas, e o mundo dos heróis se torna ainda mais intenso.',
            status='disponivel'
        ),
        # ...existing code...
    ]
    db.add_all(livros)
    db.commit()
    db.close()

if __name__ == "__main__":
    seed()
