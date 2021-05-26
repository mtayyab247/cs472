

"use strict";

var textBox;
var start;
var stop;
var animation;
var size;
var speed;

document.addEventListener("DOMContentLoaded", function() {
    textBox = document.getElementById("animation-viewer");
    start = document.getElementById("start");
    stop = document.getElementById("stop");
    animation = document.getElementById("animation");
    size = document.getElementById("size");
    speed = document.getElementById("speed");

    start.onclick = startAnimation;
    stop.onclick = stopAnimation;
    animation.onchange  = changeAnimation;
    size.onchange  = changeSize;
    speed.onchange  = changeSpeed;

    stop.disabled = true;
});

var animationsList = ["Exercise", "Juggler", "Bike", "Dive"];
var currrentAnimation;
var frameList;
var currentFrame;
var timeFrame = 250;
var animationStatus = 0;
var animationDriver;

function startAnimation() {
    animationStatus = 1;
    textBox.value = frameList[0];
    currentFrame = 0;
    animationDriver = setInterval(animate, timeFrame);
    start.disabled = true;
    animation.disabled = true;
    stop.disabled = false;
    speed.disabled = true;
}

function changeAnimation() {textBox.value = "Animation not Available";
    if(animationsList.indexOf(animation.value) == -1) {
        textBox.value = "Animation not Available";
        return;
    }

    currrentAnimation = animation.value;

    frameList = ANIMATIONS[currrentAnimation].split("=====\n");
    textBox.value = frameList[0];
}

function stopAnimation() {
    clearInterval(animationDriver);
    textBox.value = frameList[0];

    start.disabled = false;
    stop.disabled = true;
    animation.disabled = false;
    speed.disabled = false;
}

function changeSize() {
    let fontSize = size.value;
    switch (fontSize) {
        case "tiny":
            textBox.style.fontSize = "7pt";
            break;
        case "small":
            textBox.style.fontSize = "10pt";
            break;
        case "medium":
            textBox.style.fontSize = "12pt";
            break;
        case "large":
            textBox.style.fontSize = "16pt";
            break;
        case "extralarge":
            textBox.style.fontSize = "24pt";
            break;
        case "xxl":
            textBox.style.fontSize = "32pt";
            break;
    }
}

function changeSpeed() {
    if(this.checked) {
        timeFrame = 30;
    } else {
        timeFrame = 250;
    }
}

function animate() {
    if(currentFrame < frameList.length) {
        textBox.value = frameList[currentFrame];
        currentFrame++;
    } else {
        currentFrame = 0;
    }
}