// Initialize variables
let currentQuestionIndex = 0;
let questions = [];
let score = 0;

// DOM elements
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const progressElement = document.getElementById('progress');
const nextButton = document.getElementById('next-button');
const choiceButtons = document.querySelectorAll('.choice');

// Load questions from the server API endpoint
async function loadQuestions() {
    try {
        // Define all available categories
        const availableCategories = ["history", "geography", "music", "economics", "computer", "football"];
        
        // Try to get category from localStorage first
        let category = localStorage.getItem("category");
        
        // If no category in localStorage, randomly select one from available categories
        if (!category || !availableCategories.includes(category)) {
            // Generate random index based on array length
            const randomIndex = Math.floor(Math.random() * availableCategories.length);
            
            // Select random category
            category = availableCategories[randomIndex];
            
            // Store the randomly selected category in localStorage for consistency
            localStorage.setItem("category", category);
            
            console.log("No category found in localStorage. Randomly selected:", category);
        } else {
            console.log("Category found in localStorage:", category);
        }

        // Use the category to fetch questions
        const response = await fetch(`/api/questions?category=${encodeURIComponent(category)}`);
        
        if (!response.ok) {
            throw new Error(`Failed to load questions for category: ${category}`);
        }
        
        questions = await response.json();

        if (!questions || questions.length === 0) {
            throw new Error(`No questions found for category: ${category}`);
        }

        // Update UI to show selected category
        const categoryDisplay = document.createElement('div');
        categoryDisplay.textContent = `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
        categoryDisplay.style.marginBottom = '20px';
        questionElement.parentNode.insertBefore(categoryDisplay, questionElement);

        showQuestion(currentQuestionIndex);
        updateProgress();
    } catch (error) {
        console.error('Error loading questions:', error);
        questionElement.textContent = `Error: ${error.message}`;
        progressElement.textContent = 'Error';
    }
}

// Display current question
function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionElement.textContent = question.question;
    
    choiceButtons.forEach((button, index) => {
        button.textContent = question[`choice${index + 1}`];
        button.classList.remove('correct', 'incorrect');
        button.disabled = false;
    });

    nextButton.style.display = 'none';
}

// Update progress display
function updateProgress() {
    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Handle choice selection
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedNumber = parseInt(button.getAttribute('data-number'));
        const correctAnswer = questions[currentQuestionIndex].answer;

        // Disable all buttons after selection
        choiceButtons.forEach(btn => btn.disabled = true);

        if (selectedNumber === correctAnswer) {
            button.classList.add('correct');
            score++;
        } else {
            button.classList.add('incorrect');
            choiceButtons[correctAnswer - 1].classList.add('correct');
        }

        // Show next button if there are more questions
        if (currentQuestionIndex < questions.length - 1) {
            nextButton.style.display = 'inline-block';
        } else {
            nextButton.textContent = 'See Results';
            nextButton.style.display = 'inline-block';
        }
    });
});

// Handle next button click
nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
        updateProgress();
    } else {
        // Show final results
        questionElement.textContent = `Quiz completed! Your score: ${score}/${questions.length}`;
        choicesElement.style.display = 'none';
        nextButton.style.display = 'none';
        progressElement.textContent = 'Quiz Complete!';
    }
});

// Start the quiz
loadQuestions();
