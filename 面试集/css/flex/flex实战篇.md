一、骰子的布局
骰子的一面，最多可以放置9个点。

1.1 单项目
* 首先，只有左上角1个点的情况。Flex布局默认就是首行左对齐，所以一行代码就够了。
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071301.png">
.box {
  display: flex;
}

* 设置项目的对齐方式，就能实现居中对齐和右对齐。
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071302.png">
.box {
  display: flex;
  justify-content: center;
}
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071303.png">
.box {
  display: flex;
  justify-content: flex-end;
}

* 设置交叉轴对齐方式，可以垂直移动主轴。
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071304.png">
.box {
  display: flex;
  align-items: center;
}

* 垂直水平居中
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071305.png">
.box {
  display: flex;
  justify-content: center;
  align-items: center;
}

* 底部水平居中
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071306.png">
.box {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

* 右下角1个点
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071307.png">
.box {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

1.2 双项目
<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071308.png" />
.box {
  display: flex;
  justify-content: space-between;
}

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071309.png" />
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071310.png" />
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071311.png" />
.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071312.png" />
.box {
  display: flex;
}
.item:nth-child(2) {
  align-self: center;
}

<img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071313.png" />
.box {
  display: flex;
  justify-content: space-between;
}
.item:nth-child(2) {
  align-self: flex-end;
}