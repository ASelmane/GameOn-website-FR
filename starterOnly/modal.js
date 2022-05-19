function editNav() {
  let x = document.getElementById("myTopnav");
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
const form = document.getElementById("form");
const success = document.getElementById("success");
const successBtn = document.querySelector(".btn-success");
const closeBtn = document.querySelector(".close");

const regex ={
    name: /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, 
    email:  /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+\.[A-Za-z0-9-]+$/,
    quantity: /^\d{1,}$/
};

// Date of birth limit
let date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear()-14;
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
} 
const maxDOB = year +'-'+ month +'-'+ day;
const minDOB = '1900-01-01';
form.birthdate.max = maxDOB;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "flex";
  form.style.display = "block";
  document.body.style.overflow='hidden';
}

// Close modal form
function closeModal() {
    modalbg.style.display = "none";
    success.style.display = "none";
    document.body.style.overflow='auto';
}

// Close modal event
successBtn.addEventListener("click",closeModal);
closeBtn.addEventListener("click",closeModal);

// Message error
function errorMessage(input, message) {
    input.parentNode.setAttribute("data-error-visible","true")
    input.parentNode.setAttribute("data-error",message)
}

// Form validation
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let formValid = true;

    // Firstname validation length and caracters
    if(form.first.value.trim().length < 2) {
        errorMessage(form.first,"Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
        formValid = false;
    } else if (!form.first.value.trim().match(regex.name)) {
        errorMessage(form.first,"Veuillez renseigner un prénom valide.")
        formValid = false;
    } else {
        form.first.parentNode.setAttribute("data-error-visible","false")
    }

    // Lastname validation length and caracters
    if(form.last.value.trim().length < 2) {
        errorMessage(form.last,"Veuillez entrer 2 caractères ou plus pour le champ du nom.")
        formValid = false;
    } else if (!form.last.value.trim().match(regex.name)) {
        errorMessage(form.last,"Veuillez renseigner un nom valide.")
        formValid = false;
    } else {
        form.last.parentNode.setAttribute("data-error-visible","false")
    }

    // Email validation formats
    if (!form.email.value.trim().match(regex.email)) {
        errorMessage(form.email,"Veuillez renseigner une adresse email valide.")
        formValid = false;
    } else {
        form.email.parentNode.setAttribute("data-error-visible","false")
    }

     // DOB validation
    if (form.birthdate.value === "" || (minDOB > form.birthdate.value > maxDOB)) {
        errorMessage(form.birthdate,"Veuillez renseigner votre date de naissance.")
        formValid = false;
    } else {
        form.birthdate.parentNode.setAttribute("data-error-visible","false")
    }

    // Quantity validation
    if (!form.quantity.value.match(regex.quantity)) {
        errorMessage(form.quantity,"Veuillez renseigner un nombre de tournois.")
        formValid = false;
    } else {
        form.quantity.parentNode.setAttribute("data-error-visible","false")
    }

    // Location validation
    if(!form.location.value) {
        errorMessage(form.location1,"Veuillez selectionner un tournoi.")
        formValid = false;
    } else {
        form.location1.parentNode.setAttribute("data-error-visible","false")
    }

    // Terms checked validation
    if(!form.checkbox1.checked) {
        errorMessage(form.checkbox1,"Vous devez lire et accepter les conditions générales.")
        formValid = false;
    } else {
        form.checkbox1.parentNode.setAttribute("data-error-visible","false")
    }

    // Form submit
    if (formValid){
        success.style.display = "flex";
        form.style.display = "none";
        console.log('form sent !');
        form.reset();
    }
})