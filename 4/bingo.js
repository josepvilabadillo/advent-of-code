const fs = require("fs");
var numbers = [];
var boards = [];

function addBoard(lines)
{
    var board = [];
    lines.forEach(line =>
    {
        board.push(line.trim().split(/\s+/));
    })
    boards.push(board);
}

function readfile(filename)
{
    const data = fs.readFileSync(filename, 'utf8');
    const sections = data.split("\r\n\r\n");
    numbers = sections.shift().split(",");
    console.log(numbers);
    sections.forEach(element => {
        const lines = element.split("\r\n");
        addBoard(lines);
    });
}

function singNumber(number)
{
    boards.forEach(board => 
    {
        board.forEach(line => 
        {
            line.forEach((boardNumber, index3) => 
            {
                if (boardNumber === number)
                {
                    line[index3] = "*";
                }
            })
        })
    })
}

function checkBoards()
{
    return boards.find(board => 
    {
        // check rows 
        if (board.find(line => line.every(element => element === "*")) != null) 
        {
            return true;
        }

        for (index2 in board[0])
        {
            if (board.every(line => line[index2] === "*"))
            {
                return true;
            }
        }
        return false;
    });
}

readfile(__dirname + '/data');
//console.log(boards);

for (index in numbers)
{
    const number = numbers[index];
    singNumber(number);
    //console.log(boards);
    var winnerBoard = checkBoards();
    while (winnerBoard)
    {
        //console.log("Number: " + number + ", Winner: ", winnerBoard);
        const sum = winnerBoard.reduce((total, line) => 
        {
            return total + line.reduce((total, value) => 
            {
                return total + (value === "*" ? 0 : parseInt(value, 10));
            }, 0)
        }, 0);
        console.log("[" + index + "] Got a winner! sum: " + sum + ", winner: " + number + ", total: " + sum*parseInt(number));
        boards.splice(boards.indexOf(winnerBoard), 1);
        winnerBoard = checkBoards();
    }    

}