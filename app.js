// // url of comments api
// var topCommentsUrl = "https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty";

// //url of ask api
// var topAskUrl = "https://hacker-news.firebaseio.com/v0/item/121003.json?print=pretty";

// //url of job api
// var topJob = "https://hacker-news.firebaseio.com/v0/item/192327.json?print=pretty";

// //url of poll api
// var topPoll = "https://hacker-news.firebaseio.com/v0/item/126809.json?print=pretty";

// //fetch data
// const fetchData = (url) => {
//     return new Promise((resolve, reject) => {
//         fetch(url)
//             .then((res) => res.json())
//             .then((data) => resolve(data))
//             .catch((err) => reject(err));
//     });
// };

// //show Data
// const showData = async () => {
//     var data = await fetchData(topCommentsUrl);
//     console.log(data)
//     data.map(async (d) => {
//         let newsData = await fetchData(`${topJob}${d}.json`);
//         console.log(newsData);
//     })
// };

// showData();

/*

Here are some steps you can follow to create a basic UI for the HackerNews API:

Choose the endpoints you want to use: The HackerNews API provides endpoints 
to get various data such as stories, comments, user profiles, and more.
Choose the endpoints that are relevant to your use case.

Use the fetch function to get the data: Use the fetch function or any library 
that suits you to retrieve data from the API. 
Once you retrieve the data, you can store it in state or variables to use it in your UI.

Design your UI: Design your UI using HTML and CSS. You can use a CSS framework 
such as Bootstrap or Tailwind to make your design process easier.

Display the data: Once you have retrieved the data and designed your UI, 
you can display the data on the screen. Use JavaScript to dynamically 
generate the HTML elements that display the data.

Implement pagination: The HackerNews API limits the number of results 
returned in a single request. To display more results, you need to implement pagination. 
You can do this by sending additional requests to the API with the appropriate parameters.

Add interactivity: To make your UI more engaging, you can add interactivity such as sorting, 
filtering, and searching. Use JavaScript to handle user input and update the displayed data accordingly.

Remember to always follow the guidelines and rules provided by the HackerNews API. 
You can find more information on the official documentation page: https://github.com/HackerNews/API.
 */
/*
// url of comments api
const topCommentsUrl = "https://hacker-news.firebaseio.com/v0/item/2921983.json?print=pretty";

// url of ask api
const topAskUrl = "https://hacker-news.firebaseio.com/v0/item/121003.json?print=pretty";

// url of job api
const topJobUrl = "https://hacker-news.firebaseio.com/v0/item/192327.json?print=pretty";

// url of poll api
const topPollUrl = "https://hacker-news.firebaseio.com/v0/item/126809.json?print=pretty";

// fetch data
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// show data
const showData = async () => {
    try {
        const data = await fetchData(topCommentsUrl);
        console.log(data);
        await Promise.all(
            data.kids.map(async (kid) => {
                const newsData = await fetchData(`${topJobUrl}${kid}.json`);
                console.log(newsData);
            })
        );
    } catch (error) {
        console.log(error);
    }
};

showData();

*/


// HackerNews
/*
//Debounce
const debounce = (fn, ms) => {
    let timeout;
    return function () {
        const fnCall = () => {
            fn.apply(this, arguments)
        }
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms)
    };
}

function onChange(e) {
    console.log(e.targget.value)
}
onChange = debounce(onChange, 500)
document.getElementById('seacrh').addEventListener('keyup', onChange);
*/

//Throttle

const storiesContainer = document.querySelector("#stories-container");
function fetchTopStories() {
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
                    });
            };
        });
};
const throttledFetchTopStories = throttle(fetchTopStories, 5000);
throttledFetchTopStories();

function fetchJobs() {
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
                    });
            });
        });
};

// function fetchPolls() {
//   fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
//   .then(response => response.json())
//   .then(data => {
//     const polls = data.slice(0, 10);
//     polls.forEach(pollId => {
//       fetch(`https://hacker-news.firebaseio.com/v0/item/${pollId}.json`)
//         .then(response => response.json())
//         .then(poll => {
//           const pollContainer = document.getElementById('polls-container');
//           const pollLink = document.createElement('a');
//           pollLink.href = `https://news.ycombinator.com/item?id=${poll.id}`;
//           pollLink.textContent = poll.title;
//           pollContainer.appendChild(pollLink);
//         });
//     });
//   });
// };

function fetchPollsThrottled() {
    const POLL_API_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/topstories.json';
    const POLL_ITEM_ENDPOINT = 'https://hacker-news.firebaseio.com/v0/item/';

    fetch(POLL_API_ENDPOINT)
        .then(response => response.json())
        .then(data => {
            const polls = data.slice(0, 10);
            polls.forEach(pollId => {
                fetch(`${POLL_ITEM_ENDPOINT}${pollId}.json`)
                    .then(response => response.json())
                    .then(poll => {
                        const pollContainer = document.getElementById('polls-container');
                        const pollLink = document.createElement('a');
                        pollLink.href = `https://news.ycombinator.com/item?id=${poll.id}`;
                        pollLink.textContent = poll.title;
                        pollContainer.appendChild(pollLink);
                    });
            });
        })
};

const fetchPollsThrottled = throttle(fetchPollsThrottled, 5000);
fetchPollsThrottled();

function fetchComments() {

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
                        });
                });
        });
    });
};

const fetchCommentsThrottled = throttle(fetchComments, 5000);
fetchCommentsThrottled();

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


