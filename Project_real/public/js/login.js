/**
 * ALL THE USERS HOSTING SHOULD BE DISPLAYED IN THE JOIN PAGE
 * THE HOSTS SHOULD STORE THEIR (ID, NAME) IN A LIST 
 * WHICH WOULD BE ACCESSED BY JOIN PAGE
 * 
 * LOGIN PAGES STORES (NAME, EMAIL, PASSWORD) IN A LIST AVAILABLE EVERYWHERE
 * DASH
 * ON CREATING HOST, (ID, NAME) IS STORED IN THE LIST AVAILABLE EVERYWHERE
 * 
 */

let allUsers = JSON.parse(localStorage.getItem('allUsers')) || [];

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
    //Not putting preventDefault here will cause the page to submit the form and
    //reload bic it is JS normal behaviour to submit the form
    //and this will stop further JS execution
    event.preventDefault(); // Prevent form submission
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    const popup = document.querySelector('.popup');
    const message = document.getElementById('popup-message');

    //Check if all fields are filled and if
    if (!name || !email || !password) {
        message.textContent = `Please fill in all fields!`;
        document.body.classList.add("active-popup");
        return;
    }

    /**USING LOCAL STORAGE
     * 
     Store data: // Save an object in local storage(convert to JSON string first)
    const user = { name: "John", age: 30 };
     localStorage.setItem(key, value);//key is string
    localStorage.setItem("user", JSON.stringify(user));

    Retrieve data: // Retrieve and parse an object
    const user = JSON.parse(localStorage.getItem(key));//It is the name of the item you want to retrieve
    console.log(user.name); 
    console.log(user.age); 

     */

    // Store user data in localStorage
    const userinfo = { name, email, password };
    localStorage.setItem(email, JSON.stringify(userinfo));

    // Save the email of the logged-in user to a separate key for easy retrieval later
    localStorage.setItem('currentUserMail', userinfo.email);

    //Save userinfo
    localStorage.setItem('currentUser', JSON.stringify(userinfo));


    //Chek if entered info are in allusers and if they are, donot add the info and popup already exists
    if (allUsers.find(user => user.email === email)) {
        message.textContent = `User with email ${email} already exists!`;
        document.body.classList.add("active-popup");
        return;
    }
    else if(allUsers.find(user => user.name === name)){
        message.textContent = `User with name ${name} already exists!`;
        document.body.classList.add("active-popup");
        return;        
    }
    else{
        // Add the new userinfo object to the allUsers array
        allUsers.push(userinfo);

        // Store the updated allUsers array back in localStorage
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }


    console.log(localStorage.getItem(email));
    console.log(allUsers);

    //POPUP FOR SUCCESSFUL SIGNIN
    message.textContent = "SUCCESSFUL SIGNIN";
    document.body.classList.add("active-popup");

    //For the user to login after signing up
    main.classList.remove("right-panel-active");

    setTimeout(function() {
        document.body.classList.remove("active-popup");
    }, 3000)


});

document.getElementById('transitionLink2').addEventListener('click', function(event) {
    //Not putting preventDefault here will cause the page to submit the form and
    //reload bic it is JS normal behaviour to submit the form
    //and this will stop further JS execution
    event.preventDefault(); // Prevent form submission
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const popup = document.querySelector('.popup');
    const message = document.getElementById('popup-message');

    if (!email || !password) {
        // Error case: empty email or password
        message.textContent = `Please fill in all fields!`;
        document.body.classList.add("active-popup");
        return;
    }

    // Retrieve user data from localStorage
    //Retrieves the email and stores it in the userinfo variable
    const userinfo = JSON.parse(localStorage.getItem(email));
    

    //if email is not found in the local storage, go to signup page
    if(!(allUsers.find(user => user.email === email))){
        message.textContent = "User not found. Please sign up!";
        document.body.classList.add("active-popup");
        return;
    }
    //If login is successful, the user is redirected to the dashboard
    else if (userinfo && userinfo.password === password) {

        // Success case: correct email and password
        message.textContent = `Welcome back, ${userinfo.name}! Redirecting...`;
        document.body.classList.add("active-popup");

        // Redirect to dash.html after a delay of 3 seconds (3000ms)
        setTimeout(function() {
            window.location.href = 'dash.html';
        }, 3000); // 3 seconds delay
    } else {
        // Failure case: incorrect email or password
        message.textContent = `Invalid email or password!`;
        document.body.classList.add("active-popup");
    }

    console.log(localStorage.length);
    console.log(userinfo);
});

// Close the popup when the close button is clicked
document.querySelector('.popup .close-btn').addEventListener('click', function(){
    document.body.classList.remove("active-popup");
});