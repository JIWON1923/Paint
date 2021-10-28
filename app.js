const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext('2d'); //canvas 내부 픽셀을 다룬다.
//const colors = document.querySelectorAll(".jsColor");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;

let painting = false;
let filling = false;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "white"; // 저장했을 때 투명색 배경으로 저장됨을 방지
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
// context의 default 값
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = "5"
ctx.fillStyle = INITIAL_COLOR;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) { // 마우스의 모든 움직임 감지, line 생성 담당 
    // event 객체의 client : window 전체 범위에서 마우스 포인터
    // evnet 객체의 offset : canvas 위에서의 마우스 포인터 위치 값
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) { // false일 때만 시작점을 찾으면 됌. 그리는 도중에는 시작점이 필요 없음
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y); // true일 때, 선을 그림
        ctx.stroke(); // Path를 도형으로 나타냄
    }
}

//function onMouseDown(event){ // 마우스 클릭 시
//    painting = true;
//}

function handleChangeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleChangeRange(event) {
    const thickness = event.target.value;
    ctx.lineWidth = thickness;
}

function handleModeClick(event) {
    if (filling) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event){ //context : 우클릭 방지 함수
    event.preventDefault();
}

function handleSaveClick(){
    const imag = canvas.toDataURL(); 
    const link = document.createElement("a"); // a 태그 만듦.
    link.href = imag; // 다운로드 할 이미지의 링크
    link.download = "My_Paint" // 이미지 이름 설정. (링크 연결이 아닌 다운로드)
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // 마우스를 클릭했을 때 
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting); // 마우스가 canvas에서 벗어날시
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleChangeColor)
);

if (range) { // 항상 조건문으로 정의하기. range가 없을 수도 있기 때문
    range.addEventListener("input", handleChangeRange); // range는 input에 반응 
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save){
    save.addEventListener("click", handleSaveClick);
}