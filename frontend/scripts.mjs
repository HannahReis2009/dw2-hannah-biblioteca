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
