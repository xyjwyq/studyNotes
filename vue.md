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

3. 计算属性与侦听属性

   - Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：**侦听属性**

     ```html
     <div id="demo">{{ fullName }}</div>
     ```

     ```javascript
     // 计算属性与侦听属性的异同
     var vm = new Vue({
       el: '#demo',
       data: {
         firstName: 'Foo',
         lastName: 'Bar',
         fullName: 'Foo Bar'
       },
       watch: {
         firstName: function (val) {
           this.fullName = val + ' ' + this.lastName
         },
         lastName: function (val) {
           this.fullName = this.firstName + ' ' + val
         }
       }
     })
     
     var vm = new Vue({
       el: '#demo',
       data: {
         firstName: 'Foo',
         lastName: 'Bar'
       },
       computed: {
         fullName: function () {
           return this.firstName + ' ' + this.lastName
         }
       }
     })
     ```

4. 计算属性的setter属性

   ```javascript
   // 计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：
   computed: {
     fullName: {
       // getter
       get: function () {
         return this.firstName + ' ' + this.lastName
       },
       // setter
       set: function (newValue) {
         var names = newValue.split(' ')
         this.firstName = names[0]
         this.lastName = names[names.length - 1]
       }
     }
   }
   ```

5. 侦听器

   - 虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的

##### III. class与style绑定

1. ：clss , :style的绑定有三种方式

   - 通过表达式计算出字符串结果（易出错）
   - 对象语法
   - 数组语法

   ```html
   <!--class-->
   <!--对象语法-->
   <div v-bind:class="{ active: isActive }"></div>
   <div class="static"
        v-bind:class="{ active: isActive, 'text-danger': hasError }">
   </div>
   <div v-bind:class="classObject"></div>
   <!--数组语法-->
   <div v-bind:class="[activeClass, errorClass]"></div>
   <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
   <div v-bind:class="[{ active: isActive }, errorClass]"></div>
   <!--style-->
   <!--对象语法-->
   <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
   <div v-bind:style="styleObject"></div>
   <div v-bind:style="[baseStyles, overridingStyles]"></div>
   ```

   ```javascript
   data: {
     // 对象语法
     isActive: true,
     hasError: false,
     classObject: {
       active: true,
       'text-danger': false
     },
     // 数组语法
     activeClass: 'active',
     errorClass: 'text-danger'
   },
   computed: {
     // 对象语法
     classObject: function () {
       return {
         active: this.isActive && !this.error,
         'text-danger': this.error && this.error.type === 'fatal'
       }
     }
   }
   
   
   data: {
     activeColor: 'red',
     fontSize: 30,
     styleObject: {
       color: 'red',
       fontSize: '13px'
     }
   }
   
   ```

2. `v-bind:class` 指令也可以与普通的 class 属性共存

​	

​	

##### IV. 条件渲染

1. v-if

   - `v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

   - `v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
   - 不断移除/创建元素

2. v-show

   - `v-show` 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换，改变display属性。

3. Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染，用 `key` 管理可复用的元素

4. 一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。

##### V. 列表渲染

1. 当 Vue.js 用 `v-for` 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序， 而是简单复用此处每个元素，并且确保它在特定索引下显示已被渲染过的每个元素。了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` 属性

2. 当在组件中使用 `v-for` 时，`key` 现在是必须的。

3. 数组更新检测

   - 变异方法

     - `push()`
     - `pop()`
     - `shift()`
     - `unshift()`
     - `splice()`
     - `sort()`
     - `reverse(`

   - 替换数组

   - 注意事项

     - 由于 JavaScript 的限制，Vue 不能检测以下变动的数组：

       - 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`

       - 当你修改数组的长度时，例如：`vm.items.length = newLength`

     - 解决方式

       - ```
         Vue.set(vm.items, indexOfItem, newValue)
         vm.$set(vm.items, indexOfItem, newValue)
         ```

       - ```
         vm.items.splice(newLength)
         ```

4. 对象更改检测注意事项

   - **Vue 不能检测对象属性的添加或删除**：

   - ```
     `vm.$set(vm.userProfile, 'age', 27)`
     ```

##### VI. 事件处理

所有的 Vue.js 事件处理方法和表达式都严格绑定在当前视图的 ViewModel 上，它不会导致任何维护上的困难

​	

1. 为什么在HTML中监听事件
   - 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
   - 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
   - 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

##### VII. 表单输入绑定

1. 使用 `v-model` 指令在表单 `<input>`、`<textarea>` 、`<checkbox>` 、`<radio>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。 它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理

2. 修饰符

   - `.lazy`：在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了输入法组合文字时)。可以添加 `lazy` 修饰符，从而转变为使用 `change`事件进行同步

   - `.number`：如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：

   - `.trim`：如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

     ```html
     <input v-model.lazy="msg" >
     <input v-model.number="age" type="number">
     <input v-model.trim="msg">
     ```

##### VIII. 组件基础

1. 基础

   - 组件中data必须是一个函数

2. prop

   - 基本使用

     ```javascript
     // 组件注册(全局)
     Vue.component('blog-post', {
       props: ['title'],
       template: '<h3>{{ title }}</h3>'
     })
     ```

     ```html
     <blog-post title="My journey with Vue"></blog-post>
     <blog-post title="Blogging with Vue"></blog-post>
     <blog-post title="Why Vue is so fun"></blog-post>
     ```

   - 组件上使用v-model

     ```html
     Vue.component('custom-input', {
       props: ['value'],
       template: `
         <input
           v-bind:value="value"
           v-on:input="$emit('input', $event.target.value)"
         >
       `
     })
     
     <custom-input v-model="searchText"></custom-input>
     ```

   - prop的大小写

     - HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名

   - prop类型

     ```javascript
     props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
     props: {
       title: String,
       likes: Number,
       isPublished: Boolean,
       commentIds: Array,
       author: Object
     }
     ```

   - 单向数据流

     - 所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解

       ```javascript
       //  prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用
       props: ['initialCounter'],
       data: function () {
         return {
           counter: this.initialCounter
         }
       }
       //  prop 以一种原始的值传入且需要进行转换。
       props: ['size'],
       computed: {
         normalizedSize: function () {
           return this.size.trim().toLowerCase()
         }
       }
       ```

   - prop验证

     ```javascript
     Vue.component('my-component', {
       props: {
         // 基础的类型检查 (`null` 匹配任何类型)
         propA: Number,
         // 多个可能的类型
         propB: [String, Number],
         // 必填的字符串
         propC: {
           type: String,
           required: true
         },
         // 带有默认值的数字
         propD: {
           type: Number,
           default: 100
         },
         // 带有默认值的对象
         propE: {
           type: Object,
           // 对象或数组默认值必须从一个工厂函数获取
           default: function () {
             return { message: 'hello' }
           }
         },
         // 自定义验证函数
         propF: {
           validator: function (value) {
             // 这个值必须匹配下列字符串中的一个
             return ['success', 'warning', 'danger'].indexOf(value) !== -1
           }
         }
       }
     })
     
     // 注意那些 prop 会在一个组件实例创建之前进行验证，所以实例的属性 (如 data、computed 等) 在 default 或 validator 函数中是不可用的
     ```

   - 类型检查

     - `String`

     - `Number`

     - `Boolean`

     - `Array`

     - `Object`

     - `Date`

     - `Function`

     - `Symbol`

     - `type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认

       ```javascript
       function Person (firstName, lastName) {
         this.firstName = firstName
         this.lastName = lastName
       }
       
       Vue.component('blog-post', {
         props: {
           author: Person
         }
       })
       ```

   - 禁用特性继承

     ```javascript
     // 如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 
     Vue.component('my-component', {
       inheritAttrs: false,
       // ...
     })
     
     // 这尤其适合配合实例的 $attrs 属性使用,该属性包含了传递给一个组件的特性名和特性值
     
     // 有了 inheritAttrs: false 和 $attrs，你就可以手动决定这些特性会被赋予哪个元素。在撰写基础组件的时候是常会用到的
     Vue.component('base-input', {
       inheritAttrs: false,
       props: ['label', 'value'],
       template: `
         <label>
           {{ label }}
           <input
             v-bind="$attrs"
             v-bind:value="value"
             v-on:input="$emit('input', $event.target.value)"
           >
         </label>
       `
     })
     
     // 这个模式允许你在使用基础组件的时候更像是使用原始的 HTML 元素，而不会担心哪个元素是真正的根元素
     <base-input
       v-model="username"
       class="username-input"
       placeholder="Enter your username"
     ></base-input>
     ```

3. 单个根元素

   - **每个组件必须只有一个根元素**

4. 子组件向父组件传值

   ```html
   <!--一个组件-->
   <template>
       <bitton @click="testMethod"></bitton>
   </template>
   
   <script>
       export default {
           name:'testComponent',
           data(){
               return {
                   test:'test'
               }
           },
           methods:{
               testMethod(){
                   this.$emit('postValToParent',/想要传给父组件的值/);
               }
           }
       }
   </script>
   
   <!--使用组件-->
   <test-component @postValToParent="test"></test-component>
   <script>
       new Vue({
           el: '#app',
           data:{},
           methods:{
               test(sonVal){
                   console.log(sonVal);
               }
           }
       });
   </script>
   ```

5. slot

   ```html
   <!--插槽组件默认为conSlot-->
   
   <!--默认插槽-->
   <template>
   	<div>
           <strong>default</strong>
           <slot></slot>
       </div>
   </template>
   
   <con-slot>
   	<!--该语句会直接替换组件中的slot标签-->    
   	<span>slot</span>
   </con-slot>
   
   
   <!--具名插槽-->
   <template>
   	<div>
           <header>
           	<slot name="header"></slot>
           </header>
           <main>
           	<slot></slot>
           </main>
           <footer>
           	<slot name="footer"></slot>
           </footer>
       </div>
   </template>
   
   <con-slot>
   	<!--该语句会直接替换组件中的slot标签-->    
       <!--方式1-->  
   	<h1 slot="header">header</h1>
       <h6>main</h6>
       <h1 slot="footer">footer</h1>
         <!--方式2-->  
       <template slot="header">
   		<h1>header</h1>        
       </template>     
        <template>
   		<h6>main</h6>    
       </template>
       <template slot="footer">
   		 <h1>footer</h1>      
       </template> 
   </con-slot>
   
   <!--作用域插槽-->
   <template>
   	<div>
           <ul>
              <slot v-for="(item,index) in list" :item="item" :index="index"></slot>
           </ul>
       </div>
   </template>
   <script>
       export default{
           props:['list']
       };
   </script>
   
   <con-slot :list="list">
   	<!--该语句会直接替换组件中的slot标签-->    
       <template slot-scope="row">
           <!--row={item:list.item,index:list.index}-->
   		<li>{{row.index}}-{{row.item}}</li>   
       </template>     
   </con-slot>
   <script>
       new Vue({
           el:'#app',
           data:{
               list:[1,2,2,3,4,4,5]
           }
       });
   </script>
   ```

6. 动态组件

   ```javascript
   
   // 两种方式-->一为v-for,二为is
   <button @click="tab"></button>
   <component is="tabCom"></component>
   <keep-alive>
       //缓存组件
   	<component is="tabCom"></component>
   </keep-alive>
   
   
   const componentA = {
       template:'<div>component-a</div>'
   };
   const componentB = {
       template:'<div>component-b</div>'
   };
   new Vue({
       el:'#app'，
       data:{
       	tabCom: 'componentA'
   	},
       methods:{
           tab(){
       		this.tabCom = this.tabCom === 'componentA' ? 'componentB' : 'componentA';
   		}
       },
       components:{
       	'componentA':componentA,
       	'componentB':componentB
   	}
   })
   ```

7. 自定义事件

   - **事件名**

     - 不同于组件和 prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所用的名称
     - 不同于组件和 prop，事件名不会被用作一个 JavaScript 变量名或属性名，所以就没有理由使用 camelCase 或 PascalCase 了。
     -  `v-on` 事件监听器在 DOM 模板中会被自动转换为全小写 (因为 HTML 是大小写不敏感的)，所以 `v-on:myEvent` 将会变成 `v-on:myevent`——导致 `myEvent` 不可能被监听到
     - 推荐你**始终使用 kebab-case 的事件名**

   - **组件的v-model**

     - 一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` 特性用于不同的目的。`model` 选项可以用来避免这样的冲突：

       ```javascript
       Vue.component('base-checkbox', {
         model: {
           prop: 'checked',
           event: 'change'
         },
         props: {
           checked: Boolean
         },
         template: `
           <input
             type="checkbox"
             v-bind:checked="checked"
             v-on:change="$emit('change', $event.target.checked)"
           >
         `
       })
       
       <base-checkbox v-model="lovingVue"></base-checkbox>
       
       // 注意仍然需要在组件的 props 选项里声明 checked 这个 prop。
       ```

   - **将原生事件绑定到组件**

     ```javascript
     // 使用.native修饰符，但是在你尝试监听一个类似 <input> 的非常特定的元素时，由于组件在vue中做了一定的重构，导致.native修饰符会悄然失效，不会报任何错误
     <base-input v-on:focus.native="onFocus"></base-input>
     
     // 使用$listeners属性
     Vue.component('base-input', {
       inheritAttrs: false,
       props: ['label', 'value'],
       computed: {
         inputListeners: function () {
           var vm = this
           // `Object.assign` 将所有的对象合并为一个新对象
           return Object.assign({},
             // 我们从父级添加所有的监听器
             this.$listeners,
             // 然后我们添加自定义监听器，
             // 或覆写一些监听器的行为
             {
               // 这里确保组件配合 `v-model` 的工作
               input: function (event) {
                 vm.$emit('input', event.target.value)
               }
             }
           )
         }
       },
       template: `
         <label>
           {{ label }}
           <input
             v-bind="$attrs"
             v-bind:value="value"
             v-on="inputListeners"
           >
         </label>
       `
     })
     ```

   - **`.sync` 修饰符]**

     - 在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以修改父组件，且在父组件和子组件都没有明显的改动来源

     - 推荐以 `update:myPropName` 的模式触发事件取而代之

       ```javascript
       // 在一个包含 title prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图
       this.$emit('update:title', newTitle)
       
       // 然后父组件可以监听那个事件并根据需要更新一个本地的数据属性
       <text-document
         v-bind:title="doc.title"
         v-on:update:title="doc.title = $event"
       ></text-document>
       
       // 为了方便起见，为这种模式提供一个缩写，即 .sync 修饰符
       <text-document v-bind:title.sync="doc.title"></text-document>
       
       // 注意带有 .sync 修饰符的 v-bind 不能和表达式一起使用 (例如 v-bind:title.sync=”doc.title + ‘!’” 是无效的)。取而代之的是，你只能提供你想要绑定的属性名，类似 v-model
       
       // 当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
       <text-document v-bind.sync="doc"></text-document>
       // 这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器
       // 将 v-bind.sync 用在一个字面量的对象上，例如 v-bind.sync=”{ title: doc.title }”，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑
       ```

8. 处理边界情况

   - ` $root`：访问根实例
   - ` $parent`：访问父级组件实例
   - ` $refs`：访问子组件实例或子元素，`$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这只意味着一个直接的子组件封装的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`
   - ` provide`、`inject`：依赖注入，`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法
   - ` $on`、` $once`、` $off`：程序化的事件侦听器
   -  **循环引用**
     - `递归引用`：组件是可以在它们自己的模板中调用自身的。不过它们只能通过 `name` 选项来做这件事
     - `组件之间的循环引用`
   - ` $inline-template`：当 `inline-template` 这个特殊的特性出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容。不过，`inline-template` 会让你模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 `template` 选项或 `.vue` 文件里的一个 `<template>` 元素来定义模板
   - ` $x-template`：在一个 `<script>` 元素中，并为其带上 `text/x-template`的类型，然后通过一个 id 将模板引用过去。这些可以用于模板特别大的 demo 或极小型的应用，但是其它情况下请避免使用，因为这会将模板和该组件的其它定义分离开

   - **控制更新**
     - `$forceUpdate `：强制更新
     - `v-once `：通过 `v-once` 创建低开销的静态组件

##### IX. 生命周期

![生命周期](/src/img/lifecycle.png)

1. el与$mount

   挂载dom元素

2. template、render

   ```javascript
   new Vue({
       el: '#app',
       data:{
           msg: 'hello world'
       }，
       template: '<div>我是一个模板</div>',
       // createElement --> 得到一个虚拟dom
       // createElement({String | Object | Function},{Object},{String | Array})
       //		- 第一个参数: 一个 HTML 标签字符串，组件选项对象，或者 解析上述任何一种的一个 async 异步函数。必需参数。
       //		- 第二个参数：一个包含模板相关属性的数据对象，可以在 template 中使用这些特性。可选参数。
       //		- 第三个参数：子虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”。可选参数。                          
       render(createElement){
           return createElement('div', {
                   style:{
                       color: 'red',
                       fontSize: '12px'
                   },
                   class: 'red'/['red','green']/{red:true,green:false}
               })
           },
   });
   
   // template:String --> AST({}) --> render函数 --> vNode --> 真实的dom 
   // new Vue --> el? --> yes --> template --> yes --> 
   //				 --> no --> $mount --> yes --> template --> yes --> 
   //                     								   --> no --> app.outHTML --> template
   ```

##### X. 路由

1. 基本用法

   ```javascript
   // vue add router --> 添加router
   
   import Router from 'vue-router';
   import Home from './views/Home.vue'
   import About from './views/About.vue'
   
   Vue.use(Router);
   
   const myRouter = new Router({
     routes: [{
         path: '/',
         component: Home
       },
       {
         path: '/about',
         component: About
       }
     ],
     mode: 'history'// abstract、history、hash（默认）
   });
   
   
   new Vue({
     router: myRouter,//将router添加到vue实例中
     render: h => h(App)
   }).$mount('#app')
   ```

2. mode

   - abstract -->  url后面跟上
     #/，切换路由，地址不改变
   - hash -->  url后面跟上
     #/，且每次切换均会含有#/，切换路由时候，地址变换
   - history -->  正常地址，但若要使用得当，应进行后端配置