### 前端学习笔记
---

###目录
- [HTML基础](#html基础)  
- [Css基础](#css基础)  
- [js基础](#js基础)  
- [jQuery](#jquery)  
- [网络](#网络)  
- [Css3](#css3)  
- [Bootstrap](#bootstrap)  
- [HTML5](#html5)  
- [Webpack](#webpack)  
- [Es6](#es6)  
- [git](#git)  
- [小程序](#小程序)  
- [前端设计模式](#前端设计模式)  
- [Vue](#vue)  
- [Nodejs](#nodejs)  
- [Nodejs](#nodejs)  
- [Vue-SSR服务器端渲染](#vue-ssr服务器端渲染)  
- [React](#react)  
- [算法](#算法)  
- [操作系统](#操作系统)  

---

### Css3  
---
#### Css3选择器
1. **属性选择器**  
```
E[att="val"] {…}
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值为val的字符串
```
```
E[att^="val"] {…}
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值以val开头的任何字符串
```
```
E[att$="val"]{…}
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值以val结尾的任何字符串
```
```
E[att*="val"]{…}：
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值任意位置出现了“val”。即属性值包含了“val”，位置不限。
```
```
E[att~="val"]{…}：
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值中存在val单词的任何字符串。
```
2. **初级伪类选择器** -- 伪类用于向某些选择器添加特殊的效果  
```
:root 根标签选择器
    - :root选择器等同于 html元素，简单点说 :root{background:orange}与html{background:orange}，得到的效果等同  
    - 建议使用:root（xml等）  
```
```
:not 否定选择器
    - 用法和jQuery 中的not类似，可以排除某些特定条件的元素  
        div:not([class=“demo”]){
            background-color:red;
        }
    - 意思为除了class为 demo的 div以外，所有的div的背景颜色都变红
```
```
:empty 空标签选择器
    用来选择没有内容的元素、不在文档树中的元素，这里的没有内容指的是一点内容都没有，哪怕是一个空格。
```
```
:target 目标元素选择器
    - 用来匹配被location.hash 选中的元素(即锚点元素)
    - 选择器可用于选取当前活动的目标元素
```
```
.:first-child 匹配父元素的第一个一个子元素，等同于:nth-last-child(1)
:last-child 匹配父元素的最后一个子元素，等同于:nth-last-child(1)
:nth-child(n){} 匹配其父元素的第n个子元素，第一个编号为1
:nth-last-child(){}  匹配其父元素的倒数第n个子元素，第一个编号为1

以上五个选择器均有弊端，即如果当前位置元素不是前面所修饰的元素，那么无效
注：其父元素的第 N 个子元素，不论元素的类型。
```
```
:first-of-type 匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)
:last-of-type 匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)
:nth-of-type(n){} 与:nth-child()作用类似，但是仅匹配使用同种标签的元素
:nth-last-of-type(){}  与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素

此种选择器，限制了类型，即在所修饰元素的类型下选择特定位置的元素
```
```
:only-child  唯一子元素选择器
    - 选择是独生子的子元素，即该子元素不能有兄弟元素，它的父元素只有他一个直接子元素。
    - 匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1)

注意：选择的元素是独生子子元素，而非有唯一子元素的父元素。
```
```
:only-of-type
    - 如果要选择第某类特定的子元素(p) 在兄弟节点中是此类元素唯一个的话 就需要用到这个属性了
    - 匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1)：nth-last-of-type(1)
```
```
:enabled  可用的元素
:disabled 不可用的元素
    - 在web的表单中，有些表单元素有可用（“enabled”）和不可用（“disabled”）状态，比如输入框，密码框，复选框等。
    - 在默认情况下，这些表单元素都处在可用状态。那么我们可以通过伪类选择器 enabled 进行选择，disabled则相反。
```
```
:checked 选择框的被选中状态

注：checkbox, radio 的一些默认状态不可用属性进行改变，如边框颜色。
```
```
:read-only  选中只读的元素
    eg:<input type=“text” readonly=“readonly”/>

:read-write 选中非只读的元素
    eg:<input type=“text”/>
```
3. **伪元素选择器**
```
CSS3对伪元素进行了一定的调整，在以前的基础上增加了一个:
也就是现在变成了::first-letter,::first-line,::before,::after,另外还增加了一个::selection

::selection
    - "::selection"选择器是用来匹配突出显示的文本（用鼠标选择文本的时候）。浏览器默认情况下，用鼠标选择网页文本是以“蓝色的北京，白色的字体”显示的。
    - 属性：user-select：none | text | all | element --> 设置或检索是否允许用户选中文本。

注：火狐下必须加-moz-，-moz-::selection
```
3. **条件选择器**  
```
E > F  an F element child of an E element
直接子元素

E + F an F element immediately preceded by an E element 
后面的紧挨着的兄弟节点

E ~ F an F element preceded by an E element
后面的兄弟节点
```
#### Css3边框和背景  
1. **Css边框**  
```
border-image ———— 边框应用背景

    语法：/* border-image: image-source image-height image-width image-repeat */
        --> 将图片分为九宫格形式，而元素也会根据内容区边界延伸将元素分为九宫格，之后将图片与元素对应；
	参数：
        *image-source*
            - 若 border-image-source（此值可用border-image-source 或border-image简写设置) 的值为 none 或者图片不能显示，则将应用 border-style。
        *image-height image-width* 
            - 根据这两个值分别作出距离图片左边款，右边框为image-width的两条竖线，做出距离图片上边梁，下边框为image-height的两条横线，将图片分为九宫格
            - 为截取指定图片四周的宽度作为border的背景填充部分(截取图可按border-width 大小伸缩), number为一个数字时是复合写法

        *image-repeat*
            - stretch 拉伸，有多长拉多长。有多远“滚”多远
            - repeat (和4角上 同等大小图片进行平铺  当边框中间区域长度不是4角图片大小的整数倍时 会被切割)
			- round 铺满(4角上的图片 进行拉伸平铺,不会被切割)
      
    eg: 
        - border-image: url("/images/border.png") 30 30 repeat;
        - border-image: url("/images/border.png") 30 30 stretch;
```
```
border-radius ————— 边框圆角  

    border-radius:20px; -->代表四个点的半径

    border-radius: 20px 30px;-->第一个值代表左上和右下的半径，第二个值代表右上和左下的半径

    border-radius: 20px 30px 40px;-->第一个值代表左上半径，第二个值代表右上和左下的半径，第三个值代表右下的半径
    
    border-radius:20px 30px 40px 50px;-->第一个值代表左上半径，第二个值代表右上，第三个值代表右下的半径，第四个值代表左下
    
    border-radius:20px 30px 40px 50px / 20px 30px 40px 50px;-->/之前代表四个点横向的长度，/之后代表四个点纵向的长度

    border-top-left-radius:20px;
    border-top-right-radius:20px;
    border-bottom-right-radius:20px;
    border-bottom-left-radius:20px;

    border-top-left-radius:20px 20px;
    border-top-right-radius:20px 20px;
    border-bottom-right-radius:20px 20px;
    border-bottom-left-radius:20px 20px;
```
```
box-shadow ———— 盒子阴影

    box-shadow: X轴偏移量 Y轴偏移量 [阴影模糊半径] [阴影扩展半径] [阴影颜色] [投影方式];
        -->阴影扩展半径扩展原则：
            - 若offset-x = 0,offset-y = 0-->则四边阴影均扩展
            - 若offset-x = 0,offset-y != 0-->则x轴方向两侧阴影均扩展，y轴方向扩展与 offset-y方向一致
            - 若offset-x != 0,offset-y = 0-->则y轴方向两侧阴影均扩展，x轴方向扩展与 offset-x方向一致
            - 若offset-x != 0,offset-y != 0-->则x轴方向扩展与 offset-x方向一致，y轴方向扩展与 offset-y方向一致
       
        eg:
            .box_shadow{
                box-shadow:4px 2px 6px 7px #333333 inset; 
            }

    同一盒子，可以同时加多个阴影，阴影之间用“,”隔开

        .box_shadow{
            box-shadow:4px 2px 6px #f00, -4px -2px 6px #000, 0px 0px 12px 5px #33CC00 inset;
        }

```



