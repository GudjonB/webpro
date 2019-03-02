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
        if (setting == 'easy') {
            game.boxes = [[5,6,4,'.','.',3,2,'.',1],[8,7,2,'.',1,'.',3,9,'.'],[3,9,1,'.','.','.','.','.',5],
                        [4,2,9,6,5,7,3,1,8],['.','.',8,2,3,1,9,4,7],[7,1,3,8,4,9,5,2,6],
                        ['.','.',6,'.',3,5,8,4,2],[4,2,3,7,8,9,1,'.','.'],['.',5,8,2,6,4,9,3,7]];
            game._id = "-1";
        } else if (setting = 'medium') {
            game.boxes = [[8,7,'.','.',4,'.',6,2,5],[4,5,'.','.',2,'.','.',1,'.'],[2,1,'.',8,5,'.','.',9,'.'],
                          [7,6,'.',5,'.',4,'.',8,'.'],[9,3,1,8,6,2,5,'.',7],[5,4,8,3,'.',1,9,6,2],
                          [2,'.',7,9,5,8,4,'.',6],['.',9,4,6,7,3,2,'.',5],['.','.',5,1,'.',4,'.','.','.']];
            game._id = "-1";
            
        } else if (setting = 'hard') {
            game.boxes = [[4,'.','.',9,'.','.','.','.','.'],['.','.','.','.',4,'.','.','.','.'],[5,3,9,6,'.',1,7,'.',4],
                          ['.',9,6,'.',4,7,'.','.','.'],['.',7,8,5,'.',2,1,9,6],[2,5,3,9,1,6,8,4,7],
                          ['.','.',1,'.',8,4,2,'.','.'],['.',8,'.','.','.','.','.',5,4],[4,'.',2,3,'.',5,1,7,8]];
            game._id = "-1";
        }
        game.difficulty = setting;
        dateGenerated = new Date();
    })
    .then(function (){
        document.getElementById("sudokuBoard").style.display = "flex";
        
        for(var i = 0; i < 9; i++){
            var div = document.createElement("div");
            div.setAttribute("id",(String)(i)+" Box")
            document.getElementById("sudokuBoard").appendChild(div);
            for(var j = 0; j < 3; j++){
                for(var k = 0; k < 3; k++){
                        let newinputbox = document.createElement("input");
                        newinputbox.setAttribute("type", "text");
                        newinputbox.setAttribute("id", (String)(i)+(String)(j*3+k));
                        newinputbox.setAttribute("class", i);
                        if(game.boxes[i][j*3+k] === '.'){
                            newinputbox.setAttribute("value", "");
                            document.getElementById((String)(i)+" Box").appendChild(newinputbox);
                        }
                        else {
                            newinputbox.setAttribute("disabled",true);
                            newinputbox.setAttribute("value", game.boxes[i][j*3+k]);
                            document.getElementById((String)(i)+" Box").appendChild(newinputbox);
                        }
                }
                
            }
           
        }
        var para = document.createElement("p");
        para.setAttribute("id","sudokuId");
        var id = document.createTextNode((String)(game._id));
        para.appendChild(id);
        document.getElementById("sudokuBoard").appendChild(para);
    });
}  

function validate() { /* storing numbers and comparing later */
    var input = 0;
    for(var i = 0; i < 9; i++){
        input += Number(document.getElementById("0"+i).value); /* stores the sum of the first box*/
    } 
   // alert(input); /* alert debug to see value of input */
   if(input == 45){
    alert("Correct"); /* we can compare each box with 45 (1+2+3..+9) when user checks if he's right */
    }
   else {
    alert("Incorrect");
    }
}


function getInput(){
    document.getElementById("sudokuBoard").textContent = "";
    var setting = document.getElementById("difficultySelector").value;
    getSudoku(setting);

}

// EHJ - Experimental shit

game.board.boxes = [[5,6,4,'.','.',3,2,'.',1],[8,7,2,'.',1,'.',3,9,'.'],[3,9,1,'.','.','.','.','.',5],
[4,2,9,6,5,7,3,1,8],['.','.',8,2,3,1,9,4,7],[7,1,3,8,4,9,5,2,6],
['.','.',6,'.',3,5,8,4,2],[4,2,3,7,8,9,1,'.','.'],['.',5,8,2,6,4,9,3,7]];

function checkBox(box, index) {
    var check_digit = game.board.boxes[box][index];
    for (var i=0; i<9; i++) {
        if (game.board.boxes[box][i] == check_digit && index != i) {
            return [index, i];
        }
    }
    return [-1,-1];
}

function checkEmpty(box, index) {
    if (game.board.boxes[box][index] == '') {
        return true;
    }
}
  
function checkBox(box, index) {
    var check_digit = game.board.boxes[box][index];
    for (var i=0; i<9; i++) {
        if (game.board.boxes[box][i] == check_digit && index != i) {
            return index, i;
        }
    }
    return -1;
}
  

function checkRow(box, index) {
    var check_digit = game.board.boxes[box][index];
    var row_num = Math.floor(box/3)*3+Math.floor(index/3);
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            var _box = i+Math.floor(row_num/3)*3;
            var _index = j+(row_num%3)*3;
            console.log(_box + "," + _index + " = " + game.board.boxes[_box][_index] + ",   " + check_digit );
            if (check_digit == game.board.boxes[_box][_index] && (_box == box && _index == index)) {
                return [box, index, _box, _index];
            } 
        }
    }
    return -1;
}
  
function checkCol(box, index) {
    var check_digit = game.board.boxes[box][index];
    var col_num = (box%3)*3+(index%3);
    for (var i=0; i<3; i++) {
        for (var j=0; j<3; j++) {
            var _box = i*3+col_num%3;
            var _index = j*3+col_num%3;
            console.log(_box + "," + _index + " = " + game.board.boxes[_box][_index] + ",   " + check_digit);
            if (check_digit == game.board.boxes[_box][_index]) {
                return [box, index, _box, _index];
            }
        }
    }
    return -1;
}


