<canvas id="canvas" width="600" height="300">Canvas not supported</canvas>

canvas真正的能力是通过canvas的context对象而实现出来的  

通过 document.getElementById('canvas') 来获取指向canvas的引用

在canvas对象上调用 canvas.getContext('2d') 获取绘图环境变量

默认canvas元素和绘图表面都是300*150 

注意： 1.在设置canvas的宽度与高度时，不能使用px后缀
      2.浏览器可能会自动缩放canvas

canvas属性如下：
1. canvas 指向该绘图环境所属的canvas对象   获取canvas的宽度和高度  canvas.width 与 canvas.height
2. fillStyle 指定该绘图环境在后续的图形填充操作中所使用的颜色、渐变色或图案
3. font 设定在调用绘图环境对象的fillText() 或 strokeText() 方法时，所使用的字符
4. globalAlpha 全局透明度设定
5. globalCompsiteOperation 浏览器将某个物体绘制在其他物体之上时，所采用的绘制方式
6. lineCap 告诉浏览器如何绘制线段的端点 butt、round、square
7. lineWidth 在canvas之中绘制线段的屏幕像素宽度
8. lineJoin 告诉浏览器在两条线段相交时如何绘制焦点 bevel、round、miter
9. miterLimit 告诉浏览器如何绘制miter形式的线段焦点
10. shadowBlur 决定了浏览器该如何延伸阴影效果
11. shadowColor 告诉浏览器使用何种颜色来绘制阴影
12. shadowOffsetX 像素为单位 指定了阴影效果的水平方向偏移量
13. shadowOffsetY 像素为单位 指定了阴影效果的垂直方向偏移量
14. strokeStyle 指定了对路径进行描述时所使用的绘制风格
15. textAlign 决定了以fillText()或strokeText()方法进行绘制时，所画文本的水平对齐方式
15. textBaseline 决定了以fillText()或strokeText()方法进行绘制时，所画文本的垂直对齐方式

function drawGrid(strokeStyle, fillStyle) {
  controlContext.save(); // Save the context on a stack

  controlContext.fillStyle = fillStyle;
  controlContext.strokeStyle = strokeStyle;

  // Draw the grid...

  controlContext.restore(); // Restore the context from the stack
}