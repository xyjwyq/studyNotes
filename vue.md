---
typora-root-url: ./
---

Vue.js学习

---

### 目录

- [Vue概念](#vue概念)

---

#### 一. Vue概念

  &emsp;&emsp;Vue是一套构建用户界面( UI )的渐进式框架。 

##### I. vue优点

- 性能更好
- 视图、数据分离
- 维护成本低

##### II. 框架与库

- 框架(framework)
  - 完整的解决方案 
  - 控制整个流程
  - 框架可以由多个库组成
  - eg: Vue.js 、 Angular.js 、 Backbone.js
- 库(libary)
  - 函数的集合
  - 使用者进行控制
  - eg：jQuery、React.js

##### III. 渐进式框架与声明式渲染

- 渐进式框架

  - 是指可以将框架随时应用到项目中，比如一个项目使用jQuery作为前端js框架，如果换成Vue.js，那么可以只把一部分功能从jQuery改为Vue.js后继续部署使用项目，以后也可以慢慢将其他部分改为使用Vue.js。这就是一个把项目前端框架逐步改为Vue.js的渐进过程( 暂时性理解 )。

- 声明式渲染与命令式渲染
  - `声明式渲染`：告诉程序需要我们需要什么结果，其他的交给程序做，不用关心具体怎么实现
  - `命令式渲染`：就是具体如何实现或完成任务

##### IV. MVVM

- 框架模式和设计模式
  - 框架模式
    - 代码重用
    - 框架可以用代码表示，也可以直接执行或复用，总是针对某一特定领域
    - 一个框架往往含有一个或多个设计模式
    - 框架模式用来对软件设计进行分工
    - eg：MVC 、MVP、MVVM等
  - 设计模式
    - 设计重用
    - 是对某个环境中反复出现的问题以及解决该问题的方案的描述，比框架更为抽象
    - 同一模式适用于各种应用
    - 设计模式是小技巧，对具体问题提出解决方案，你提高代码复用率，降低耦合度
    - 工厂模式、适配器模式、策略模式等

- MVVM模式

  - 是一种软件框架模式

  - 组成：

    - `模型( Model )`：是指代表真实状态内容的[领域模型](https://zh.wikipedia.org/wiki/%E9%A2%86%E5%9F%9F%E6%A8%A1%E5%9E%8B)（面向对象），或指代表内容的[数据访问层](https://zh.wikipedia.org/w/index.php?title=%E6%95%B0%E6%8D%AE%E8%AE%BF%E9%97%AE%E5%B1%82&action=edit&redlink=1)（以数据为中心）
    - `视图( View )`：是用户在屏幕上看到的结构、布局和外观（UI）
    - `视图模型( ViewModel )`：是暴露公共属性和命令的视图的抽象。MVVM没有MVC模式的控制器，也没有MVP模式的presenter，有的是一个*绑定器*。在视图模型中，绑定器在视图和[数据绑定器](https://zh.wikipedia.org/w/index.php?title=%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A%E5%99%A8&action=edit&redlink=1)之间进行通信
    - `绑定器`：声明性数据和命令绑定隐含在MVVM模式中。在Microsoft[解决方案堆](https://zh.wikipedia.org/w/index.php?title=%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88%E5%A0%86&action=edit&redlink=1)中，绑定器是一种名为[XAML](https://zh.wikipedia.org/wiki/XAML)的[标记语言](https://zh.wikipedia.org/wiki/%E7%BD%AE%E6%A0%87%E8%AF%AD%E8%A8%80)。绑定器使开发人员免于被迫编写样板式逻辑来同步视图模型和视图。在微软的堆之外实现时，声明性数据绑定技术的出现是实现该模式的一个关键因素

  - > ![](/src/img/mvvm.png)

- MVVM作用

  - 有助于将[图形用户界面](https://zh.wikipedia.org/wiki/%E5%9B%BE%E5%BD%A2%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)的开发与[业务逻辑](https://zh.wikipedia.org/w/index.php?title=%E4%B8%9A%E5%8A%A1%E9%80%BB%E8%BE%91&action=edit&redlink=1)或[后端](https://zh.wikipedia.org/wiki/%E5%89%8D%E7%AB%AF%E5%92%8C%E5%90%8E%E7%AB%AF)逻辑（*数据模型*）的开发[分离](https://zh.wikipedia.org/wiki/%E5%85%B3%E6%B3%A8%E7%82%B9%E5%88%86%E7%A6%BB)开来，是通过[置标语言](https://zh.wikipedia.org/wiki/%E7%BD%AE%E6%A0%87%E8%AF%AD%E8%A8%80)或GUI代码实现的
  - 。MVVM的*视图模型*是一个值转换器，意味着视图模型负责从模型中暴露（转换）[数据对象](https://zh.wikipedia.org/wiki/%E5%AF%B9%E8%B1%A1_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6))，以便轻松管理和呈现对象

- MVVM与传统框架的的区别

  - MVC

    > ![](/src/img/mvc1.png)
    >
    > ![](/src/img/mvc2.png)
    >
    > - View 传送指令到 Controller
    >
    > - Controller 完成业务逻辑后，要求 Model 改变状态
    >
    > - Model 将新的数据发送到 View，用户得到反馈

  - MVP

    > ![](/src/img/mvp.png)
    >
    > - 各部分之间的通信，都是双向的。
    >
    > - View 与 Model 不发生联系，都通过 Presenter 传递。
    >
    > -  View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里

#### 二. Vue使用

##### I. 模板语法

1. 插值

2. 指令

3. 缩写

##### II. 计算属性和侦听器

1. 为什么使用计算属性

   - 模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的

   - 对于任何复杂逻辑，你都应当使用**计算属性**

     ```html
     <div id="example">
       <p>Original message: "{{ message }}"</p>
       <p>Computed reversed message: "{{ reversedMessage }}"</p>
     </div>
     ```

     ```javascript
     var vm = new Vue({
       el: '#example',
       data: {
         message: 'Hello'
       },
       computed: {
         // 计算属性的 getter
         reversedMessage: function () {
           // `this` 指向 vm 实例
           return this.message.split('').reverse().join('')
         }
       }
     })
     
     // 可以像绑定普通属性一样在模板中绑定计算属性。
     // Vue 知道 vm.reversedMessage 依赖于 vm.message，因此当 vm.message 发生改变时，所有依赖 vm.reversedMessage 的绑定也会更新。
     // 而且最妙的是我们已经以声明的方式创建了这种依赖关系：计算属性的 getter 函数是没有副作用 (side effect) 的，这使它更易于测试和理解
     ```

2. 计算属性缓存与方法

   - **计算属性是基于它们的依赖进行缓存的**。

     - 只在相关依赖发生改变时它们才会重新求值。这就意味着只要 `message` 还没有发生改变，多次访问 `reversedMessage` 计算属性会立即返回之前的计算结果，而不必再次执行函数

   - 每当触发重新渲染时，调用方法将**总会**再次执行函数

     ```html
     <!--></-->
     <div id="app">
         {{combineName()}}
         {{age}}
         {{test()}}
     </div>
     ```

     ```javascript
     const vm = new Vue({
         el: '#app',
         data: {
             firstName: 'kang',
             lastName: 'xie',
             age: 20        
         },
         methods: {
             combineName(){
                 return this.firstName + this.lastNmae;
             },
             test(){	
             	consoole.log('this is a test!!!');
             },
             wait(){
                 console.log('wait rendering !!')
             }
         }
     });
     
     // 在同一个vue对象中，在当前挂载到vue上的DOM元素，其在DOM中执行的methods会随着每一次其中所渲染的视图数据的改变而执行，不论该函数是否与data中属性有无依赖关系
     // 如在该例子中，当改变age时(vm.age = 20), #app中挂载的方法如combineName,test均会重新执行，而wait则不会执行
     ```


##### III. class与style绑定

##### IV. 条件渲染

##### V. 列表渲染

##### VI. 事件处理

##### VII. 表单输入绑定

##### VIII. 组件基础