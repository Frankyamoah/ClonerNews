const storiesContainer = document.querySelector("#stories-container");

fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < 10; i++) {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json`)
        .then(response => response.json())
        .then(storyData => {
          const story = document.createElement("div");
          story.classList.add("story");

          const title = document.createElement("a");
          title.href = storyData.url;
          title.textContent = storyData.title;
          title.classList.add("story-title");

          const author = document.createElement("span");
          author.textContent = " by " + storyData.by;
          author.classList.add("story-author");

          story.appendChild(title);
          story.appendChild(author);
          storiesContainer.appendChild(story);
        })
    }
  });

  fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then(response => response.json())
  .then(data => {
    const jobs = data.slice(0, 10);
    jobs.forEach(jobId => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${jobId}.json`)
        .then(response => response.json())
        .then(job => {
          const jobContainer = document.getElementById('jobs-container');
          const jobLink = document.createElement('a');
          jobLink.href = job.url;
          jobLink.textContent = job.title;
          jobContainer.appendChild(jobLink);
        })
    })
  })

  fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  .then(response => response.json())
  .then(data => {
    const polls = data.slice(0, 10);
    polls.forEach(pollId => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${pollId}.json`)
        .then(response => response.json())
        .then(poll => {
          const pollContainer = document.getElementById('polls-container');
          const pollLink = document.createElement('a');
          pollLink.href = `https://news.ycombinator.com/item?id=${poll.id}`;
          pollLink.textContent = poll.title;
          pollContainer.appendChild(pollLink);
        })
    })
  })

  fetch('https://hacker-news.firebaseio.com/v0/comments.json')
  .then(response => response.json())
  .then(data => {
    const comments = data.slice(0, 10);
    comments.forEach(commentId => {
      fetch(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`)
        .then(response => response.json())
        .then(comment => {
          const postParentId = comment.parent;
          fetch(`https://hacker-news.firebaseio.com/v0/item/${postParentId}.json`)
            .then(response => response.json())
            .then(post => {
              const commentContainer = document.getElementById('comments-container');
              const commentLink = document.createElement('a');
              commentLink.href = `https://news.ycombinator.com/item?id=${post.id}`;
              commentLink.textContent = comment.text;
              commentContainer.appendChild(commentLink);
            })
        })
    })
  })


