const apiURL = "https://hacker-news.firebaseio.com/v0/";
const commentsContainer = document.getElementById("comments-container");

async function getItem(id) {
  const response = await fetch(`${apiURL}item/${id}.json`);
  const data = await response.json();
  return data;
}

async function displayComments(itemId) {
  const item = await getItem(itemId);

  if (item.kids && item.kids.length > 0) {
    for (const commentId of item.kids) {
      const comment = await getItem(commentId);

      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const author = document.createElement("p");
      author.textContent = `Author: ${comment.by}`;

      const text = document.createElement("p");
      text.innerHTML = comment.text;

      commentElement.appendChild(author);
      commentElement.appendChild(text);

      commentsContainer.appendChild(commentElement);
    }
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const postId = getParameterByName("id");
if (postId) {
  displayComments(postId);
}
