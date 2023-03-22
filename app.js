//Fetching URL

// api url
// const api_url =
// 	"https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty";

// fetch(api_url)
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error(error));


  fetch('https://hacker-news.firebaseio.com/v0/item/8863.json?print=pretty')
  .then(response => response.json())
  .then(data => {
    const dataList = document.getElementById('data-list');
    const li = document.createElement('li');
    li.textContent = data.title;
    dataList.appendChild(li);
  })
  .catch(error => console.error(error));

  







