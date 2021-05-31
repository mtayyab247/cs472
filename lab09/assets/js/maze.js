

"use strict";

(function(){

    var maze = $("#maze");
    var start = $("#start");
    var end = $("#end");
    var statusLabel = $("#status");
    var boundary = $(".boundary");
    var status = false;
    var mazeLeft = false;

    start.on("click", function() {
        status = true;
        mazeLeft = false;
        statusLabel.text("Game Started!");
        statusLabel.css("color", "green");
    });

    boundary.each(function() {
        $(this).on("mouseenter", function() {
            if(status) {
                status = false;
                statusLabel.text("Failed!");
                statusLabel.css("color", "red");
            }
        });
    });

    end.on("mouseenter", function() {
        if(status && !mazeLeft) {
            status = false;
            statusLabel.text("You won!");
            statusLabel.css("color", "green");
        }
    });

    maze.on("mouseleave", function() {
        mazeLeft = true;
    });

    maze.on("mouseenter", function() {
        mazeLeft = false;
    });
    
})();