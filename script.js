// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "*************",
    authDomain: "**************",
    databaseURL: "****************8888",
    projectId: "**********",
    storageBucket: "**********8",
    messagingSenderId: "**********",
    appId: "**************88",
    measurementId: "************"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get auth instance
const auth = firebase.auth();

const leftSidebar = document.querySelector('.left-sidebar');
const leftSidebarToggle = document.querySelector('.sidebar-toggle-left');
const profileInfo = document.getElementById('profile-info');
const activityList = document.getElementById('activity-list');
const nameInput = document.getElementById('name-input');
const setNameButton = document.getElementById('set-name-button');
document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('DOMContentLoaded', function() {
        const fab = document.getElementById('fab');
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
    
        fab.addEventListener('click', () => {
            recognition.start();
        });
    
        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            console.log(speechResult);
            // Handle the speech result (e.g., parse commands, update UI, etc.)
        };
    
        recognition.onerror = (event) => {
            console.error(event.error);
        };
    });
    

    const synth = window.speechSynthesis;
    let utterance;
    let words = [];
    let voices = [];
    let currentWordIndex = 0;
    let isReading = false;
    let points = 0;
    let streak = 0;
    let badges = 0;
    // Add these variables at the top of your file with other global variables
let recognition;
let isListening = false;


    // DOM elements
    const fileDropZone = document.getElementById('file-drop-zone');
    const fileInput = document.getElementById('fileInput');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const textInput = document.getElementById('textInput');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const summarizeButton = document.getElementById('summarizeButton');
    const voiceSelect = document.getElementById('voiceSelect');
    const rateRange = document.getElementById('rateRange');
    const rateValue = document.getElementById('rateValue');
    const colorPicker = document.getElementById('colorPicker');
    const highlightedText = document.getElementById('highlightedText');
    const readPosButton = document.getElementById('readPosButton');
    const stopPosButton = document.getElementById('stopPosButton');
    const readSummaryButton = document.getElementById('readSummaryButton');
    const stopSummaryButton = document.getElementById('stopSummaryButton');
    const qaButton = document.getElementById('qaButton');
    const searchButton = document.getElementById('searchButton');
   
    const languageSelect = document.getElementById('languageSelect');
    const pitchRange = document.getElementById('pitchRange');
    const pitchValue = document.getElementById('pitchValue');
    const volumeRange = document.getElementById('volumeRange');
    const volumeValue = document.getElementById('volumeValue');
    const goalTime = document.getElementById('goalTime');
    const setGoalButton = document.getElementById('setGoalButton');
    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerButton = document.getElementById('startTimerButton');
    const stopTimerButton = document.getElementById('stopTimerButton');
    const goalProgress = document.getElementById('goalProgress');
    const noteInput = document.getElementById('noteInput');
    const addNoteButton = document.getElementById('addNoteButton');
    const annotationList = document.getElementById('annotationList');
    const themeSelect = document.getElementById('themeSelect');
    const fontSelect = document.getElementById('fontSelect');

    const sidebar = document.querySelector('.right-sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const container = document.querySelector('.container');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        container.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('open');
            container.classList.remove('sidebar-open');
        }
    });
   
    const loginSection = document.getElementById('login-section');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const loginButton = document.getElementById('login-button');
    const signupButton = document.getElementById('signup-button');
    const loginMessage = document.getElementById('login-message');

  const fab = document.getElementById('fab');
  if (fab) {
    fab.addEventListener('click', toggleVoiceAssistant);
  } else {
    console.error('FAB element not found');
  }


    // Login functionality
    loginButton.addEventListener('click', () => {
        const email = loginEmail.value;
        const password = loginPassword.value;
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                loginMessage.textContent = 'Logged in successfully!';
                loginMessage.style.color = 'green';
                // Hide login section and show main content
                loginSection.style.display = 'none';
                document.querySelector('main').style.display = 'block';
            })
            .catch((error) => {
                loginMessage.textContent = error.message;
                loginMessage.style.color = 'red';
            });
    });

    // Signup functionality
    signupButton.addEventListener('click', () => {
        const email = loginEmail.value;
        const password = loginPassword.value;
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                loginMessage.textContent = 'Signed up successfully! Please log in.';
                loginMessage.style.color = 'green';
            })
            .catch((error) => {
                loginMessage.textContent = error.message;
                loginMessage.style.color = 'red';
            });
    });

    // Add this near the top of your script, with other DOM element selections
const guestLoginButton = document.getElementById('guest-login-button');

// Add this to your existing event listeners
guestLoginButton.addEventListener('click', () => {
    loginAsGuest();
});

// Add this function to handle guest login
function loginAsGuest() {
    auth.signInAnonymously()
        .then(() => {
            loginMessage.textContent = 'Logged in as guest successfully!';
            loginMessage.style.color = 'green';
            // Hide login section and show main content
            loginSection.style.display = 'none';
            document.querySelector('main').style.display = 'block';
        })
        .catch((error) => {
            loginMessage.textContent = `Error: ${error.message}`;
            loginMessage.style.color = 'red';
        });
}

// Modify the auth.onAuthStateChanged function to handle guest users
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        loginSection.style.display = 'none';
        document.querySelector('main').style.display = 'block';

        // Check if the user is a guest
        if (user.isAnonymous) {
            // Update UI for guest user
            document.getElementById('profile-info').innerHTML = '<p><strong>Guest User</strong></p>';
            // Disable or hide features not available to guests
            // For example:
            // document.getElementById('some-premium-feature').style.display = 'none';
        } else {
            // Regular user, update profile as before
            updateUserProfile(user);
        }
    } else {
        // User is signed out
        loginSection.style.display = 'block';
        document.querySelector('main').style.display = 'none';
    }
});

    // Add this to your existing JavaScript
const logoutButton = document.createElement('button');
logoutButton.textContent = 'Logout';
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        loginMessage.textContent = 'Logged out successfully!';
        loginMessage.style.color = 'green';
    }).catch((error) => {
        loginMessage.textContent = 'Error logging out: ' + error.message;
        loginMessage.style.color = 'red';
    });
});
document.body.appendChild(logoutButton);
     
  

document.getElementById('forgot-password-link').addEventListener('click', (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    if (email) {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                loginMessage.textContent = 'Password reset email sent. Check your inbox.';
                loginMessage.style.color = 'green';
            })
            .catch((error) => {
                loginMessage.textContent = `Error: ${error.message}`;
                loginMessage.style.color = 'red';
            });
    } else {
        loginMessage.textContent = 'Please enter your email address.';
        loginMessage.style.color = 'red';
    }
});

    // Left sidebar toggle
    leftSidebarToggle.addEventListener('click', () => {
        leftSidebar.classList.toggle('open');
        container.classList.toggle('left-sidebar-open');
    });

    // Close left sidebar when clicking outside
    document.addEventListener('click', (event) => {
        if (!leftSidebar.contains(event.target) && !leftSidebarToggle.contains(event.target)) {
            leftSidebar.classList.remove('open');
            container.classList.remove('left-sidebar-open');
        }
    });

    // Function to update user profile
    function updateUserProfile(user) {
        profileInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.displayName || 'N/A'}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
    }

    function addActivity(activity) {
        const activityList = document.getElementById('activity-list');
        const li = document.createElement('li');
        li.textContent = activity;
        activityList.insertBefore(li, activityList.firstChild);
        if (activityList.children.length > 5) {
            activityList.removeChild(activityList.lastChild);
        }
    }

    // Function to update user profile
    function updateUserProfile(user) {
        profileInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.displayName || 'Not set'}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;
    }

    // Function to set user's display name
    async function setDisplayName(name) {
        const user = auth.currentUser;
        if (user) {
            try {
                await user.updateProfile({
                    displayName: name
                });
                updateUserProfile(user);
                addActivity(`Name set to ${name}`);
                alert('Name set successfully!');
            } catch (error) {
                console.error('Error setting name:', error);
                alert('Error setting name. Please try again.');
            }
        } else {
            alert('Please log in to set your name.');
        }
    }

    // Event listener for set name button
    setNameButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            setDisplayName(name);
            nameInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid name.');
        }
    });

    // Update user profile when logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            updateUserProfile(user);
        } else {
            profileInfo.innerHTML = '<p>Please log in to view your profile.</p>';
            activityList.innerHTML = '';
        }
    });


    textInput.addEventListener('input', () => {
        const timestamp = new Date().toLocaleTimeString();
        const previewText = textInput.value.slice(0, 30) + (textInput.value.length > 30 ? '...' : '');
        addActivity(`${timestamp}: Text input "${previewText}"`);
    });
    // Drag and drop functionality
    fileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropZone.classList.add('drag-over');
    });

    fileDropZone.addEventListener('dragleave', () => {
        fileDropZone.classList.remove('drag-over');
    });

   

    fileDropZone.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        } else {
            alert('No file selected. Please upload a valid PDF or image file.');
        }
    });
    let cropper;

    // Modify the handleFileUpload function
    function handleFileUpload(file) {
        clearErrorMessages();
    
        if (file.type === 'application/pdf') {
            handlePdfUpload(file);
            // Remove the activity logging from here
        } else if (file.type.startsWith('image/')) {
            setupImageCropper(file);
            // Remove the activity logging from here
        } else {
            showErrorMessage('Please upload a valid PDF or image file.');
        }
    }
    
    // Add this function to set up the image cropper
    function setupImageCropper(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image-to-crop');
            img.src = e.target.result;
            
            document.getElementById('file-drop-zone').style.display = 'none';
            document.getElementById('cropper-container').style.display = 'block';
            
            if (cropper) {
                cropper.destroy();
            }
            
            cropper = new Cropper(img, {
                aspectRatio: NaN,
                viewMode: 1,
                minCropBoxWidth: 100,
                minCropBoxHeight: 100,
            });
        }
        reader.readAsDataURL(file);
    }
    
    // Add event listener for the crop button
    document.getElementById('crop-button').addEventListener('click', () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob((blob) => {
                handleImageUpload(blob);
            });
        }
        resetCropper();
    });
    
    // Add event listener for the cancel button
    document.getElementById('cancel-crop-button').addEventListener('click', resetCropper);
    
    // Function to reset the cropper and show the file drop zone again
    function resetCropper() {
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
        document.getElementById('image-to-crop').src = '';
        document.getElementById('cropper-container').style.display = 'none';
        document.getElementById('file-drop-zone').style.display = 'block';
    }
    
    // Update the handleImageUpload function
    async function handleImageUpload(file) {
        try {
            updateProgress(0);
            showLoadingMessage('Extracting text from image...');
            const extractedText = await extractTextFromImage(file);
            if (extractedText.trim() === '') {
                throw new Error('No text was extracted from the image.');
            }
            textInput.value = extractedText;
            updateProgress(100);
            addPoints(10);
            showSuccessMessage('Text successfully extracted from image.');
        } catch (error) {
            console.error('Error extracting text from image:', error);
            showErrorMessage(`Error extracting text from image: ${error.message}. Please try again with a different image.`);
            updateProgress(0);
        } finally {
            hideLoadingMessage();
        }
    }

// Update the handleImageUpload function
async function handleImageUpload(file) {
    try {
        updateProgress(0);
        showLoadingMessage('Extracting text from image...');
        const extractedText = await extractTextFromImage(file);
        if (extractedText.trim() === '') {
            throw new Error('No text was extracted from the image.');
        }
        textInput.value = extractedText;
        updateProgress(100);
        addPoints(10);
        showSuccessMessage('Text successfully extracted from image.');

        // Add the activity logging here
        const timestamp = new Date().toLocaleTimeString();
        addActivity(`${timestamp}: Image uploaded "${file.name}"`);
    } catch (error) {
        console.error('Error extracting text from image:', error);
        showErrorMessage(`Error extracting text from image: ${error.message}. Please try again with a different image.`);
        updateProgress(0);
    } finally {
        hideLoadingMessage();
    }
}

// Add these utility functions for better user feedback
function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.getElementById('file-drop-zone').appendChild(errorDiv);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.getElementById('file-drop-zone').appendChild(successDiv);
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message, .success-message');
    errorMessages.forEach(msg => msg.remove());
}

function showLoadingMessage(message) {
    const loadingDiv = document.getElementById('loading-indicator') || document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.textContent = message;
    document.getElementById('file-drop-zone').appendChild(loadingDiv);
}

function hideLoadingMessage() {
    const loadingDiv = document.getElementById('loading-indicator');
    if (loadingDiv) loadingDiv.remove();
}

// Update the extractTextFromImage function to use Tesseract.js
async function extractTextFromImage(file) {
    try {
        const result = await Tesseract.recognize(file, 'eng', {
            logger: m => {
                if (m.status === 'recognizing text') {
                    updateProgress(Math.round(m.progress * 100));
                }
            }
        });
        return result.data.text;
    } catch (error) {
        console.error('Tesseract error:', error);
        throw new Error('Failed to extract text from image');
    }
}
// The rest of your code remains the same...

let currentPdf = null;

function handlePdfUpload(file) {
    const reader = new FileReader();
    reader.onload = function() {
        const typedarray = new Uint8Array(this.result);
        updateProgress(10);

        pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
            currentPdf = pdf;
            const maxPages = pdf.numPages;
            updatePageSelector(maxPages);

            // Extract text from the first page by default
            extractTextFromPage(1);

            updateProgress(100);
            addPoints(10);
            
            const timestamp = new Date().toLocaleTimeString();
            addActivity(`${timestamp}: PDF uploaded "${file.name}"`);

            // Show the PDF navigation controls
            document.getElementById('pdf-navigation').style.display = 'block';
        });
    };
    reader.readAsArrayBuffer(file);
}

function updatePageSelector(maxPages) {
    const pageSelect = document.getElementById('page-select');
    pageSelect.innerHTML = '';
    for (let i = 1; i <= maxPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Page ${i}`;
        pageSelect.appendChild(option);
    }
}

function extractTextFromPage(pageNumber) {
    if (!currentPdf) return;

    currentPdf.getPage(pageNumber).then(function(page) {
        page.getTextContent().then(function(textContent) {
            const text = textContent.items.map(item => item.str).join(' ');
            document.getElementById('current-page-text').textContent = text;
            textInput.value = text;
        });
    });
}

// Add event listener for page navigation
document.getElementById('go-to-page').addEventListener('click', function() {
    const pageNumber = parseInt(document.getElementById('page-select').value);
    extractTextFromPage(pageNumber);
});
function updateProgress(value) {
    progress.style.width = `${value}%`;
    document.getElementById('progress-percentage').textContent = `${value}%`;
    
    const loadingIndicator = document.getElementById('loading-indicator');
    if (value > 0 && value < 100) {
        loadingIndicator.style.display = 'block';
    } else {
        loadingIndicator.style.display = 'none';
    }
}


fileDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    fileDropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
});

fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
});
    function updateProgress(value) {
        progress.style.width = `${value}%`;
    }

    function addPoints(value) {
        points += value;
        document.getElementById('points-value').textContent = points;
        checkAchievements();
    }

    function updateStreak() {
        streak++;
        document.getElementById('streak-value').textContent = streak;
        checkAchievements();
    }

    function checkAchievements() {
        if (points >= 100 && badges === 0) {
            badges++;
            document.getElementById('badges-value').textContent = badges;
            alert('Congratulations! You\'ve earned the "Reading Enthusiast" badge!');
        }
        if (streak >= 7 && badges === 1) {
            badges++;
            document.getElementById('badges-value').textContent = badges;
            alert('Wow! You\'ve earned the "Consistent Reader" badge for a 7-day streak!');
        }
    }

    function readAloud(text, callback) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices[voiceSelect.value];
        utterance.rate = rateRange.value;
        utterance.onend = callback;
        synth.speak(utterance);
    }

    let timerInterval;
    let totalSeconds = 0;
    let dailyGoal = 30 * 60; // Default 30 minutes
    let annotations = [];

    
    // Populate language select
    const languages = ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'ja-JP'];
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = new Intl.DisplayNames([lang], { type: 'language' }).of(lang);
        languageSelect.appendChild(option);
    });

    function updatePitch() {
        pitchValue.textContent = pitchRange.value;
        if (utterance) utterance.pitch = parseFloat(pitchRange.value);
    }

    function updateVolume() {
        volumeValue.textContent = volumeRange.value;
        if (utterance) utterance.volume = parseFloat(volumeRange.value);
    }

    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            totalSeconds++;
            updateTimerDisplay();
            updateGoalProgress();
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
    }

    function updateTimerDisplay() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        timerDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(num) {
        return num.toString().padStart(2, '0');
    }

    function updateGoalProgress() {
        const progress = (totalSeconds / dailyGoal) * 100;
        goalProgress.style.width = `${Math.min(progress, 100)}%`;
        goalProgress.textContent = `${Math.round(progress)}%`;
    }

    function addNote() {
        const note = noteInput.value.trim();
        if (note) {
            annotations.push({ text: note, timestamp: new Date() });
            renderAnnotations();
            noteInput.value = '';
        }
    }

    function renderAnnotations() {
        annotationList.innerHTML = annotations.map(annotation => `
            <div class="annotation">
                <p>${annotation.text}</p>
                <small>${annotation.timestamp.toLocaleString()}</small>
            </div>
        `).join('');
    }

    function changeTheme(theme) {
        document.body.className = theme;
    }

    function changeFont(font) {
        document.body.style.fontFamily = font;
    }

    // Event listeners
    pitchRange.addEventListener('input', updatePitch);
    volumeRange.addEventListener('input', updateVolume);
    setGoalButton.addEventListener('click', () => {
        dailyGoal = parseInt(goalTime.value) * 60;
        updateGoalProgress();
    });
    startTimerButton.addEventListener('click', startTimer);
    stopTimerButton.addEventListener('click', stopTimer);
    addNoteButton.addEventListener('click', addNote);
    themeSelect.addEventListener('change', (e) => changeTheme(e.target.value));
    fontSelect.addEventListener('change', (e) => changeFont(e.target.value));

    function startReading() {
        if (synth.speaking) {
            synth.cancel();
        }
    
        words = textInput.value.split(/\s+/);
        const text = words.slice(currentWordIndex).join(' ');
        renderWords(words);
    
        // Add activity for starting to read
        const timestamp = new Date().toLocaleTimeString();
        const previewText = text.slice(0, 30) + (text.length > 30 ? '...' : '');
        
    
        utterance = new SpeechSynthesisUtterance(text);
        utterance.onboundary = onBoundary;
        utterance.voice = voices[voiceSelect.value];
        utterance.rate = rateRange.value;
        utterance.lang = languageSelect.value;
        utterance.pitch = parseFloat(pitchRange.value);
        utterance.volume = parseFloat(volumeRange.value);
        synth.speak(utterance);
        posTagging(textInput.value);
        isReading = true;
        fab.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function stopReading() {
        synth.cancel();
        isReading = false;
        fab.innerHTML = '<i class="fas fa-microphone"></i>';
    }

    function onBoundary(event) {
        if (event.name === 'word') {
            const charIndex = event.charIndex;
            const wordIndex = getWordIndex(charIndex);
            highlightWord(wordIndex + currentWordIndex);
        }
    }

    function getWordIndex(charIndex) {
        let totalChars = 0;
        for (let i = 0; i < words.slice(currentWordIndex).length; i++) {
            totalChars += words[i].length + 1; // +1 for the space character
            if (totalChars > charIndex) return i;
        }
        return -1;
    }

    function highlightWord(index) {
        const spans = highlightedText.querySelectorAll('span');
        spans.forEach(span => span.style.backgroundColor = '');
        if (spans[index]) spans[index].style.backgroundColor = colorPicker.value;
    }

    function renderWords(words) {
        highlightedText.innerHTML = words.map((word, index) => `<span class="word" data-index="${index}">${word}</span>`).join(' ');
        highlightedText.querySelectorAll('.word').forEach(span => {
            span.addEventListener('click', () => setStartWord(span.dataset.index));
        });
    }

    function setStartWord(index) {
        currentWordIndex = parseInt(index);
        startReading();
    }

    function posTagging(text) {
        const doc = nlp(text);
        const nouns = doc.nouns().out('array');
        const verbs = doc.verbs().out('array');
        const adverbs = doc.adverbs().out('array');
        const pronouns = doc.pronouns().out('array');
        const adjectives = doc.adjectives().out('array');

        document.getElementById('nouns').innerText = `Nouns: ${nouns.join(', ')}`;
        document.getElementById('verbs').innerText = `Verbs: ${verbs.join(', ')}`;
        document.getElementById('adverbs').innerText = `Adverbs: ${adverbs.join(', ')}`;
        document.getElementById('pronouns').innerText = `Pronouns: ${pronouns.join(', ')}`;
        document.getElementById('adjectives').innerText = `Adjectives: ${adjectives.join(', ')}`;
    }

    function updateRate() {
        rateValue.textContent = rateRange.value;
    }

    async function summarizeText() {
        const text = textInput.value;
        if (!text) {
            alert('Please input some text before generating a summary.');
            return;
        }
    
        const apiKey = '**************************';
        const summaryContainer = document.getElementById('summaryText');
        summaryContainer.innerHTML = '<p>Generating summary... Please wait.</p><div class="loader"></div>';
    
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/google/pegasus-multi_news', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: text,
                    parameters: {
                        max_length: 1500,
                        min_length: 40,
                        no_repeat_ngram_size: 3,
                        num_beams: 4,
                        temperature: 0.7
                    }
                })
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API error: ${errorData.error || response.statusText}`);
            }
    
            const data = await response.json();
            if (!data || !data[0] || !data[0].summary_text) {
                throw new Error('Unexpected response format from API');
            }
    
            const summary = data[0].summary_text;
            summaryContainer.innerHTML = summary;
            addPoints(15);
        } catch (error) {
            summaryContainer.innerHTML = `Error generating summary: ${error.message}. Please try again.`;
            console.error('Summary generation error:', error);
        }
    }
    
    async function askQuestion() {
        const text = textInput.value;
        const question = document.getElementById('questionInput').value;
        await fetchAnswerFromAPI(text, question);
    }

    async function fetchAnswerFromAPI(text, question) {
        const apiKey = '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';
    
        try {
            const response = await fetch('https://api-inference.huggingface.co/models/distilbert-base-cased-distilled-squad', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: {
                        question: question,
                        context: text
                    }
                })
            });
    
            if (!response.ok) {
                const error = await response.json();
                document.getElementById('answerText').innerText = `Error: ${error.error}`;
                console.error('API Error:', error);
                return;
            }
    
            const data = await response.json();
            if (data && data.answer) {
                const answer = data.answer;
                document.getElementById('answerText').innerText = answer;
                addPoints(5);
            } else {
                document.getElementById('answerText').innerText = 'Error: Unexpected response format';
                console.error('Unexpected response format:', data);
            }
        } catch (error) {
            document.getElementById('answerText').innerText = `Error: ${error.message}`;
            console.error('Fetch Error:', error);
        }
    }
    async function searchMeaning() {
        const word = document.getElementById('wordInput').value;
        if (!word) {
            alert('Please enter a word to search for its meaning.');
            return;
        }
        await fetchMeaningFromAPI(word);
    }

    // Add these variables at the top of the file with other global variables
let vocabularyList = [];
let currentPracticeIndex = 0;

// Add these functions to the script

function addWordToVocabulary() {
    const newWord = document.getElementById('new-word').value.trim().toLowerCase();
    if (newWord && !vocabularyList.some(item => item.word === newWord)) {
        fetchMeaningFromAPI(newWord).then(meaning => {
            vocabularyList.push({
                word: newWord,
                meaning: meaning,
                lastPracticed: null,
                interval: 1
            });
            renderVocabularyList();
            document.getElementById('new-word').value = '';
            addPoints(2);
        });
    }
}

function renderVocabularyList() {
    const vocabularyListElement = document.getElementById('vocabulary-list');
    vocabularyListElement.innerHTML = vocabularyList.map(item => `
        <div class="vocabulary-item">
            <h3>${item.word}</h3>
            <p>${item.meaning}</p>
            <small>Last practiced: ${item.lastPracticed ? new Date(item.lastPracticed).toLocaleDateString() : 'Never'}</small>
        </div>
    `).join('');
}

function practiceVocabulary() {
    if (vocabularyList.length === 0) {
        alert('Add some words to your vocabulary list first!');
        return;
    }

    const now = new Date();
    const wordsToStudy = vocabularyList.filter(item => 
        !item.lastPracticed || (now - new Date(item.lastPracticed)) / (1000 * 60 * 60 * 24) >= item.interval
    );

    if (wordsToStudy.length === 0) {
        alert('Great job! You\'ve studied all your words for now. Check back later!');
        return;
    }

    currentPracticeIndex = 0;
    showPracticeWord(wordsToStudy);
}

function showPracticeWord(wordsToStudy) {
    if (currentPracticeIndex >= wordsToStudy.length) {
        alert('Great job! You\'ve finished practicing your vocabulary for now.');
        return;
    }

    const word = wordsToStudy[currentPracticeIndex];
    const userAnswer = prompt(`What's the meaning of "${word.word}"?`);

    if (userAnswer) {
        const isCorrect = userAnswer.toLowerCase().includes(word.meaning.toLowerCase());
        alert(isCorrect ? 'Correct!' : `Not quite. The meaning is: ${word.meaning}`);

        word.lastPracticed = new Date();
        if (isCorrect) {
            word.interval *= 2;
            addPoints(5);
        } else {
            word.interval = 1;
        }

        currentPracticeIndex++;
        showPracticeWord(wordsToStudy);
    }
}

// Add these event listeners in the DOMContentLoaded event handler
document.getElementById('add-word').addEventListener('click', addWordToVocabulary);
document.getElementById('practice-vocabulary').addEventListener('click', practiceVocabulary);

// Modify the fetchMeaningFromAPI function to return the meaning
async function fetchMeaningFromAPI(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return 'No meaning found for this word.';
        }

        const data = await response.json();
        if (data && data[0] && data[0].meanings) {
            return data[0].meanings[0].definitions[0].definition;
        } else {
            return 'No meaning found for this word.';
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        return 'Error fetching meaning.';
    }
}

    function downloadFlashcards(partOfSpeech) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;

        const words = document.getElementById(partOfSpeech).innerText;
        const title = `${partOfSpeech.charAt(0).toUpperCase() + partOfSpeech.slice(1)}`;

        const backgroundColors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9'];
        const textColors = ['#424242', '#616161', '#757575', '#9E9E9E'];

        const backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        const textColor = textColors[Math.floor(Math.random() * textColors.length)];

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = textColor;
        ctx.font = '40px Roboto';
        ctx.fillText(title, 20, 60);

        ctx.font = '30px Roboto';
        let y = 120;
        const lineHeight = 40;
        const margin = 20;
        let line = '';

        words.split(' ').forEach((word, index) => {
            const testLine = line + word + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > canvas.width - margin * 2) {
                ctx.fillText(line, margin, y);
                line = word + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        });
        ctx.fillText(line, margin, y);

        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${partOfSpeech}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        addPoints(5);
    }


    document.getElementById('downloadNounsFlashcard').addEventListener('click', () => downloadFlashcards('nouns'));
document.getElementById('downloadVerbsFlashcard').addEventListener('click', () => downloadFlashcards('verbs'));
document.getElementById('downloadAdverbsFlashcard').addEventListener('click', () => downloadFlashcards('adverbs'));
document.getElementById('downloadPronounsFlashcard').addEventListener('click', () => downloadFlashcards('pronouns'));
document.getElementById('downloadAdjectivesFlashcard').addEventListener('click', () => downloadFlashcards('adjectives'));
    function populateVoiceList() {
        voices = synth.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach((voice, index) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = index;
            voiceSelect.appendChild(option);
        });
    }

    // Add these variables at the top of your file
let currentPosWordIndex = 0;
let currentSummaryWordIndex = 0;

function readTextWithHighlighting(elementId, startIndex = 0) {
    const element = document.getElementById(elementId);
    const words = element.innerText.split(/\s+/);
    element.innerHTML = words.map((word, index) => 
        `<span class="word" data-index="${index}">${word}</span>`
    ).join(' ');

    // Create a new utterance starting from the selected word
    const utterance = new SpeechSynthesisUtterance(words.slice(startIndex).join(' '));
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = rateRange.value;

    let currentIndex = startIndex;
    utterance.onboundary = function(event) {
        if (event.name === 'word') {
            if (currentIndex > 0) {
                element.querySelectorAll('span')[currentIndex - 1].style.backgroundColor = '';
            }
            element.querySelectorAll('span')[currentIndex].style.backgroundColor = colorPicker.value;
            currentIndex++;
        }
    };

    utterance.onend = function() {
        element.querySelectorAll('span').forEach(span => span.style.backgroundColor = '');
    };

    synth.speak(utterance);

    // Add click event listeners to each word
    element.querySelectorAll('.word').forEach(span => {
        span.addEventListener('click', () => {
            const index = parseInt(span.dataset.index);
            if (elementId === 'posTags') {
                currentPosWordIndex = index;
                readTextWithHighlighting('posTags', currentPosWordIndex);
            } else if (elementId === 'summaryText') {
                currentSummaryWordIndex = index;
                readTextWithHighlighting('summaryText', currentSummaryWordIndex);
            }
        });
    });


    utterance.onend = function() {
        element.querySelectorAll('span').forEach(span => span.style.backgroundColor = '');
    };

    synth.speak(utterance);

    // Add click event listeners to each word
    element.querySelectorAll('.word').forEach(span => {
        span.addEventListener('click', () => {
            const index = parseInt(span.dataset.index);
            if (elementId === 'posTags') {
                currentPosWordIndex = index;
                readTextWithHighlighting('posTags', currentPosWordIndex);
            } else if (elementId === 'summaryText') {
                currentSummaryWordIndex = index;
                readTextWithHighlighting('summaryText', currentSummaryWordIndex);
            }
        });
    });
}





    // Event listeners
    startButton.addEventListener('click', () => {
        readAloud('', startReading);
        addPoints(5);
        
    });
    stopButton.addEventListener('click', stopReading);
    summarizeButton.addEventListener('click', () => {
        summarizeText();
        addPoints(15);
    });
    rateRange.addEventListener('input', updateRate);

  readPosButton.addEventListener('click', () => {
    ['nouns', 'verbs', 'adverbs', 'pronouns', 'adjectives'].forEach(pos => readTextWithHighlighting(pos));
    addPoints(10);
});

readSummaryButton.addEventListener('click', () => {
    readTextWithHighlighting('summaryText');
    addPoints(5);
});
    stopPosButton.addEventListener('click', () => {
        synth.cancel();
        ['nouns', 'verbs', 'adverbs', 'pronouns', 'adjectives'].forEach(pos => {
            document.getElementById(pos).querySelectorAll('span').forEach(span => span.style.backgroundColor = '');
        });
    });
  
    stopSummaryButton.addEventListener('click', () => {
        synth.cancel();
        document.getElementById('summaryText').querySelectorAll('span').forEach(span => span.style.backgroundColor = '');
    });
    qaButton.addEventListener('click', () => {
        askQuestion();
        addPoints(5);
    });
    searchButton.addEventListener('click', () => {
        searchMeaning();
        addPoints(3);
    });

    // Flashcard download buttons
    document.getElementById('downloadNounsFlashcard').addEventListener('click', () => downloadFlashcards('nouns'));
    document.getElementById('downloadVerbsFlashcard').addEventListener('click', () => downloadFlashcards('verbs'));
    document.getElementById('downloadAdverbsFlashcard').addEventListener('click', () => downloadFlashcards('adverbs'));
    document.getElementById('downloadPronounsFlashcard').addEventListener('click', () => downloadFlashcards('pronouns'));
    document.getElementById('downloadAdjectivesFlashcard').addEventListener('click', () => downloadFlashcards('adjectives'));

    // FAB functionality
   // Remove or comment out the existing FAB event listener
// fab.addEventListener('click', () => {
//     if (!isReading) {
//         startReading();
//     } else {
//         stopReading();
//     }
// });



// Existing FAB functionality (replace with new event listener)
fab.addEventListener('click', toggleVoiceAssistant);


// Modify the readPos function
function readPos() {
    readTextWithHighlighting('posTags', currentPosWordIndex);
}

// Modify the readSummary function
function readSummary() {
    readTextWithHighlighting('summaryText', currentSummaryWordIndex);
}

function stopPos() {
    document.getElementById('stopPosButton').click();
}



function stopSummary() {
    document.getElementById('stopSummaryButton').click();
}

// Existing FAB functionality (replace with new event listener)
fab.addEventListener('click', toggleVoiceAssistant);

function toggleVoiceAssistant() {
    if (!isListening) {
        startVoiceAssistant();
    } else {
        stopVoiceAssistant();
    }
}

function startVoiceAssistant() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            isListening = true;
            fab.classList.add('listening');
            fab.innerHTML = '<i class="fas fa-stop"></i>';
            console.log('Voice assistant is listening.');
        };

        recognition.onresult = (event) => {
            const command = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
            console.log('Command:', command);
            executeCommand(command);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
        };

        recognition.onend = () => {
            isListening = false;
            fab.classList.remove('listening');
            fab.innerHTML = '<i class="fas fa-microphone"></i>';
            console.log('Voice assistant stopped listening.');
        };

        recognition.start();
    } else {
        console.log('Web Speech API is not supported in this browser.');
        alert('Voice assistant is not supported in this browser.');
    }
}

function stopVoiceAssistant() {
    if (recognition) {
        recognition.stop();
    }
}

function executeCommand(command) {
    if (command.includes('start reading')) {
        startReading();
    } else if (command.includes('stop reading')) {
        stopReading();
    } else if (command.includes('summarize')) {
        summarizeText();
    } else if (command.includes('ask question')) {
        const question = prompt('What is your question?');
        if (question) {
            document.getElementById('questionInput').value = question;
            askQuestion();
        }
    } else if (command.includes('practice vocabulary')) {
        practiceVocabulary();
    } else if (command.includes('read parts of speech')) {
        readPos();
    } else if (command.includes('stop  parts of speech')) {
        stopPos();
    } else if (command.includes('read summary')) {
        readSummary();
    } else if (command.includes('stop summary')) {
        stopSummary();
    } else {
        console.log('Command not recognized');
        // Optionally, provide feedback to the user
        // speak("I'm sorry, I didn't understand that command.");
    }
}

// Optional: Add this function to provide audio feedback
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Intersection Observer for fade-in animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Initialize voices
synth.onvoiceschanged = populateVoiceList;
populateVoiceList();

// Update streak (in a real app, this would be done daily)
setInterval(updateStreak, 86400000); // 24 hours

    
    // Initialize voices
    synth.onvoiceschanged = populateVoiceList;
    populateVoiceList();

    // Update streak (in a real app, this would be done daily)
    setInterval(updateStreak, 86400000); // 24 hours
});
