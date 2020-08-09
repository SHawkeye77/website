//////////////////////////////////// PLAYLIST SETUP FUNCTIONS ////////////////////////////////////

// Gathers user input and returns object "obtions" for the API call
const gather_user_input = async(link) => {
    // Extracting the playlist ID
    var n = link.search("list=") + 5;
    playlist_id = link.substring(n);

    // Setting up options for first API call
    var options = {
        part : "snippet",
        playlistId : playlist_id,
        pageToken : null,
        key : "AIzaSyCVczF3xCpWyCbxJ4uQGiipteBxuPSxLgw",  // (API key from personal, casual account)
        maxResults : 50,                                  // 50 is the max value allowed for max results
    };

    return options;
}

// Gathers API data then passes it as argument to "fill_video_ids"
const gathering_playlist_data = async(options) => {
    var playlist_api_call = "https://www.googleapis.com/youtube/v3/playlistItems";
    jQuery.getJSON(playlist_api_call, options,
        function call_given_function(result) {  // This function (call_given_function()) will ONLY be called when/if the API request succeeds
            console.log("Completed an API request")
            num_api_calls++;
            fill_video_ids(result, options);
        }
    );
}

// Deals with the gathered json data
const fill_video_ids = async(json_data, options) => {
    // Add all video IDs in this batch to the array
    for (var i=0; i<(json_data.items.length); i++) {
        unshuffled_video_ids.push(json_data.items[i].snippet.resourceId.videoId);
    }

    // Check if there are more videos in the playlist
    if (json_data.nextPageToken != undefined) {
        options["pageToken"] = json_data.nextPageToken;  // Update "pageToken" attribute to the next page
        gathering_playlist_data(options);         // Call fill_video_ids to get next set of video IDs
    }
    else {
        all_api_requests_finished();
    }
}

const all_api_requests_finished = async() => {
    num_vids = unshuffled_video_ids.length;
    shuffled_video_ids = shuffle(unshuffled_video_ids);
    console.log("Original array of video IDs: ")
    console.log(unshuffled_video_ids);
    console.log("Shuffled array of video IDs: ");
    console.log(shuffled_video_ids);

    // Loading player
    player = new YT.Player('player', {
        videoId: shuffled_video_ids[curr_vid], // The code of the initial video to play
        height: '390',
        width: '640',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onPlayerError,
        }
    });
    player_loaded = true;
}

// Shuffle given array using Fisher-Yates (aka Knuth) algorithm
function shuffle(array) {
    let arr_copy = [...array]; // Deep copy so we don't mess with the original
    var currentIndex = arr_copy.length;
    var temporaryValue;
    var randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // ...and swap it with the current element
        temporaryValue = arr_copy[currentIndex];
        arr_copy[currentIndex] = arr_copy[randomIndex];
        arr_copy[randomIndex] = temporaryValue;
    }

    return arr_copy;
}

//////////////////////////////////// PLAYER SETUP & MANAGEMENT ////////////////////////////////////
// Loading the IFrame Player API code asynchronously
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Loading IFrame Player API JavaScript code and constructing video player object
// The API calls onYouTubeIframeAPIReady() on API code download
var player;
function onYouTubeIframeAPIReady() {
    // ... //
}

// Player calls onPlayerReady() whenever the video player is ready
function onPlayerReady(event) {
    event.target.playVideo();    // I think this means whenever a new video is ready it'll play???
}

// Player calls onPlayerStateChange() when the player's state changes (begins playing, becomes paused, finishes, etc.)
function onPlayerStateChange(event) {
    check_mutebox();
    
    if (event.data == YT.PlayerState.ENDED) {
        next_vid_click();
    }
}

function onPlayerError(event) {
    console.log("Error in playback - Video Unavailable. Skipping...")
    next_vid_click();
}

//////////////////////////////////// PLAYLIST MODIFICATION FUNCTIONS ////////////////////////////////////

// Called when "Next Video" button is pressed
function next_vid_click() {
    if (player_loaded) {
        // If we reached the end of the playlist, don't increment curr_vid, just return
        if (curr_vid >= num_vids-1) {
            console.log("Reached end of playlist. Restarting from beginning...");
            curr_vid = 0;
            return;
        }
        curr_vid++;
        player.loadVideoById({'videoId': shuffled_video_ids[curr_vid]})
    }
}

// Called when "Previous Video" button is pressed
function prev_vid_click() {
    if (player_loaded) {    
        // If we reached beginning of the playlist, don't decrement curr_vid, just return
        if (curr_vid <= 0) {
            console.log("Reached beginning of playlist");
            return;
        }
        curr_vid--;
        player.loadVideoById({'videoId': shuffled_video_ids[curr_vid]})
    }
}

function check_mutebox() {
    var mute_box = document.getElementById("mute_button");
    if (mute_box.checked){
        if (player_loaded) {
            player.mute();
        }
    }
    else {
        if (player_loaded) {
            player.unMute();
        }
    }
}

//////////////////////////////////// GLOBAL VARIABLES & APPLICATION START ////////////////////////////////////
var playlist_url, playlist_id, next_page_token;
var unshuffled_video_ids;
var shuffled_video_ids;
var num_api_calls;
var num_vids;
var curr_vid;  // Array index of the current video
var player_loaded

// Main function called by hitting the "Shuffle Playlist" button
const on_shuffle_playlist = async() => {
    // Initializing variables
    shuffled_video_ids = []
    unshuffled_video_ids = []
    curr_vid = 0; 
    player_loaded = false;

    var text = document.getElementById('playlist_link').value;
    num_api_calls = 0;
    // Parsing user input and returning "ops" object for API call
    const ops = await gather_user_input(text);
    const result = await gathering_playlist_data(ops);
}


