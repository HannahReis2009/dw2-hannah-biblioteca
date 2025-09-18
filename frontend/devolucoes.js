// Lista apenas os livros emprestados
fetch('http://localhost:8000/livros?status=emprestado')
  .then(res => res.json())
  .then(livros => {
    const container = document.getElementById('livros-devolucao');
    container.innerHTML = '';
    livros.forEach(livro => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${livro.titulo}</h2>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano || '-'}</p>
        <p><strong>Disponibilidade:</strong> Emprestado</p>
        <p><strong>Sinopse:</strong> ${livro.sinopse || 'Sinopse não cadastrada.'}</p>
        <button class="btn-acento devolver-btn">Devolver</button>
      `;
      card.querySelector('.devolver-btn').onclick = function() {
        window.location.href = 'index.html'; // Ou pode chamar a API de devolução
      };
      container.appendChild(card);
    });
  });
