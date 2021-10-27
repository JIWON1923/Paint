const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d'); //canvas 내부 픽셀을 다룬다.
//const colors = document.querySelectorAll(".jsColor");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

let painting = false;
let filling = false;

canvas.width = 600;
canvas.height = 600;
// context의 default 값
ctx.strokeStyle = "black"
ctx.lineWidth = "5"

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}
 
function onMouseMove(event){ // 마우스의 모든 움직임 감지, line 생성 담당 
    // event 객체의 client : window 전체 범위에서 마우스 포인터
    // evnet 객체의 offset : canvas 위에서의 마우스 포인터 위치 값
    const x = event.offsetX;
    const y = event.offsetY;
    
    if(!painting){ // false일 때만 시작점을 찾으면 됌. 그리는 도중에는 시작점이 필요 없음
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y); // true일 때, 선을 그림
        ctx.stroke(); // Path를 도형으로 나타냄
    }
}

//function onMouseDown(event){ // 마우스 클릭 시
//    painting = true;
//}

function handleChangeColor(event){
    const bgColor = event.target.style.backgroundColor;
    ctx.strokeStyle = bgColor;
}

function handleChangeRange(event){
    const thickness = event.target.value;
    ctx.lineWidth = thickness;
}

function handleModeClick(event){
    if(filling){
        filling = false;
        mode.innerText = "fill";
    }else{
        filling = true;
        mode.innerText = "paint";
    }
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // 마우스를 클릭했을 때 
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas에서 벗어날시
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleChangeColor)
    ); 

if(range){ // 항상 조건문으로 정의하기. range가 없을 수도 있기 때문
    range.addEventListener("input", handleChangeRange); // range는 input에 반응 
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}