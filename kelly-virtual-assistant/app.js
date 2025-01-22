// Select the button element with the class 'talk' and the content element with the class 'content'
const btn = document.querySelector('.talk')
const content = document.querySelector('.content')

// Function to speak a given text using the Web Speech API
function speak(text){
    const text_speak = new SpeechSynthesisUtterance(text);

	// Set properties for the speech (rate, volume, pitch)
    text_speak.rate = 1;// Normal speaking rate
    text_speak.volume = 1; //Maximum volume
    text_speak.pitch = 1;// Normal pitch

	 // Use the Web Speech API to speak the text
    window.speechSynthesis.speak(text_speak);
}

// Function to greet the user based on the current time of day
function wishMe(){
    var day = new Date();
    var hour = day.getHours();
	
// Morning greeting if the time is between 12 AM and 12 PM
	
    if(hour>=0 && hour<12){
        speak("Good Morning Shivam...")
    }

	    // Afternoon greeting if the time is between 12 PM and 5 PM
    else if(hour>12 && hour<17){
        speak("Good Afternoon Master...")
    }

	    // Evening greeting for all other times
    else{
        speak("Good Evenining Sir...")
    }

}

// Event listener to greet the user when the window loads
window.addEventListener('load', ()=>{
    speak("Initializing JARVIS..");
    wishMe();
});

// Initialize SpeechRecognition for voice commands (compatible with Chrome's webkitSpeechRecognition)
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition =  new SpeechRecognition();

// Event triggered when the speech recognition has a result
recognition.onresult = (event)=>{
    const currentIndex = event.resultIndex;// Get the index of the result
    const transcript = event.results[currentIndex][0].transcript;// Get the spoken text
    content.textContent = transcript;// Display the spoken text on the web page
    takeCommand(transcript.toLowerCase());nd

}

// Event listener for the button click to start voice recognitions
btn.addEventListener('click', ()=>{
    content.textContent = "Listening...."// Display a message while listening
    recognition.start(); // Start voice recognition
})


// Function to process user commands
function takeCommand(message){
	// Check for greetings like 'hey' or 'hello'
    if(message.includes('hey') || message.includes('hello')){
        speak("Hello Sir, How May I Help You?");
    }
	       // Open Google
    else if(message.includes("open google")){
        window.open("https://google.com", "_blank");
        speak("Opening Google...")
    }
	      // Open YouTube
    else if(message.includes("open youtube")){
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...")
    }
	    // Open Facebook
    else if(message.includes("open facebook")){
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...")
    }
 // Search for queries starting with 'what is', 'who is', or 'what are'
    else if(message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what i found on internet regarding " + message;
	    speak(finalText);
  
    }
   // Search Wikipedia for the query
    else if(message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
        const finalText = "This is what i found on wikipedia regarding " + message;
        speak(finalText);
    }
// Provide the current time
    else if(message.includes('time')) {
        const time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        const finalText = time;
        speak(finalText);
    }
// Provide the current date
    else if(message.includes('date')) {
        const date = new Date().toLocaleString(undefined, {month: "short", day: "numeric"})
        const finalText = date;
        speak(finalText);
    }
// Open the calculator app
    else if(message.includes('calculator')) {
        window.open('Calculator:///')
        const finalText = "Opening Calculator";
        speak(finalText);
    }

	    // Default case: Search Google for the query if it doesn't match predefined commands
    else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on google";
        speak(finalText);
    }
}
