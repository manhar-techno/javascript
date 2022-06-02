"use strict";
//Values of input
const namePlayer = document.querySelector(".input-first-name");
const lastNamePlayer = document.querySelector(".input-last-name");
const scorePlayer = document.querySelector(".input-score");
const countryPlayer = document.querySelector(".input-country");
const submitButton = document.querySelector("#submit-button");
const form = document.querySelector(".form");
const requiredMessage = document.querySelector(".fieldError");

//Render Information
const renderName = document.querySelector(".player-name");
const renderDate = document.querySelector(".player-date");
const renderScore = document.querySelector(".player-score");
const renderCountry = document.querySelector(".player-country");

//Data structures to take data
const players = [];
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
  const validInputs = (...inputs) => inputs.every((inp) => !inp);
  if (validInputs(firstName, lastName, country, score))
    return requiredMessage.classList.remove("hidden");

  if (isNaN(score)) return alert("Enter a valid number");
  const inputPlayer = new NewPlayer(firstName, lastName, score, country);
  players.push(inputPlayer);
  renderData(players);
});

function renderData(players) {
  document.querySelector(".renderPlayers").innerHTML = "";
  players.sort((a, b) => b.score - a.score);
  players.map((e, i) => {
    const html = `<div class="players-list">
      <div class="basic-info">
        <h2 class="player-name">${e.firstName + " " + e.lastName}</h2>
        <h3 class="player-date">${e.date.toDateString()}</h3>
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
    _setLocalStorage(players);
  });

  //consoling data
  const getData = JSON.parse(localStorage.getItem("Players"));
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

/////////////////////////////////////////
function decrease(i) {
  players[i].score -= 5;
  renderData(players);
}

function increase(i) {
  players[i].score += 5;
  renderData(players);
}
function deletePlayer(i) {
  const confirmation = confirm();
  if (!confirmation) return;
  players.splice(players[i], 1);
  renderData(players);
  alert("Selected Item Deleted");
}
function _setLocalStorage(players) {
  localStorage.setItem("Players", JSON.stringify(players));
}
