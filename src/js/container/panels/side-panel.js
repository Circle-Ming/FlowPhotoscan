function open_spectral() {
    document.getElementById("spectral").style.display = "";
}

function open_rice() {
    document.getElementById("ricePanel").style.display = "";
}

function close_spectral() {
    document.getElementById("spectral").style.display = "none";
}

function close_rice() {
    document.getElementById("ricePanel").style.display = "none";
}


function openPage(pageName, elmnt) {
    // elmnt.style.cssText = "text-decoreation:underline";
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "white";
        tablinks[i].style.color = "black"
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = "black";
    elmnt.style.color = "white"
}

document.getElementById("defaultSpectral").click();
document.getElementById("defaultRice").click();