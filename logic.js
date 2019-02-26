var game = {board:{boxes:""}, _id: "", difficulty: "", dateGenerated: ""};

function getSudoku(setting) {

    //The URL to which we will send the request
    var url = 'https://veff213-sudoku.herokuapp.com/api/v1/sudoku';

    //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
    axios.post(url, { difficulty: setting })
    
    .then(function (response) {
        //When successful, print 'Success: ' and the received data
        console.log("Success: ", response.data);
        game = response.data;
    })
    .catch(function (error) {
        //When unsuccessful, print the error.
        console.log(error);
        if (setting == 'easy') {
            game.board.boxes = [[5,6,4,'.','.',3,2,'.',1],[8,7,2,'.',1,'.',3,9,'.'],[3,9,1,'.','.','.','.','.',5],
                        [4,2,9,6,5,7,3,1,8],['.','.',8,2,3,1,9,4,7],[7,1,3,8,4,9,5,2,6],
                        ['.','.',6,'.',3,5,8,4,2],[4,2,3,7,8,9,1,'.','.'],['.',5,8,2,6,4,9,3,7]];
            game._id = "default-easy";
        } else if (setting = 'medium') {
            game.board.boxes = [[8,7,'.','.',4,'.',6,2,5],[4,5,'.','.',2,'.','.',1,'.'],[2,1,'.',8,5,'.','.',9,'.'],
                          [7,6,'.',5,'.',4,'.',8,'.'],[9,3,1,8,6,2,5,'.',7],[5,4,8,3,'.',1,9,6,2],
                          [2,'.',7,9,5,8,4,'.',6],['.',9,4,6,7,3,2,'.',5],['.','.',5,1,'.',4,'.','.','.']];
            game._id = "default-medium";
            
        } else if (setting = 'hard') {
            game.board.boxes = [[4,'.','.',9,'.','.','.','.','.'],['.','.','.','.',4,'.','.','.','.'],[5,3,9,6,'.',1,7,'.',4],
                          ['.',9,6,'.',4,7,'.','.','.'],['.',7,8,5,'.',2,1,9,6],[2,5,3,9,1,6,8,4,7],
                          ['.','.',1,'.',8,4,2,'.','.'],['.',8,'.','.','.','.','.',5,4],[4,'.',2,3,'.',5,1,7,8]];
            game._id = "default-hard";
        }
        game.difficulty = setting;
        dateGenerated = new Date();
    })
    .then(function (){
        document.getElementById("sudokuBoard").style.display = "flex";
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var br = document.createElement("br");
        
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
                        if(game.board.boxes[i][j*3+k] === '.'){
                            newinputbox.setAttribute("value", "");
                            document.getElementById((String)(i)+" Box").appendChild(newinputbox);
                        }
                        else {
                            newinputbox.setAttribute("disabled",true);
                            newinputbox.setAttribute("value", game.board.boxes[i][j*3+k]);
                            document.getElementById((String)(i)+" Box").appendChild(newinputbox);
                        }
                }
                
            }
           // document.getElementById("sudokuBoard").appendChild(br);
        }
    });
}  


function getInput(){
    document.getElementById("sudokuBoard").textContent = "";
    var setting = document.getElementById("difficultySelection").value;
    getSudoku(setting);




    // document.getElementById("sudokuDiv").style.display = "inline";
    //         var tr = document.createElement("tr");
    //         var td = document.createElement("td");
    //         for (var i = 0; i < 2; i++){
    //             document.getElementById("sudokuBoard").appendChild(div);
    //             for ( var j = 0; j < 9; j++){
    //                 let newinputbox = document.createElement("input");
    //                 newinputbox.setAttribute("type", "text");
    //                 newinputbox.setAttribute("id", (String)(i)+(String)(j));
    //                 newinputbox.setAttribute("class", i;
    //                 if(game.board.boxes[i][j] === '.'){
    //                     newinputbox.setAttribute("value", "")
    //                     document.getElementById("sudokuBoard").appendChild(newinputbox);
    //                 }
    //                 else {
    //                     newinputbox.setAttribute("value", game.board.boxes[i][j])
    //                     document.getElementById("sudokuBoard").appendChild(newinputbox);
    //                 }
    //             }
    //         }
}