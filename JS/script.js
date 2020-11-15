window.onload = function() {

    var cvs = document.getElementById("canvas");
    var ctx = cvs.getContext("2d");

    var bird = new Image();
    var bg = new Image();
    var fg = new Image();
    var pipeUp = new Image();
    var pipeBottom = new Image();

    bird.src = "Pictures/flappy_bird_bird.png";
    bg.src = "Pictures/flappy_bird_bg.png";
    fg.src = "Pictures/flappy_bird_fg.png";
    pipeUp.src = "Pictures/flappy_bird_pipeUp.png";
    pipeBottom.src = "./Pictures/flappy_bird_pipeBottom.png";

    //audio effects
    let fly = new Audio();
    let score_audio = new Audio();
    let game_over = new Audio();

    fly.src = "./Audios/fly.mp3";
    score_audio.src = "./Audios/score.mp3";
    game_over.src = "./Audios/game_over.mp3";

    //Space between pipes
    var gap = 140;

    //Making function for button that will push the bird up
    document.addEventListener("keydown", moveUp);

    function moveUp() {
        // This function make our bird to go up by 45px while pushing any (almost any) button in keyword
        yPos -= 45;
        fly.play();
        TransitionEvent
    }

    //Here I made the coordinates for pies
    var pipe = [];
    pipe[0] = {
        x: cvs.width,
        y: 0
    }

    var score = 0;

    //Bird position
    var xPos = 10;
    var yPos = 100;
    var grav = 2;

    // "draw" function take our pictures and set in ctx(Context) with coordinates x & y of context.
    function draw() {
        ctx.drawImage(bg, 0, 0);
        // Now our pipes will be drawn by loop. Our loop will go til  (i < pipe.length) the blocks in our array finish
        for (let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

            // To make our pipes move, we have to take pipe[i]s (just pipes) and move them to x-- (left)
            pipe[i].x--

                /*To make new blocks, we have to take our pipes and
                we say if pipes (the pipes we have and new pipes that we are going to make)
                space = 95px, draw another pipes with cordinats x: cvs.width  and
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height 
                y cordinat is for changing bottom pipe height*/

                if (pipe[i].x == 95) {
                    pipe.push({
                        x: cvs.width,
                        y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                    })
                }

                /* To make collision with pipes and canvas we check
                if the bird is in space of canvas and bird's height = to the height of the canvas and pipes
                with cordinatsx and y, that mean the bird touch them and we can reload the game*/

            if (xPos + bird.width >= pipe[i].x &&
                xPos <= pipe[i].x + pipeUp.width &&
                (yPos <= pipe[i].y + pipeUp.height ||
                    yPos + bird.height >= pipe[i].y + pipeUp.height + gap) ||
                yPos + bird.height >= cvs.height - fg.height) {
                location.reload();
            }

            /* To make score grow.
             if (pipe[i].x == 5) that's mean:
             if the bird is between upper and bottom pipes
             give one score and play score's sound
            */

            if (pipe[i].x == 5) {
                score++
                score_audio.play();
            }

        }

        ctx.drawImage(fg, 0, cvs.height - fg.height);
        ctx.drawImage(bird, xPos, yPos);

        // This is for to make the bird go down
        yPos += grav;

        // This is the text in context (Point: 0)
        ctx.fillstyle = "black";
        ctx.font = "24px Verdana";
        ctx.fillText("Point: " + score, 10, cvs.height - 20);

        // Making animation for bird fall
        requestAnimationFrame(draw)
    }

    pipeBottom.onload = draw;

}