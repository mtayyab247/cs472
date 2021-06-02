

"use strict";

jQuery(function($) {


    let puzzleArea = $('#puzzlearea');
    let divs = puzzleArea.find("div");

    let posStatus = [];
    const rowsLength = 3;
    const colsLength = 3;
    const totalPuzzles = divs.length;

    let init = function() {
        
        // initialize each piece
        for (var i=0; i< totalPuzzles; i++) {
            var div = divs[i];
            
            // calculate x and y for this piece
            var x = ((i % 4) * 100) ;
            var y = (Math.floor(i / 4) * 100) ;

            // set basic style and background
            div.className = "puzzlepiece";
            div.style.left = x + 'px';
            div.style.top = y + 'px';
            div.style.backgroundImage = 'url("assets/img/background.jpg")';
            div.style.backgroundPosition = -x + 'px ' + (-y) + 'px';
            
            // store x and y for later
            div.x = x;
            div.y = y;

            posStatus.push({x: Math.floor(i / 4), y: Math.floor(i % 4), status: true});
        }
        posStatus.push({x: 3, y: 3, status: false});      
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

        let i = -1;
        if(posStatus[curIndex + 1] && posStatus[curIndex + 1].status === false) {
            i = adjPos.findIndex(p => p.x === posStatus[curIndex + 1].x && p.y === posStatus[curIndex + 1].y);
            adjPos[i].newIndex = curIndex + 1;
        } else if(posStatus[curIndex - 1] && posStatus[curIndex - 1].status === false) {
            i = adjPos.findIndex(p => p.x === posStatus[curIndex - 1].x && p.y === posStatus[curIndex - 1].y);
            adjPos[i].newIndex = curIndex - 1;
        } else if(posStatus[curIndex + 4] && posStatus[curIndex + 4].status === false) {
            i = adjPos.findIndex(p => p.x === posStatus[curIndex + 4].x && p.y === posStatus[curIndex + 4].y);
            adjPos[i].newIndex = curIndex + 4;
        } if(posStatus[curIndex - 4] &&posStatus[curIndex - 4].status === false) {            
            i = adjPos.findIndex(p => p.x === posStatus[curIndex - 4].x && p.y === posStatus[curIndex - 4].y);
            adjPos[i].newIndex = curIndex - 4;
        }

        if(i === -1) {
            return null;
        } else {
            adjPos[i].oldIndex = curIndex;
            return adjPos[i];
        }

    }
    
    $.each(divs, function() {
        $(this).on('click', function() {
            moveTo(getEmptyIndex($(this)), $(this));
        });
    });

    let moveTo = function(newPos, item, shuffle) {

        if(newPos !== null) {
            item.css('left', newPos.y * 100);
            item.css('top', newPos.x * 100);
            
            
            if(!shuffle) {
                posStatus[newPos.oldIndex].status = false;
            } else {
                emptyItemCheckMoves.push({old: newPos.oldIndex, new: newPos.newIndex});
            }
            posStatus[newPos.newIndex].status = true;
            
            posStatus[newPos.newIndex].x = newPos.x;
            posStatus[newPos.newIndex].y = newPos.y;

            item.attr('data-id', newPos.newIndex + 1);
        }
    }


    function randomNumber(min, max){
        const r = Math.random()*(max-min) + min
        return Math.floor(r)
    }

    
    let emptyItemCheckMoves = [];
    $('#shufflebutton').on('click', function() {
        
        let shufflePos = [];
        let num;
        function getUniqueNum() {
            num = randomNumber(0, 16);
            if(shufflePos.findIndex(n => n.newIndex === num ) >= 0) {
                getUniqueNum();
            }
        }
        
        for(let i = 1; i <= totalPuzzles; i++) {
            getUniqueNum();
            var x = Math.floor(num / 4);
            var y = Math.floor(num % 4);
            
            shufflePos.push({x: x, y: y, newIndex: num});
        }
        
        (function() {
            let index;
            let $this;
            $.each(divs, function(div) {
                $this = $(this);
                index = parseInt($this.attr('data-id')) - 1;
                shufflePos[index].oldIndex = index;
                moveTo(shufflePos[parseInt($this.attr('data-id')) - 1], $this, true);
                
            });
        })();

        (function() {
            let moveIndex;
            let emptyPuzzleReciprocal = totalPuzzles;

            while( (moveIndex = emptyItemCheckMoves.findIndex(m => m.new === emptyPuzzleReciprocal)) >= 0 ) {
                emptyPuzzleReciprocal = emptyItemCheckMoves[moveIndex].old;
            }
            
            posStatus[emptyPuzzleReciprocal].status = false;
        })();
        
    });


}(jQuery));