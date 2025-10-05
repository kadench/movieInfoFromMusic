// In reality, the goal of this project wants to be a Shazam like app where it can record the
// audio and give you the movie it's from, but seeing as that's probably too ambitious, I will 
// stick with metadata for now. We'll see how far I get.

// Define const HTML variables
const findButton = document.getElementById("findMovie"); // submit button
const movieSection = document.getElementById("musicMovie"); // main div where movie return is put

// API LIMITS
let lastSuccessfulCall = null;
let lastCall = null;
let callCap = 10;

const movieInfo = { // movie info
    title: null, // title of the film
    director: null, // director name of the film
    ageRating: null, // G, PG, PG-13, R, etc.
    trailerLink: null // preferably YouTube iframe link
}

const addressForm = document.getElementById("addressForm");

async function inputHandler(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    //
    // Handle the submission of a music link
    //
    const con = checkCallLimit(); 
    if (con) {
        // Fill in the songlink link to get the correct info
        // about the song
        const givenLink = document.getElementById("addressLink").value;
        const odesliLink = `https://api.song.link/v1-alpha.1/links?url=${encodeURIComponent(givenLink)}`
    
        console.log(`user given link: ${givenLink}`);
        console.log(`link for query: ${odesliLink}`);
        
        // Get song metadata from the return
        const songMetadata = await getLinkMetadata(odesliLink);
        console.log(songMetadata);


    }
}

function checkCallLimit(currentCall = Date.now()) {
    // Define time constants
    const ONE_SEC = 1000;
    const ONE_MIN = 60 * 1000;

    // If the last successful call was a minute ago and cap is 0.
    if (callCap == 0 && lastSuccessfulCall && Math.abs(currentCall - lastSuccessfulCall) >= ONE_MIN) {
        callCap = 10; // Set cap to 10
    }

    // If the last call and current call are not sec apart, fail the attempt
    if (lastCall && (currentCall - lastCall) < ONE_SEC) {
        showError("Limit reached: only one action per second is allowed. Please wait a moment and try again.");
        lastCall = currentCall;
        return false;
    }

    // If call cap is 0 and it hans't been a min yet, fail the attempt
    if (callCap == 0) {
        if (lastSuccessfulCall && (currentCall - lastSuccessfulCall) < ONE_MIN) {
            showError("Limit reached: maximum 10 actions per minute. Please try again later.");
        }
        lastCall = currentCall;
        return false;
    }

    // update successful call time, the cap and the last call, this should pass.
    lastSuccessfulCall = currentCall;
    callCap = callCap - 1;
    lastCall = currentCall;

    return true;
}

function showError(message, source = null) {
    const errorBody = document.getElementById("feedbackP");
    const sourceBody = document.getElementById("sourceP");


    errorBody.innerText = message;
    if (source) {
        sourceBody.innerHTML = `I see you've entered a <strong>${source}</strong> link.`;
    }
    else {
        sourceBody.classList.toggle('hidden');
    }
}

async function getLinkMetadata(APILink) {
    //
    // Returns song title and artist from the link given.
    // Parameters:
    //      - API-Link -- The music link the data is fetched
    //      from
    // Return: an object with the metadata from the fetch.
    //
    try {
        const response = await fetch(APILink); // fetch given link from input
        const data = await response.json(); // turn into JSON
        const entities = data.entitiesByUniqueId;
        for (const key in entities) {
            const obj = entities[key];
            if ('title' in obj && 'artistName' in obj) {
                let title = obj.title;
                let artistName = obj.artistName;
                console.log('title:', title);
                console.log('artistName:', artistName);
                return {
                    title: title,
                    artist: artistName
                };
            }
        }
        // Put warning message for the user saying couldn't find song info
        showError(`Couldn't find any song info about that song. Try another link`);
        return null;
    } catch (error) {
        showError(`Unexpected error: ${error}`);
        return null;
    }
}

findButton.addEventListener("click", () => inputHandler());
addressForm.addEventListener("submit", inputHandler);

// https://open.spotify.com/track/4w3tQBXhn5345eUXDGBWZG?si=e4ad2abba75e4e32
// index 5.
// https://music.apple.com/us/album/seinfeld-theme/1572502516?i=1572502517