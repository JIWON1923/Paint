# Paint
Painting board made with Vanilla JS

<img width = "80%" alt="main Screen" src="https://user-images.githubusercontent.com/68676844/139234584-9b615f4c-84ff-4287-8654-934f54ddf5fc.png">

직접 해보고 싶다면, [여기](https://jiwon1923.github.io/Paint/ "Jiwon's Painting board 바로가기")를 클릭하세요.

## Canvas

<img width="80%" alt="canvas" src="https://user-images.githubusercontent.com/68676844/139234740-83119790-2901-4b25-ad1a-49014faa6d8c.png">
### API
- Canvas APi 사용
- canvasRenderContext2D

### CSS
Canvas에 그림자를 만들어 배경과 구분될 수 있도록 만든다.

'''css:style.css

.canvas{
    box-shadow: 0 4px 6px rgba(56, 56, 129, 0.11), 0 1px 3px rgba(0, 0, 0, 0.00)
}
'''

### Event Listener
Canvas위에서 마우스가 벗어날 때, 움직일 때, 클릭할 때 등 마우스의 변화를 추적하고, 각 상황에 맞도록 handle 함수 작성

'''javascript:app.js

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}
'''

### Painting
마우스가 클릭 상태로 Canvas 위에서 움직일 때 painting 변수가 True  
 이 상태에서만 선을 생성하도록 작성

'''javascript:app.js

unction onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
'''

## Brush

<img width="80%",alt="brush" src="https://user-images.githubusercontent.com/68676844/139235738-4f454e42-edcb-4c69-8743-535443333cbb.png">

### thickness
input의 rangetype으로 구현, EventListener 할당 후 해당 함수 선언.  
값이 변할 때 마다 Canvas Context의 속성 값을 변경

'''javascript:app.js

function handleChangeRange(event) {
    const thickness = event.target.value;
    ctx.lineWidth = thickness;
}
'''

### brush mode
brush mode는 painting 또는 filling 두 가지 중 한 가지만 선택가능.  
이에 각각의 버튼을 두는 것 보다, 하나의 버튼으로 조작가능하도록 설정  
filling 모드에서 클릭 시 paint 모드가 되며, InnerText 변경. paint도 마찬가지

'''javascript:app.js

function handleModeClick(event) {
    if (filling) {
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}
'''

## Change Color

<img width="80%" alt="colors" src="https://user-images.githubusercontent.com/68676844/139236404-796b5fbe-5c37-45c7-a83a-5f9c0dfc4f4d.png">

'''css:style.css
.controls_colors .controls_color{
    width: 50px;
    height: 50px;
    border-radius:25px;
    cursor: pointer;
}
'''

원형 버튼을 만들기 위해서는 border-radius를 width의 50%로 지정  
클릭할 수 있는 Button임을 알려주기 위해서 커서를 pointer로 설정
---

화면 하단에 Button들을 배치하고, 배열을 이용하여 각 요소에 동일한 EventListener을 사용함

'''javascript:app.js
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleChangeColor)
);
function handleChangeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
'''

## 기타
### id & class 사용
CSS로 사용할 부분은 class, js로 사용할 것은 id로 선언
단, Change Color와 같이 여러 요소들을 동일한 js로 조작할 때에는 class로 선언 가능

### VSC 알면 편한 것들

'''javascript
<div class="controls_color"></div>
<div class="controls_color"></div>
<div class="controls_color"></div>
<div class="controls_color"></div>
<div class="controls_color"></div>
'''

5번 작성할 필요 없이 div.controls_color*5 

'''javascript
<div class="controls_btns">
    <button id="jsMode"></button>
    <button id="jsSave"></button>
<div>
'''
div.controls_btns>button#jsMode+button#jsSave 라고 작성
