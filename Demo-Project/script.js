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

  document.querySelector(".renderPlayers").innerHTML = "";
  const firstName = namePlayer.value;
  const lastName = lastNamePlayer.value;
  const country = countryPlayer.value;
  const score = scorePlayer.value;

  //VALID INPUTS
  const validInputs = (...inputs) => inputs.every((inp) => !inp);
  if (validInputs(firstName, lastName, country, score))
    return requiredMessage.classList.remove("hidden");

  const inputPlayer = new NewPlayer(firstName, lastName, score, country);
  players.push(inputPlayer);
  renderData(players);

  //Delete

  document.querySelector(".delete").addEventListener("click", function (e) {
    let clicked = e.target.closest(".delete");
    players.splice(clicked.id, 1);
    renderData(players);
  });

  //Dcreasing

  document
    .querySelector(".reduce-score")
    .addEventListener("click", function () {
      console.log(e.target);
      //   let clicked = e.target.closest(".reduce-score").id;
      //   players[clicked].score -= 5;
      //   renderData(players);
    });

  //Increasing score

  document.querySelector(".add-score").addEventListener("click", function () {
    let clicked = e.target.closest(".add-score").id;
    players[clicked].score += 5;
    renderData(players);
  });
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
        <button id='${i}' class="btn delete"><div><i class="fa fa-trash"></i></div></button>
        <button  id='${i}' class="btn add-score">+5</button>
        <button  id='${i}' class="btn reduce-score">-5</button>
      </div>
    </div>`;

    document
      .querySelector(".renderPlayers")
      .insertAdjacentHTML("beforeend", html);
  });
}

console.log();
