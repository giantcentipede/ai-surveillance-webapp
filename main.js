objects= []
video="";
status="";

function setup() {
    canvas=createCanvas(480,380);
    canvas.center();
    
}

function preload() {
    video=createVideo("video.mp4");
    video.hide();
    
}

function draw() {
    image(video,0,0,480,380);
    if (status!="") {
        objectDetector.detect(video,gotresult)

        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML="status:objects detected"
            document.getElementById("item").innerHTML="the number of objects detected are: " + objects.length;
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function gotresult(error,results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        objects=results;
    }
}

function clicked() {
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="status:detecting objects"

}

function modelloaded() {
    console.log("modelloaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
    

}

