

"use strict"

document.addEventListener("DOMContentLoaded", function() {
    // alert("DOM Loaded");

    addFields();
    attachEvents();
    
});

let textArea;
let bigger;
let checkBox;

let addFields = function() {
    let contentWrapper = document.getElementById("content-wrapper");

    let textAreaFieldSet = document.createElement("FIELDSET");
    let textAreaLegend = document.createElement("LEGEND");
    textAreaLegend.innerText = "Text";
    textArea = document.createElement("TEXTAREA");
    textArea.innerHTML = "Sample Item 1\nSample Item 2";
    textArea.setAttribute("id", "textarea");
    textArea.setAttribute("rows", 4);
    textArea.setAttribute("cols", 30);
    textArea.style.textAlign = "right";
    textArea.style.fontSize = "14px";

    textAreaFieldSet.appendChild(textAreaLegend);
    textAreaFieldSet.appendChild(textArea);
    contentWrapper.appendChild(textAreaFieldSet);


    let decorationFieldSet = document.createElement("FIELDSET");
    let decorationLegend = document.createElement("LEGEND");
    decorationLegend.innerText = "Decoration";

    bigger = document.createElement("BUTTON");
    textArea.setAttribute("id", "bigger");
    bigger.innerText = "Bigger Decoration";

    let checkBoxWrapper = document.createElement("DIV");
    checkBoxWrapper.setAttribute("id", "checkbox-wrapper");

    checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("id", "checkbox");

    let label = document.createElement("LABEL");
    label.innerText = "Bling"

    checkBoxWrapper.appendChild(checkBox);
    checkBoxWrapper.appendChild(label);

    decorationFieldSet.appendChild(decorationLegend);
    decorationFieldSet.appendChild(bigger);
    decorationFieldSet.appendChild(checkBoxWrapper);
    contentWrapper.appendChild(decorationFieldSet);
    
    attachEvents();
}

let attachEvents = function() {
    bigger.addEventListener("click", makeTextBigger);
    checkBox.addEventListener("click", changeFontWeight);
}

let makeTextBigger = function() {
    let interval = setInterval(function() {
        textArea.style.fontSize = parseInt(textArea.style.fontSize) + 2 + "px";
    }, 500);
}

let changeFontWeight = function() {
    if(checkBox.checked) {
        makeFontBold();
    } else {
        makeFontNormal();
    }
}

let makeFontBold = function() {

    textArea.style.fontWeight = "bold";
}

let makeFontNormal = function() {
    textArea.style.fontWeight = "normal";
}

