const link = document.getElementById('transitionLink');
const link2 = document.getElementById('transitionLink2');

//FOR THE TRANSITION FROM ONE PAGE TO ANOTHER

// link.addEventListener('click', (e) => {
//   e.preventDefault(); // Prevent immediate navigation
//   document.body.classList.add('slide-out'); // Trigger translateY effect
//   setTimeout(() => {
//     window.location.href = 'category.html';// Navigate after the animation
//   }, 500);
// });

// link2.addEventListener('click', (e) => {
//   e.preventDefault(); // Prevent immediate navigation
//   document.body.classList.add('slide-out'); // Trigger translateY effect
//   setTimeout(() => {
//     window.location.href = 'category.html'; // Navigate after the animation
//   }, 500);
// });

//for the sliding effect of the login page

let email = document.getElementById("email")
let password = document.getElementById("pswd")
let user = document.getElementById("user")

//The signin button transitions to category only if the fields have been filled, if they haven't, it displays error
link2.addEventListener("click", (e) => {

  email = document.getElementById("email")
  password = document.getElementById("pswd")

  console.log(email.value, password.value);

  if (!email.value || !password.value) {
    console.error("Fill this form, please!")
  }
  else{
    // Prevent immediate navigation

    document.body.classList.add('slide-out'); // Trigger translateY effect
    setTimeout(() => {
      window.location.href = 'category.html'; // Navigate after the animation
    }, 500);
  }
})

//The signup button transitions to category only if the fields have been filled, if they haven't, it displays error
link.addEventListener("click", (e) => {

  email = document.getElementById("email")
  password = document.getElementById("pswd")
  user = document.getElementById("user")


  console.log(email.value, password.value, user.value);

  if (!email.value || !password.value || !user.value) {
    console.error("Fill this form, please!")
  }
  else{
    // Prevent immediate navigation
    document.body.classList.add('slide-out'); // Trigger translateY effect
    setTimeout(() => {
      window.location.href = 'category.html'; // Navigate after the animation
    }, 500);
  }
})


const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const main = document.getElementById('main');

signUpButton.addEventListener('click', () => {
  /*WHEN THE SIGNUP BUTTON OF OVERLAY IS CLICKED, JS ADDS THE .right-panel-active class to container*/
  main.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
  main.classList.remove("right-panel-active");
});