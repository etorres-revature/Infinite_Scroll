//global variables to grab html elements

const postContainerEl = document.querySelector("#post-container");
const loadingEl = document.querySelector(".loader");
const filterEl = document.querySelector("#filter");

let limit = 3;
let page = 1;


//fetch posts from API
async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await res.json();

    return data;
}

//shohw posts in DOM
async function showPosts() {
    const posts = await getPosts();
    // console.log(posts);

    posts.forEach(post => {
        const postEl = document.createElement("div");
        postEl. classList.add("post");
        postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
        </div>
        `

        postContainerEl.appendChild(postEl);
    });

}

//show initial posts
showPosts();
