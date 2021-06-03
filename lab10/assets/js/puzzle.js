

"use strict";

jQuery(function($) {


    let puzzleArea = $('#puzzlearea');
    let divs = puzzleArea.find("div");

    let posStatus = [];
    const totalPuzzles = divs.length;
    
    const bg = 'url("assets/img/background.jpg")';

    let drawPuzzle = function() {
        for (var i = 0; i < totalPuzzles; i++) {
            var div = divs[i];
            div.style.backgroundPosition = posStatus[i].bgPos;
            div.style.backgroundImage = posStatus[i].bg;
            $(div).text(posStatus[i].val);
            $(div).css('border-color', posStatus[i].borderC);
        }
    }


    let init = function() {
        
        // initialize each piece
        for (var i = 0; i < totalPuzzles; i++) {
            var div = divs[i];
            
            // calculate x and y for this piece
            var x = ((i % 4) * 100) ;
            var y = (Math.floor(i / 4) * 100) ;

            // set basic style and background
            div.className = "puzzlepiece";
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            
            // store x and y for later
            div.x = x;
            div.y = y;
            
            if(i === totalPuzzles - 1) {
                posStatus.push({
                    x: 3,
                    y: 3,
                    status: false,
                    bg: "",
                    bgPos: null,
                    val: "",
                    index: totalPuzzles,
                    borderC: 'transparent',
                });
            } else {
                
                div.style.backgroundImage = bg;
                posStatus.push({
                    x: Math.floor(i / 4),
                    y: Math.floor(i % 4),
                    status: true,
                    bg: bg,
                    bgPos: -x + 'px ' + (-y) + 'px',
                    val: i + 1,
                    index: i + 1,
                    borderC: 'black',
                });
            }
        }
        
        drawPuzzle();
    };
    init();

    let getEmptyIndex = function(piece) {
        
        let curIndex = parseInt(piece.attr('data-id')) - 1;
        let curIndexX = posStatus[curIndex].x;
        let curIndexY = posStatus[curIndex].y;
        
        let adjPos = [
            {x: curIndexX + 1, y: curIndexY},
            {x: curIndexX - 1, y: curIndexY},
            {x: curIndexX, y: curIndexY + 1},
            {x: curIndexX, y: curIndexY - 1}
        ];
        adjPos = {
            newIndex: null,
            oldIndex: null
        };

        let i = -1;
        if(posStatus[curIndex + 1] && posStatus[curIndex + 1].status === false) {
            i = curIndex + 1;
        } else if(posStatus[curIndex - 1] && posStatus[curIndex - 1].status === false) {
            i = curIndex - 1;
        } else if(posStatus[curIndex + 4] && posStatus[curIndex + 4].status === false) {
            i = curIndex + 4;
        } if(posStatus[curIndex - 4] &&posStatus[curIndex - 4].status === false) {            
            i = curIndex - 4;
        }

        if(i === -1) {
            return null;
        } else {
            adjPos.newIndex = i;
            adjPos.oldIndex = curIndex;
            return adjPos;
        }

    }
    
    $.each(divs, function() {

        // Click
        $(this).on('click', function() {
            moveTo(getEmptyIndex($(this)));
            drawPuzzle();
        });

        // Hover
        $(this).on('mouseenter', function() {
            let $this = $(this);
            if(getEmptyIndex($this) !== null) {
                $this.addClass("movablepiece");
            }
        });

        $(this).on('mouseleave', function() {
            let $this = $(this);
            $(this).removeClass("movablepiece");
        });
    });


    let moveTo = function(newPos) {
        if(newPos !== null) {
            var tmp = posStatus[newPos.newIndex]
            posStatus[newPos.newIndex] = posStatus[newPos.oldIndex];
            posStatus[newPos.oldIndex] = tmp;
        }
    }

    $('#shufflebutton').on('click', function() {
        posStatus = posStatus.sort(() => Math.random() - 0.5);
        drawPuzzle();
    });
    

}(jQuery));