//global variables to grab html elements

const postContainerEl = document.querySelector("#post-container");
const loadingEl = document.querySelector(".loader");
const filterEl = document.querySelector("#filter");

let limit = 5;
let page = 1;

//fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

//shohw posts in DOM
async function showPosts() {
  const posts = await getPosts();
  // console.log(posts);

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `;

    postContainerEl.appendChild(postEl);
  });
}

//show loader and fetch more posts
function showLoading() {
  loadingEl.classList.add("show");

  setTimeout(() => {
    loadingEl.classList.remove("show");
  }, 1500);

  setTimeout(() => {
    page++;
    showPosts();
  }, 2000);
}

//filter posts by user-input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

//show initial posts
showPosts();

//event listener on window
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

filterEl.addEventListener("input", filterPosts);
