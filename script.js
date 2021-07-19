
const blocks = document.getElementsByClassName("block");

const turn = document.getElementById("turn");

const result = document.getElementById("result");


let tmatrix = [
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1],
];


const wincombinations = ["00,01,02","10,11,12","20,21,22","00,10,20","01,11,21","02,12,22","00,11,22","02,11,20"]
// ["00,01,02","10,11,12","20,21,22","00,10,20","01,11,21","02,12,22","00,11,22","02,11,20"]


// BEFORE=>
// 0 -> X       1 -> O

// AFTER=>
// 3 -> X       4 -> O
let currentplayer = 3;
turn.innerHTML = "X";
let sum = 0;
let winnerdeclared = false;



function detectwinner()
{
    let won = wincombinations.some((combination)=>{
        sum = 0;
        combination.split(',').forEach((item)=>{
            sum = sum + tmatrix[item[0]][item[1]]
        });
        return (sum === 9 || sum === 12)
    });
    if(won)
    {
        result.innerHTML = "Player "+ (sum === 9 ?'X':'O') + " wins..!"
        winnerdeclared = true;
    }
}






function updateplayer()
{
    currentplayer = currentplayer ===3 ? 4 : 3;
    turn.innerHTML = currentplayer===3 ? "X" : "O";
}

function updateBlocks()
{
    console.log(tmatrix);
    [...blocks].forEach((block,index)=>{
        if(tmatrix[parseInt(index/3)][index%3]===3){
            block.innerHTML = "X"
        }else if(tmatrix[parseInt(index/3)][index%3]===4){
            block.innerHTML = "O"
        }
    })
}


function onBlockClick(id)
{
    if(tmatrix[parseInt(id/3)][id%3]>=0 || winnerdeclared)
    return;

    tmatrix[parseInt(id/3)][id%3] = currentplayer;
    //      id=0       0      0
    //      id=1       0      1
    //      id=2       0      2
    //      id=3       1      0
    //      id=4       1      1
    //      id=5       1      2
    //      id=6       2      0
    //      id=7       2      1
    //      id=8       2      2
   
    updateplayer();
    updateBlocks();
    detectwinner();
}


function reset()
{
    location.reload();
}