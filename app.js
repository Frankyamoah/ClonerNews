  const apiURL = "https://hacker-news.firebaseio.com/v0/";
  const liveDataContainer = document.getElementById("live-data-container");
  const storyContainer = document.getElementById("stories-container");
  const jobContainer = document.getElementById("jobs-container");
  const pollContainer = document.getElementById("polls-container")

  const loadMoreStoryBtn = document.getElementById("load-stories");
  const loadMoreJobBtn = document.getElementById("load-jobs");
  const loadMorePollBtn = document.getElementById("load-polls");

  let max = 10 // maximum number of posts on page


  // Function to fetch item data by ID
  async function getItem(id) {
      const response = await fetch(`${apiURL}item/${id}.json`);
      const data = await response.json();
      return data;
  }

  /* Function to fetch updates and display them in the live data container ensuring to clear 
  live container before fetching new items*/
  async function getAndDisplayUpdates() {
      // Clear the live data container
      liveDataContainer.innerHTML = '';
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

  // Go get updated items intitally 
  getAndDisplayUpdates()

  // Set an interval to fetch and display updates every 5 seconds
  setInterval(getAndDisplayUpdates, 5000);

  // Function to display items in html document
  async function postDisplay(post, container){
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
    const sec = Math.floor((post.time / 1000))
    const mins = Math.floor((post.time / 1000 / 60 ))
    const hours = Math.floor((post.time / 1000 / 60 / 60))
    const days = Math.floor((post.time / 1000 / 60 / 60 / 24))
    if (sec < 60){
      time.textContent = `This was posted ${sec} seconds ago`
    }
    if (sec > 60 && mins < 60){
    time.textContent = `This was posted ${mins} minutes ago`
    }
    if (mins > 60 && hours < 24){
      time.textContent = `This was posted ${hours} hours ago`
    }
    if (hours > 24 && days >= 1){
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
  async function getAndDisplayPosts(maxItems, postType){
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
    posts.sort((a, b) => a.time - b.time);
      // Display the sorted posts
    displayOrderedPosts(posts, postType);
  }

  // function to display ordered posts which is done in the function after this
  function displayOrderedPosts(posts, postType) {
    for (const post of posts) {
      if (postType === 'top' || postType === "best" || postType === "new") {
        postDisplay(post, storyContainer);
      }
      if (postType === 'job') {
        postDisplay(post, jobContainer);
      }
      if (postType === 'ask' || postType === 'show' ) {
        postDisplay(post, pollContainer);
      }
    }
  }

  //display relevant posts by calling getAndDisplay function
  getAndDisplayPosts(max,  'new');
  getAndDisplayPosts(max,  'job');
  getAndDisplayPosts(max,  'ask');

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

  