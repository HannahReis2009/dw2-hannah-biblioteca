document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8000/livros')
        .then(res => res.json())
        .then(livros => {
            const container = document.getElementById('livros');
            container.innerHTML = '';
            livros.forEach(livro => {
                const card = document.createElement('div');
                card.className = 'card';
                card.tabIndex = 0;
                card.setAttribute('aria-label', `Livro: ${livro.titulo}`);
                card.innerHTML = `<h2>${livro.titulo}</h2><p>${livro.autor}</p>`;
                container.appendChild(card);
            });
        });
});
