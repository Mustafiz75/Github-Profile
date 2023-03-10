const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("Mustafiz75");

async function getUser(userName) {
  const res = await fetch(APIURL + userName);
  const resData = await res.json();

  createUserCard(resData);
  getRepos(userName);
}

async function getRepos(userName) {
  const res = await fetch(APIURL + userName + "/repos");
  const resData = await res.json();

  addReposToCard(resData);
}

function createUserCard(user) {
  const cardHTML = `
  <div class="card">
    <div>
       <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
    </div>
         <div class="user-info">
                 <h1>${user.name}</h1>
                 <p>${user.id}</h1>
              <ul >
                   <li>${user.followers} <strong>Followers</strong></li>
                   <li>${user.following} <strong>Following</strong></li>
                   <li>${user.public_repos} <strong>Repos</strong></li>
             </ul>
             <div  id="repos"></div>
        </div>
  </div>

  `;
  main.innerHTML = cardHTML;
}
function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");
  repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoEl = document.createElement("a");
      repoEl.classList.add("repo");
      repoEl.href = repo.html_url;
      repoEl.target = "_blank";
      repoEl.innerText = repo.name;

      reposEl.appendChild(repoEl);
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});
