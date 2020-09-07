//global variables to grab html elements
const postContainerEl = document.querySelector("#post-container");
const loadingEl = document.querySelector(".loader");
const filterEl = document.querySelector("#filter");

//setting limit variable
let limit = 5;
//setting page variable
let page = 1;

//fetch posts from API
async function getPosts() {
  const res = await fetch(
    //creating dynamic query URL with limit and page variable
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  //setting a variable to hold the data from the response
  const data = await res.json();

  //returning the data from the response in json format
  return data;
}

//shohw posts in DOM
async function showPosts() {
  const posts = await getPosts();
  // console.log(posts);

  //foreach function to display each post
  posts.forEach((post) => {
    //creating an html element dynamically
    const postEl = document.createElement("div");
    //adding the post class
    postEl.classList.add("post");
    //setting innerHTML of the variable holding the posts
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `;
    //appending that inner html to the posts continaer in the html
    postContainerEl.appendChild(postEl);
  });
}

//show loader and fetch more posts
function showLoading() {
  //giving the loader a class of show
  loadingEl.classList.add("show");

  //timeout for loader
  setTimeout(() => {
    loadingEl.classList.remove("show");
  }, 1500);

  //timeout to put the posts
  setTimeout(() => {
    page++;
    showPosts();
  }, 2000);
}

//filter posts by user-input
function filterPosts(e) {
  //putting the typed in value from the input into a variable
  const term = e.target.value.toUpperCase();
  //setting a variable for all the posts
  const posts = document.querySelectorAll(".post");

  //running a for each across all the post nodes
  posts.forEach((post) => {
    //setting a variable to hold post title and body
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    //looking for the typed in value in the title and body values
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      //displaying if the term matches title and body
      post.style.display = "flex";
    } else {
      //hiding if the term does not match the title and body
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
