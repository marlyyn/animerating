async function fetchAnime(query) {
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: `
        query ($search: String) {
          Page {
            media(search: $search, type: ANIME) {
              id
              title {
                romaji
              }
              coverImage {
                large
              }
            }
          }
        }
      `,
      variables: { search: query }
    })
  });

  const data = await res.json();
  return data.data.Page.media;
}
