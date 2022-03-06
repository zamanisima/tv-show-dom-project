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

  //=========================drop down search menu================

  const selectMenu = document.createElement("select-input");
  nav.appendChild(selectMenu);

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
  renderEpisode(allEpisodesShows, articleTag);
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
      image.src = item.image.medium;
      episode.className = "episode";
      episode.append(image, heading, summary);
      articleTag.appendChild(episode);

      if (filteredEpisodes.length > 1) {
        let newOption = new Option(
          createTitle(item.name, item.season, item.number)
        );
        selectMenu.add(newOption, undefined);
      }
    });
  }
  //=========================================Footer=======================
  const footerTag = document.createElement("footer");
  footerTag.className = "footer";
  rootTag.appendChild(footerTag);
};
window.onload = gettingData;

// fetch("https://api.tvmaze.com/shows/82/episodes")
// .then((response) =>{
//   return response .json();

// })
// .then((data)=>console.log(data))
//.catch((e)=> console.log(e));
