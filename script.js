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

const render = (allEpisodesShows) => {
  //=======================================Header=====================
  const headerTag = document.createElement("header");
  headerTag.className = "header";
  rootTag.appendChild(headerTag);

  //========================================Main=====================
  const mainTag = document.createElement("main");
  mainTag.className = "main";
  mainTag.innerHTML = `<h1>Found ${allEpisodesShows.length} Episode(s)</h1>`;
  rootTag.appendChild(mainTag);

  //=========================================Footer===================
  const footerTag = document.createElement("footer");
  footerTag.className = "footer";
  rootTag.appendChild(footerTag);
};
window.onload = gettingData;
