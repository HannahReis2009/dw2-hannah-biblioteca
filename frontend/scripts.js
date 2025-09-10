'use strict';

/**
 * Função para carregar os livros do servidor e exibi-los na interface
 */
async function carregarLivros() {
    try {
        // Busca os livros da API
        const response = await fetch('http://localhost:8000/livros');
        const livros = await response.json();
        
        // Obtém o container onde os cards serão inseridos
        const container = document.getElementById('livros');
        container.innerHTML = '';
        
        // Cria um card para cada livro
        livros.forEach(livro => {
            const card = document.createElement('div');
            card.className = 'card';
            card.tabIndex = 0;
            card.setAttribute('aria-label', `Mangá: Boku no Hero Academia Vol. ${livro.id}`);
            
            // Define o conteúdo do card
            card.innerHTML = `
                <img src="./img/boku${livro.id}.jpg" 
                     alt="Capa do mangá Boku no Hero Academia Vol. ${livro.id}" 
                     class="capa" 
                     style="width:auto;max-width:100%;height:auto;max-height:400px;display:block;margin:0 auto;" />
                <h2>Boku no Hero Academia Vol. ${livro.id}</h2>
                <p>Kōhei Horikoshi</p>
                <span class="ano">${livro.id <= 2 ? '2014' : '2015'}</span>
                <span class="status">Disponível</span>
                <div class="acoes">
                    <button class="btn-acento">Empréstimo</button>
                </div>
            `;
            
            // Adiciona o card ao container
            container.appendChild(card);
        });
    } catch (error) {
        // Em caso de erro, mostra uma mensagem amigável
        console.error('Erro ao carregar livros:', error);
        const container = document.getElementById('livros');
        container.innerHTML = '<p>Erro ao carregar livros. Por favor, tente novamente mais tarde.</p>';
    }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    carregarLivros();
});
});

// Carregamento inicial
document.addEventListener('DOMContentLoaded', () => {
    carregarLivros();
    configurarEventos();
});

// Configuração de eventos
function configurarEventos() {
    // Busca
    const buscaInput = document.getElementById('busca-input');
    let timeoutBusca;
    buscaInput.addEventListener('input', (e) => {
        clearTimeout(timeoutBusca);
        timeoutBusca = setTimeout(() => carregarLivros(), 500);
    });

    // Formulário de filtros
    document.getElementById('filtros-form').addEventListener('submit', (e) => {
        e.preventDefault();
        carregarLivros();
    });

    // Formulário de novo livro
    document.getElementById('form-novo-livro').addEventListener('submit', (e) => {
        e.preventDefault();
        salvarLivro();
    });

    // Botões de modal
    document.getElementById('novo-livro-btn').addEventListener('click', () => {
        document.getElementById('modal-novo-livro').removeAttribute('hidden');
    });

    document.getElementById('fechar-modal-novo').addEventListener('click', () => {
        document.getElementById('modal-novo-livro').setAttribute('hidden', '');
    });
}

// Funções de API
async function carregarLivros() {
    const busca = document.getElementById('busca-input').value;
    const genero = document.getElementById('genero').value;
    const ano = document.getElementById('ano').value;
    const status = document.getElementById('status').value;

    const params = new URLSearchParams();
    if (busca) params.append('busca', busca);
    if (genero) params.append('genero', genero);
    if (ano) params.append('ano', ano);
    if (status) params.append('status', status);

    try {
        const response = await fetch(`${API_URL}/livros?${params}`);
        const livros = await response.json();
        
        const container = document.getElementById('livros');
        container.innerHTML = livros.map(livro => criarCardLivro(livro)).join('');
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
        alert('Erro ao carregar livros. Tente novamente.');
    }
}

async function salvarLivro(id = null) {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const ano = document.getElementById('ano-livro').value;
    const genero = document.getElementById('genero-livro').value;

    const livro = { titulo, autor, ano: parseInt(ano), genero };
    
    try {
        const url = id ? `${API_URL}/livros/${id}` : `${API_URL}/livros`;
        const method = id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(livro)
        });

        if (!response.ok) throw new Error('Erro ao salvar livro');

        document.getElementById('modal-novo-livro').setAttribute('hidden', '');
        document.getElementById('form-novo-livro').reset();
        carregarLivros();
    } catch (error) {
        console.error('Erro ao salvar livro:', error);
        alert('Erro ao salvar livro. Tente novamente.');
    }
}

async function deletarLivro(id) {
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;

    try {
        const response = await fetch(`${API_URL}/livros/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error('Erro ao deletar livro');
        carregarLivros();
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
        alert('Erro ao deletar livro. Tente novamente.');
    }
}

async function emprestarLivro(id) {
    try {
        const response = await fetch(`${API_URL}/livros/${id}/emprestimo`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'emprestado' })
        });

        if (!response.ok) throw new Error('Erro ao emprestar livro');
        carregarLivros();
    } catch (error) {
        console.error('Erro ao emprestar livro:', error);
        alert('Erro ao emprestar livro. Tente novamente.');
    }
}

async function devolverLivro(id) {
    try {
        const response = await fetch(`${API_URL}/livros/${id}/emprestimo`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'disponivel' })
        });

        if (!response.ok) throw new Error('Erro ao devolver livro');
        carregarLivros();
    } catch (error) {
        console.error('Erro ao devolver livro:', error);
        alert('Erro ao devolver livro. Tente novamente.');
    }
}

async function editarLivro(id) {
    try {
        const response = await fetch(`${API_URL}/livros/${id}`);
        const livro = await response.json();

        document.getElementById('titulo').value = livro.titulo;
        document.getElementById('autor').value = livro.autor;
        document.getElementById('ano-livro').value = livro.ano || '';
        document.getElementById('genero-livro').value = livro.genero || '';

        const form = document.getElementById('form-novo-livro');
        form.onsubmit = (e) => {
            e.preventDefault();
            salvarLivro(id);
        };

        document.getElementById('modal-novo-livro').removeAttribute('hidden');
    } catch (error) {
        console.error('Erro ao carregar livro para edição:', error);
        alert('Erro ao carregar livro para edição. Tente novamente.');
    }
}

// Funções de exportação
function exportarCSV() {
    const busca = document.getElementById('busca-input').value;
    const genero = document.getElementById('genero').value;
    const ano = document.getElementById('ano').value;
    const status = document.getElementById('status').value;

    const params = new URLSearchParams();
    if (busca) params.append('busca', busca);
    if (genero) params.append('genero', genero);
    if (ano) params.append('ano', ano);
    if (status) params.append('status', status);

    window.location.href = `${API_URL}/export/csv?${params}`;
}

function exportarJSON() {
    const busca = document.getElementById('busca-input').value;
    const genero = document.getElementById('genero').value;
    const ano = document.getElementById('ano').value;
    const status = document.getElementById('status').value;

    const params = new URLSearchParams();
    if (busca) params.append('busca', busca);
    if (genero) params.append('genero', genero);
    if (ano) params.append('ano', ano);
    if (status) params.append('status', status);

    window.location.href = `${API_URL}/export/json?${params}`;
}
});
