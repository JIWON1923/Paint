const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d'); //canvas 내부 픽셀을 다룬다.

let painting = false;

canvas.width = 600;
canvas.height = 600;
// context의 default 값
ctx.strokeStyle = "black"
ctx.lineWidth = "2.5"

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

function onMouseDown(event){ // 마우스 클릭 시
    painting = true;
}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove );
    canvas.addEventListener("mousedown", startPainting); // 마우스를 클릭했을 때 
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas에서 벗어날시
}