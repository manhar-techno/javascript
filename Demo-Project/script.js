"use strict";
//Values of input
const namePlayer = document.querySelector(".input-first-name");
const lastNamePlayer = document.querySelector(".input-last-name");
const scorePlayer = document.querySelector(".input-score");
const countryPlayer = document.querySelector(".input-country");
const submitButton = document.querySelector("#submit-button");
const form = document.querySelector(".form");
const requiredMessage = document.querySelector(".fieldError");
const overlay = document.querySelector(".overlay");
const deleteButton = document.querySelector(".confirm-delete");

//Render Information
const renderName = document.querySelector(".player-name");
const renderDate = document.querySelector(".player-date");
const renderScore = document.querySelector(".player-score");
const renderCountry = document.querySelector(".player-country");

//Data structures to take data
let players = [];

//Getting data from local storage
getData();

class NewPlayer {
  constructor(firstName, lastName, score, country) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.score = score;
    this.country = country;
    this.date = new Date();
  }
}

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  const firstName = namePlayer.value;
  const lastName = lastNamePlayer.value;
  const country = countryPlayer.value;
  const score = Number.parseInt(scorePlayer.value);

  //VALID INPUTS
  const validInputs = (...inputs) => inputs.every((inp) => inp);
  if (!validInputs(firstName, lastName, country, score))
    return requiredMessage.classList.remove("hidden");

  if (isNaN(score)) return alert("Enter a valid number");

  const inputPlayer = new NewPlayer(firstName, lastName, score, country);
  players.push(inputPlayer);
  renderData(players);
});

function renderData(players) {
  requiredMessage.classList.add("hidden");
  document.querySelector(".renderPlayers").innerHTML = "";
  _setLocalStorage();
  //if no players then return
  if (!players) return;

  //Sorting on bases of scores
  players.sort((a, b) => b.score - a.score);

  //Rendering new players
  players.map((e, i) => {
    const dateFormatted = new Date(e.date).toDateString();
    const html = `<div class="players-list">
      <div class="basic-info">
        <h2 class="player-name">${e.firstName + " " + e.lastName}</h2>
        <h3 class="player-date">${dateFormatted}</h3>
      </div>
      <h2 class = 'player-country'>${e.country}</h2>
      <h2 class='player-score'>${e.score}</h2>
      <div class="buttons">
        <button id='${i}' class="btn delete" onclick="deletePlayer(${i})"><div><i class="fa fa-trash"></i></div></button>
        <button  id='${i}' class="btn add-score"  onclick="increase(${i})">+5</button>
        <button  id='${i}' class="btn reduce-score" onclick="decrease(${i})">-5</button>
      </div>
    </div>`;

    document
      .querySelector(".renderPlayers")
      .insertAdjacentHTML("beforeend", html);
  });

  //consoling data

  //Decreasing Score
  //   document
  //     .getElementsByClassName(".reduce-score")
  //     .addEventListener("click", function (e) {
  //       players[e.target.id].score -= 5;
  //       renderData(players);
  //     });
  //Increasing score
  //   document.querySelector(".add-score").addEventListener("click", function (e) {
  //     players[e.target.id].score += 5;
  //     renderData(players);
  //   });

  //Deleting
  //   document.querySelector(".delete").addEventListener("click", function (e) {
  //     const link = e.target.closest(".delete");
  //     if (!link) return;
  //     const confirmation = confirm();
  //     if (!confirmation) return;
  //     players.splice(players[link.id], 1);
  //     renderData(players);
  //     alert("Selected Item Deleted");
  //   });

  namePlayer.value = "";
  lastNamePlayer.value = "";
  scorePlayer.value = "";
  countryPlayer.value = "";
}
// document.querySelector(".delete").addEventListener("click", function (e) {
//   console.log("HIHI");
//   let clicked = e.target.closest(".delete");
//   console.log(e.target);
//   players.splice(clicked.id, 1);
//   renderData(players);
// });

///Functions/////////////////////////////////////////
function decrease(i) {
  players[i].score -= 5;
  renderData(players);
  taskAchievement();
}

function increase(i) {
  players[i].score += 5;
  renderData(players);
  taskAchievement();
}
function deletePlayer(i) {
  displayDeleteAlert();
  // const confirmation = confirm("Are you sure you want to delete?");
  // if (!confirmation) return;
  console.log("closure");
  deleteButton.addEventListener(
    "click",
    function (e) {
      if (e.target.classList.contains("btn-yes")) {
        console.log("yes");
        players.splice(players[i], 1);
        displayDeleteAlert();
        renderData(players);
      }
      if (e.target.classList.contains("btn-no")) {
        console.log("no");
        displayDeleteAlert();
      }
    },
    { once: true }
  );
}
function _setLocalStorage() {
  localStorage.setItem("Players", JSON.stringify(players));
}
function taskAchievement() {
  document.querySelector(".task").classList.remove("hidden");
  setTimeout(() => {
    document.querySelector(".task").classList.add("hidden");
  }, 300);
}

function getData() {
  const data = JSON.parse(localStorage.getItem("Players"));
  if (players.length === 0 && data !== null) players = data;
  renderData(players);
}

function displayDeleteAlert() {
  console.log("hiding");
  overlay.classList.toggle("hidden");
  deleteButton.classList.toggle("hidden");
}
// function displayNumberAlert() {
//   overlay.classList.toggle("hidden");
//   document.querySelector(".not-number").classList.toggle("hidden");
// }

overlay.addEventListener("click", function () {
  overlay.classList.add("hidden");
  deleteButton.classList.add("hidden");
});
