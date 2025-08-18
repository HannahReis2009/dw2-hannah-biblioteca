// Configuração da API
const API_URL = 'http://localhost:8000';

// Função para carregar o conteúdo da página
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar event listeners para os links do menu
    document.getElementById('livros-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadBooks();
    });

    document.getElementById('usuarios-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadUsers();
    });

    document.getElementById('emprestimos-link').addEventListener('click', (e) => {
        e.preventDefault();
        loadLoans();
    });

    // Carregar livros por padrão
    loadBooks();
});

// Funções para carregar conteúdo
async function loadBooks() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Carregando livros...</h2>';
    
    try {
        const response = await fetch(`${API_URL}/books`);
        const books = await response.json();
        displayBooks(books);
    } catch (error) {
        content.innerHTML = '<p>Erro ao carregar livros.</p>';
    }
}

async function loadUsers() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Carregando usuários...</h2>';
    
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        content.innerHTML = '<p>Erro ao carregar usuários.</p>';
    }
}

async function loadLoans() {
    const content = document.getElementById('content');
    content.innerHTML = '<h2>Carregando empréstimos...</h2>';
    
    try {
        const response = await fetch(`${API_URL}/loans`);
        const loans = await response.json();
        displayLoans(loans);
    } catch (error) {
        content.innerHTML = '<p>Erro ao carregar empréstimos.</p>';
    }
}

// Funções para exibir conteúdo
function displayBooks(books) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Livros</h2>
        <button onclick="showAddBookForm()">Adicionar Livro</button>
        <div class="books-grid">
            ${books.map(book => `
                <div class="book-card">
                    <h3>${book.title}</h3>
                    <p>Autor: ${book.author}</p>
                    <p>ISBN: ${book.isbn}</p>
                    <button onclick="editBook(${book.id})">Editar</button>
                    <button onclick="deleteBook(${book.id})">Excluir</button>
                </div>
            `).join('')}
        </div>
    `;
}

function displayUsers(users) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Usuários</h2>
        <button onclick="showAddUserForm()">Adicionar Usuário</button>
        <div class="users-list">
            ${users.map(user => `
                <div class="user-card">
                    <h3>${user.name}</h3>
                    <p>Email: ${user.email}</p>
                    <button onclick="editUser(${user.id})">Editar</button>
                    <button onclick="deleteUser(${user.id})">Excluir</button>
                </div>
            `).join('')}
        </div>
    `;
}

function displayLoans(loans) {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Empréstimos</h2>
        <button onclick="showAddLoanForm()">Novo Empréstimo</button>
        <div class="loans-list">
            ${loans.map(loan => `
                <div class="loan-card">
                    <h3>Empréstimo #${loan.id}</h3>
                    <p>Livro: ${loan.book_title}</p>
                    <p>Usuário: ${loan.user_name}</p>
                    <p>Data: ${new Date(loan.loan_date).toLocaleDateString()}</p>
                    <button onclick="returnBook(${loan.id})">Devolver</button>
                </div>
            `).join('')}
        </div>
    `;
}
