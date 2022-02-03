var X = document.querySelector(".X");/* X div */
var O = document.querySelector(".O");/* O div */
var beforeStart = document.getElementById("before-start");/* this div include X and O div */

var counter = 0;/* user click or bot counter  */
var playerSelect;/* true ise x false ise o */
var botSelect;
/* before-start div display none function */
function beforeStartDN(){
    beforeStart.style.display = "none";
}


/* When player is click X or O div playerSelect will be true(X) false(O) and div will be none */
X.addEventListener("click",()=>{
    playerSelect = true;
    botSelect = false;
    beforeStartDN();
})
O.addEventListener("click",()=>{
    playerSelect = false;
    botSelect == true;
    beforeStartDN();
});
/* This function run after select x or o */
var difficulity = document.getElementById("difficulity");
function afterSelectXO(e){
    if(ourDif == "null")
        difficulityDB();
    else if(ourDif == "easy" || ourDif == "medium" || ourDif == "hard"){ /*  || ourDif == "medium" || ourDif == "hard" */
        afterStartDB();
    }    
}
/* Is select X or O */
/* When click a mousethis event to show a difficulity div */
var box = document.querySelectorAll(".box");
window.addEventListener("click",(e)=>{
    if(playerSelect == true && isYou == true || playerSelect == false && isYou == true){ /* X */
        afterSelectXO(e);
        var XOitem = createXO();
        var dolas = 0;
        box.forEach(item=>{
            dolas++;
            if(e.target == item){
                e.target.appendChild(XOitem);
                /* playing bot in difficulity easy */
                if(ourDif == "easy")
                    easyBot();  
                /* Adding  virtualgame to html dom */
                virtualGame[dolas-1] = XOitem;
                for(var i = 1;i<=9;i++)
                    console.log("Game " + i + ": " + virtualGame[i - 1]);
            } 
        });
    }   
    equation();
});

/* Difficulity selection can show */
var ourDif = "null";

var easy = document.querySelector(".dif-easy");
var medium = document.querySelector(".dif-medium");
var hard = document.querySelector(".dif-hard");

/* Difficulity div won't display when player click difficulity level(easy-medium-hard) */
function difficulityDN(){
    difficulity.style.display = "none";
}
/* Difficulity div will display in this function */
function difficulityDB(){
    difficulity.style.display = "block";
}
/* Writes easy to ourDif when we click easy div */
function writeEasy(){
    ourDif = "easy";
    difficulityDN();
}
/* Writes medium to ourDif when we click medium div  */
function writeMedium(){
    ourDif = "medium";
    difficulityDN();
}
/* Writes hard to ourDif when we click hard div */
function writeHard(){
    ourDif = "hard";
    difficulityDN();
}
/* after-start div */
var afterStart = document.getElementById("after-start");
/* after-start display block function */
function afterStartDB(){
    afterStart.style.display = "block";
}
/* after-start display none function */
function afterStartDN(){
    afterStart.style.display = "none";
}
/* This function just Create x item */
function createX(){
    /* Createing xiContainer item in here */
    var xiContainer = document.createElement("div");
    xiContainer.classList.add("xi-container");
    /* Createing x1 with this function */
    var x1  = document.createElement("div");
    x1.classList.add("xi");
    x1.classList.add("x-1");
    /* Append x1 item to xiContainer */
    xiContainer.appendChild(x1);
    /* Creating x2 item with this function */
    var x2 = document.createElement("div");
    x2.classList.add("xi");
    x2.classList.add("x-2");
    /* Append x2 item to xiContainer */
    xiContainer.appendChild(x2);
    return xiContainer;
}
/* This function just creat O item */
function createO(){
    var oi = document.createElement("div");
    oi.classList.add("oi");
    return oi;
}
/* player click a random box this random box inside design x or o(that is select) */
function createXO(){
    /* X */
    if(playerSelect == true && isYou == true){
        return createX();
    }
    else if(playerSelect == false && isYou == true){
        return createO();
    }
    if(isYou == false && botSelect == false){ /* O */
        return createO();
    }
    return createX();

    /* Bot selecting other item(x-o) */
}
/* fix isYou property */
var isYou = true;
/* easy level bot playing  */
function easyBot(){
    isYou = false;
    var clicking = Math.floor(Math.random() * 9 + 0);
    /*console.log(clicking);*/
    if(counter == 8){
        
    }
    else if(box[clicking].hasChildNodes() == true){
        return easyBot();
    }
        
    setTimeout(()=>{
        if(box[clicking].hasChildNodes() == false){
            var itemXO = createXO();
            box[clicking].appendChild(itemXO);
            /* Adding virtualgame to html object*/
            virtualGame[clicking] = itemXO;
            for(var i=1;i<=9;i++){
                console.log("Game : "+ i + " : " + virtualGame[i - 1]);
            }
            equation();
        }
        isYou = true;
    },1200);
        
}

/* Virtual game  */
var virtualGame = ["null","null","null","null","null","null","null","null","null"];

/* Equation control function */
var winnerIcon = document.getElementById("winner-icon");
function equation(){
        if(box[0].isEqualNode(box[1]) && box[0].isEqualNode(box[2]) && box[0].hasChildNodes() == true){
            console.log("First line is same");
            winnerIcon.appendChild(box[0]);
            afterStartDN();
            winnerDB();
        }
        else if(box[3].isEqualNode(box[4]) && box[3].isEqualNode(box[5]) && box[3].hasChildNodes() == true){
            console.log("Second line is same");
            winnerIcon.appendChild(box[3]);
            afterStartDN();
            winnerDB();
        }
        else if(box[6].isEqualNode(box[7]) && box[6].isEqualNode(box[8]) && box[6].hasChildNodes() == true){
            console.log("Third line is same");
            winnerIcon.appendChild(box[6]);
            afterStartDN();
            winnerDB();
        }
        else if(box[0].isEqualNode(box[3]) && box[0].isEqualNode(box[6]) && box[0].hasChildNodes() == true){
            console.log("First column is same");
            winnerIcon.appendChild(box[0]);
            afterStartDN();
            winnerDB();
        }
        else if(box[1].isEqualNode(box[4]) && box[1].isEqualNode(box[7]) && box[1].hasChildNodes() == true){
            console.log("Second column is same");
            winnerIcon.appendChild(box[1]);
            afterStartDN();
            winnerDB();
        }
        else if(box[2].isEqualNode(box[5]) && box[2].isEqualNode(box[8]) && box[2].hasChildNodes() == true){
            console.log("Third column is same");
            winnerIcon.appendChild(box[2]);
            afterStartDN();
            winnerDB();
        }
        else if(box[0].isEqualNode(box[4]) && box[0].isEqualNode(box[8]) && box[0].hasChildNodes() == true){
            console.log("left x is same");
            winnerIcon.appendChild(box[0]);
            afterStartDN();
            winnerDB();
        }
        else if(box[2].isEqualNode(box[4]) && box[2].isEqualNode(box[6]) && box[2].hasChildNodes() == true){
            console.log("right x is same");
            winnerIcon.appendChild(box[2]);
            afterStartDN();
            winnerDB();
        }
}

/* When X or O win this games this function will work */
var winner = document.getElementById("winner");
function winnerDB(){
    winner.style.display = "block";
    box.forEach(item=>{
        item.style.border = "none";
        item.style.boxShadow = "0 0 0 0 ";
    });
}