// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcH-RZrNHD3nrmRxrA7En1Bd5U9UBHMSA",
  authDomain: "jsnative-2f45c.firebaseapp.com",
  databaseURL: "https://jsnative-2f45c-default-rtdb.firebaseio.com",
  projectId: "jsnative-2f45c",
  storageBucket: "jsnative-2f45c.appspot.com",
  messagingSenderId: "122734953593",
  appId: "1:122734953593:web:c467bd1c1e31ebff4500a8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import{getDatabase , child,ref ,set,get ,update,remove} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const db = getDatabase();


const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const res = document.getElementById('res');
populateUI();
  
let ticketPrice = +movieSelect.value;

// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}


// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
    console.log(selectedMovieIndex)
  }
}
console.log(populateUI())
// Movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
function data(valeur){
  let a
if (movieSelect.value == 220){
  return a+="laila et deb"
}else if (movieSelect.value == 320){
return a+"lotf show "
}else if(movieSelect.value == 250){
  return a+="star wars"
}else if(movieSelect==260){
  return a+="chater iland"
}else{
  return "no selected movie"
}
}

console.log(ticketPrice)
res.addEventListener('click',adding)
console.log()


function adding(){
  const dbRef = ref(db); //database refence 
get(child(dbRef,"movie/"+Math.floor(Math.random() * 100))).then ((snapshot)=> {
    if(snapshot.exists()){       //check if the user exists or not
        alert("user already exist !!")
    }else{
        set(ref(db,"movie/"+Math.floor(Math.random() * 100)),      //add users value to the database
        {
          movienom : data(movieSelect.value),
          movieprix:movieSelect.value*JSON.parse(localStorage.getItem("selectedSeats")).length,
          seatI:localStorage.getItem("selectedSeats")
        }).then(()=>{       //alert  when the user is inserted to the database
            alert("user created succesfully ")

        }).catch((error)=>{    // catch the error if there's an error 
            alert("error"+error)
        })
    }
})

}


const selectElement = document.querySelector('.eventi');

selectElement.addEventListener('change', (event) => {
  localStorage.removeItem("selectedSeats")
  window.location.reload();
})



