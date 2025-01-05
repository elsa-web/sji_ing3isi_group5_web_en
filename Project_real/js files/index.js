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

let info=null;

document.getElementById('transitionLink2').addEventListener('click', () => {
    const e_mail = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!e_mail || !password) {
        alert('Please fill in all fields!');
        return;
    }

    // Retrieve user data from localStorage
    info = JSON.parse(localStorage.getItem(e_mail));

    if (info.email==e_mail && info.password == password) {
        alert(`Welcome back, ${info.name}!`);
        console.log("Now it is supposed to change page");
        // Redirect to dashboard or another page
        document.body.classList.add('slide-out'); // Trigger translateY effect
        console.log("azert")
        setTimeout(() => {
            window.location.assign("../html files/category.html") // Navigate after the animation
          }, 500);
    } else {
        alert('Invalid email or password!');
    }
});
// export default info;



