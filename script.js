//You can edit ALL of the code here
const rootTag = document.querySelector("#root");
function gettingData() {
  const allEpisodes = getAllEpisodes();
  if (allEpisodes.length > 0) {
    return render(allEpisodes);
  } else {
    return alert("Error from the server!");
  }
}
const createTitle = (name, season, num) => {
  return `S${String(season).padStart(2, 0)}E${String(num).padStart(
    2,
    0
  )} - ${name}`;
};

function renderEpisode(allEpisodesShows, articleTag) {
  articleTag.innerHTML = "";

  allEpisodesShows.forEach((item) => {
    const episode = document.createElement("div");
    const heading = document.createElement("h3");
    const image = document.createElement("img"); //<img>

    const summary = document.createElement("p");

    heading.innerText = createTitle(item.name, item.season, item.number);
    summary.innerHTML = item.summary;
    image.src = item.image.medium;
    episode.className = "episode";
    episode.append(image, heading, summary);

    articleTag.appendChild(episode);
  });
}

//========================================Rendering the webPage===========
const render = (allEpisodesShows) => {
  console.log(allEpisodesShows);

  //================================Header=====================
  const headerTag = document.createElement("header");
  headerTag.className = "header";
  rootTag.appendChild(headerTag);

  //========================================Main=====================
  const mainTag = document.createElement("main");
  mainTag.className = "main";
  mainTag.innerHTML = `<h1>Found ${allEpisodesShows.length} Episode(s)</h1>`;
  rootTag.appendChild(mainTag);

  //============================searchBar=============================

  const searchBar = document.createElement("input");
  searchBar.type = "text";
  mainTag.appendChild(searchBar);
  console.log(searchBar);

  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    console.log(searchString);
    const filteredEpisodes = allEpisodesShows.filter((episode) => {
      return episode.name.toLowerCase().includes(searchString);
      //||
      //season.name.toLowerCase().includes(searchString)
    });

    //const filteredEpisode =
    console.log(filteredEpisodes);
    renderEpisode(filteredEpisodes, articleTag);
  });

  //================================Episodes Article=============

  const articleTag = document.createElement("article");
  articleTag.className = "episodes_article";
  renderEpisode(allEpisodesShows, articleTag);
  mainTag.appendChild(articleTag);

  //=========================================Footer===================
  const footerTag = document.createElement("footer");
  footerTag.className = "footer";
  rootTag.appendChild(footerTag);
};
window.onload = gettingData;
