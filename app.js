const apiKey = API_KEY'; // Replace with a free news API key
  const baseUrl = `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&lang=en&country=in`;

    async function fetchNews() {
      try {
        const apiUrl = `${baseUrl}&apiKey=${apiKey}&timestamp=${new Date().getTime()}`;
        const response = await fetch(apiUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data); // Log the data to debug

        if (!data.articles || data.articles.length === 0) {
          throw new Error('No articles available.');
        }

        const shuffledArticles = shuffleArray(data.articles).slice(0, 4);
        shuffledArticles.forEach((article, index) => {
          const newsCard = document.getElementById(`news${index + 1}`);
          newsCard.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'Description not available.'}</p>
          `;
        });
      } catch (error) {
        console.error('Error fetching news:', error);
        alert(`Failed to fetch news: ${error.message}`);
      }
    }

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    document.getElementById('refreshNews').addEventListener('click', fetchNews);

    // Initial fetch on page load
    //fetchNews();
