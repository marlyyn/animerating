async function searchAnime() {
  const query = document.getElementById("searchInput").value;

  const res = await fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=6`);
  const data = await res.json();

  const results = document.getElementById("results");
  results.innerHTML = "";

  data.data.forEach(anime => {
    results.innerHTML += `
      <div class="card">
        <img src="${anime.images.jpg.image_url}">
        <h3>${anime.title}</h3>
        <p>⭐ ${anime.score || "N/A"}</p>
        <p>📅 ${anime.year || "?"}</p>
      </div>
    `;
  });
}