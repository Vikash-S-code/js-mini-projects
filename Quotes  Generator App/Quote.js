let QuotesContent = document.getElementById("content");
let authorName = document.getElementById("Name");
let url1 = "https://api.quotable.io/random";

// QuotesContent.innerHTML =
//   "Never bend your head. Always hold it high. Look the world right in the eye.";
// authorName.innerHTML = "Helen Keller";

// const data1 = {
//   _id: "QtuKHLeFEBK5",
//   content:
//     "We come to love not by finding a perfect person, but by learning to see an imperfect person perfectly.",
//   author: "Sam Keen",
//   tags: ["Famous Quotes"],
//   authorSlug: "sam-keen",
//   length: 102,
//   dateAdded: "2019-12-02",
//   dateModified: "2023-04-14",
// };

// let m = data1.content;
// console.log(m);

async function getdata(url) {
  let response = await fetch(url1);
  var data = await response.json();
  QuotesContent.innerHTML = data.content;
  authorName.innerHTML = data.author;
}

getdata(url1);

function Tweet() {
  window.open(
    "https://twitter.com/intent/tweet?text=" +
      QuotesContent.innerHTML +
      "---- by " +
      authorName.innerHTML,
    "Tweet Window",
    "width=600,height=300"
  );
}
