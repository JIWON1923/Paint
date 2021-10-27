const canvas = document.getElementById("jsCanvas");
let painting = false;

function stopPainting(){
    painting = false;
}

function onMouseMove(event){
    // event 객체의 client : window 전체 범위에서 마우스 포인터
    // evnet 객체의 offset : canvas 위에서의 마우스 포인터 위치 값
    const x = event.offsetX;
    const y = event.offsetY;
}

function onMouseDown(event){ // 마우스 클릭 시
    painting = true;
}

function onMouseUp(event){ // 마우스에서 뗄 시 
    painting = false;
}


if (canvas){
    canvas.addEventListener("mousemove", onMouseMove );
    canvas.addEventListener("mousedown", onMouseDown); // 마우스를 클릭했을 때 
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas에서 벗어날시
}