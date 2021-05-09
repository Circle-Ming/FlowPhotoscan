function openSidePanel() {
    document.getElementById("sidePanel").style.display = "";
}

function closeSidePanel() {
    document.getElementById("sidePanel").style.display = "none";
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

document.getElementById("defaultOpen").click();