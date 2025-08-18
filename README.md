# Sistema de Biblioteca

Este é um sistema web completo para gerenciamento de biblioteca, desenvolvido como projeto individual.

## Tecnologias Utilizadas

### Front-end
- HTML5
- CSS3 (Flex/Grid)
- JavaScript (ES6+, sem framework)

### Back-end/API
- Python (FastAPI)
- SQLite via SQLAlchemy

### Ferramentas
- VS Code
- GitHub Copilot
- Git/GitHub
- Thunder Client/Insomnia

## Estrutura do Projeto

```
dw2-hannah-biblioteca/
├── app/
│   ├── main.py           # Aplicação FastAPI
│   └── database.py       # Configuração do banco de dados
├── static/
│   ├── css/
│   │   └── style.css    # Estilos da aplicação
│   ├── js/
│   │   └── main.js      # JavaScript do front-end
│   └── index.html       # Página principal
└── requirements.txt     # Dependências Python
```

## Como Executar

1. Clone o repositório
```bash
git clone https://github.com/HannahReis2009/dw2-hannah-biblioteca.git
cd dw2-hannah-biblioteca
```

2. Instale as dependências
```bash
pip install -r requirements.txt
```

3. Execute o servidor
```bash
uvicorn app.main:app --reload
```

4. Acesse a aplicação em `http://localhost:8000`

## Funcionalidades

- Gerenciamento de livros (CRUD)
- Gerenciamento de usuários (CRUD)
- Sistema de empréstimos
- Interface responsiva
- API RESTful