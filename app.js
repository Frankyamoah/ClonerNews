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
