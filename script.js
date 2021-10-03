const answer = document.getElementById("answer");

const userBtn = document.getElementById("user");
const doubleMoneyBtn = document.getElementById("doubleMoney");
const millionairesBtn = document.getElementById("millionaires");
const sortBtn = document.getElementById("sort");
const calculateBtn = document.getElementById("calculate");

let info = []; //This is the store house for the random user data.
const url = "https://randomuser.me/api"; //RandomUser API

async function randomUser() {
  const response = await axios.get(url);
  const data = response.data.results[0];
  const newUser = {
    name: `${data.name.first} ${data.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addUser(newUser); //This passes the newly defined object into the addUser function as an argument.
}

function doubleMoney() {
  info = info.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function showOnlyMillionaires() {
  info = info.filter((infoo) => {
    return infoo.money >= 1000000;
  });
  updateDOM();
}

function sortWealth() {
  info = info.sort((a, b) => b.money - a.money);
  updateDOM();
}

function totalWealth() {
  const total = info.reduce((acc, user) => (acc + user.money), 0);
  console.log('Na the total money be this o', formatter.format(total))
  // updateDOM();
  let element = document.createElement('h3');
  element.classList.add('total');
  element.innerHTML = `Total wealth is: ${formatter.format(total)}`
  answer.appendChild(element);
}

//This would help us to add new user data to the info array/store.
function addUser(obj) {
  info.push(obj);
  updateDOM(info);
}

// The updateDOM is used to display the arrays on the webpage.
function updateDOM(providedInfo = info) {
  //Clear the content first.
  answer.innerHTML = '<div class="answer" id="answer"></div>';
  // const clearElement = (answer.innerHTML =
  //   '<div class="answer" id="answer"></div>');

  providedInfo.forEach((item) => {
    let element = document.createElement("h4");
    element.classList.add("person");
    element.innerHTML = `${item.name} <span>${formatter.format(
      item.money
    )}</span>`;
    answer.appendChild(element);
  });
}

// Create our number formatter. (GOTTEN FROM STACKOVERFLOW THO)
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

//adding event listeners
userBtn.addEventListener("click", randomUser);
doubleMoneyBtn.addEventListener("click", doubleMoney);
millionairesBtn.addEventListener("click", showOnlyMillionaires);
sortBtn.addEventListener("click", sortWealth);
calculateBtn.addEventListener("click", totalWealth);

// const url = "https://restcountries.eu/rest/v2/all"; // countries api
// fetch(url)
//   .then((response) => response.json()) // accessing the API data as JSON
//   .then((data) => {
//     // getting the data
//     console.log(data);
//   })
//   .catch((error) => console.log(error)); // handling error if something wrong happens

// const fetcData = async () => {
//   try {
//     // const response = await axios.get(url);
//     // console.log(response.data[2]);
//     // Line 22 and 23 is to test using axios.get

//     const response = await fetch(url);
//     const countries = await response.json();
//     console.log(countries);
//   } catch (err) {
//     console.log(err);
//   }
// };
// fetcData();

// const countriesAPI = "https://restcountries.eu/rest/v2/all";
// const catsAPI = "https://api.thecatapi.com/v1/breeds";

// async function countries() {
//   try {
//     const res = await fetch(countriesAPI);
//     const county = await res.json();
//     for (let i of county) {
//       console.log(
//         `${i.name}, whose capital is ${i.capital} and language is ${i.languages[0].name} has a population of about ${i.population} on ${i.area}sqm`
//       );
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }
// countries();

// // name, capital, language, population, area

// const cats = async () => {
//   try {
//     const res = await axios.get(catsAPI);
//     const data = res.data;
//     console.log(data);
//     for (let j of data) {
//       let catNames = j.weight.metric;
//       console.log(catNames);
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
// cats();
