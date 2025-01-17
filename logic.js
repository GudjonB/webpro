var game = {boxes:"", _id: "", difficulty: "", dateGenerated: ""};

function getSudoku(setting) {

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: setting })
    
    .then(function (response) {
        //When successful, print 'Success: ' and the received data
        console.log("Success: ", response.data);
        game = response.data.board;
    })
    .catch(function (error) {
        //When unsuccessful, print the error.
        console.log(error);
        if (setting == 'easy') { // and pick the right default game by difficulty selector
            game.boxes = [[5,6,4,'.','.',3,2,'.',1],[8,7,2,'.',1,'.',3,9,'.'],[3,9,1,'.','.','.','.','.',5],
                        [4,2,9,6,5,7,3,1,8],['.','.',8,2,3,1,9,4,7],[7,1,3,8,4,9,5,2,6],
                        ['.','.',6,'.',3,5,8,4,2],[4,2,3,7,8,9,1,'.','.'],['.',5,8,2,6,4,9,3,7]];
            game._id = "-1";
        } else if (setting == 'medium') {
            game.boxes = [[8,7,'.','.',4,'.',6,2,5],[4,5,'.','.',2,'.','.',1,'.'],[2,1,'.',8,5,'.','.',9,'.'],
                          [7,6,'.',5,'.',4,'.',8,'.'],[9,3,1,8,6,2,5,'.',7],[5,4,8,3,'.',1,9,6,2],
                          [2,'.',7,9,5,8,4,'.',6],['.',9,4,6,7,3,2,'.',5],['.','.',5,1,'.',4,'.','.','.']];
            game._id = "-1";
        } else if (setting == 'hard') {
            game.boxes = [[4,'.','.',9,'.','.','.','.','.'],['.','.','.','.',4,'.','.','.','.'],[5,3,9,6,'.',1,7,'.',4],
                          ['.',9,6,'.',4,7,'.','.','.'],['.',7,8,5,'.',2,1,9,6],[2,5,3,9,1,6,8,4,7],
                          ['.','.',1,'.',8,4,2,'.','.'],['.',8,'.','.','.','.','.',5,4],[4,'.',2,3,'.',5,1,7,8]];
            game._id = "-1";
        }
        game.difficulty = setting;
        game.dateGenerated = new Date();
    })
    .then(function (){        
        for(var i = 0; i < 9; i++){                     // for every array in boxes
            var div = document.createElement("div");
            div.setAttribute("id", "box"+(String)(i));
            div.setAttribute("class", "box");           // create a new div 
            document.getElementById("Game").appendChild(div);
            for(var j = 0; j < 3; j++){                 // size 3 by 3 , j for line number in the div
                for(var k = 0; k < 3; k++){             // k for index
                        let newinputbox = document.createElement("input");
                        newinputbox.setAttribute("type", "number");
                        newinputbox.setAttribute("id", "cell"+(String)(i)+(String)(j*3+k)); //calculate the right position inside the 
                        newinputbox.setAttribute("class", "cell");                          // 3 by 3 div and assign it the id
                        if(game.boxes[i][j*3+k] === '.'){
                            newinputbox.setAttribute("value", "");                          // if it contained '.' then leav it empty
                            document.getElementById("box"+(String)(i)).appendChild(newinputbox);
                        }
                        else {
                            newinputbox.setAttribute("disabled",true);                      // otherwise disable and put in the value
                            newinputbox.setAttribute("value", game.boxes[i][j*3+k]);
                            document.getElementById("box"+(String)(i)).appendChild(newinputbox);
                        }
                }
                
            }
           
        }

        var id = document.createTextNode((String)(game._id));               // put in the game id
        document.getElementById("sudokuId").appendChild(id);
    });
}  

function validate() { /* storing numbers and comparing later */
    getBoard();
    var gameWon = validateGame();
    if (gameWon){
        document.getElementById("WMsg").setAttribute('style','display: flex');
    }
    else{
        backgroundcolorReset();
    }
}
function getBoard(){
    for (let i = 0; i < 9; i++){                    // update the game with user inputs
        for (let j = 0; j < 9; j++){
            var cell = document.getElementById("cell"+i+j);
            game.boxes[i][j] = (Number)(cell.value);
            
        }
    }
}
function backgroundcolorReset() {
    setTimeout(function(){ /* 5 seconds after we push the validation button we change background color to original */
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                document.getElementById("cell"+i+j).setAttribute("style", "background-color: orig;");
            }
        }
   }, 5000);
   document.getElementById("WMsg").setAttribute('style','display: none');
}

function getInput(){

    document.getElementById("Game").setAttribute('style','border-style: solid');
    document.getElementById("sudokuId").textContent = "";                   // take out old id 
    document.getElementById("Game").textContent = "";                       // and game
    document.getElementById("Game").setAttribute('style','display: table'); // display the game div
    document.getElementById("WMsg").setAttribute('style','display: none');  // take out the win msg if last game was won
    var setting = document.getElementById("difficultySelector").value;      // get a new game with the right difficulty setting
    getSudoku(setting);

}

// EHJ - Experimental shit

function validateGame() {
    var gameWon = true;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            console.log(typeof(game.boxes[i][j]) + " " + game.boxes[i][j]);
            if (checkEmpty(i,j)) {
                //color yellow
                document.getElementById("cell"+i+j).setAttribute("style", "background-color: yellow;");
                gameWon = false
                continue;
            }
            if (!checkLegalDigit(i,j) ||!checkBox(i,j) || !checkCol(i,j) || !checkRow(i,j)) {
                //color red
                if(document.getElementById("cell"+i+j).getAttribute('disabled') == null) {
                    document.getElementById("cell"+i+j).setAttribute("style", "background-color: red;");
                }
                gameWon = false;
            }
        }
    }
    return gameWon;
}

// If the empty string is in location box, index, the function returns true
function checkEmpty(box, index) {
    if (game.boxes[box][index] == '') {
        return true;
    }
    return false;
}

function checkLegalDigit(box, index) {
    // The digit is stored
    var check_digit = game.boxes[box][index];
    // Then the digit is checked whether it is legal or not
    if (Number.isInteger(check_digit) && 0 < check_digit && check_digit < 10) {
        return true;
    }
    return false;
}

// Iterates through all the indexes of the box and checks whether a duplicate
// number exists in the box
function checkBox(box, index) {
    // The digit is stored
    var check_digit = game.boxes[box][index];
    // Each digit in the calculated row is iterated over and checked whether a
    // duplicate digit exists
    for (var i=0; i<9; i++) {
        // if a duplicate digit exists false is returned
        if (game.boxes[box][i] == check_digit && index != i) {
            return false;
        }
    }
    // if no duplicate is found true is returned
    return true;
}
  
// Takes the box number and the index of the digit and checks whether a
// duplicate digit exists in the row
function checkRow(box, index) {
    // The digit is stored
    var check_digit = game.boxes[box][index];
    // The number of the row is calculated
    var row_num = Math.floor(box/3)*3+Math.floor(index/3);
    // Each digit in the calculated row is iterated over and checked whether a
    // duplicate digit exists
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            var _box = i+Math.floor(row_num/3)*3;
            var _index = j+(row_num%3)*3;
                // debug console.log(_box + "," + _index + " = " + game.boxes[_box][_index] + ",   " + check_digit );
            // if a duplicate digit exists false is returned
            if (check_digit == game.boxes[_box][_index] && !(_box == box && _index == index)) {
                return false;
            } 
        }
    }
    // if no duplicate is found true is returned
    return true;
}

// Takes the box number and the index of the digit and checks whether a
// duplicate digit exists in the row
function checkCol(box, index) {
    // The digit is stored
    var check_digit = game.boxes[box][index];
    // The number of the row is calculated
    var col_num = (box%3)*3+(index%3);
    // Each digit in the calculated row is iterated over and checked whether a
    // duplicate digit exists
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            var _box = i*3+(box%3);
            var _index = j*3+(index%3);
            // debug console.log(_box + "," + _index + " = " + game.boxes[_box][_index] + ",   " + check_digit);
            // if a duplicate digit exists false is returned
            if (check_digit == game.boxes[_box][_index] && !(_box == box && _index == index)) {
                return false;
            }
        }
    }    
    // if no duplicate is found true is returned
    return true;
}
