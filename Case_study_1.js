//khai báo
let game = document.getElementById("game");
let ctx = game.getContext("2d");
let scoreboard = document.getElementById("score");

//khai báo nguồn ảnh
let doraemonImg = new Image();
let background = new Image();
let upperPipe = new Image();
let lowerPipe = new Image();
doraemonImg.src="images/Doraemon.png";
background.src="images/background_2.png";
upperPipe.src="images/Upper_Pipe.png";
lowerPipe.src="images/Lower_Pipe.png";



// đặt vị trí nhân vật
let doraemon={
    x : background.width /5,
    y : background.height /2,
}

//tạo mảng pipe
let pipe = [];
pipe[0] = {
    x: game.width,
    y: 0
}

//khai báo biến
let score = 0;
let pipegap = 80;
let gap;

//function để chạy trò chơi
function run(){
    ctx.drawImage(background,0,0,1000,500);
    ctx.drawImage(doraemonImg,doraemon.x,doraemon.y,50,50);
    //trọng lực
    doraemon.y += 1;
    requestAnimationFrame(run);

    //Vẽ chướng ngại vật (pipe)
    for(let i=0;i<pipe.length;i++){
        pipegap = upperPipe.height + gap;
        ctx.drawImage(upperPipe,pipe[i].x,pipe[i].y,100,200);
        ctx.drawImage(lowerPipe,pipe[i].x,pipe[i].y + pipegap,100, 200)
        pipe[i].x -= 5;

        // tạo thêm pipe mới
        if (pipe[i].x == game.width/2){
            pipe.push({
                x: game.width,
                //random vị trí lỗ hổng
                y: Math.floor(Math.random()*upperPipe.height) - upperPipe.height
            })
        }
        // xóa pipe đã chạy qua
        if (pipe[i].x == 0){
            pipe.splice(0,1);
        }
        //nhân vật đi qua pipe thì score++
        if(pipe[i].x == doraemon.x){
            score ++;
        }
    }
    //hiện điểm
    scoreboard.innerText = "score: " + score;
}


//function bay
function fly(){
    doraemon.y -=30;
}
document.addEventListener("keydown",fly);



run();