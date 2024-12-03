const link = document.getElementById('transitionLink');
const link2 = document.getElementById('transitionLink2');

//FOR THE TRANSITION FROM ONE PAGE TO ANOTHER

link.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent immediate navigation
  document.body.classList.add('slide-out'); // Trigger translateY effect
  setTimeout(() => {
    window.location.href = 'category.html';// Navigate after the animation
  }, 500); 
});

link2.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent immediate navigation
    document.body.classList.add('slide-out'); // Trigger translateY effect
    setTimeout(() => {
        window.location.href = 'category.html'; // Navigate after the animation
    }, 500); 
  });

//for the sliding effect of the login page

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