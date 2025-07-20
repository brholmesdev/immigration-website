document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = 'pub_59a3debcfaac4eab824ab75ac72a4fda';
    const newsContainer = document.querySelector('.news-tiles');

    fetch(`https://newsdata.io/api/1/news?apikey=${API_KEY}&q=immigration&country=us&language=en`)
        .then(response => response.json())
        .then(data => {
            newsContainer.innerHTML = ''; // Clear existing static tiles

            data.results.slice(0, 6).forEach(article => {
                const tile = document.createElement('a');
                tile.href = article.link;
                tile.target = '_blank';
                tile.classList.add('news-tile');

                tile.innerHTML = `
          <img src="${article.image_url || 'images/placeholder.jpg'}" alt="News Thumbnail" />
          <span>${article.title}</span>
        `;

                newsContainer.appendChild(tile);
            });
        })
        .catch(error => {
            console.error('News loading failed:', error);
            newsContainer.innerHTML = '<p>Unable to load news articles right now.</p>';
        });
});
