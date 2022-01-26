// khai báo canvas
let game = document.getElementById("game");
let ctx = game.getContext("2d");
let scoreboard = document.getElementById("score");


// khai báo biến ảnh
let char = new Image();
let background = new Image();
let upperPipe = new Image();
let lowerPipe = new Image();


//khai báo nguồn ảnh
char.src = "images/Doraemon.png";
background.src="images/background_2.png";
upperPipe.src="images/Upper_Pipe.png";
lowerPipe.src="images/Lower_Pipe.png";

//khai báo âm thanh
let hit = new Audio();
let point = new Audio();
let wing = new Audio();

//khai báo nguồn âm thanh
hit.src = "sounds/sfx_hit.mp3"
wing.src = "sounds/sfx_wing.mp3"
point.src = "sounds/sfx_point.mp3"

//khai báo khoảng cách 2 ống trên/dưới, score ban đầu
let gap = 150;
let distanceToLower = 200 + gap;
let score =0;
// let max = 0;

//đặt vị trí nhân vật
let charPosition={
    x : background.width /5,
    y : background.height /2,
    width : 50,
    height : 50
}

//function bay
document.addEventListener("keydown",fly)
function fly(){
    charPosition.y -=45;
    wing.play();
}

//khai báo vị trí pipe
let pipe = [];
pipe[0] = {
    x:game.width,
    y: 0
}

//khoảng cách giữa các pipe, tốc độ xuất hiện pipe
let speed = 400

//vẽ ảnh
function run(){
    //vẽ background và nhân vật
    ctx.drawImage(background,0,0);
    ctx.drawImage(char,charPosition.x,charPosition.y,charPosition.width,charPosition.height);

    // tăng tốc khi đạt mốc điểm (DỰ KIẾN)

    //vẽ pipe
    for(let i = 0; i<pipe.length;i++){
        ctx.drawImage(upperPipe,pipe[i].x,pipe[i].y,50,200);
        ctx.drawImage(lowerPipe,pipe[i].x,pipe[i].y+distanceToLower,50,200);
        pipe[i].x --;

        //thêm pipe mới
        if(pipe[i].x == speed){
            pipe.push({
                x:game.width,
                y:Math.floor(Math.random()*200)-200
            })
        }

        //điều kiện thua
        if(charPosition.y+charPosition.height==game.height||

            charPosition.x+charPosition.width>= pipe[i].x && charPosition.x <= pipe[i].x +50
            && (charPosition.y<=pipe[i].y+200||

                charPosition.y +charPosition.height>= pipe[i].y+ distanceToLower)
        ){

            hit.play();
            location.reload();

        }

        // score ++ khi qua pipe thành công
        if(pipe[i].x == charPosition.x){
            score ++;
            point.play();
        }

    }


    //hiện điểm
    scoreboard.innerText = "score: " + score;
    // record.innerText = "Highest Score: " + max;

    // trọng lực
    charPosition.y += 0.5;

    requestAnimationFrame(run);
}
run();

