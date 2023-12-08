// supported by chatgpt

var canvas;
var ctx;
var w = window.innerWidth;
var h = window.innerHeight;
var bg ={
    "x":0,
    "y":0,
    "color": "#84d8f0",
    "w":w,
    "h":h
}

var rect=[];
var ripple = [];
var lilypad = [];
var lilypadnum = 10;
var lilypadsize = 100;

var fishe =[];
var fishenumero = 30;
var fishespeedo = 3;

var touchratio = 50;

document.querySelector("#myCanvas").onclick = function(event){
    MouseCreate(event.offsetX,event.offsetY);
    TouchPond(event.offsetX,event.offsetY);
}

function MouseCreate(x,y){
    ripple.push({
        "x":x,
        "y":y,
        "r":1
    })
}


function CreateLilyPad(){
    for (let i = 0; i < lilypadnum; i++){
        lilypad.push({
            "x":(w/lilypadnum)*i + lilypadsize,
            "y":randbtw(0+lilypadsize,h-lilypadsize),
            "r":lilypadsize,
            "startangle":randbtw(0,2),
            "color":"#bfed82",
            "speedx":randbtw(-0.25,-0.25),
            "speedy":randbtw(-0.1,0.1)
        })
    }
}

function CreateLeFishe(){
    for (let i = 0; i < fishenumero; i++){
        fishe.push({
            "x":randbtw(0,w),
            "y":randbtw(0,h),
            "w":15,
            "h":15,
            "color":"#c93251",
            "speedX":randbtw(-fishespeedo,fishespeedo),
            "speedY":randbtw(-fishespeedo,fishespeedo),
            "time": 0
        })
    }
}

function TouchPond(X,Y){
    for (i in fishe){
        if(fishe[i].x >= X - touchratio && fishe[i].x <= X + touchratio){
            if(fishe[i].y >= Y - touchratio && fishe[i].y <= Y + touchratio){
                fishe[i].time = 0;
            }
        }
    }
}

function SetUp() {
    CreateLilyPad();
    CreateLeFishe();
}

SetUp();
setUpCanvas();
animationLoop();

function animationLoop() {// main animation
    ctx.clearRect(0, 0, w, h);//clear canvas

    drawRect(bg);//background color

    for(i in fishe){
        drawRect(fishe[i]);
        fishemove(fishe[i]);
    }

    for( i in ripple){
        drawRipple(ripple[i]);
        Ripple(ripple[i]);
    }
    
    for( i in lilypad){
        drawLilypad(lilypad[i]);
        lilypadUpdate(lilypad[i]);
        lilypadCollision(lilypad[i],lilypad);
    }
    
    requestAnimationFrame(animationLoop);
}

function handleCanvasBorderCollision(o) {
    if (o.x - o.r <= 0 || o.x + o.r >= w) {
        o.speedx = -o.speedx;
    }
    if (o.y - o.r <= 0 || o.y + o.r >= h) {
        o.speedy = -o.speedy;
    }
}

function separateLilypads(o, a, distanceX, distanceY, totalRadius) {
    let angle = Math.atan2(distanceY, distanceX);
    let overlap = totalRadius - Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    // Move the circles apart to avoid overlap
    o.x += overlap * Math.cos(angle);
    o.y += overlap * Math.sin(angle);

    // Adjust the other lilypad's position accordingly
    a.x -= overlap * Math.cos(angle);
    a.y -= overlap * Math.sin(angle);

    // Bounce off each other
    let dx = o.x - a.x;
    let dy = o.y - a.y;
    let collisionAngle = Math.atan2(dy, dx);
    let magnitude1 = Math.sqrt(o.speedx * o.speedx + o.speedy * o.speedy);
    let magnitude2 = Math.sqrt(a.speedx * a.speedx + a.speedy * a.speedy);

    let direction1 = Math.atan2(o.speedy, o.speedx);
    let direction2 = Math.atan2(a.speedy, a.speedx);

    let newSpeedX1 = magnitude1 * Math.cos(direction1 - collisionAngle);
    let newSpeedY1 = magnitude1 * Math.sin(direction1 - collisionAngle);
    let newSpeedX2 = magnitude2 * Math.cos(direction2 - collisionAngle);
    let newSpeedY2 = magnitude2 * Math.sin(direction2 - collisionAngle);

    let finalSpeedX1 = ((o.r - a.r) * newSpeedX1 + (a.r + a.r) * newSpeedX2) / (o.r + a.r);
    let finalSpeedX2 = ((o.r + o.r) * newSpeedX1 + (a.r - o.r) * newSpeedX2) / (o.r + a.r);

    o.speedx = Math.cos(collisionAngle) * finalSpeedX1 + Math.cos(collisionAngle + Math.PI / 2) * newSpeedY1;
    o.speedy = Math.sin(collisionAngle) * finalSpeedX1 + Math.sin(collisionAngle + Math.PI / 2) * newSpeedY1;
    a.speedx = Math.cos(collisionAngle) * finalSpeedX2 + Math.cos(collisionAngle + Math.PI / 2) * newSpeedY2;
    a.speedy = Math.sin(collisionAngle) * finalSpeedX2 + Math.sin(collisionAngle + Math.PI / 2) * newSpeedY2;

    // Handle canvas border collision for both lilypads
    handleCanvasBorderCollision(o);
    handleCanvasBorderCollision(a);
}



function lilypadUpdate(obj){
    obj.startangle += 0.001;
    obj.x += obj.speedx;
    obj.y += obj.speedy;
    if (obj.x <= 0 + obj.r || obj.x >= w - obj.r){
        obj.speedx = -obj.speedx;
    }
    if (obj.y <= 0 + obj.r || obj.y >= h - obj.r){
        obj.speedy = -obj.speedy;
    }
}

function lilypadCollision(o,a){
    for (i in a){
        if(o != a[i]){
        let distanceX = o.x - a[i].x;
        let distanceY = o.y - a[i].y;
        let rsum = o.r + a[i].r;
        if ( distanceX*distanceX + distanceY*distanceY <= rsum*rsum){
            o.speedx = -o.speedx;
            o.speedy = -o.speedy;
            a[i].speedx = -a[i].speedx;
            a[i].speedy = -a[i].speedy;   
        }
    }
    }
}


function drawRect(obj) {
    ctx.beginPath();
    ctx.rect(obj.x, obj.y, obj.w, obj.h);
    ctx.fillStyle = obj.color;
    ctx.fill();
}

function fishemove(obj){
    obj.time++;
    if (obj.time == 1){
        obj.speedX = randbtw(-fishespeedo,fishespeedo);
        obj.speedY = randbtw(-fishespeedo,fishespeedo);
    }
    else if (obj.time == 60){
        obj.speedX = 0;
        obj.speedY = 0; 
    }
    if (obj.time >= 300){
        obj.time = 0;
    }
    
    obj.x += obj.speedX;
    obj.y += obj.speedY;
    if (obj.x <= 0){
        obj.x = 0;
    }
    if(obj.x >= w-obj.w){
        obj.x = w-obj.w;
    }
    if(obj.y <= 0){
        obj.y = 0;
    }
    if(obj.y >= h-obj.h){
        obj.y = h-obj.h;
    }
}

function drawRipple(obj){
ctx.strokeStyle = "#63b9f2";
ctx.beginPath();
ctx.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI);
ctx.stroke();
ctx.beginPath();
ctx.arc(obj.x, obj.y, obj.r*2, 0, 2 * Math.PI);
ctx.stroke();
ctx.beginPath();
ctx.arc(obj.x, obj.y, obj.r*4, 0, 2 * Math.PI);
ctx.stroke();
}

function Ripple(obj){
obj.r = obj.r*1.025;
if(obj.r >= 1000){
    ripple.shift();//quick function to make sure the program doesn't have to render ripples that's out of bound of canvas
}
}

function drawLilypad(obj){
ctx.beginPath();
ctx.arc(obj.x, obj.y, obj.r, obj.startangle*Math.PI, (obj.startangle+1.6)* Math.PI);
ctx.lineTo(obj.x,obj.y);
ctx.fillStyle = obj.color;
ctx.fill();
}

function setUpCanvas() {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    // canvas.style.border = "8px double pink";
}

function rand(r) {
    var result = Math.random() * r;
    return result
}

function randbtw(min, max) { //randombetween min and max
    return Math.random() * (max - min) + min;
}
