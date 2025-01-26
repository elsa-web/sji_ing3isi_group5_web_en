let peer; // The PeerJS object
let connection; // The data connection object

//QUIZ VARIABLES
const category = localStorage.getItem("category");
const question = "../json files/"+category+".json";
const startBtn = document.getElementById('start-btn');
const quizScreen = document.getElementById('quiz-screen');
const startScreen = document.getElementById('start-screen');
const resultScreen = document.getElementById('result-screen');
const questionElem = document.getElementById('question');
const choicesElem = document.querySelectorAll('.choice');
const questionCounterElem = document.getElementById('question-counter');
const totalQuestionsElem = document.getElementById('total-questions');
const scoreElem = document.getElementById('score');
const finalScoreElem = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');
const saveScoreBtn = document.getElementById('save-score-btn');
const totalScoreElem = document.getElementById('total-score');
const userList = document.getElementById("userList");
const progress_bar = document.getElementById("bar");
const countdown = document.getElementById("count-down");
const restartbttn=document.getElementById("restart-btn");
const opponent_name=document.getElementById("opponent_name");
const result=document.getElementById("result");
const surrender=document.getElementById("surrender");
const currentUsermail=localStorage.getItem("currentUser");
const currentUser=JSON.parse(localStorage.getItem(currentUsermail));
const currentOpponent=null;
const is_winner=true;

// Host setup
function setupHost() {
    peer = new Peer(); // Initialize the peer object

    // When the Peer ID is assigned and peer ready for connection
    peer.on('open', function (id) {
        console.log(`Host Peer ID: ${id}`);
        document.getElementById('peer-id-display').textContent = `Your Host ID: ` + id;
    });

    // When a connection is made to the host
    peer.on('connection', function (conn) {
        console.log('Host approached by peer');
        connection = conn; // Save the connection object
        //!!!!!!START GAME
        setupConnectionEvents();
    });

    // Handle errors
    peer.on('error', function (err) {
        console.error('PeerJS Error:', err);
    });
}

// Join setup
function joinGame(hostId) {
    peer = new Peer(); // Initialize the peer object

    console.log('JOINING...');
//THE PB WAS THAT I FIRST PUT ALL THOSE LISTENERS OUT OF peer.on
//THIS MADE THAT THE OTHERS COULD RUN EVEN IF THE PEER WANTING TO CONNECT TO HOST WAS NOT READY
//AND TAHT MADE AN ERROR BIC A CONNECTION WAS ATTEMPTED WHEREAS THE PEER WAS NOT REAADY
    peer.on('open', () => {
        console.log('Joining peer ID assigned:', peer.id); // Logs the auto-generated ID of the joining peer

        // Connect to the host
        connection = peer.connect(hostId);//Assigns the connection object to conection

        if (connection) { // Checks if the connection object is not empty

            connection.on('open', function () {//When connection is successful the quiz starts
                console.log('Connected to host');
                //!!!!!!STARRT GAME
                setupConnectionEvents();
            });

            connection.on('error', function (err) {
                console.error('Connection Error:', err);
            });

        }
        else {
            console.error('Failed to create a connection. Connection object is undefined.');
        }
    });

    peer.on('error', function (err) {
        console.error('PeerJS Error:', err);
    });
}

function closeConnection(){
    currentUser.lose+=1;
    localStorage.setItem(currentUsermail, JSON.stringify(currentUser));

    if(connection && connection.open){
        connection.send({type: "disconnect"});
    }else {
        console.error('No active connection to send score');
    }

    if(connection){
        connection.close();
    }
    peer.disconnect();
    peer.destroy();

    myscore=0;
    opponenent_score=0;
}

// Send the score to the connected peer
function sendScore(score) {
    if (connection && connection.open) {
        connection.send({ type: 'score', score });
        console.log('Score sent:', score);
    } else {
        console.error('No active connection to send score');
    }
}

// Setup connection events (for both host and peer)
function setupConnectionEvents() {
    // Handle incoming data
    console.log('CONNECTION SUCCESSFUL');
    document.getElementById('connect-screen').classList.add('hidden');
    document.getElementById('game-container').classList.remove('hidden');
    if (connection && connection.open) {
        connection.send({ type: 'name', oppoName: currentUser.name });
    } else {
        console.error('No active connection to send score');
    }
    //receiving data from other player
    connection.on('data', (data) => {
        if(data.type==='score'){
            opponenent_score=data.score;
            console.log("score received: ", opponenent_score);
        }
        else if(data.type==='name'){
            opponent_name.textContent=data.oppoName;
            currentOpponent=data.oppoName;
            console.log("opponent name received: ", data.oppoName);
        }
        else if(data.type==='disconnect'){
            closeConnection();
        }
    });
}

// Send a question to the connected peer
/*function sendQuestion(question) {
    if (connection && connection.open) {
        connection.send({ type: 'question', question });
        console.log('Question sent:', question);
    } else {
        console.error('No active connection to send question');
    }
}*/



// Event listeners for hosting and joining
document.getElementById('host-btn').addEventListener('click', setupHost);
document.getElementById('join-btn').addEventListener('click', function () {
    const hostId = document.getElementById('peer-id').value.trim();
    if (hostId) {
        joinGame(hostId);
    } else {
        console.error('Host ID is required to join a game');
    }
});



////////////QUIZZZZZ///////////////////////////////////////////////////////////////////////////////////////////

let startcount=45;
console.log(question);


let availableQuestions = [];
let questions = [];

let currentQuestionIndex = 0;
let maxQuestions = 4;
let myscore = 0;
let opponenent_score=0;
let counter = 0;
let acceptingAnswers ;//FOR THE USER TO BE ABLETO CHOOSE ONLY ONE QUESTION

//permits us to handle asynchronous operations like fetching of data
// Async Function to Load Questions from the JSON file an store in an array object
//Async functions return Promise
async function loadQuestions() {
    try {//Contains code to handle errors
        //await pauses the executionof the fxn and waits until it the Promise is resolved
        //Syntax of fetch('URL/path-of-doc-to-be-imported')
        //fetch is used to make HTTP requests
        //await Pauses the execution of this async function until the fetch() Promise resolves.
        const response = await fetch(question);//response stores the Response object

        // Check whether the response is successful or not
        if (!response.ok) {
            //If the Response is not successful, the below is executd
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        //response.json transforms the json into a JS Object
        const data = await response.json();//data stores the content of question.json

        // Assigns the questions array from json to this array
        questions = data.questions;
        console.log('Questions loaded successfully:', questions);

        // Enable start button after questions are loaded
        startBtn.addEventListener('click', startGame);

        // Optional: Add visual indication that questions are ready
        startBtn.disabled = false;
        startBtn.textContent = 'Start Game';//For the user to know he can start
    }
    catch (error) {//to handle any errors that might have occured on the execution of the try block
        // Comprehensive error handling
        console.error('Failed to load questions:', error);

        // User-friendly error messaging
        startBtn.textContent = 'Error Loading Quiz';
        startBtn.disabled = true;//This disables the start button

        // Optional: More detailed error handling
        alert(`Unable to load quiz questions.
                Please check your network connection or try again later.
                Error details: ${error.message}`);
    }
}

// Game Start Function
function startGame() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    totalQuestionsElem.textContent = questions.length;
    myscore = 0;
    /**To copy the elements of question  */
    availableQuestions = [];
    for (let i = 0; i < questions.length; i++) {
        availableQuestions.push(questions[i]);
    }
     //adding count down
     setInterval(() => {
        countdown.textContent=startcount+"s";
        startcount--;
        if(startcount<0){
            localStorage.setItem("mostRecentScore", myscore);
            if(opponenent_score>myscore){
                is_winner=false;
            }
            endGame();
            console.log("startcount after fxn call: "+startcount)
        }
        console.log("startcount: "+startcount)
    }, 1000);

    loadQuestion();
}

function loadQuestion() {
    //RANDOMLY CHOOSES questionIndex
    currentQuestionIndex =  Math.floor(Math.random() * availableQuestions.length);
    let currentQuestion = availableQuestions[currentQuestionIndex];

    questionElem.textContent = currentQuestion.question;//diplays the questions

    /**Displays the choices in the question objct in the html element with class=choice */
    choicesElem.forEach (choice => {
        let number = choice.dataset.number;
        choice.textContent = currentQuestion["choice" + number];//WE DONOT USE DOT NOTATION
        //TO ACCESS THE DIFFERENT CHOICES BIC THEY CONTAIN DYNAMIC ELEMENTS (1,2,...) IN choice1,...
    });
    questionCounterElem.textContent = counter + 1;
    progress_bar.style.width=((counter+1)/questions.length)*100+"%";
    console.log(progress_bar.style.width);
    scoreElem.textContent = myscore;

    choicesElem.forEach(choice => {
        //IMPORTANT to remove od listeners efore putting new one bic on clicking multiple reponses
        //of te same question, a weird behaiour is observed
        // Automatically removes after first click
        choice.addEventListener('click', handleChoiceClick, { once: true });
    });

    counter++;
    acceptingAnswers = true;//INDICATING WE'VE ALREADY CHOSEN AN ANSWER
}
/**SYNTAX OF .forEach
 arr.forEach(callbackfxn(varhavingthecurrentvalueoftheitemperformed) ,arg)
 */
/**SYNTAX OF .addEventListener
 element.addEventListener("eventType", callbackfxn_executed_when_eventistriggered)
 */
/**SYNTAX OF callback function
 (parameters) => {...code...}
 */
/**.classList Permits us to add, remove, toggle or ... classes
    to the html that startScreen points to*/

//the event object parameter is provided by the browser as an event listener is triggered
//and it represents the event beign triggered
function handleChoiceClick(event) {

    if (!acceptingAnswers) return;//To prevent multiple rapu=id clicking on different choices

    acceptingAnswers = false;//TO AVOID MULTIPLE SELECTIONS

    let selectedChoice = event.target;//selectedhoice stores the DOM element onwhich the event has been triggered
    let selectedAnswer = parseInt(selectedChoice.dataset.number);//parseint is to turn the parameter into an integer

    console.log(selectedAnswer);
    console.log(availableQuestions[currentQuestionIndex].answer);
    // Check if the selected answer is correct
    if (selectedAnswer === availableQuestions[currentQuestionIndex].answer) {
        myscore += 10; // Add points for correct answer// Add 'correct' class
        sendScore(myscore); //sending score to other player
        console.log(selectedChoice);
        selectedChoice.classList.add('correct');
    } else { // Add 'incorrect' class
        console.log(selectedChoice);
        selectedChoice.classList.add('incorrect');
    }

    //Removes the used questions from available questions
    availableQuestions.splice(currentQuestionIndex, 1);

    // Use a timeout to allow the user to see feedback before moving to the next question
    setTimeout(() => {
        // Remove the classes after 1 second
        selectedChoice.classList.remove('correct');
        selectedChoice.classList.remove('incorrect');

        // Load the next question or end the game
        if (availableQuestions.length > 0) {
            loadQuestion();
        } else {
            localStorage.setItem("mostRecentScore", myscore);
            if(opponenent_score>myscore){
                is_winner=false;
            }
            endGame();
        }
    }, 1000); // Delay of 1 second for feedback
}


function endGame() {
    quizScreen.classList.add('hidden');
    /**.classList enables us to manage(add, remove, toggle classes) the CSS */
    resultScreen.classList.remove('hidden');

    if(is_winner){
        result.textContent="win";
        currentUser.win+=1;
    }
    else{
        result.textContent="lose";
        currentUser.lose+=1;
    }
    localStorage.setItem(currentUsermail, JSON.stringify(currentUser));
    //To display score/totalscore
    finalScoreElem.textContent = myscore;
    totalScoreElem.textContent = questions.length * 10;
}

function restartGame() {
    counter = 0;
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}

restartBtn.addEventListener('click', ()=>{
    window.location.reload();
})

surrender.addEventListener("click", closeConnection);

// Async Initialization
async function initializeQuiz() {
    // Disable start button until questions are loaded
    startBtn.disabled = true;
    startBtn.textContent = 'Loading Questions...';

    // Load questions when the script initializes
    await loadQuestions();
}

// Call initialization function when script loads
initializeQuiz();

//TO BE ABLE TO USE DATA STORED FROM THE
// Function to save user data to Local Storage
function saveUserData(userdata) {
    // Retrieve the existing users array or initialize a new one
    let users = JSON.parse(localStorage.getItem(category)) || [];

    // Add the new userdata object to the array
    users.push(userdata);


    // Sort the array in descending order by score using the .sort method
    users.sort(/*callback funtion*/(a, b) => b.score - a.score);

    console.log(userdata);
    // Save the updated array back to Local Storage
    localStorage.setItem(category, JSON.stringify(users));
  }

/**innerText: When you care about visible text only (text that’s actually rendered on the screen).
textContent: When you want the full text content of an element, regardless of visibility.
value: When dealing with form elements like <input> or <textarea> to get or set user input. */


function displayUserData() {
    // Retrieve the stored users array
    //JSON.parse converts the retrieved string into a JS object
    const users = JSON.parse(localStorage.getItem(category)) || [];

    // Clear the current list
    userList.innerHTML = "";

    // Loop through the users and display each one
    users.forEach((user, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Name: ${user.currentusername}, Score: ${user.score}`;

      // Add a delete button for each user
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => deleteUserData(index));

      //Adds the listitem to the list
      userList.appendChild(listItem);
    });
}

saveScoreBtn.addEventListener('click', (e) => {
e.preventDefault(); // Prevent form submission from refreshing the page

//getting username and assigning a score automatically
const currentusername = "";
const score=0
if(is_winner){
    currentusername=currentUser.name;
    score=myscore;
}
else{
    currentusername=currentOpponent;
    score=opponenent_score;
}

console.log(currentusername);
console.log(score);
// Create a userdata object
const userdata = { currentusername, score };

// Save the userdata object to Local Storage
saveUserData(userdata);

// Display the updated list of users
displayUserData();
});

function deleteUserData(index) {
    // Retrieve the current users array from localStorage
    const users = JSON.parse(localStorage.getItem(category)) || [];

    // Remove the user at the specified index
    users.splice(index, 1);

    // Update localStorage with the modified users array
    localStorage.setItem(category, JSON.stringify(users));

    // Refresh the displayed user data
    displayUserData();
}
//?????????HOW TO MAKE THAT ANIMATIONS OF CSS PPTIES ARE SHOWN BEFORE THE RUNNING OF THE PROGRAM CONTINUES