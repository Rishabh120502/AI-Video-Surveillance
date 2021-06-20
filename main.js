object = [];
status="";
function preload(){
video = createVideo("video.mp4");
}

function setup(){
canvas = createCanvas(480,380);
canvas.center();
video.hide();
}

function draw(){
image(video,0,0,480,380);
if(status != ""){
objectDetector.detect(video,gotResults);
for(i = 0;i<object.length;i++){
    document.getElementById("status").innerHTML = "Status : Objects Detected";
    document.getElementById("number_of_objects").innerHTML = "The number of objects detected are : "+object.length;
    percent= floor(object[i].confidence*100);
    fill(168, 50, 50);
    text(object[i].label+" "+ percent + "%",object[i].x+15,object[i].y+15);
    noFill();
    stroke(168, 50, 50);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
}
}
}

function gotResults(error,results){
if(error){
    console.error(error);
}else{
    console.log(results);
    object = results;
}
}

function start(){
document.getElementById("status").innerHTML= "Status: Detecting objects";
objectDetector= ml5.objectDetector("cocossd",modelLoaded);

}

function modelLoaded(){
    console.log("Model Is Loaded !");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}