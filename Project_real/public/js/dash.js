// Retrieve the email of the currently logged-in user
const currentUserEmail = localStorage.getItem('currentUserMail');

// If the email exists in localStorage, retrieve the user data
if (currentUserEmail) {
    const userinfo = JSON.parse(localStorage.getItem(currentUserEmail));
    console.log(userinfo.name);
    console.log(userinfo);
    
    // Ensure userinfo exists and contains a valid name before displaying
    if (userinfo.name) {
        document.getElementById('usr_name').textContent = userinfo.name;
    } else {
        console.error('User data not found or invalid.');
    }
} else {
    console.error('No logged-in user found.');
}

const play = document.getElementById('play-tab');

play.addEventListener('click', function(){
    window.location.href = 'category.html';
})