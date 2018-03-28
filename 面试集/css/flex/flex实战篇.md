<h2>一、骰子的布局</h2>
骰子的一面，最多可以放置9个点。

<h3>1.1 单项目</h3>
* 首先，只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071301.png">
<pre>
.box {
  display: flex;
}
</pre>

* 设置项目的对齐方式，就能实现居中对齐和右对齐。
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071302.png">
<pre>
.box {
  display: flex;
  justify-content: center;
}
</pre>
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071303.png">
<pre>
.box {
  display: flex;
  justify-content: flex-end;
}
</pre>

* 设置交叉轴对齐方式，可以垂直移动主轴。
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071304.png">
<pre>
.box {
  display: flex;
  align-items: center;
}
</pre>

* 垂直水平居中
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071305.png">
<pre>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}
</pre>

* 底部水平居中
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071306.png">
<pre>
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</pre>

* 右下角1个点
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071307.png">
<pre>
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</pre>

<h3>1.2 双项目</h3>
* 两边水平方向对齐
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071308.png" />
<pre>
.box {
  display: flex;
  justify-content: space-between;
}
</pre>

* 两边垂直方向靠左对齐
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071309.png" />
<pre>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</pre>

* 两边垂直方向中间对齐
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071310.png" />
<pre>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</pre>

* 两边垂直方向靠右对齐
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071311.png" />
<pre>
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
</pre>

* 一边左上角 一个居中
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071312.png" />
<pre>
.box {
  display: flex;
}
.item:nth-child(2) {
  align-self: center;
}
</pre>

* 两边对角
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071313.png" />
<pre>
.box {
  display: flex;
  justify-content: space-between;
}
.item:nth-child(2) {
  align-self: flex-end;
}
</pre>

<h3>1.3 三项目</h3>
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071314.png">
<pre>
.box {
  display: flex;
}

.item:nth-child(2) {
  align-self: center;
}

.item:nth-child(3) {
  align-self: flex-end;
}
</pre>

<h3>1.4 四项目</h3>
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071315.png">
<pre>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: space-between;
}
</pre>

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071316.png">
HTML代码如下。
<pre>
"<div class="box">
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="column">
    <span class="item"></span>
    <span class="item"></span>
  </div>
</div>"
</pre>
CSS代码如下。
<pre>
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
}
</pre>

<h3>1.5 六项目</h3>
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071317.png">
<pre>
.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}
</pre>

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071318.png">
<pre>
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-between;
}
</pre>

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071319.png">
HTML代码如下。
<pre>
"<div class="box">
  <div class="row">
    <span class="item"></span>
    <span class="item"></span>
    <span class="item"></span>
  </div>
  <div class="row">
    <span class="item"></span>
  </div>
  <div class="row">
     <span class="item"></span>
     <span class="item"></span>
  </div>
</div>"
</pre>
CSS代码如下。
<pre>
.box {
  display: flex;
  flex-wrap: wrap;
}

.row{
  flex-basis: 100%;
  display:flex;
}

.row:nth-child(2){
  justify-content: center;
}

.row:nth-child(3){
  justify-content: space-between;
}
</pre>

<h3>1.6 九项目</h3>
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071320.png">
<pre>
.box {
  display: flex;
  flex-wrap: wrap;
}
</pre>