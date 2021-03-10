/*
    JavaScript for Hoenn Map Webpage
    Samuel Hohenshell 03/05/2021
    JavaScript was motivated from this article: https://www.chestysoft.com/imagefile/javascript/get-coordinates.asp
*/

function displaySpot(name) {
    // Updating the name of the place
    displayName = name.replace(/_/g, " ");
    document.getElementById("locationName").innerHTML = displayName;

    // Updating the gif
    // NOTE: I can't figure out how to update html this way when adding django-styled src so I had to do relative path
    // ... I do the same thing in dice_rolling.js
    image_html = "<img src=\"/static/projects/images/poke_gifs/" + name + ".gif\" width=\"100%\" >";
    document.getElementById("locationGif").innerHTML = image_html;

    // Updating the audio
    if (name == "lavaridge_town") {
        name = "oldale_town"; // Same town music!
    }
    else if (name == "mauville_city" || name == "mossdeep_city") {
        name = "rustboro_city"; // Same town music!
    }
    audio_html = "<source src=\"/static/projects/audio/poke_audio/" + name + ".mp3\"type=\"audio/mpeg\">Your browser does not support the audio element.";
    player = document.getElementById("pokeMusicPlayer");
    player.innerHTML = audio_html;
    player.load();
    player.play();
}


function updatePage(xRatio, yRatio) {
    // A - Dewford Town
    if ((xRatio > 0.1406) && (xRatio < 0.1640) && (yRatio > 0.7877) && (yRatio < 0.8268)) {
        displaySpot("dewford_town");
    }
    // B - Ever Grande City
    else if ((xRatio > 0.8945) && (xRatio < 0.9160) && (yRatio > 0.5363) && (yRatio < 0.6089)) {
        displaySpot("ever_grande_city");
    }
    // C - Fallarbor Town
    else if ((xRatio > 0.1699) && (xRatio < 0.1914) && (yRatio > 0.1871) && (yRatio < 0.2206)) {
        displaySpot("fallarbor_town");
    }
    // D - Fortree City
    else if ((xRatio > 0.4394) && (xRatio < 0.4648) && (yRatio > 0.1844) && (yRatio < 0.2207)) {
        displaySpot("fortree_city");
    }
    // E - Lavaridge Town
    else if ((xRatio > 0.2305) && (xRatio < 0.2539) && (yRatio > 0.3100) && (yRatio < 0.3547)) {
        displaySpot("lavaridge_town");
    }
    // F - Lilycove City
    else if ((xRatio > 0.6230) && (xRatio < 0.6758) && (yRatio > 0.3156) && (yRatio < 0.3492)) {
        displaySpot("lilycove_city");
    }
    // G - Littleroot Town
    else if ((xRatio > 0.1992) && (xRatio < 0.2227) && (yRatio > 0.6675) && (yRatio < 0.6983)) {
        displaySpot("littleroot_town");
    }
    // H - Mauville City
    else if ((xRatio > 0.3242) && (xRatio < 0.3730) && (yRatio > 0.4469) && (yRatio < 0.4832)) {
        displaySpot("mauville_city");
    }
    // I - Mossdeep City
    else if ((xRatio > 0.8046) && (xRatio < 0.8574) && (yRatio > 0.4050) && (yRatio < 0.4358)) {
        displaySpot("mossdeep_city");
    }
    // J - Oldale Town
    else if ((xRatio > 0.2000) && (xRatio < 0.2227) && (yRatio > 0.5782) && (yRatio < 0.6145)) {
        displaySpot("oldale_town");
    }
    // K - Pacifidlog City
    else if ((xRatio > 0.5937) && (xRatio < 0.6172) && (yRatio > 0.620) && (yRatio < 0.650)) {
        displaySpot("pacifidlog_town");
    }
    // L - Petalburg City
    else if ((xRatio > 0.1069) && (xRatio < 0.1313) && (yRatio > 0.5763) && (yRatio < 0.6087)) {
        displaySpot("petalburg_city");
    }
    // M - Rustboro City
    else if ((xRatio > 0.0761) && (xRatio < 0.1000) && (yRatio > 0.4051) && (yRatio < 0.4769)) {
        displaySpot("rustboro_city");
    }
    // N - Slateport City
    else if ((xRatio > 0.3209) && (xRatio < 0.3436) && (yRatio > 0.6204) && (yRatio < 0.6944)) {
        displaySpot("slateport_city");
    }
    // O - Sootopolis City
    else if ((xRatio > 0.7131) && (xRatio < 0.7342) && (yRatio > 0.4884) && (yRatio < 0.5208)) {
        displaySpot("sootopolis_city");
    }
    // P - Verdanturf Town
    else if ((xRatio > 0.2000) && (xRatio < 0.2204) && (yRatio > 0.4467) && (yRatio < 0.4792)) {
        displaySpot("verdanturf_town");
    }
    else {
        console.log("Selected spot on map with no associated/programmed location. Ignoring.")
    } 
}


function getPosition(oElement) {
    if(typeof(oElement.offsetParent) != "undefined") {
        var posX = 0;
        var posY = 0;
        for(; oElement; oElement = oElement.offsetParent) {
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return [posX, posY];
    }
    else {
        return [oElement.x, oElement.y];
    }
}

function onMapClick(e) {
    // Resetting the map image
    var mapImg = document.getElementById("hoenn_map");
    mapImg.onmousedown = onMapClick;
    
    var posX = 0;
    var posY = 0;
    var imgPos;
    imgPos = getPosition(mapImg);

    if (!e) {
        var e = window.event;
    }
    if (e.pageX || e.pageY) {
        posX = e.pageX;
        posY = e.pageY;
    }
    else if (e.clientX || e.clientY) {
        posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    posX = posX - imgPos[0];
    posY = posY - imgPos[1];

    // Dividing by total width & height to get a ratio. This way, screen-resizing is accounted for.
    var xRatio = posX / mapImg.clientWidth; 
    var yRatio = posY / mapImg.clientHeight;

    // Sending data about the ratio to function to update visuals
    updatePage(xRatio, yRatio); 
}

