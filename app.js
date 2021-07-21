const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

search.addEventListener("input", () => searchStates(search.value));

const searchStates = async (searchValue) => {
  const res = await fetch("./data.json");
  const states = await res.json();

  //get all the matches for current input text
  let matches = states.filter((s) => {
    const regex = new RegExp(`^${searchValue}`, "gi"); //gi -> global case insensitive
    return s.name.match(regex) || s.state.match(regex);
  });

  if (searchValue.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  showResults(matches);
};

//Display results in HTML
const showResults = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <div class="card card-body mb-1">
        <h4>${match.name}, <span class="text-primary">${match.state}</span></h4>
        </div>
        `
      )
      .join("");

    matchList.innerHTML = html;
  }
};
