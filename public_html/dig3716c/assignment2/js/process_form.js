document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('surveyForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateData()) {
            const correctAnswersCount = calculateCorrectAnswers();
            displayResults(correctAnswersCount);
        }
    });
});

function validateData() {
    let isValid = true;

    // Validate First Name
    const firstName = document.getElementById('firstName').value;
    if (!firstName.match(/^[A-Z][a-z]*$/)) {
        document.getElementById('firstNameHint').innerText = "First name must start with a capital letter.";
        isValid = false;
    } else {
        document.getElementById('firstNameHint').innerText = "";
    }

    // Validate Last Name
    const lastName = document.getElementById('lastName').value;
    if (!lastName.match(/^[A-Z][a-z',]*$/)) {
        document.getElementById('lastNameHint').innerText = "Last name must start with a capital letter and may include ',.";
        isValid = false;
    } else {
        document.getElementById('lastNameHint').innerText = "";
    }

    // Validate Phone Number
    const phone = document.getElementById('phone').value;
    if (!phone.match(/^[0-9]{3} [0-9]{3}-[0-9]{4}$/)) {
        document.getElementById('phoneHint').innerText = "Invalid format. Expected: XXX XXX-XXXX";
        isValid = false;
    } else {
        document.getElementById('phoneHint').innerText = "";
    }

    // Validate Email
    const email = document.getElementById('email').value;
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        document.getElementById('emailHint').innerText = "Invalid email format.";
        isValid = false;
    } else {
        document.getElementById('emailHint').innerText = "";
    }

    // Validate Website URL
    const websiteUrl = document.getElementById('websiteUrl').value;
    if (!websiteUrl.match(/^https:\/\/.*[~].*\/$/)) {
        document.getElementById('websiteUrlHint').innerText = "Invalid URL. Should start with https:// and contain ~";
        isValid = false;
    } else {
        document.getElementById('websiteUrlHint').innerText = "";
    }

    return isValid;
}

function calculateCorrectAnswers() {
    let correctAnswers = 0;
    const correctAnswersMap = {
        'season': 'Spring',  // Correct answer for the first question
        'beverage': 'Tea',   // Correct answer for the second question
        'time': 'Early Bird' // Correct answer for the third question
    };

    for (let key in correctAnswersMap) {
        if (getRadioValue(key) === correctAnswersMap[key]) {
            correctAnswers++;
        }
    }

    return correctAnswers;
}

function displayResults(correctAnswersCount) {
    // Hide the form
    document.getElementById('surveyForm').style.display = 'none';

    // Clear existing content
    const personalInfoContainer = document.getElementById('personalInfo');
    personalInfoContainer.textContent = '';
    const quizAnswersContainer = document.getElementById('quizAnswers');
    quizAnswersContainer.textContent = '';
    const badgeContainer = document.getElementById('badgeContainer');
    badgeContainer.textContent = '';

    // Create and append Personal Information elements
    appendElement(personalInfoContainer, 'h3', 'Personal Information:');
    appendElement(personalInfoContainer, 'p', `Name: ${document.getElementById('firstName').value} ${document.getElementById('lastName').value}`);
    appendElement(personalInfoContainer, 'p', `Phone: ${document.getElementById('phone').value}`);
    appendElement(personalInfoContainer, 'p', `Email: ${document.getElementById('email').value}`);
    appendElement(personalInfoContainer, 'p', `Website URL: ${document.getElementById('websiteUrl').value}`);

    // Create and append Quiz Answers elements
    appendElement(quizAnswersContainer, 'h3', 'Quiz Answers:');
    appendElement(quizAnswersContainer, 'p', `Favorite Season: ${getRadioValue('season')}`);
    appendElement(quizAnswersContainer, 'p', `Tea or Coffee: ${getRadioValue('beverage')}`);
    appendElement(quizAnswersContainer, 'p', `Early Bird or Night Owl: ${getRadioValue('time')}`);
    appendElement(quizAnswersContainer, 'p', `Questions Answered Correctly: ${correctAnswersCount}/3`);

    // Determine which badge to display
    const badgeImage = correctAnswersCount === 3 ? './img/correct.jpeg' : './img/incorrect.jpeg';

    // Get the website URL submitted by the user
    const websiteUrl = document.getElementById('websiteUrl').value;

    // Create and append Badge elements
    appendElement(badgeContainer, 'h3', 'Your Badge:');
    const badgeLink = document.createElement('a');
    badgeLink.href = websiteUrl;
    badgeLink.target = '_blank';
    const badgeImg = document.createElement('img');
    badgeImg.src = badgeImage;
    badgeImg.alt = 'Badge';
    badgeLink.appendChild(badgeImg);
    badgeContainer.appendChild(badgeLink);

    // Show the results section
    document.getElementById('results').style.display = 'block';
}

function appendElement(parent, elementType, textContent) {
    const element = document.createElement(elementType);
    element.textContent = textContent;
    parent.appendChild(element);
}



// Function to get selected radio button value
function getRadioValue(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
    return 'Not answered';
}
