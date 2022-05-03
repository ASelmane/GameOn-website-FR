function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const submitBtn = document.querySelector(".btn-submit");
const form = document.getElementById("form");
const regex ={
    name: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, 
    email:  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/,
    quantity: /^\d{1,}$/
};

console.log(form);

// Date of birth limit
let date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear()-14;
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
} 
const maxDOB = year +'-'+ month +'-'+ day;
form.birthdate.max = maxDOB;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form
function closeModal() {
    modalbg.style.display = "none";
}

// Form validation
form.addEventListener("submit", (e) => {
    console.clear();
    let formValid = true;

    // Firstname validation length and caracters
    if(form.first.value.trim().length < 2) {
        form.first.classList.add("error")
        console.log("Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
        formValid = false;
    } else if (!form.first.value.trim().match(regex.name)) {
        formValid = false;
        console.log("Prénom invalide")
    }

    // Lastname validation length and caracters
    if(form.last.value.trim().length < 2) {
        form.last.classList.add("error")
        console.log("Veuillez entrer 2 caractères ou plus pour le champ du nom.")
        formValid = false;
    } else if (!form.last.value.trim().match(regex.name)) {
        formValid = false;
        console.log("Nom invalide")
    }

    // Email validation formats
    if (!form.email.value.trim().match(regex.email)) {
        formValid = false;
        console.log("Email invalide")
    }

     // DOB validation
    if (form.birthdate.value === "" || form.birthdate.value > maxDOB) {
        formValid = false;
        console.log("Date d'anniversaire invalide")
    }

    // Quantity validation
    if (!form.quantity.value.match(regex.quantity)) {
        formValid = false;
        console.log("Veuillez indiquer un chiffre")
    }

    // Location validation
    if(!form.location.value) {
        formValid = false;
        console.log("Veuillez indiquer une localisation")
    }

    // Terms checked validation
    if(!form.checkbox1.checked) {
        formValid = false;
        console.log("Vous devez accepter les conditions d'utilisation")
    }

    // Form submit
    if (formValid == true){
        console.log("Validate")
    }
    else{
        e.preventDefault();
    }
});