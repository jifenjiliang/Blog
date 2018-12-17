当你触摸并按住触摸目标时候，禁止显示系统默认菜单。
-webkit-touch-callout: none

禁止复制文本。
user-select: none;

复制的文本 加上一段来源说明:
1、答案区域监听copy事件，并阻止这个事件的默认行为。
2、获取选中的内容（window.getSelection()）加上版权信息，然后设置到剪切板（clipboarddata.setData()）。

盒子垂直水平居中
1、定位 盒子宽高已知， position: absolute; left: 50%; top: 50%; margin-left:-自身一半宽度; margin-top: -自身一半高度;

2、table-cell布局 父级 display: table-cell; vertical-align: middle;  子级 margin: 0 auto;

3、定位 + transform ; 适用于 子盒子 宽高不定时； （这里是本人常用方法）
position: relative / absolute;
/*top和left偏移各为50%*/
top: 50%;
left: 50%;
/*translate(-50%,-50%) 偏移自身的宽和高的-50%*/
transform: translate(-50%, -50%); 注意这里启动了3D硬件加速哦 会增加耗电量的 （至于何是3D加速 请看浏览器进程与线程篇）

4、flex 布局
父级： 
/*flex 布局*/
display: flex;
/*实现垂直居中*/
align-items: center;
/*实现水平居中*/
justify-content: center;

再加一种水平方向上居中 ：margin-left : 50% ; transform: translateX(-50%);

