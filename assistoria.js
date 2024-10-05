let btn = document.querySelector("#btn");
let content = document.querySelector("#content");

function speak(text) {
    let textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = "hi-GN";
    window.speechSynthesis.speak(textSpeak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Maa'm");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Maa'm");
    } else {
        speak("Good evening Maa'm");
    }
}

// Run wishMe on page load
window.addEventListener('load', () => {
    wishMe();
});

// Check for SpeechRecognition support
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    let recognition = new SpeechRecognition();

    // Add console logs to debug
    recognition.onstart = () => {
        console.log("Voice recognition activated. Try speaking into the microphone.");
    };

    recognition.onspeechend = () => {
        console.log("Speech recognition ended.");
        recognition.stop();
    };

    recognition.onerror = (event) => {
        console.log("Error occurred in speech recognition: " + event.error);
    };

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        console.log("You said: " + transcript); // Debugging
        content.innerText = transcript;
        takeCommand(transcript);
    };

    btn.addEventListener("click", () => {
        recognition.start();
        console.log("Speech recognition started"); // Debugging
    });

} else {
    console.error("Speech Recognition not supported by this browser.");
}

function takeCommand(message) {
    message = message.toLowerCase(); // Convert to lowercase for better matching
    if (message.includes("hello") || message.includes("heyy")) {
        console.log("Responding to hello"); // Debugging
        speak("hello maam, how can I help you?")
}
     else if (message.includes("who are you")) {
        console.log("Responding to 'who are you'"); // Debugging
        speak("I am a virtual assistant, created by Khushi Ma'am.");
    } 
    else if(message.includes("open Youtube")){
        console.log("opening Youtube...")
        speak("opening Youtube...")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("open google")){
        console.log("opening google...")
        speak("opening google...")
        window.open("https://www.google.com/","_blank")
    
    }
    else if(message.includes("open calculator")){
        speak("opening calculator...")
        window.open("calculator://")
    }
    else{
        speak(`this is what i found on internet regarding ${message}`)
        window.open(`https://www.google.com/search?q=${message}`)
    }
}
