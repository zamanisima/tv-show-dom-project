//You can edit ALL of the code here
const rootTag = document.querySelector("#root");

function gettingData() {
  sendRequest(120).then((data) => {
    render(data);
  });
}
const createTitle = (name, season, num) => {
  return `S${String(season).padStart(2, 0)}E${String(num).padStart(
    2,
    0
  )} - ${name}`;
};

//======fetch req=====

function sendRequest(showId) {
  const urlForTheRequest = `https://api.tvmaze.com/shows/${showId}/episodes`;

  return fetch(urlForTheRequest)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((e) => console.log(e));
}

//========================================Rendering the webPage===========
const render = (allEpisodesShows) => {
  //================================Header================================
  const headerTag = document.createElement("header");
  const nav = document.createElement("nav");
  nav.className = "nav";
  headerTag.className = "header";
  headerTag.appendChild(nav);
  rootTag.appendChild(headerTag);

  //==================searchBar=================

  const searchBar = document.createElement("input");

  searchBar.className = "nav_search";
  searchBar.placeholder = "Search...";
  searchBar.type = "text";
  nav.appendChild(searchBar);

  searchBar.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredEpisodes = allEpisodesShows.filter((episode) => {
      return episode.name.toLowerCase().includes(searchString);
    });
    renderEpisode(filteredEpisodes);
  });

  //=====Creating Episodes select Tag================

  const selectMenu = document.createElement("select");
  nav.appendChild(selectMenu);
  const createSelectEpisodesTag = (tvShow) => {
    const defaultOptionTag = document.createElement("option");
    defaultOptionTag.innerText = "Not Selected";
    defaultOptionTag.value = "none";
    selectMenu.appendChild(defaultOptionTag);
    tvShow.forEach((item) => {
      const newOptionTag = document.createElement("option");
      newOptionTag.innerText = createTitle(item.name, item.season, item.number);
      newOptionTag.value = item.name;

      selectMenu.appendChild(newOptionTag);
    });
  };
  createSelectEpisodesTag(allEpisodesShows);
  selectMenu.addEventListener("change", () => {
    const filteredArray = allEpisodesShows.filter((item) => {
      return item.name === selectMenu.value;
    });
    renderEpisode(filteredArray);
  });

  //========================================Main===========================
  const mainTag = document.createElement("main");
  mainTag.className = "main";
  const headerCounter = document.createElement("h1");
  headerCounter.className = "counter";
  headerCounter.innerText = `Found ${allEpisodesShows.length}/${allEpisodesShows.length} Episode(s)`;
  mainTag.appendChild(headerCounter);
  rootTag.appendChild(mainTag);

  //=============Episodes Article===========

  const articleTag = document.createElement("article");
  articleTag.className = "episodes_article";
  renderEpisode(allEpisodesShows);
  mainTag.appendChild(articleTag);
  //=============================Rendering episodes===============
  function renderEpisode(filteredEpisodes) {
    articleTag.innerHTML = "";
    headerCounter.innerText = `Found ${filteredEpisodes.length}/${allEpisodesShows.length} Episode(s)`;
    filteredEpisodes.forEach((item) => {
      const episode = document.createElement("div");
      const heading = document.createElement("h3");
      const image = document.createElement("img");

      const summary = document.createElement("p");

      heading.innerText = createTitle(item.name, item.season, item.number);
      // <p></p>
      summary.innerHTML = item.summary;

      if (item.image) {
        image.src = item.image.medium;
      } else {
        image.src =
          "https://us.123rf.com/450wm/ilterriorm/ilterriorm2003/ilterriorm200300018/144389843-old-tv-cartoon-on-white.jpg?ver=6";
      }
      episode.className = "episode";
      episode.append(image, heading, summary);
      articleTag.appendChild(episode);
    });
  }
  //=========================================Footer=======================
  const footerTag = document.createElement("footer");
  footerTag.className = "footer";
  footerTag.innerHTML = `<h1>GitHub: <a href='https://github.com/zamanisima'></a></h1><h1>Made by Sima Zamani | 2022</h1><h3>Data is coming from <a href='https://tvmaze.com'>TV Maze</a></h5>`;
  rootTag.appendChild(footerTag);

  //==============fetch350==============
};
window.onload = gettingData;
