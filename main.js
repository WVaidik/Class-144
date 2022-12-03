song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Posenet is Initialized');
}

function draw() {
    image(video, 50, 50, 600, 500);
    fill("#00ad91");
    stroke("#00ad91");

    if(scoreRightWrist > 0.2) {
    circle(rightWristX, rightWristY, 20);

    if(rightWristY > 0 && rightWristX <= 100) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    } else if(rightWristX > 100 && rightWristX <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 1.0x";
        song.rate(1.0);
    } else if(rightWristX > 200 && rightWristX <= 300) {
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    } else if(rightWristX > 300 && rightWristX <= 400) {
        document.getElementById("speed").innerHTML = "Speed = 2.0x";
        song.rate(2.0);
    } else if(rightWristX > 400 && rightWristX <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}

    if (scoreLeftWrist > 0.2) {
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY = Number(leftWristY);
    volume = floor(InNumberleftWristY)/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
}
}

function start() {
    song.play();
}

function play() {
    song.play();
    song.setVolmue(1);
    song.rate(1);
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}