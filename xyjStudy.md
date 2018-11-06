### 前端学习笔记
---

###目录
- [HTML基础](#html基础)  
- [Css基础](#css基础)  
- [js基础](#js基础)  
- [jQuery](#jquery)  
- [网络](#网络)  
- [Css3](#css3)  
    - [选择器](#选择器)
    - [边框和背景](#边框和背景)
    - [文本与颜色](#文本与颜色)
    - [盒模型](#盒模型)
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
#### 选择器
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
4. **条件选择器**  
```
E > F  an F element child of an E element
直接子元素

E + F an F element immediately preceded by an E element 
后面的紧挨着的兄弟节点

E ~ F an F element preceded by an E element
后面的兄弟节点
```
#### 边框和背景  
1. **Css边框**  
```
border-image ———— 边框应用背景

    语法：/* border-image: image-source image-height image-width image-repeat */
        --> 将图片分为九宫格形式，而元素也会根据内容区边界延伸将元素分为九宫格，之后将图片与元素对应；
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
2. **Css背景**  
```
background-origin ———— 指定背景图片background-image 属性的原点位置的背景相对区域.

    <box> = border-box | padding-box | content-box
        - border-box --> 背景图片的摆放以border区域为参考
        - padding-box --> 背景图片的摆放以padding区域为参考
        - content-box --> 背景图片的摆放以content区域为参考

注意：当使用 background-attachment 为fixed时，该属性将被忽略不起作用。
```
```
background-clip ————  设置元素的背景（背景图片或颜色）是否延伸到边框下面

    background-clip ： border-box | padding-box | content-box 
        - 参数分别表示从边框、或内填充，或者内容区域向外裁剪背景。
        - no-clip表示不裁切，和参数border-box显示同样的效果。background-clip 默认值为border-box。
```
```
background-size ————  设置背景图片大小

   background-size: auto | <长度值> | <百分比> | cover | contain
        - auto：默认值，不改变背景图片的原始高度和宽度；
        - <长度值>：成对出现如200px 50px，将背景图片宽高依次设置为前面两个值，当设置一个值时，将其作为图片宽度值来等比缩放；
        - <百分比>：0％~100％之间的任何值，将背景图片宽高依次设置为所在元素宽高乘以前面百分比得出的数值，当设置一个值时同上；
        - cover：保留背景图片固有比例，按差值（元素宽与图片宽或者元素高于图片高）最大的边进行放大或缩小，最大的包含或覆盖背景区。如果图像没有固有比例，则按背景区大小
        - contain：保留背景图片固有比例，按差值最小（元素宽与图片宽或者元素高于图片高）的边进行放大或缩小，最大的包含或覆盖背景区。如果图像没有固有比例，则按背景区大小
```
```
background

    background-image: url(“./img/a.jpg”); //设置元素背景图片
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
```
text-shadow ———— 文本阴影

    text-shadow: X-Offset Y-Offset blur color;        
        - X-Offset：表示阴影的水平偏移距离，其值为正值时阴影向右偏移，反之向左偏移；      
        - Y-Offset：是指阴影的垂直偏移距离，如果其值是正值时，阴影向下偏移，反之向上偏移；
        - blur：是指阴影的模糊程度，其值不能是负值，如果值越大，阴影越模糊，反之阴影越清晰，如果不需要阴影模糊可以将Blur值设置为0；
        - color：是指阴影的颜色，其可以使用 rgba色。
```
```
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
```
自定义字体

    @font-face{
        font-family:”myFirstFont”;
        src:url('Sansation_Light.ttf'),
            url(‘Sansation_Light.eot') format(‘eot’)；
    }
    p{
        font-family:”myFristFont”;
    }

    地址：http://www.w3cplus.com/content/css3-font-face

    format: 此值指的是你自定义的字体的格式，主要用来帮助浏览器识别浏览器对@font-face的兼容问题，这里涉及到一个字体format的问题，因为不同的浏览器对字体格式支持是不一致的，浏览器自身也无法通过路径后缀来判断字体
```
```
text-overflow ———— 溢出文本属性

    Text-overflow：clip| ellipsis；  文本溢出切断|省略号
    
	超出打点功能：
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
```
```
Columns ———— 多列布局

    为了能在Web页面中方便实现类似报纸、杂志那种多列排版的布局，W3C特意给CSS3增加了一个多列布局模块（CSS Multi Column Layout Module）。它主要应用在文本的多列布局方面，这种布局在报纸和杂志上都使用了几十年了，但要在Web页面上实现这样的效果还是有相当大的难度，庆幸的是，CSS3的多列布局可以轻松实现。

    columns: [column-width] [column-count];
        - column-width:指每一列的宽度 根据容器宽度自适应 （最小宽度） 
        - column-count:指规定的列数 唯一精准的是列数
        - 不要两一起使用 会乱

    column-gap:设置列与列之间的宽度，直接用数值表示即可(eg:10px) 
        - column-gap主要用来设置列与列之间的间距  如果没有显示设置column-gap值时，其值大小会根据浏览器默认的font-size来定

    column-rule ———— 是不占用任何空间位置的，在列与列之间改变其宽度不会改变任何列的位置。
        - column-rule-width: 宽度 类似于border-width属性，主要用来定义列边框的宽度，其默认值为“medium”。该属性接受任意浮点      数，但不接收负值。但也像border-width属性一样，可以使用关键词：medium、thick和 thin。
        - column-rule-style: 样式类似于border-style属性，主要用来定义列边框样式，其默认值为“none”。
            - 该属性值与 border-style属值相同，包括none、hidden、dotted（原点）、dashed（虚线）、solid（直线）、double（两条线相同颜色的线）、groove（两条深浅不同颜色的线左深右浅）、ridge（两条深浅不同颜色的线左浅右深）、inset（两条深颜色线合成）、outset（两条浅颜色线合成）
        - column-rule-color: 颜色	类似于border-color属性

    column-span: 1/all 
        - 设置多列布局元素内的子元素，可以跨列，类似标题效果。即一个新闻标题要横跨所有内容列。注：此属性要在子元素上设置。
```
2. **颜色**  
```
RGBA ———— 颜色值

    RGB是一种色彩标准，是由红(R)、绿(G)、蓝(B)的变化以及相互叠加来得到各式各样的颜色。RGBA是在   RGB的基础上增加了控制 alpha透明度的参数。

    color：rgba(R,G,B,A)
        - 以上R、G、B三个参数，正整数值的取值范围为：0 - 255。
        - 百分数值的取值范围为：0.0% - 100.0%。
        - 超出范围的数值将被截至其最接近的取值极限。并非所有浏览器都支持使用百分数值。
        - A为透明度参数，取值在0~1之间，不可为负值。

    background-color:rgba(100,120,60,0.5);
```
```
HSL
    HSL 和RGB一样，同属于工业界的一种颜色标准，通过对色调H、饱和度（S）、亮度（L）三个颜色通道的变化以及他们相互之间的叠加得到各式各样的颜色的。

    Color： hsl（h,s,l）
    - H: 色调。取整数值， 0（或360或-360）表示红色，60表示黄色，120表示绿色，180表示青色，240表示蓝色，300表示洋红。当值大于360时实际的值等于该值除以360之后的余数。 450 % 360 = 90 
    - S：饱和度，就是颜色的深浅度和鲜艳程序，取百分数，可以取值0~100%之间的任意值，其中0表示灰度（没有该颜色），100%表示饱和度最高（改颜色最鲜艳）
    - L：亮度。取值和饱和度一样0~100% 其中0表示暗（黑色）100%表示最亮（白色）
```
```
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

    - background-image: radial-gradient(ellipse farthest-corner at 45px 45px , #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%);
    - background-image: radial-gradient(ellipse farthest-corner at 470px 47px , #FFFF80 20%, rgba(204, 153, 153, 0.4) 30%, #E6E6FF 60%);
    - background-image: radial-gradient(farthest-corner at 45px 45px , #FF0000 0%, #0000FF 100%);
    - background-image: radial-gradient(16px at 60px 50% , #000000 0%, #000000 14px, rgba(0, 0, 0, 0.3) 18px, rgba(0, 0, 0, 0) 19px);
```
```
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
```
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
```
内容溢出

    overflow: visible | hidden | scroll | auto --> overflow不属于复合属性
    Overflow-x: visible | hidden | scroll | auto 
    Overflow-y: visible | hidden | scroll | auto 
        - Visible: 默认值。表示不见且容器中的任何内容，不添加滚动条，元素将被剪切为包含对象的窗口大小，而且clip属性设置将失败
        - Auto：在需要时剪切内容并添加滚动条。也就是说当内容超过容器的宽度或者高度时，溢出的内容将会隐藏在容器中，并且会添加滚动条，用户可以拖动滚动条查看隐藏在容器中的内容。
        - hidden：内容溢出容器时，所有内容都将隐藏，而且不显示滚动条。
        - Scroll：不管内容有没有溢出容器，overflow-x都会显示横向的滚动条，而overflow-y显示纵向滚动条
```
```
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
```
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



