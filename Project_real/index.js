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

//to go to the dashboard
document.getElementById('transitionLink').addEventListener('click', function(event) {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!name || !email || !password) {
        alert('Please fill in all fields!');
        return;
    }

    // Store user data in localStorage
    const userinfo = { name, email, password };
    localStorage.setItem(email, JSON.stringify(userinfo));

    //For the user to login after signing up
    main.classList.remove("right-panel-active");
});

document.getElementById('transitionLink2').addEventListener('click', function(event) {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please fill in all fields!');
        return;
    }

    // Retrieve user data from localStorage
    const userinfo = JSON.parse(localStorage.getItem(email));

    if (userinfo && userinfo.password === password) {
        alert(`Welcome back, ${userinfo.name}!`);
        // Redirect to dashboard or another page
        window.location.href = 'dash.html'; // Replace with your desired page
    } else {
        alert('Invalid email or password!');
    }
});



