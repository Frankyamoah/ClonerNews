const apiURL = "https://hacker-news.firebaseio.com/v0/";
const liveDataContainer = document.getElementById("live-data-container");
const storyContainer = document.getElementById("stories-container");
const jobContainer = document.getElementById("jobs-container");
const pollContainer = document.getElementById("polls-container");

const loadMoreStoryBtn = document.getElementById("load-stories");
const loadMoreJobBtn = document.getElementById("load-jobs");
const loadMorePollBtn = document.getElementById("load-polls");

let max = 10; // maximum number of posts on page

// Function to fetch item data by ID
async function getItem(id) {
  const response = await fetch(`${apiURL}item/${id}.json`);
  const data = await response.json();
  return data;
}

// Adding throttle func
const throttleGetItem = throttle(getItem, 5000, 0);
throttleGetItem();

/* Function to fetch updates and display them in the live data container ensuring to clear 
live container before fetching new items*/
async function getAndDisplayUpdates() {
  // Clear the live data container
  liveDataContainer.innerHTML = "";
  const response = await fetch("https://hacker-news.firebaseio.com/v0/updates.json");
  const updates = await response.json();

  // If there are new items proceed to fetch and display them
  if (updates.items && updates.items.length > 0) {
    for (const itemId of updates.items) {
      const item = await getItem(itemId);
      if (item.title && item.by) {
        const updateElement = document.createElement("div");
        updateElement.textContent = `${item.title} has been updated by ${item.by}`;
        liveDataContainer.appendChild(updateElement);
      }
    }
  }
}
const throttleUpdtaes = throttle(getAndDisplayUpdates, 5000);
throttleUpdtaes()
// Go get updated items intitally 
getAndDisplayUpdates()

// Set an interval to fetch and display updates every 5 seconds
setInterval(getAndDisplayUpdates, 5000);

//const apiURL = "https://hacker-news.firebaseio.com/v0/";

// Function to display items in html document
async function postDisplay(post, container) {
  // dynamically create separate divs for each story
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const title = document.createElement("h3");
  const titleLink = document.createElement("a");
  titleLink.textContent = post.title;
  titleLink.href = post.url;
  title.appendChild(titleLink);

  const author = document.createElement("p");
  author.textContent = `Author: ${post.by}`;

  // Allows for time post was posted to be displayed
  const time = document.createElement('p')
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDiff = currentTime - post.time;
  const sec = Math.floor((timeDiff))
  const mins = Math.floor((timeDiff / 60))
  const hours = Math.floor((timeDiff / 60 / 60))
  const days = Math.floor((timeDiff / 60 / 60 / 24))
  if (sec < 60) {
    time.textContent = `This was posted ${sec} seconds ago`
  }
  if (sec > 60 && mins < 60) {
    time.textContent = `This was posted ${mins} minutes ago`
  }
  if (mins > 60 && hours < 24) {
    time.textContent = `This was posted ${hours} hours ago`
  }
  if (hours > 24 && days >= 1) {
    time.textContent = `This was posted ${days} days ago`
  }

  postElement.appendChild(title);
  postElement.appendChild(author);
  postElement.appendChild(time);

  /* This if statement is to ensure the comments link is only displayed 
  when post has comments attached */
  if (post.kids && post.kids.length > 0) {
    const comment = document.createElement("p");
    const commentLink = document.createElement('a');
    commentLink.textContent = 'comments';
    commentLink.href = `comments.html?id=${post.id}`; // Link to the comments page
    comment.appendChild(commentLink);

    postElement.appendChild(comment);
  }

  container.appendChild(postElement);
}

//Next a function to display posts in order from when it was posted
async function getAndDisplayPosts(maxItems, postType) {
  //use post type to locate array with relevant posts
  const response = await fetch(`${apiURL}${postType}stories.json`);
  //array of ids
  const ids = await response.json();
  // fetch the posts and place in posts array
  const posts = []
  for (let i = 0; i < maxItems; i++) {
    const post = await getItem(ids[i]);
    posts.push(post);
  }

  // utilise the time key in order to sort items from newest to oldest
  posts.sort((a, b) => b.time - a.time);
  // Display the sorted posts
  displayOrderedPosts(posts, postType);
}
const throttleDisplayPosts = throttle(getAndDisplayPosts, 5000);
throttleDisplayPosts()

// function to display ordered posts which is done in the function after this
function displayOrderedPosts(posts, postType) {
  for (const post of posts) {
    if (postType === 'top' || postType === "best" || postType === "new") {
      postDisplay(post, storyContainer);
    }
    if (postType === 'job') {
      postDisplay(post, jobContainer);
    }
    if (postType === 'ask' || postType === 'show') {
      postDisplay(post, pollContainer);
    }
  }
}

//display relevant posts by calling getAndDisplay function
getAndDisplayPosts(max, 'new');
getAndDisplayPosts(max, 'job');
getAndDisplayPosts(max, 'ask');

loadMoreJobBtn.addEventListener('click', () => {
  max += 10;
  getAndDisplayPosts(max, 'job');
});

loadMorePollBtn.addEventListener('click', () => {
  max += 10;
  getAndDisplayPosts(max, 'ask');
  getAndDisplayPosts(max, 'show');
});

loadMoreStoryBtn.addEventListener('click', () => {
  max += 10;
  getAndDisplayPosts(max, 'top');
  getAndDisplayPosts(max, 'best');
  getAndDisplayPosts(max, 'new');
});


// Throttle func

function throttle(func, ms) {
  let isThrottled = false;
  let savedArgs;
  let savedThis;
  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }
    func.apply(this, arguments);
    isThrottled = true;
    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }
  return wrapper;
}

//Live Updates
/*
// Get the element where you want to display the live data
const liveDataElement = document.getElementById("live-data");

// Function to update the live data
function updateLiveData() {
  // Code to fetch the latest data and update the element goes here
  // For example:
  fetch("https://example.com/api/live-data")
    .then(response => response.json())
    .then(data => {
      liveDataElement.innerHTML = `Newest information: ${data}`;
    })
    .catch(error => {
      console.error("Error fetching live data:", error);
    });
}

// Update the live data every 5 seconds
setInterval(updateLiveData, 5000);
*/
function updateLiveData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/get-latest-data', true);
  xhr.onload = function () {
    if (this.status == 200) {
      document.getElementById('live-data').innerHTML = this.responseText;
    }
  };
  xhr.send();
}
setInterval(updateLiveData, 5000); // call updateLiveData every 5 seconds


