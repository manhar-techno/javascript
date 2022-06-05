"use strict";
// import swal from "sweetalert";
// const { default: swal } = require("sweetalert");

//Values of input
const namePlayer = document.querySelector(".input-first-name");
const lastNamePlayer = document.querySelector(".input-last-name");
const scorePlayer = document.querySelector(".input-score");
const countryPlayer = document.querySelector(".input-country");
const submitButton = document.querySelector("#submit-button");
const form = document.querySelector(".form");
const requiredMessage = document.querySelector(".fieldError");
// const overlay = document.querySelector(".overlay");
// const deleteButton = document.querySelector(".confirm-delete");
const accessMenu = document.querySelector(".access-menu");
const loader = document.querySelector(".center");
//Render Information
const renderName = document.querySelector(".player-name");
const renderDate = document.querySelector(".player-date");
const renderScore = document.querySelector(".player-score");
const renderCountry = document.querySelector(".player-country");

//Data structures to take data
let players = [];

//Getting data from local storage
getData();
if (players.length > 3) {
  loader.classList.remove("hidden");
  setTimeout(() => loader.classList.add("hidden"), 2000);
}
gettingCountry();
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
  const validInputs = (...inputs) =>
    inputs.some((inp) => {
      return !inp;
    });
  if (validInputs(firstName, lastName, country)) {
    requiredMessage.classList.remove("hidden");
    setTimeout(() => {
      requiredMessage.classList.add("hidden");
    }, 2000);
    return;
  }

  //Score
  if (isNaN(score))
    return swal("Kindly add valid number!", {
      buttons: false,
      timer: 1500,
    });

  const inputPlayer = new NewPlayer(firstName, lastName, score, country);
  players.push(inputPlayer);
  renderData(players);
});

function renderData(players) {
  gettingCountry();

  if (players.length === 0) {
    accessMenu.classList.add("hidden");
  } else accessMenu.classList.remove("hidden");

  // requiredMessage.classList.add("hidden");
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
// function deletePlayer(i) {
//   displayDeleteAlert();
//   // const confirmation = confirm("Are you sure you want to delete?");
//   // if (!confirmation) return;
//   deleteButton.addEventListener(
//     "click",
//     function (e) {
//       if (e.target.classList.contains("btn-yes")) {
//         players.splice(players[i], 1);
//         displayDeleteAlert();
//         renderData(players);
//       }
//       if (e.target.classList.contains("btn-no")) {
//         displayDeleteAlert();
//       }
//     },
//     { once: true }
//   );
// }
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
// displayDeleteAlert();
// function displayDeleteAlert() {
//   overlay.classList.toggle("hidden");
//   deleteButton.classList.toggle("hidden");
// }
// function displayNumberAlert() {
//   overlay.classList.toggle("hidden");
//   document.querySelector(".not-number").classList.toggle("hidden");
// }

// overlay.addEventListener("click", function () {
//   overlay.classList.add("hidden");
//   deleteButton.classList.add("hidden");
// });

accessMenu.addEventListener("click", function (e) {
  if (e.target.classList.contains("clear")) {
    swal({
      title: "Warning!",
      text: "Clearing your player list will result in permanent deletion of files.",
      icon: "warning",
      buttons: ["Cancel", "Resume"],
      dangerMode: true,
    }).then((value) => {
      if (value) {
        localStorage.clear();
        players = [];
        renderData(players);

        swal({
          title: "success!",
          icon: "success",
        });
      } else return;
    });
  }
});

function deletePlayer(i) {
  //////////

  swal({
    title: "Warning!",
    text: "Are you sure you want to delete player out of the player list?",
    icon: "warning",
    buttons: ["No", "Yes"],
    dangerMode: true,
  }).then((value) => {
    if (value) {
      players.splice(players[i], 1);
      renderData(players);
      swal({
        title: "success!",
        icon: "success",
      });
    } else return;
  });
  // }
  //   });
  /////////
}

////Getting country
function gettingCountry() {
  navigator.geolocation.getCurrentPosition(
    (geolocation) => {
      const { longitude: long, latitude: lat } = geolocation.coords;
      var reverseGeocoder = new BDCReverseGeocode();
      reverseGeocoder.getClientLocation(
        {
          latitude: lat,
          longitude: long,
        },
        function (result) {
          const { countryName } = result;
          countryPlayer.value = countryName;
        }
      );
    },
    (error) => {
      swal({
        title: "Sorry, we are unable to retrieve your location",
        text: `reason: ${error.message}`,
        buttons: false,
        timer: 1000,
      });
    }
  );
}
