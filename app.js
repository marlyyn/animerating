let selectedAnime = null;
let ratings = JSON.parse(localStorage.getItem("ratings") || "[]");

async function searchAnime() {
  const query = document.getElementById("search").value;
  const results = await fetchAnime(query);

  const container = document.getElementById("results");
  container.innerHTML = "";

  results.forEach(anime => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${anime.coverImage.large}">
      <p>${anime.title.romaji}</p>
    `;

    div.onclick = () => openRating(anime);

    container.appendChild(div);
  });
}

function openRating(anime) {
  selectedAnime = anime;
  document.getElementById("anime-title").innerText = anime.title.romaji;
  document.getElementById("rating-panel").classList.remove("hidden");
}

function saveRating() {
  const plot = +document.getElementById("plot").value;
  const art = +document.getElementById("art").value;
  const char = +document.getElementById("char").value;
  const vibe = +document.getElementById("vibe").value;

  const final = (plot + art + char + vibe * 1.3) / 4;

  ratings.push({
    title: selectedAnime.title.romaji,
    score: final
  });

  localStorage.setItem("ratings", JSON.stringify(ratings));
  renderTop();
}

function renderTop() {
  const top = document.getElementById("top");
  top.innerHTML = "";

  ratings
    .sort((a,b) => b.score - a.score)
    .slice(0, 10)
    .forEach(a => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `${a.title} - ⭐ ${a.score.toFixed(1)}`;
      top.appendChild(div);
    });
}

renderTop();