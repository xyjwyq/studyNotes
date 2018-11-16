---
typora-root-url: ./
---

### 前端学习笔记
---

### 目录

- [HTML基础](#html基础)  
- [Css基础](#css基础)  
- [js基础](#js基础)  
    - [BOM](#bom)
    - [数据扩展方法](#数组扩展方法)
- [jQuery](#jquery)  
- [网络](#网络)  
- [Css3](#css3)  
    - [选择器](#选择器)
    - [边框和背景](#边框和背景)
    - [文本与颜色](#文本与颜色)
    - [盒模型](#盒模型)
    - [overflow](#overflow)
    - [flex弹性布局](#flex弹性布局)
    - [网格布局](#网格布局)
    - [transform变形](#transform变形)
    - [transition过渡动画](#transition过渡动画)
    - [3d变换](#3d变换)
    - [动画性能优化](#动画性能优化)
    - [animation动画](#animation动画)
    - [响应式布局](#响应式布局)
      - [媒体查询](#媒体查询)
      - [像素](#像素)
- [Bootstrap](#bootstrap)  
- [HTML5](#html5)  
- [Webpack](#webpack)  
- [Es6](#es6)  
    - [块级绑定](#块级绑定)
    - [函数扩展](#函数扩展)
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

### JS

---

#### BOM

```javascript
I BOM概念
	- BOM是browser object model的缩写，简称浏览器对象模型
	- 主要处理浏览器窗口（window）和框架（iframe），描述了与浏览器进行交互的方法和接口，可以对浏览器窗口进行访问和操作。通常浏览器特定的 JavaScript 扩展都被看做 BOM 的一部分。

II BOM的作用
    - 弹出新的浏览器窗口
    - 移动、关闭浏览器窗口以及调整窗口大小
    - 提供 Web 浏览器详细信息的定位对象
    - 提供用户屏幕分辨率详细信息的屏幕对象
    - 对 cookie 的支持
    - IE 扩展了BOM，加入了ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象

III BOM核心
	- window对象是BOM的顶层(核心)对象，玩转BOM，就是玩转window的属性和方法
	- Window对象它具有双重角色，既是通过js访问浏览器窗口的一个接口，又是一个全局对象。这意味着在网页中定义的任何对象，变量和函数，都是window的属性

IV BOM组成
    - Window JavaScript 层级中的顶层对象表示浏览器窗口
    - Navigator包含客户端浏览器的信息
    - History 包含了浏览器窗口访问过的 URL
    - Location 包含了当前 URL 的信息
    - Screen 包含客户端显示屏的信息
    
V BOM与DOM的关系
```

> ![BOM与DOM的关系](/src/img/dom-bom.jpg)

#### 数组扩展方法

1. foreach —— 遍历

   ```javascript
   Array.prototype.myForeach = function(func){
       if(typeof func !== 'function' || this == null) return;
       var i = 0,
       	_arr = this,
       	length = _arr.length,
       	thisArg = arguments[1] || window;
       for(; i< length; i++){
           func.apply(thisArg, [_arr[i], i, _arr]);
       }    	
   }
   ```

2. filter —— 过滤

   ```javascript
   Array.prototpe.myFilter = function(func){
       if(typeof func !== 'function' || this == null) return;
       var _arr = this,
           length = _arr.length,
           thisArg = arguments[1] || window,
           i = 0,
           result = [];
       for(; i < length; i++){
           func.apply(thisArg,[_arr[i], i, _arr]) ? result.push(_arr[i]) : '';
       }
       return result;
   }
   
   //filter使用
   var arr = [{a:20},{b:40}];
   var newArr = arr.filter(function(ele, index, self){
       return true/false;//返回true则，将arr[index]放入新数组
   }, {test: 'test'});
   ```

3. map —— 映射

   ```javascript
   Array.prototpe.myMap = function(func){
       if(typeof func !== 'function' || this == null) return;
       var _arr = this,
           length = _arr.length,
           thisArg = arguments[1] || window,
           i = 0,
           result = [];
       for(; i < length; i++){
           //注意_arr[i]为引用类型的情况，若为引用类型，应使用深拷贝，以保护原数组中的值
           result.push(func.apply(thisArg,[_arr[i], i, _arr]) );
       }
       return result;
   }
   
   /*map使用形式*/
   var arr = [{a:20},{b:40}];
   var newArr = arr.map(function(ele,index,self){
       return value；//想要的返回值，若返回值为引用类型，则修改新数组中的内容会改变原数组中的内容
   },{thisArg: 'test'});
   ```

4. every —— 数组中所有的元素是不是均满足条件

   ```javascript
   Array.prototpe.myEvery = function(func){
       var _arr = this, 
           length = _arr.length, 
           thisArg = arguments[1] || window;
       for(var i = 0; i < length; i++){
           if(!func.apply(thisArg, [_arr[i], i, _arr])){
               return false;
           }
       }
       return true;
   }
   ```

5. some —— 数组中的元素是否有符合条件的额元素

   ```javascript
   Array.prototpe.mySome = function(func){
       var _arr = this, 
           length = _arr.length, 
           thisArg = arguments[1] || window;
       for(var i = 0; i < length; i++){
           if(func.apply(thisArg, [_arr[i], i, _arr])){
               return true;
           }
       }
       return false;
   }
   ```

6. reduce

   ```javascript
   Array.prototpe.myReduce = function(func, initialValue){
       var _arr = this, 
           length = _arr.length, 
           i = 0;
       if(!initialValue){
           initialValue = _arr[0];
           i += 1;
       }
       for(; i < length; i++){
          initialValue = func.apply(null. [initialValue, _arr[i], i, _arr]);
       }
       return initialValue;
   }
   
   //reduce使用
   var arr = [{a:20},{b:40}];
   var lastValue = arr.reduce(function(preValue, curValue, index, self){
       //相应处理
       return preValue;
   },{init: 'init'});
   ```

7. reduceRight

   ```javascript
   Array.prototpe.myReduceRight = function(func, initialValue){
       var _arr = this, 
           length = _arr.length, 
           i = length;
       if(!initialValue){
           initialValue = _arr[length-1];
           i -= 2;
       }
       for(; i > 0; i--){
          initialValue = func.apply(null. [initialValue, _arr[i], i, _arr]);
       }
       return initialValue;
   }
   ```

---

### Css3  

---
#### 选择器
1. **属性选择器**  
```css
E[att="val"] {…}
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值为val的字符串
```
```css
E[att^="val"] {…}
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值以val开头的任何字符串
```
```css
E[att$="val"]{…}
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值以val结尾的任何字c符串
```
```css
E[att*="val"]{…}：
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值任意位置出现了“val”。即属性值包含了“val”，位置不限。
```
```css
E[att~="val"]{…}：
    选择匹配元素E, 且E元素定义了属性 attr, 其属性值中存在val单词的任何字符串。
```
2. **初级伪类选择器** -- 伪类用于向某些选择器添加特殊的效果  
```css
:root 根标签选择器
    - :root选择器等同于 html元素，简单点说 :root{background:orange}与html{background:orange}，得到的效果等同  
    - 建议使用:root（xml等）  
```
```css
:not 否定选择器
    - 用法和jQuery 中的not类似，可以排除某些特定条件的元素  
        div:not([class=“demo”]){
            background-color:red;
        }
    - 意思为除了class为 demo的 div以外，所有的div的背景颜色都变红
```
```css
:empty 空标签选择器
    用来选择没有内容的元素、不在文档树中的元素，这里的没有内容指的是一点内容都没有，哪怕是一个空格。
```
```css
:target 目标元素选择器
    - 用来匹配被location.hash 选中的元素(即锚点元素)
    - 选择器可用于选取当前活动的目标元素
```
```css
:first-child 匹配父元素的第一个一个子元素，等同于:nth-last-child(1)
:last-child 匹配父元素的最后一个子元素，等同于:nth-last-child(1)
:nth-child(n){} 匹配其父元素的第n个子元素，第一个编号为1
:nth-last-child(){}  匹配其父元素的倒数第n个子元素，第一个编号为1

以上五个选择器均有弊端，即如果当前位置元素不是前面所修饰的元素，那么无效
注：其父元素的第 N 个子元素，不论元素的类型。
```
```css
:first-of-type 匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)
:last-of-type 匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)
:nth-of-type(n){} 与:nth-child()作用类似，但是仅匹配使用同种标签的元素
:nth-last-of-type(){}  与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素

此种选择器，限制了类型，即在所修饰元素的类型下选择特定位置的元素
```
```css
:only-child  唯一子元素选择器
    - 选择是独生子的子元素，即该子元素不能有兄弟元素，它的父元素只有他一个直接子元素。
    - 匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1)

注意：选择的元素是独生子子元素，而非有唯一子元素的父元素。
```
```css
:only-of-type
    - 如果要选择第某类特定的子元素(p) 在兄弟节点中是此类元素唯一个的话 就需要用到这个属性了
    - 匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1)：nth-last-of-type(1)
```
```css
:enabled  可用的元素
:disabled 不可用的元素
    - 在web的表单中，有些表单元素有可用（“enabled”）和不可用（“disabled”）状态，比如输入框，密码框，复选框等。
    - 在默认情况下，这些表单元素都处在可用状态。那么我们可以通过伪类选择器 enabled 进行选择，disabled则相反。
```
```css
:checked 选择框的被选中状态

注：checkbox, radio 的一些默认状态不可用属性进行改变，如边框颜色。
```
```css
:read-only  选中只读的元素
    eg:<input type=“text” readonly=“readonly”/>

:read-write 选中非只读的元素
    eg:<input type=“text”/>
```
3. **伪元素选择器**
```css
CSS3对伪元素进行了一定的调整，在以前的基础上增加了一个:
也就是现在变成了::first-letter,::first-line,::before,::after,另外还增加了一个::selection

::selection
    - "::selection"选择器是用来匹配突出显示的文本（用鼠标选择文本的时候）。浏览器默认情况下，用鼠标选择网页文本是以“蓝色的北京，白色的字体”显示的。
    - 属性：user-select：none | text | all | element --> 设置或检索是否允许用户选中文本。

注：火狐下必须加-moz-，-moz-::selection
```
4. **条件选择器**  
```css
E > F  an F element child of an E element --> 直接子元素

E + F an F element immediately preceded by an E element --> 后面的紧挨着的兄弟节点

E ~ F an F element preceded by an E element --> 后面的兄弟节点
```
#### 边框和背景  
1. **Css边框**  
```css
border-image ———— 边框应用背景

    语法：/* border-image: image-source image-height image-width image-repeat */
    	- 将图片分为九宫格形式，而元素也会根据内容区边界延伸将元素分为九宫格，之后将图片与元素对应；
	参数：
        *image-source*
            - 若 border-image-source（此值可用border-image-source 或border-image简写设置) 的值为 none 或者图片不能显示，则将应用 border-style。
            
        *image-height image-width* 
            - 根据这两个值分别作出距离图片左边框，右边框为image-width的两条竖线，做出距离图片上边框，下边框为image-height的两条横线，将图片分为九宫格
            - 为截取指定图片四周的宽度作为border的背景填充部分(截取图可按border-width 大小伸缩), number为一个数字时是复合写法

        *image-repeat*
            - stretch 拉伸，有多长拉多长。有多远“滚”多远
            - repeat (和4角上 同等大小图片进行平铺  当边框中间区域长度不是4角图片大小的整数倍时 会被切割)
            - round 铺满(4角上的图片 进行拉伸平铺,不会被切割)
      
    eg: 
        - border-image: url("/images/border.png") 30 30 repeat;
        - border-image: url("/images/border.png") 30 30 stretch;
```
```css
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
```css
box-shadow ———— 盒子阴影

    box-shadow: X轴偏移量 Y轴偏移量 [阴影模糊半径] [阴影扩展半径] [阴影颜色] [投影方式];
        - 阴影扩展半径扩展原则：
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
2. **Css背景**  
```css
background-origin ———— 指定背景图片background-image 属性的原点位置的背景相对区域.

    <box> = border-box | padding-box | content-box
        - border-box --> 背景图片的摆放以border区域为参考
        - padding-box --> 背景图片的摆放以padding区域为参考
        - content-box --> 背景图片的摆放以content区域为参考

注意：当使用 background-attachment 为fixed时，该属性将被忽略不起作用。
```
```css
background-clip ————  设置元素的背景（背景图片或颜色）是否延伸到边框下面

    background-clip ： border-box | padding-box | content-box 
        - 参数分别表示从边框、或内填充，或者内容区域向外裁剪背景。
        - no-clip表示不裁切，和参数border-box显示同样的效果。background-clip 默认值为border-box。
```
```css
background-size ————  设置背景图片大小

   background-size: auto | <长度值> | <百分比> | cover | contain
        - auto：默认值，不改变背景图片的原始高度和宽度；
        
        - <长度值>：成对出现如200px 50px，将背景图片宽高依次设置为前面两个值，当设置一个值时，将其作为图片宽度值来等比缩放；
        
        - <百分比>：0％~100％之间的任何值，将背景图片宽高依次设置为所在元素宽高乘以前面百分比得出的数值，当设置一个值时同上；
        
        - cover：保留背景图片固有比例，按差值（元素宽与图片宽或者元素高于图片高）最大的边进行放大或缩小，最大的包含或覆盖背景区。如果图像没有固有比例，则按背景区大小
        
        - contain：保留背景图片固有比例，按差值最小（元素宽与图片宽或者元素高于图片高）的边进行放大或缩小，最大的包含或覆盖背景区。如果图像没有固有比例，则按背景区大小
```
```css
background

    background-image: url("./img/a.jpg"); //设置元素背景图片
    background-repeat： repeat/no-repeat； //设置背景图像的平铺方式 默认repeat
    background-position:left top//设置元素的背景定位起点，默认值为left top
    background-size：auto;设置背景图像的尺寸大小，默认值auto
    background-attachment：scroll|fixed；设置元素背景图片是否为固定，默认值为auto
    background-clip：border-box;控制元素的背景图像显示区域大小，默认值为border-box
    background-origin：padding-box；控制元素的背景图像position的默认起始点，默认值为padding-box
    background-color：设置背景颜色
```
#### 文本与颜色
1. **文本**  
```css
text-shadow ———— 文本阴影

    text-shadow: X-Offset Y-Offset blur color;        
        - X-Offset：表示阴影的水平偏移距离，其值为正值时阴影向右偏移，反之向左偏移；
        
        - Y-Offset：是指阴影的垂直偏移距离，如果其值是正值时，阴影向下偏移，反之向上偏移；
        
        - blur：是指阴影的模糊程度，其值不能是负值，如果值越大，阴影越模糊，反之阴影越清晰，如果不需要阴影模糊可以将Blur值设置为0；
        
        - color：是指阴影的颜色，其可以使用 rgba色。
```
```css
文本换行

    word-wrap: normal|break-word;
        - normal: 单词换行
        - break-word: 强制换行

    Word-break：normal| break-all |keep-all; 
        - break-all: 强制换行，不区分单词
        - keep-all: 区分单词，把单词展示完全
        - normal: 单词换行
        - break-all强行截断英文单词，达到词内换行效果； keep-all不允许字断开。单词整个换行)
    
    White-space： normal | pre  | pre-line | pre-wrap | nowrap | inherit
        - 对空白操作也可用于换行
        
        - Pre : 所有空格。包括换行符，都会被浏览器扣留，其行为方式类似于 HTML中的 pre标签
        
        - pre-line 保留换行符并合并空格，换行由单词长度决定，单词展现完全，即正常换行；此属性值不支持IE7.0和Firefox3.0以下版本浏览器
        
        - pre-wrap  保留换行符和空格，换行由单词长度决定，单词展现完全，即正常换行；此属性值不支持IE7.0和Firefox3.0以下版本浏览器
        
        - nowrap: 文本不会换行，文本会在同一行上，并且不识别换行符和多空格（将紧挨的多个空格合并为一个空格），直到碰到换行标签 br为止
        
        - inherit： 继承父元素的white-space属性值，此属性值再所有的IE浏览器都不支持
```
```css
自定义字体

    @font-face{
        font-family:”myFirstFont”;
        src:url('Sansation_Light.ttf'),
            url('Sansation_Light.eot') format('eot')；
    }
    p{
        font-family:”myFristFont”;
    }

    地址：http://www.w3cplus.com/content/css3-font-face

    format: 此值指的是你自定义的字体的格式，主要用来帮助浏览器识别浏览器对@font-face的兼容问题，这里涉及到一个字体format的问题，因为不同的浏览器对字体格式支持是不一致的，浏览器自身也无法通过路径后缀来判断字体
```
```css
text-overflow ———— 溢出文本属性

    Text-overflow：clip| ellipsis；  文本溢出切断|省略号
    
	超出打点功能：
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
```
```css
Columns ———— 多列布局

    为了能在Web页面中方便实现类似报纸、杂志那种多列排版的布局，W3C特意给CSS3增加了一个多列布局模块（CSS Multi Column Layout Module）。它主要应用在文本的多列布局方面，这种布局在报纸和杂志上都使用了几十年了，但要在Web页面上实现这样的效果还是有相当大的难度，庆幸的是，CSS3的多列布局可以轻松实现。

    columns: [column-width] [column-count];
        - column-width:指每一列的宽度 根据容器宽度自适应 （最小宽度） 
        - column-count:指规定的列数 唯一精准的是列数
        - 不要两一起使用 会乱

    column-gap:设置列与列之间的宽度，直接用数值表示即可(eg:10px) 
        - column-gap主要用来设置列与列之间的间距  如果没有显示设置column-gap值时，其值大小会根据浏览器默认的font-size来定

    column-rule ———— 是不占用任何空间位置的，在列与列之间改变其宽度不会改变任何列的位置。
        - column-rule-width: 宽度类似于border-width属性，主要用来定义列边框的宽度，其默认值为“medium”。该属性接受任意浮点数，但不接收负值。但也像border-width属性一样，可以使用关键词：medium、thick和 thin。
        
        - column-rule-style: 样式类似于border-style属性，主要用来定义列边框样式，其默认值为“none”。该属性值与 border-style属值相同，包括none、hidden、dotted（原点）、dashed（虚线）、solid（直线）、double（两条线相同颜色的线）、groove（两条深浅不同颜色的线左深右浅）、ridge（两条深浅不同颜色的线左浅右深）、inset（两条深颜色线合成）、outset（两条浅颜色线合成）
        
        - column-rule-color: 颜色	类似于border-color属性

    column-span: 1/all 
        - 设置多列布局元素内的子元素，可以跨列，类似标题效果。即一个新闻标题要横跨所有内容列。注：此属性要在子元素上设置。
```
2. **颜色** 
```css
RGBA ———— 颜色值

    RGB是一种色彩标准，是由红(R)、绿(G)、蓝(B)的变化以及相互叠加来得到各式各样的颜色。RGBA是在   RGB的基础上增加了控制 alpha透明度的参数。

    color：rgba(R,G,B,A)
        - 以上R、G、B三个参数，正整数值的取值范围为：0 - 255。
        - 百分数值的取值范围为：0.0% - 100.0%。
        - 超出范围的数值将被截至其最接近的取值极限。并非所有浏览器都支持使用百分数值。
        - A为透明度参数，取值在0~1之间，不可为负值。

    background-color:rgba(100,120,60,0.5);
```
```css
HSL
    HSL 和RGB一样，同属于工业界的一种颜色标准，通过对色调H、饱和度（S）、亮度（L）三个颜色通道的变化以及他们相互之间的叠加得到各式各样的颜色的。

    Color： hsl（h,s,l）
    - H: 色调。取整数值， 0（或360或-360）表示红色，60表示黄色，120表示绿色，180表示青色，240表示蓝色，300表示洋红。当值大于360时实际的值等于该值除以360之后的余数。 450 % 360 = 90 
    
    - S：饱和度，就是颜色的深浅度和鲜艳程序，取百分数，可以取值0~100%之间的任意值，其中0表示灰度（没有该颜色），100%表示饱和度最高（改颜色最鲜艳）
    
    - L：亮度。取值和饱和度一样0~100% 其中0表示暗（黑色）100%表示最亮（白色）
```
```css
Gradient ———— 渐变的背景颜色 

    CSS3的渐变分为两种
    1）线性渐变（linear - to）
    linear-gradient([direction], color [percent], color [percent], …)
        - [] 内为选填
        - direction角度的单位为 “deg” 也可以用to bottom, to left, to top left等的方式来表达

    background: linear-gradient(to top, green , red, blue);
    background: linear-gradient(to top, green 0%, red 20%, blue 100%);
    background: linear-gradient(30deg, green 0%, red 20%, blue 100%);
    background: linear-gradient(to top/right/bottom/left/right bottom/..., green 0%, red 20%, blue 100%);

    2）径向渐变（radial - at）
    
    background: radial-gradient(shape <extent-keyword> at position, <color-stop>);
        - shape:放射的形状，可以为原型circle，可以为椭圆ellipse
        
        - position: 圆心位置，可以两个值，也可以一个，如果为一个时，第二个值默认center 即 50%。值类型可以为，百分数，距离像素，也可以是方位值(left,top...); /*x 轴主半径 y轴次半径*/
        
        - <extent-keyword> = closest-corner | closest-side | farthest-corner | farthest-side  
            - closest-side: 指定径向渐变的半径长度为从圆心到离圆心最远的角  
            - closest-corner: 指定径向渐变的半径长度为从圆心到离圆心最近的边   
            - farthest-side: 指定径向渐变的半径长度为从圆心到离圆心最近的角  
            - farthest-corner: 指定径向渐变的半径长度为从圆心到离圆心最远的边

        - <color-stop> = <color> [ <percentage> | <length> ]? 

    - background-image: radial-gradient(ellipse farthest-corner at 45px 45px, #00ffff 0%, rgba(0, 0, 255, 0) 50%, #0000ff 95%);
    - background-image: radial-gradient(ellipse farthest-corner at 470px 47px , #ffff80 20%, rgba(204, 153, 153, 0.4) 30%, #e6e6ff 60%);
    - background-image: radial-gradient(farthest-corner at 45px 45px , #ff0000 0%, #0000ff 100%);
    - background-image: radial-gradient(16px at 60px 50% , #000000 0%, #000000 14px, rgba(0, 0, 0, 0.3) 18px, rgba(0, 0, 0, 0) 19px);
```
```css
transparent 透明色颜色值   

    利用transparent画三角
    eg: div{
                width:100px;
                height:100px;
                border:100px solid black;
                border-left-color:red/transparent;
                border-top-color:green/transparent;
                border-right-color:blue/transparent;
            }
```
#### 盒模型
```css
在css中盒模型被分为两种，第一种是w3c的标准盒模型，另一种是IE6混杂模式的传统模型。他们都是对元素计算尺寸的模型。但他们的不同是计算的方式不同。
    
    W3C标准盒模型
        - element空间高度（盒子） = width + padding + border;
        - width 为内容高度。即width不包括 padding 和 border
    
    IE6混杂模式盒模型
        - 内容高度 （真实高度）= width - padding - border，即 设置width的数值就是 element 的空间高度，width包含 padding 和border

    box-sizing : border-box/content-box
        - content-box为 W3C标准盒子
        - border-box为 IE6混杂模式的盒子
```
#### overflow

```css
内容溢出

    overflow: visible | hidden | scroll | auto --> overflow不属于复合属性
    Overflow-x: visible | hidden | scroll | auto --> 当只设置overflow-x时，overflow-y默认为scroll
    Overflow-y: visible | hidden | scroll | auto --> 同overflow-x
        - Visible: 默认值。表示不见且容器中的任何内容，不添加滚动条，元素将被剪切为包含对象的窗口大小，而且clip属性设置将失败
        
        - Auto：在需要时剪切内容并添加滚动条。也就是说当内容超过容器的宽度或者高度时，溢出的内容将会隐藏在容器中，并且会添加滚动条，用户可以拖动滚动条查看隐藏在容器中的内容。
        
        - hidden：内容溢出容器时，所有内容都将隐藏，而且不显示滚动条。
        
        - Scroll：不管内容有没有溢出容器，overflow-x都会显示横向的滚动条，而overflow-y显示纵向滚动条
```
```css
resize ———— 内容缩放属性  

    resize: none | both | horizontal | vertical | inherit
        - 主要是用来改变元素尺寸大小的，其主要目的是增强用户体验
        - None: 用户不能拖拽元素修改大小
        - Both：用户可以拖动元素，同时修改元素的宽度和高度
        - Horizontal：用户可以拖动元素，仅可以修改元素的宽度，但不能修改元素的高度
        - Vertical：用户可以拖动元素，尽可改变元素的高度，但不能改变元素的宽度。
        - Inherit：继承父元素的resize属性值

    IE不兼容， 常用在textarea中
```
#### flex弹性布局

```css
flex ———— CSS3弹性盒模型

    display:flex --> flex为复合属性，且必须配合父元素display:flex使用。

    以下6个属性设置在项目（子元素）上:
        - flex-grow：放大比例
            - 根据所设置的比例分配盒子所剩余的空间拓展：左右两栏布局 默认值0；
            
        - flex-shrink：缩小比例
            - 设置元素的收缩比例— 多出盒子的部分，按照比例的大小砍掉相应的大小，即比例越大，被砍的越大，默认值1；
            
        - flex-basis：伸缩基准值
            - 伸缩基准值，项目占据主轴的空间；该属性设置元素的宽度或高度，当然width也可以用来设置元素宽度，如果元素上同时出现了   width 和flex-basis那么 flex-basis会覆盖 width的值
            
        - flex：是flex-grow, flex-shrink 和 flex-basis的简写
        
        - order：排列顺序
            - number定义项目的排列顺序。数值越小，排列越靠前，默认为0
            
        - align-self ：单个项目对齐方式
            - align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的     align-items属性，如果没有父元素，则等同于stretch。
            - align-self: auto | flex-start | flex-end | center | baseline | stretch;

    以下6个属性设置在容器上
        - flex-direction 决定主轴的方向
            - flex-direction: row | row-reverse | column | column-reverse;
            
        - flex-wrap 是否换行
            - 默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。            
            - flex-wrap: nowrap | wrap | wrap-reverse;
            
        - flex-flow  flex-direction和 flex-wrap的简写，默认值为row nowrap。
        
        - justify-content  项目在主轴上的对齐方式
            - justify-content: flex-start | flex-end | center | space-between | space-around;
            
        - align-items  在侧轴上如何对齐
            - align-items: flex-start | flex-end | center | baseline | stretch;
            
        - align-content  定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
            - align-content: flex-start | flex-end | center | space-between | space-around | stretch
```

#### 网格布局

```css
* 网格布局的作用于意义？   
	- 传统的CSS页面布局 一直不够理想，包括table布局、浮动、定位及内联块等方式，从本质上都是Hack的方式，并且遗漏了一些重要的功能（比如：垂直居中）
	- Flexbox的出现解决了部分上述问题，但Flex布局是为了解决简单的一维布局，适用于页面局部布局。
	-  CSS网格布局（Grid）是一套二维的页面布局系统，是为了解决复杂的二维布局而出现的，适用页面的整体布局

* 网格布局与flex的联系与区别？
	- 区别
		- flex是为了解决简单的一维布局，适用于页面局部布局
		- gird是一套二维的页面布局系统，是为了解决复杂的二维布局而出现的，适用页面的整体布局
	- 联系
		- 在实际工作中，Grid和Flexbox不但不矛盾，而且还能很好的结合使用，因为使用grid进行整体布局，flex进行局部布局能起到较好的效果；

* 网格布局使用
	I 网格容器
		- 将属性display值设为grid或inline-grid就创建了一个网格容器，所有容器直接子结点自动成为网格项目。
		- display: grid：网格项目按行排列，网格项目占用整个容器的宽度。
		- display：inline-grid：网格项目按行排列，网格项目宽度由自身宽度决定

	II 显示网格
		- 属性grid-template-rows和grid-template-columns用于显示定义网格，分别用于定义行轨道和列轨道。

		- grid-template-rows：用于定义行的尺寸，即轨道尺寸，行高。轨道尺寸可以是任何非负的长度值（px，%，em，等）
			- grid-template-rows: 50px 100px  网格项目1的行高是50px，网格项目2的行高是100px。
因为只定义了两个行高，网格项目3和4的行高取决于其本身的高度

		- grid-template-columns：用于定义咧的尺寸，即每列的列宽。
			- grid-template-columns: 90px 50px 120px 因为定义中只有三列，所以项目4，5，6排在新的一行; 并因为它们位于第1，2，3列的轨道上，所以其宽度等于定义中第1，2，3列轨道的宽度。
			- grid-template-columns: 1fr 1fr 2fr; 单位fr用于表示轨道尺寸配额，表示按配额比例分配可用空间。本例中，项目1占 1/4 宽度，项目2占 1/4 宽度，项目3占 1/2 宽度。
			- grid-template-columns: 3rem 25% 1fr 2fr; 单位fr和其它长度单位混合使用时，fr的计算基于其它单位分配后的剩余空间。本例中，1fr = (容器宽度 - 3rem - 容器宽度的25%) / 3

	III 轨道的最小最大尺寸设置
		- 函数minmax()用于定义轨道最小/最大边界值；函数minmax()接收两个参数：第一个参数表示最小轨道尺寸，第二个参数表示最大轨道尺寸。长度值可以是auto，表示轨道尺寸可以根据内容大小进行伸长或收缩
		- grid-template-rows:    minmax(100px, auto);
		- grid-template-columns: minmax(auto, 50%) 1fr 3em;

	IV 重复的网格轨道
		- 函数repeat()用来定义重复的网格轨道，尤其适用于有多个相同项目的情况下；函数repeat()接收两个参数：第一个参数表示重复的次数，第二个参数表示轨道尺寸
		- grid-template-rows:    repeat(4, 100px);
		- grid-template-columns: repeat(3, 1fr);
		- grid-template-columns: 30px repeat(3, 1fr) 30px;

	V 定义网格间隙
		- 属性grid-column-gap 和 grid-row-gap用于定义网格间隙。网格间隙只创建在行列之间，项目与边界之间无间隙。
        - grid-row-gap:    20px;
        - grid-column-gap: 5rem;
		- grid-gap: 100px 1em; 是grid-row-gap和grid-column-gap的简写形式：第一个值表示行间隙，第二个值表示列间隙。
		- grid-gap: 2rem; 如只有一个值，则其即表示行间隙，也表示列间隙

	VI 用网格线编号定位项目
		- 网格线本质上是用来表示网格轨道的开始和结束。每一条网格线编号都以1开始，以1为步长向前编号，其中包括行列两组网格线。
       .son{
            /*设置在子项目上，定位子项目*/
           
            /*1*/
            /*利用网格线编号定位在第2行第2列的位置上*/
            grid-row-start:    2;
            grid-row-end:      3;
            grid-column-start: 2;
            grid-column-end:   3;
           
           /*2*/
           grid-row:    2;/*grid-row 是 grid-row-start 和 grid-row-end的简写形式*/
           grid-column: 3 / 4;/*grid-column 是 grid-column-start 和 grid-column-end的简写形式。*/
           /*如果只指定一个值，它表示 grid-row/column-start。*/
           /*如果两个值都指定，第一个表示 grid-row/column-start ，第二个值表示grid-row/column-end。而且你必须用斜杠（/）分隔这两个值。*/
           
            /*3*/
           grid-area: 2 / 2 / 3 / 3;
           /*grid-area 是 grid-row-start, grid-column-start, grid-row-end 和 grid-column-end的简写形式*/
           /*如果四个值都指定，则第一个表示 grid-row-start, 第二个表示 grid-column-start, 第三个表示 grid-row-end ,第四个表示 grid-column-end*/           
        }


	VII 网格项目跨越行列
		- 网格项目默认都占用一行和一列，但可以使用前一节中定位项目的属性来指定项目跨越多行或多列。
        .son{
            /*1*/
            grid-column-start: 1;
            grid-column-end:   4;
            /*通过grid-column-start和grid-column-end属性值的设置，使该网格项目跨越多列。*/

            /*2*/
            grid-row-start: 1;
            grid-row-end:   4;
            /*通过grid-row-start和grid-row-end属性值的设置，使该网格项目跨越多行。*/

           /*3*/
            grid-row:    2 / 5;
            grid-column: 2 / 4;
            /*属性 grid-row 和 grid-column 即能用来定位项目，也能用来使项目跨越多个行列*/

            /*4*/
            grid-row:    2 / 5;
            grid-column: 2 / 4;
            /*关键字 span 用来指定跨越行或列的数量*/
        }

    VIII 网格线命名
    IX网格线命名
    X用网格线名定位项目
    XI用同名网格线命名和定位项目
    XII用网格区域命名和定位项目
    XIII隐式网格
    XIV隐式命名的网格区域
    XV隐式命名的网格线
    XVI层叠网格项目

    XVII网格项目的对齐方式
		- 属性justify-items 和 justify-self 以行轴为参照对齐项目，属性align-items and align-self 以列轴为参照对齐项目。
		- 属性justify-items 和 align-items 是网格容器的属性：auto normal start end center stretch baseline first baseline last baseline
		- 属性align-self 和 justify-self定义自己的对齐方式：auto normal start end center stretch baseline first baseline last baseline

    XVIII网格轨道的对齐方式
		- 属性align-content用于定义网格轨道延着行的轴线的对齐方式，而属性justify-content用于定义网格轨道沿着列的轴线的对齐方式：normal start end center stretch space-around space-between space-evenly baseline
first baseline last baseline

罗马数字共有七个，即I(1)，V(5)，X(10)，L(50)，C(100)，D(500)，M(1000)。按照下面的规则可以表示任意正整数。
```

#### transform变形

```css
transform ———— 变换属性
	
	transform  可以实现元素的形状、角度、位置等的变化。

        rotate() --> 以x/y/z为轴进行旋转，默认为z --> 旋转时元素的坐标轴也会随着旋转
            - rotateX(), rotateY(), rotateZ()
            - rotate3d(x, y, z, angle) --> 将x,y,z轴的取值合成向量，以该向量为旋转轴旋转angle角度
        
        scale() --> 以x/y为轴进行缩放，保持中心点不变
            - scale(x, y) 接受两个值，如果第二参数未提供，则第二个参数使用第一个参数的值
            - scaleX(),scaleY() 值是数字表示倍数，不加任何单位
            - scaleZ()
            - scale3d() --> scale3d(sx,sy,sz)

		skew() --> 对元素进行倾斜扭曲，逆时针扭曲
            - skew(x, y)：接受两个值，第一个参数对应X轴，第二个参数对应Y轴。如果第二个参数未提供，则默认值为0
            - skewX(angle)：沿x轴进行扭曲，在保证元素中心不变的条件下，使平行于y 轴的两条边与竖轴的夹角为angle，且沿x轴负方向为正
            - skewY(angle) --> 以y轴负方向为正

        translate() --> 可以移动距离,相对于自身位置。
            - translate(x, [y])：相对于自身位置，沿着x/y轴平移，若第几二个参数未提供，则默认为0
            - translateX(), translateY(), translateZ()
		    - translate3d(x, y, z)
```
```css
transform-origin ———— 变换原点
	- transform-origin: x-axis y-axis z-axis;
	- 任何一个元素都有一个中心点，默认情况下，其中心点是居于元素x轴和y轴的50%处。其值如下：
```

> ![transform-origin-value](/src/img/transform-origin-value.jpg)

| 值     | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| x-axis | 定义视图被置于 X 轴的何处。可能的值：left ，center，right，length*，%* |
| y-axis | 定义视图被置于 Y 轴的何处。可能的值：top，center，bottom，length，*%* |
| z-axis | 定义视图被置于 Z 轴的何处。可能的值：*length*                |

#### transition过渡动画

```css
transition ———— 过渡动画

    transition  属性是css3的一个复合属性，主要包括一下几个子属性
        - transition-property:指定过渡或动态模拟的css属性
        - transition-duration:指定过渡所需要的时间
        - transition-timing-function:指定过渡函数
        - transition-delay:指定开始出现的延迟时间
    
    transition-timing-function  过渡函数可以选择的值
    	- linear：规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）
    	- ease：规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）
    	- ease-in：规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）
    	- ease-out：规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）
    	- ease-in-out：规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）
    	- cubic-bezier(n,n,n,n)：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值
        
    transition过渡动画可以参与过渡的属性，如下图：
```

> ![transition](/src/img/transition.jpg)

#### 3d变换

```css
transform-style: flat|presserve-3d;
    - flat: 默认，子元素将不保留其 3D 位置
    - preserve-3d : 子元素将保留其 3D 位置
    
注意：transform-style 属性需要设置在父元素中, 高于任何嵌套的变形元素
    
设置了transform-style:preserve-3d的元素，就不能防止子元素溢出设置overflow：hidden；否则会导致preserve-3d失效
```

```css
perspective ———— 景深，该属性指定了观察者与z=0平面的距离，使具有三维位置变换的元素产生透视效果。z>0的三维元素比正常大，而z<0时则比正常小，大小程度由该属性的值决定。

注意：
	- 作用在父级元素时，所有子元素共用一个视角，视角默认为父级元素中心 --> perspective：500px;
	- 作用于子元素时，会为每个子元素创建一个视角，每个视角均默认为元素中心 --> transform: perspective(500px);

perspective-origin ———— 透视中心，默认为50%，50%，与transform-origin的取值相似

backface-visiblity: hidden | visible ———— 表示在元素运动过程中，能否展示元素的背面
```

#### 动画性能优化

```css
- 尽可能多的利用硬件能力，如使用3d变形来开启GPU加速；如使用transform3d移动会比transition流畅
	* 3D变形会消耗更多的内存与功耗，应确实有性能问题时才去使用它，兼在权衡

- 如果动画过程有闪烁(通常发生在动画开始前)，可以尝试以下hack
    {
        -webkit-transform: translate3d(0, 0, 0);
        -moz-transform: translate3d(0, 0, 0);
        -ms-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }

- 尽可能少的使用box-shadow与gradients，这两个是性能杀手，应尽量避免使用

- 尽可能让动画元素不在文档流中，即脱离文档流，以减少重排

- 优化DOM重绘
```

#### animation动画

```css
animation: name duration timing-function delay iteration-count direction fill-mode play-state;
	- name：指定要绑定到选择器的关键帧的名称
	- duration 动画持续时间
	- timing-function：动画过渡函数(设置动画将如何完成一个周期)
	- delay：设置动画在启动前的延迟间隔
	- iteration-count：定义动画的播放次数
		- n | infinite
	- direction：指定是否应该轮流反向播放动画
		- noramal | reverse | alternate(奇数次正向播放，偶数次反向播放) | alternate-reverse
	- fill-mode：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式
		- forwards：动画最终停留的位置为最后一个关键帧的位置，表示动画在结束后继续应用最后的关键帧的位置
		- backwards 动画开始位置，即0%关键帧的位置立即执行(不会等待延迟)
		- both：0%关键帧理解执行，动画结束100%关键帧的位置
		- none：默认值，表示动画将按预期进行和结束，在动画完成其最后一帧时，动画会反转到初始帧处
	- play-state：指定动画是否正在运行或已暂停
		- running | paused

@keyframes ———— 关键帧
	/*animation动画会按照keyframe里面指定的帧状态而过渡执行*/
	/*0%-100%代表说动画的时间过渡*/
    @keyframes demoMove{
        0% { background-color:red;}
        10% { background-color:green;}
        20% { background-color:white;}
        50% { width:200px;}
        100% { height:200px;}
    }
```

#### 响应式布局

```css
* 什么是响应式布局？
	- 随着用户访问web页面终端的多样化，以前的设计目前无法适应这些多样化的终端设备，为了满足用户需求，Ethan Marcottee在A List Apart 发表了一篇开创性的文章，将弹性网格布局，弹性图片，媒体和媒体查询整合起来，将其命名为响应式设计（Response Web Design 简称RWD）

* 响应式布局的条件？
    - 网站必须建立灵活的网格基础；（设置的宽高不能是固定的）
    - 引用到网站的图片必须是可伸缩的（页面中用到图片不固定宽高）
    - 不同的显示风格，需要在MediaQuery上设置不同的样式（在不同终端上正常展示页面， 让用户体验不变）

* 响应式设计中的相关概念
    - 流体网格：可伸缩的网格 （大小宽高  都是可伸缩（可用flex））
    - 弹性图片：图片自适应（可把图片放在背景图片的位置 让div自适应）
    - 媒体查询：让网页在不同的终端上面展示效果相同（用户体验相同）
    - 屏幕分辨率： 
    - 主要断点： 设备宽度的临界点 

* 响应式布局技巧
    - 尽量少用无关紧要的div
    - 不要使用内联元素
    - 尽量少用JS或Flash
    - 丢弃没用的绝对定位和浮动样式
    - 摒弃任何冗余结构和不适用100%设置
    - 使用H5 Doctype和相关指南
    - 重置好样式
    - 一个简单的有语义的核心布局
    - 给重要的网页元素使用简单的技巧，比如导航菜单之类的元素

* 如何评价网页结构的好坏？
	- 把页面的样式全部注释掉，在浏览器里面打开，如果内容排列有序，方便阅读，那么这个结构就不会差。

* 模拟移动端的meta
	- <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    - width： 可视区宽度
    - device-width:  设备宽度
    - minimum-scale： 最小缩放比
    - maximum-scale： 最大缩放比
    - user-scalable： 是否允许用户缩放

* 响应式中的单位值
    - rem：rem是CSS3新增的一个相对单位（root em，根em）相对的只是HTML根元素。
    - em：em是相对长度单位，相对于当前对象内文本的字体尺寸，使用是相对于其父级的字体大小的，即倍数；如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。
    - px： px像素（Pixel），相对长度单位，像素px是相对于显示器屏幕分辨率而言的。
```

##### 媒体查询

```css
* 为什么会有媒体查询?
	- 移动设备的快速普及完全颠覆了Web设计领域，用户不仅在传统桌面系统上查看Web内容，他们越来越多地使用具有各种尺寸的智能电话、平板电脑和其他设备，Web设计人员的挑战是确保他们的网站不仅在大屏幕上看起来不错，在小型的电话以及介于它们之间的各种设备上看起来也不错。

* 媒体查询是什么?
    - 媒体查询是向不同设备提供不同样式的一种方式，它为每种类型的用户提供了最佳的体验
	- css2: media type：media type(媒体类型)是css 2中的一个非常有用的属性，通过media type我们可以对不同的设备指定特定的样式，从而实现更丰富的界面。
	- css3: media query：media query是CSS3对media type的增强，事实上我们可以将media query看成是media type+css属性(媒体特性Media features)判断。

* 如何使用?
	- link标签 <link rel="stylesheet" media="screen and (max-width:800px)" href="index.css">
	- @import（低版本IE不兼容）
    - css3新增的@media
        @media screen and (max-width:800px) and (min-width:600px) {
			/* ....... */
        }

* 语法
	- 媒体类型 逻辑操作符 (媒体特性：值)
        - 媒体类型：all(全部)、screen(屏幕)、print(页面打印或打印预览模式)
        - 逻辑操作符：and | , | not | only
        	- and：用于合并多个媒体属性或合并媒体属性与媒体类型
        	- ，：等同于or逻辑操作符
        	- not：仅能应用于整个查询，而不能单独应用于一个独立的查询,该关键字必须位于声明的开头，而且它会否定整个声明
        		- media not screen and (m@onochrome) 
        	- only 防止老旧的浏览器不支持带媒体属性的查询而应用到给定的样式：
        		- <link rel="stylesheet" media="only screen and (color)" href="example.css" />
        - 媒体类型：
```

| 值                      | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| aspect-ratio            | 定义输出设备中的页面可见区域宽度与高度的比率                 |
| color                   | 定义输出设备每一组彩色原件的个数。如果不是彩色设备，则值等于0 |
| color-index             | 定义在输出设备的彩色查询表中的条目数。如果没有使用彩色查询表，则值等于0 |
| device-aspect-ratio     | 定义输出设备的屏幕可见宽度与高度的比率。                     |
| device-height           | 定义输出设备的屏幕可见高度。                                 |
| device-width            | 定义输出设备的屏幕可见宽度。                                 |
| grid                    | 用来查询输出设备是否使用栅格或点阵。                         |
| height                  | 定义输出设备中的页面可见区域高度。                           |
| max-aspect-ratio        | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-color               | 定义输出设备每一组彩色原件的最大个数。                       |
| max-color-index         | 定义在输出设备的彩色查询表中的最大条目数。                   |
| max-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最大比率。                 |
| max-device-height       | 定义输出设备的屏幕可见的最大高度。                           |
| max-device-width        | 定义输出设备的屏幕最大可见宽度。                             |
| max-height              | 定义输出设备中的页面最大可见区域高度。                       |
| max-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最大单色原件个数。     |
| max-resolution          | 定义设备的最大分辨率。                                       |
| max-width               | 定义输出设备中的页面最大可见区域宽度。                       |
| min-aspect-ratio        | 定义输出设备中的页面可见区域宽度与高度的最小比率。           |
| min-color               | 定义输出设备每一组彩色原件的最小个数。                       |
| min-color-index         | 定义在输出设备的彩色查询表中的最小条目数。                   |
| min-device-aspect-ratio | 定义输出设备的屏幕可见宽度与高度的最小比率。                 |
| min-device-width        | 定义输出设备的屏幕最小可见宽度。                             |
| min-device-height       | 定义输出设备的屏幕的最小可见高度。                           |
| min-height              | 定义输出设备中的页面最小可见区域高度。                       |
| min-monochrome          | 定义在一个单色框架缓冲区中每像素包含的最小单色原件个数       |
| min-resolution          | 定义设备的最小分辨率。                                       |
| min-width               | 定义输出设备中的页面最小可见区域宽度。                       |
| monochrome              | 定义在一个单色框架缓冲区中每像素包含的单色原件个数。如果不是单色设备，则值等于0 |
| orientation             | 定义输出设备中的页面可见区域高度是否大于或等于宽度。         |
| resolution              | 定义设备的分辨率。如：96dpi, 300dpi, 118dpcm                 |
| scan                    | 定义电视类设备的扫描工序。                                   |
| width                   | 定义输出设备中的页面可见区域宽度。                           |

##### 像素

```css
* 物理像素
    - 物理像素，设备能控制显示的最小单位，我们常说的1920×1080像素分辨率就是用的设备像素单位，在操作系统的调度下，每一个设备像素都有自己的颜色值和亮度值
	- 最大分辨率 ———— 由电脑生产厂商定义 （如1920 * 1080）

* 实际分辨率
	- 实际自己设置的电脑分辨率 —— 自定义

* 设备独立像素
    - 设备独立像素（也叫目睹无关像素），可以认为是计算机坐标系统中得一个点，这个点代表一个可以由程序使用的虚拟像素（css像素），然后由相关系统转换为物理像素
    - 标准情况下一个设备独立像素 = 一个物理像素
	- 操作系统定义的

* css像素
	- 感官像素  —— 浏览器定义的 （css像素是一个变化值）
	- 以参考像素为基准(参考像素：是根据设备独立像素做了一层调节， css像素根据参考像素进行调节)

* 设备像素比（device pixel ratio）
	- 设备像素比（简称dpr）定义了物理像素和设备独立像素的对应关系，它的值可以按如下的公式的得到  设备像素比 = 物理像素 / 设备独立像素  js中可以通过 window.devicePixelRatio
	- 设备像素比 = 实际分辨率 / css像素  =(通常情况下) 物理像素 / 设备独立像素
	- 一般情况下，实际分辨率 ： 物理像素 = 1 ： 1；css像素  ： 设备独立像素 = 1 ： 1

* 像素
	- 包括 每个像素点 +  颜色 + 其他属性

* 位图像素
	 - 位图像素是栅格图像（如：png，jpg，gif等）最小的数据单元。每一个位图像素都包含这一些资深的现实信息（如：显示位置，颜色值，透明度等）
	- 在普通屏幕下是没问题的，但是在retina屏幕下就会出现位图像素点不够，从而导致图片模糊的情况
```

---

####  ES6

---

##### 块级绑定

1. 使用var定义变量存在什么缺陷？

```javascript
- 使用var声明变量，变量在预编译阶段会进行声明提升，容易造成代码混乱，变量作用域混乱
- 在相同作用域下，同一变量能被重复声明，容易造成冲突
- 在全局作用域内使用var声明时会创建一个全局变量，同时也会成为window的一个属性，意味着全局对象的属性可能会意外的被重写覆盖
```

2.  为什么需要块级作用域？

```javascript
- ES5 只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。
- 第一种场景，内层变量可能会覆盖外层变量。
- 第二种场景，用来计数的循环变量泄露为全局变量。
```

3. 块级声明与块级作用域

```javascript
- 块级声明指的是该声明的变量无法被代码块外部访问。
- 块作用域，又被称为词法作用域（lexical scopes），可以在如下的条件下创建：
    - 函数内部
    - 在代码块（即 { 和 }）内部
```

4. let与var

```javascript
- 相同
	- 二者声明的语法，以及作用是一致的
- 不同
	- let将变量的作用域限制在当前的代码块中，不会将变量提升至当前作用域的顶部
	- let不允许在相同的作用域内，重复声明同一变量
	- 在全局作用域内使用let声明会创建一个全局变量，但是不会像全局对象(window)中添加任何属性
```

5. let与const

```javascript
- 相同
	- const 与let 的特点基本相同
- 不同
	- const声明和赋值要同时进行，不能先声明后赋值
	- const声明的变量会被视为常量，这意味着它们不能再次被赋值(const是保证变量指向的那个内存地址不得改动，所以对于简单数据类型不能被修改，引用类型只能修改其内部值，不能重新定义引用值)
```

6. TDZ(暂存性死区，temproal dead zone)

```javascript
- let 或 const声明的变量在声明之前不能被访问。如果执意这么做会出现错误，甚至是 typeof这种安全调用（safe operations）也不被允许的，造成这种现象的原因是该语句存在于TDZ之内    
    
- 当 JavaScript 引擎在作用域中寻找变量声明时，会将变量提升到函数/全局作用域的顶部（var）或是放入 TDZ（let 和const）内部。任何试图访问 TDZ 内部变量的行为都会以抛出运行时（runtime）错误而告终。当执行流达到变量声明的位置时，变量才会被移出 TDZ ，代表它们可以被安全使用
    
    if (true) {
            // TDZ开始
            tmp = 'abc'; // ReferenceError
            console.log(tmp); // ReferenceError
            let tmp; // TDZ结束
            console.log(tmp); // undefined
            tmp = 123;
            console.log(tmp); // 123
    }
```

7. 循环中的函数

```javascript
var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
     console.log(i);
    };
}
a[6](); // 6

    - 上面代码中，变量 i 是 let声明的，当前的 i 只在本轮循环有效，所以每一次循环的 i 其实都是一个新的变量，所以最后输出的是 6 。
    
    - 如果每一轮循环的变量 i 都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为 JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量 i 时，就在上一轮循环的基础上进行计算。
    
    - 另外， for 循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
    for (let i = 0; i < 3; i++) {
        let i = 'abc';
        console.log(i);
    }
    // abc
    // abc
    // abc
	- 上面代码正确运行，输出了 3 次 abc 。这表明函数内部的变量 i 与循环变量 i 不在同一个作用域，有各自单独的作用域。
```

8. 块级绑定的最佳实践

```javascript
- const 是声明变量的默认方式，仅当你明确哪些变量之后需要修改的情况下再用 let声明那些变量。这个实践的缘由是大部分变量在初始化之后不应该被修改，因为这样做是造成 bug 的根源之一
```

##### 函数扩展

1. 带默认参数的函数

   I. ES5默认参数模拟

   ```javascript
   	//当传入参数未undefined、null、0、false、''时，均会采用默认值
       function makeRequest(url, timeout, callback) {
           timeout = timeout || 2000;
           callback = callback || function() {};
           // 其它部分
       }
   	//该方式虽然比较健壮，但是代码量太多
       function makeRequest(url, timeout, callback) {
           timeout = (typeof timeout !== "undefined") ? timeout : 2000;
           callback = (typeof callback !== "undefined") ? callback : function() {};
           // 其它部分
       }
   ```

   II. ES6中的默认参数

   ```java
   //当timeout、callback不传值或者传入undefined时，才会使用默认值
   function makeRequest(url, timeout = 2000, callback = function() {}) {
       // 该函数只期待传入第一个参数。其余两个参数有各自的默认值。这使得函数体更加小巧因为你不再需要添加额外的代码来检查是否有遗漏的参数值
   }
   ```

   III. 默认参数对arguments的影响

   ```javascript
   - 当使用默认参数的时候 arguments 对象的表现是不同的
   
   - ES5非严格模式下，arguments对象和实参列表具有相互映射关系
   		function mixArgs(first, second) {
               console.log(first === arguments[0]);//ture
               console.log(second === arguments[1]);//ture
               first = "c";
               second = "d";
               console.log(first === arguments[0]);//ture
               console.log(second === arguments[1]);//ture
           }
           mixArgs("a", "b");
   
   - ES5严格模式下，arguments对象与实参列表的相互映射关系被取消
   		function mixArgs(first, second) {
               "use strict";
               console.log(first === arguments[0]);//ture
               console.log(second === arguments[1]);//ture
               first = "c";
               second = "d"
               console.log(first === arguments[0]);//false
               console.log(second === arguments[1]);//false
           }
           mixArgs("a", " b");
   
   - 当使用 ES6 默认参数时，arguments 对象的表现和 ECMAScript 5 的严格模式一致，不管函数是否显式设定为严格模式
   		function mixArgs(first, second = "b") {
               console.log(arguments.length);//1
               console.log(first === arguments[0]);//true
               console.log(second === arguments[1]);//true
               first = "c";
               second = "d"
               console.log(first === arguments[0]);//false
               console.log(second === arguments[1]);//false
           }
           mixArgs("a");
   ```

   IV. 默认参数表达式

   ```javascript
   //样例1
   function getValue() {
       return 5;
   }
   // getValue() 只会在未提供实参或者传入undefined给 second 的情况下才会被调用
   function add(first, second = getValue()) {
       return first + second;
   }
   console.log(add(1, 1)); // 2
   console.log(add(1)); // 6
   
   //样例2
   let value = 5;
   function getValue() {
   	return value++;
   }
   function add(first, second = getValue()) {
   	return first + second;
   }
   console.log(add(1, 1)); // 2
   console.log(add(1)); // 6
   console.log(add(1)); // 7
   ```

   V. 默认参数的暂存性死区

   ```javascript
   function add(first = second, second) {
       return first + second;
   }
   console.log(add(1, 1)); // 2
   console.log(add(undefined, 1)); // 抛出错误，此时second还存在于TDZ中，不能给first赋值
   
   //调用 add(1, 1) 的 JavaScript 描述
   let first = 1;
   let second = 1;
   // 调用 add(undefined, 1) 的 JavaScript 描述
   let first = second;
   let second = 1;
   ```

2. 未命名参数

   I. ES5中的未命名参数

   ```javascript
   - JavaScript 提供了 arguments 对象使得查看函数参数时，分别定义每个参数的名称。虽然当大部分使用 arguments 对象的情况下都能正常工作，但有时使用它会显得十分繁琐。
   
   function pick(object) {
       let result = Object.create(null);
       // start at the second parameter
       for (let i = 1, len = arguments.length; i < len; i++) {
       	result[arguments[i]] = object[arguments[i]];
       }
       return result;
   }
   let book = {
       title: "Understanding ECMAScript 6",
       author: "Nicholas C. Zakas",
       year: 2015
   };
   let bookData = pick(book, "author", "year");
   console.log(bookData.author); // "Nicholas C. Zakas"
   console.log(bookData.year); // 2015
   ```

   II. 剩余参数

   ```javascript
   - 剩余参数由三点（...）和一个命名参数（放在三点之后）指定。这个命名参数是一个包含其它传入参数的数组，“剩余” 这个名称也是由此而来
       function pick(object, ...keys) {
           let result = Object.create(null);
           for (let i = 0, len = keys.length; i < len; i++) {
               result[keys[i]] = object[keys[i]];
           }
           return result;
       }
   
   - 函数的 length 属性用来描述参数的个数，剩余参数对其并无影响。上例中 pick() 的length 属性值仍为 1，因为它只包括 object 参数
   
   - 剩余参数的限制
   	- 函数最多只能有一个剩余参数，且必须放在最后的位置
   	- 剩余参数不能用在对象字面量中的setter上。这项限制的存在原因是对象字面量中的 setter 只被允许接受单个参数，而规范中的剩余参数可以接受无限个数的参数，所以它是不被允许的
       let object = {
           // 语法错误：不能在 setter 上使用剩余参数
           set name(...value) {
               // do something
           }
       };
   
   - 剩余参数对arguments的影响
   	- arguments 对象总是能正确的反映所有传入的参数而无视剩余参数的使用
   ```

3. 增强的Function构造函数

   ```javascript
   var add = new Function("first", "second", "return first + second");
   console.log(add(1, 1)); // 2
   
   var add = new Function("first", "second = first","return first + second");
   console.log(add(1, 1)); // 2
   console.log(add(1)); // 2
   
   var pickFirst = new Function("...args", "return args[0]");
   console.log(pickFirst(1, 2)); // 1
   ```

4. 扩展运算符

   ```javascript
   - 相比剩余参数允许你把多个独立的参数整合到一个数组中，扩展运算符则允许你把一个数组中的元素分别作为参数传递给函数。
   
   //不适用多数值情况
   let value1 = 25, value2 = 50;
   console.log(Math.max(value1, value2)); // 50
   
   //可行，但是使用额外的代码，模糊了代码本意
   let values = [25, 50, 75, 100]
   console.log(Math.max.apply(Math, values)); // 100
   
   let values = [25, 50, 75, 100]
   // 等同于
   // console.log(Math.max(25, 50, 75, 100));
   console.log(Math.max(...values)); // 10
   
   let values = [-25, -50, -75, -100]
   console.log(Math.max(...values, 0)); // 0
   ```

5. ES6中的name属性

   ```javascript
   function doSomething() {    // ...}
   var doAnotherThing = function() {    // ...};
   console.log(doSomething.name); // "doSomething"
   console.log(doAnotherThing.name); // "doAnotherThing
   
   var doSomething = function doSomethingElse() {	// ...};
   var person = {
       get firstName() {    return "Nicholas"    },
   	sayName: function() {console.log(this.name);}
   }
   console.log(doSomething.name); // "doSomethingElse"
   console.log(person.sayName.name); // "sayName"
   console.log(person.firstName.name); // "get firstName"
       
   var doSomething = function() {// ...};
   //使用过 bind() 的函数 name 属性值会添加 bound 前缀
   console.log(doSomething.bind().name); // "bound doSomething"
   //使用 Function 构造函数创建的函数 name 属性的值为 "anonymous"
   console.log((new Function()).name); // "anonymous"
       
   - 需要注意的是函数的 name 属性值并不等同于同名变量。name 属性的作用是为了在调试时获得有用的相关信息，所以 name 属性值是获取不到相关函数的引用的
   ```

6. 明确函数的额双重用途

   I. Es5中函数双重用途体现

   ```javascript
   - 在 ECMAScript 5 和早期的版本中，函数的双重用途表现在是否使用 new 来调用它
   - 在ES5中函数首字母大写是唯一指示其应该被 new 调用的标识
   
   - JavaScript 中的函数有两个不同的只有内部（internal-only）能使用的方法：[[call]] 与[[Construct]]。
   	- 当函数未被 new 调用时，[[call]] 方法会被执行，运行的是函数主体中的代码。
       - 当函数被 new 调用时，[[Construct]] 会被执行并创建了一个新的对象，称为 new target，之后会执行函数主体并把 this 绑定为该对象。带有 [[Construct]] 方法的函数被称为构造函数（constructor）
       
   - 不是每个函数内部都有 [[Construct]] 方法，所以并非所有的函数都能被 new 调用。在“箭头函数” 小结中提到的箭头函数就没有该方法。
   ```

   II. ES5中判断函数调用方式的判断

   ```javascript
   - 在 ECMAScript 5 中判断函数是否被 new 调用过的方式是使用 instanceof
       function Person(name) {
           if (this instanceof Person) {
           	this.name = name; // 使用 new
           } else {
           	throw new Error("你必须使用 new 来调用 Person。")
           }
       }
       var person = new Person("Nicholas");
       var notAPerson = Person("Nicholas"); // 抛出错误
   	//调用 Person.call() 并将 person 变量作为第一个参数会将 Person 内部的 this 设置为person。对于函数本身来讲，如何辨别它们显得无能为力
       var notAPerson = Person.call(person, "Michael"); // 正常运行！
   ```

   III. 元属性 new.target

   ```javascript
   - 元属性指的是和目标（如new）相关但并非被包含在一个对象内的属性。
   	- 当函数内部的 [[Construct]] 方法被调用后，new 操作符调用的目标（target）将赋给 new.target。该目标通常为创建对象实例并将该实例赋值给 this 的构造函数。
       - 如果 [[call]] 被执行，那么 new.target 的值为 undefined 。
       
   - 警告： 在函数之外使用 new.target 会抛出语法错误
       
       function Person(name) {
           if (typeof new.target !== "undefined") {
           	this.name = name; // 使用 new
           } else {
           	throw new Error("你必须使用 new 来调用 Person。")
           }
       }
       var person = new Person("Nicholas");
       var notAPerson = Person.call(person, "Michael"); // 错误！
   ```

7. 块级函数

   I. 严格模式下的块级函数

   ```javascript
   - 在 ECMAScript 3 或更早的版本中，在块中声明函数（块级函数）理论上会发生语法错误，但所有的浏览器却都支持这么做。遗憾的是，每个浏览器支持的方式都有些差异，所以最佳实践就是不要在块中声明函数（更好的选择是使用函数表达式）
   
   - 为了抑制这种分裂行为，ECMAScript 5 中的严格模式规定在块中声明函数会发生错误
       "use strict";
       if (true) {
           // 在 ES5 中抛出错误，ES6不会
           function doSomething() {// ...}
       }
   
   - 在ES6中的严格模式下，在块中声明函数会被视为块级声明并可以在块内的其它部分调用，且块级函数会被提升到块内的顶部
       "use strict";
       if (true) {
           console.log(typeof doSomething); // "function"
           function doSomething() {        // ...        }
           doSomething();
       }
       console.log(typeof doSomething); // "undefined"
   ```

   II. 非严格模式下的块级函数

   ```javascript
   - ECMAScript 6 同样允许非严格模式下块级函数的存在，但函数的声明会被提升至函数作用域或全局作用域的顶部，而不是块内
       if (true) {
           console.log(typeof doSomething); // "function"
           function doSomething() {    // ...    }
           doSomething();
       }
       console.log(typeof doSomething); // "function"
   ```

   III. 块级函数与let

   ```javascript
   - 块级函数与 let函数表达式的相似之处是它们都会在执行流跳出定义它们所在的块作用域之后被销毁。
   - 关键的区别是块级函数（声明）会被提升到顶部，而 let函数表达式则不会
   	"use strict";
       if (true) {
           console.log(typeof doSomething); // 抛出错误
           let doSomething = function () {        // ...        }
       	doSomething();
       }
       console.log(typeof doSomething);
   ```

8. 箭头函数

   I. 箭头函数的特性

   ```javascript
   - 没有 this，super，arguments 和 new.target绑定 —— this，super，arguments 和new.target 的值由最近的不包含箭头函数的作用域决定。
   
   - 不能被 new 调用 —— 箭头函数内部没有 [[Construct]] 方法，因此不能当作构造函数使用，使用 new 调用箭头函数会抛出错误
   
   - 没有 prototype —— 既然你不能使用 new 调用箭头函数，那么 prototype 就没有存在的理由。箭头函数没有 prototype 属性
   
   - 不能更改 this —— this 的值在函数内部不能被修改。在函数的整个生命周期内 this 的值是永恒不变的。
   
   - 没有 arguments 对象 —— 既然箭头函数没有 arguments 绑定，你必须依赖于命名或者剩余参数来访问该函数的参数
   
   - 不允许重复的命名参数 —— 不论是在严格模式还是非严格模式下，箭头函数都不允许重复的命名参数存在，相比传统的函数，它们只有在严格模式下才禁止该种行为
   ```

   II. 箭头函数优点

   ```javascript
   - 在 JavaScript 编程 中 this 绑定是发生错误的根源之一。this 的值很容易丢失，使得程序以臆想之外的方式运行，而箭头函数解决了该问题
   
   - 箭头函数限制 this 为固定值的做法让 JavaScript 引擎可以对一些操作进行优化，相比普通的函数它们可能被视为构造函数或被其它因素修改
   
   - 减少潜在错误发生的可能性与歧义的消除，同时 JavaScript引擎也能更好的优化箭头函数
   ```

   III. 箭头函数语法

   ```javascript
   //1 —— 箭头函数接收单个参数并返回它
   var reflect = value => value;
   // 等同于：
   var reflect = function(value) {
   	return value;
   };
   //2 —— 传入单个以上的参数
   var sum = (num1, num2) => num1 + num2;
   var sum = (num1, num2) => {
   	return num1 + num2;
   };
   //  等同于
   var sum = function(num1, num2) {
   	return num1 + num2;
   };
   //3 —— 没有参数
   var getName = () => "Nicholas";
   // 等同于：
   var getName = function() {
   	return "Nicholas";
   }
   //4 —— 空函数
   var doNothing = () => {};
   // 等同于：
   var doNothing = function() {}
   //5 —— 返回对象
   var getTempItem = id => ({ id: id, name: "Temp" });
   // 等同于：
   var getTempItem = function(id) {
       return {
           id: id,
           name: "Temp"
       };
   };
   ```

   IV. 立即执行函数

   ```javascript
   let person = ((name) => {
       return {
           getName: function() {
               return name;
       	}
   	};
   })("Nicholas");
   console.log(person.getName()); // "Nicholas"
   
   - 需要注意的是括号包裹的是箭头函数的定义，并不包括（"Nicholas"）。这和传统的函数不同，函数定义和传入的参数可以同时被括号包含
   ```

   V. 无this绑定

   ```javascript
   - 箭头函数没有 this 绑定，意味着 this 只能通过查找作用域链来确定。如果箭头函数被另一个不包含箭头函数的函数囊括，那么 this 的值和该函数中的 this 相等，否则 this 的值为undefined。
   
   - 箭头函数被定义为 “用完即仍” 的函数，所以不能被用来定义新类型；证据是箭头函数不存在一般函数中包含的 property 属性。
   ```

9. 尾调用优化

   I. 尾调用概念

   ```javascript
   
   - 尾调用指的某个函数的最后一步再调用另一个函数
       function doSomething() {
           return doSomethingElse(); // 尾调用
       }
       function f(x) {
         if (x > 0) {
           return m(x)//尾调用
         }
         return n(x);//尾调用
       }
   
   - ECMAScript 5 实现的尾调用和其它位置调用处理机制都是相同的：一个新的堆栈帧（stackframe）被创建并添加到堆栈上，以代表该函数被调用过。这意味着之前所有的堆栈帧在内存中持续存在，当调用栈过大时会产生一些问题
   
   - ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
       - 因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
           func.arguments：返回调用时函数的参数。
           func.caller：返回调用当前函数的那个函数。
       - 尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效
   ```

   II. 尾调用优化的触发条件

   ```javascript
   - 在严格模式下 ECMAScript 6 试图利用恰当的尾部函数调用来减少调用栈的大小（非严格模式下的尾调用未被考虑）。
       - 该优化使得尾部的函数调用不再增加，而是清除并利用已存在的堆栈帧（stack frame）
       
   - 尾调用优化的触发条件
   	-  尾调用不能引用当前堆栈帧中的变量（即尾调用的函数不能是闭包）
   	-  使用尾调用的函数在尾调用结束后不能做额外的操作
   	-  尾调用函数值作为当前函数的返回值
   
   //优化
   "use strict";
   function doSomething() {
   	// 优化
   	return doSomethingElse();
   }
   
   //优化取消场景1
   "use strict";
   function doSomething() {
       // 未优化 - 无返回值
       doSomethingElse();
   }
   //优化取消场景2
   "use strict";
   function doSomething() {
       // 未优化 - 在函数执行并返回之前有额外的操作
       return 1 + doSomethingElse();
   }
   //优化取消场景3
   "use strict";
   function doSomething() {
       // 未优化 - 函数调用未发生在尾部
       var result = doSomethingElse();
       return result;
   }
   //优化取消场景4
   "use strict";
   function doSomething() {
       var num = 1,
       func = () => num;
       // 未优化 - 存在闭包
       return func();
   }
   ```

   III. 使用场景

   ```javascript
   - 在实践中，尾调用优化发生在幕后，所以除非有意的去优化某个函数否则不必想得太多。
   - 尾调用优化的主要使用场景是使用递归，而且该优化的效果及其显著
   - 尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数
       function factorial(n) {
           if (n <= 1) {
               return 1;
           } else {
               // 未优化 - 尾调用函数值有乘法运算
               return n * factorial(n - 1);
           }
       }
   
       function factorial(n, p = 1) {
           if (n <= 1) {
               return 1 * p;
           } else {
               let result = n * p;
               // 优化
               return factorial(n - 1, result);
           }
       }
   
   function forEach(arr, callback, start = 0) {
       if (0 <= start && start < arr.length) {
           callback(arr[start], start, arr);
           return forEach(arr, callback, start+1); // tail call
       }
   }
   forEach(['a', 'b'], (elem, i) => console.log(`${i}. ${elem}`));
   // Output:
   // 0. a
   // 1. b
   
   function findIndex(arr, predicate, start = 0) {
       if (0 <= start && start < arr.length) {
           if (predicate(arr[start])) {
               return start;
           }
           return findIndex(arr, predicate, start+1); // tail call
       }
   }
   findIndex(['a', 'b'], x => x === 'b'); // 1
   ```

##### 对象扩展

