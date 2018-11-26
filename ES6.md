---
typora-root-url: ./
---

ES6学习笔记

---

#### 目录

- [块级绑定](#块级绑定)
- [函数扩展](#函数扩展)
- [对象扩展](#对象扩展)
- [解构](#解构)
- [Set与Map](#set与map)
- [字符串扩展](#字符串扩展)
- [数组扩展](#数组扩展)
- [迭代器与生成器](#迭代器与生成器)

---

##### 块级绑定

1. 使用var定义变量存在什么缺陷？

```javascript
- 使用var声明变量，变量在预编译阶段会进行声明提升，容易造成代码混乱，变量作用域混乱
- 在相同作用域下，同一变量能被重复声明，容易造成冲突
- 在全局作用域内使用var声明时会创建一个全局变量，同时也会成为window的一个属性，意味着全局对象的属性可能会意外的被重写覆盖
```

2. 为什么需要块级作用域？

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

6. 明确函数的双重用途

   I. Es5中函数双重用途体现

   ```javascript
   - 在 ECMAScript 5 和早期的版本中，函数的双重用途表现在是否使用 new 来调用它
   - 在ES5中函数首字母大写是唯一指示其应该被 new 调用的标识
   
   - JavaScript 中的函数有两个不同的且只有内部（internal-only）能使用的方法：[[call]] 与[[Construct]]。
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

1. 对象类型

   ```javascript
   - 普通对象（ordinary object）拥有 JavaScript 对象所有的默认行为。
   - 特异对象（exotic object）的某些内部行为和默认的有所差异。
   - 标准对象（standard object）是 ECMAScript 6 中定义的对象，例如 Array, Date 等，它们既可能是普通也可能是特异对象。
   - 内置对象（built-in object）指 JavaScript 执行环境开始运行时已存在的对象。标准对象均为内置对象
   ```

2. 对象字面量语法扩展

   I. 简写的属性初始化

   ```javascript
   //ES5
   function createPerson(name, age) {
       return {
           name: name,
           age: age
       };
   }
   //ES6 —— 当对象字面量中的属性只有属性名的时候，JavaScript 引擎会在该作用域内寻找是否有和属性同名的变量
   function createPerson(name, age) {
       return {
           name,
           age
       };
   }
   ```

   II. 简写的方法

   ```javascript
   //ES5
   var person = {
       name: "Nicholas",
       sayName: function() {
       	console.log(this.name);
       }
   };
   //ES6
   var person = {
       name: "Nicholas",
       //sayName() 属性由匿名函数赋值并拥有 ECMAScript 5 sayName() 函数的全部特征。
       //一项区别是简写方法可以使用 super，而非简写方法不能使用
       sayName() {
       	console.log(this.name);
       }
   };
   ```

   III. 动态计算属性名

   ```javascript
   //ES5
   var person = {}, lastName = "last name";
   person["first name"] = "Nicholas";
   person[lastName] = "Zakas";
   console.log(person["first name"]); // "Nicholas"
   console.log(person[lastName]); // "Zakas"
   
   //使用这个模式的前提是要事先知道属性的名字，并且能由字符串字面量来表示。不过，如果"first name" 属性名被包含在一个变量里（如之前的例子）或者需要计算才能得到，那么ECMAScript 5 无法在对象字面量中使用该属性名
   var person = {
   	"first name": "Nicholas"
   };
   console.log(person["first name"]); // "Nicholas"
   
   //ES6
   var lastName = "last name";
   var person = {
       "first name": "Nicholas",
       [lastName]: "Zakas"
   };
   console.log(person["first name"]); // "Nicholas"
   console.log(person[lastName]); // "Zakas"
   
   var suffix = " name";
   var person = {
       ["first" + suffix]: "Nicholas",
       ["last" + suffix]: "Zakas"
   };
   console.log(person["first name"]); // "Nicholas"
   console.log(person["last name"]); // "Zakas"
   ```

3. 新的方法

   ```javascript
   - ECMAScript 从第五版开始避免在 Object.prototype 上添加新的全局函数或方法，转而去考虑具体的对象类型如数组）应该有什么方法。当某些方法不适合这些具体类型时就将它们添加到全局 Object 上
   ```

   I. Object.is()

   ```javascript
   - 在 JavaSciprt 中当你想比较两个值时，你极有可能使用比较操作符（==）或严格比较操作符（===）。许多开发者为了避免在比较的过程中发生强制类型转换，更倾向于后者。但即使是严格等于操作符，它也不是万能的。例如，它认为 +0 和 -0 是相等的，虽然它们在JavaScript 引擎中表示的方式不同。同样 NaN === NaN 会返回 false，所以必须使用 isNaN()函数才能判断 NaN 。
   - ECMAScript 6 引入了 Object.is() 方法来补偿严格等于操作符怪异行为的过失。该函数接受两个参数并在它们相等的返回 true 。只有两者在类型和值都相同的情况下才会判为相等
   
   console.log(+0 == -0); // true
   console.log(+0 === -0); // true
   console.log(Object.is(+0, -0)); // false
   
   console.log(NaN == NaN); // false
   console.log(NaN === NaN); // false
   console.log(Object.is(NaN, NaN)); // true
   
   console.log(5 == 5); // true
   console.log(5 == "5"); // true
   console.log(5 === 5); // true
   console.log(5 === "5"); // false
   console.log(Object.is(5, 5)); // true
   console.log(Object.is(5, "5")); // false
   
   - 很多情况下 Object.is() 的表现和 === 是相同的。它们之间的区别是前者认为 +0 和 -0 不相等而 NaN 和 NaN 则是相同的。不过弃用后者是完全没有必要的。何时选择 Object.is() 与 == 或=== 取决于代码的实际情况。
   ```

   II. Object.assign()

   ```javascript
   function mixin(receiver, supplier) {
       Object.keys(supplier).forEach(function(key) {
       	receiver[key] = supplier[key];
       });
       return receiver;
   }
   function EventTarget() { /*...*/ }
   EventTarget.prototype = {
       constructor: EventTarget,
       emit: function() { /*...*/ },
       on: function() { /*...*/ }
   };
   var myObject = {};
   mixin(myObject, EventTarget.prototype);
   myObject.emit("somethingChanged");
   
   - Object.assign()与mixin()作用很相似，参数为一个接收者对象和任意数量的提供者对象。
   - 命名由 mixin() 变更为 assign() 更能反映出该方法的实质。既然 mixin() 函数使用了赋值操作符（=），那么接收者对象无法将其它对象的访问器属性（accessor properties）拷贝给自身。Object.assign() 的命名就是为了反映这个差异。
   - 可以在任何可以使用 mixin() 函数的场景来利用 Object.assign()
   - Object.assign() 方法接收任意数量的提供者对象，接收者对象根据提供者内部的属性定义顺序来接收它们,意味着后面的提供者对象可以重写前面的提供者对象的属性值
   
   var receiver = {};
   Object.assign(receiver,
       {
           type: "js",
           name: "file.js"
       },
       {
       	type: "css"
       }
   );
   console.log(receiver.type); // "css"
   console.log(receiver.name); // "file.js"
   
   - Object.assign() 在接收提供的访问器属性的时候不会创建自己的访问器属性。由于 Object.assign() 使用了赋值操作，所以访问器属性在接收者对象中作为数据属性（data property）存在
   
   var receiver = {},
   supplier = {
       get name() {
       	return "file.js"
       }
   };
   Object.assign(receiver, supplier);
   var descriptor = Object.getOwnPropertyDescriptor(receiver, "name");
   //在该段代码中，提供者对象包含一个 name 访问器属性。在使用 Object.assign() 方法之后，receive.name 作为数据属性存在且值为 "file.js"，因为 Object.assign() 被调用时supplier.name 返回 "file.js"
   console.log(descriptor.value); // "file.js"
   console.log(descriptor.get); // undefined
   
   // Object.assign 把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性 4 覆盖了目标数组的 0 号属性 1 
   Object.assign([1, 2, 3], [4, 5])// [4, 5, 3]
   
   const source = {
   	get foo() { return 1 }
   };
   const target = {};
   Object.assign(target, source)// { foo: 1 }
   ```

4. 重复的对象字面量属性

   ```javascript
   - ECMAScript 5 在严格模式中检查对象字面量的属性，如若有重复存在便抛出错误
   "use strict";
   var person = {
       name: "Nicholas",
       name: "Greg" // ES5 严格模式下抛出错误
   };
   
   - 在ECMAScript 6 中，重复属性的检查被移除了，而且后面的同名属性值成为了该对象属性的最终值
   "use strict";
   var person = {
       name: "Nicholas",
       name: "Greg" // ES6 严格模式下正常运行
   };
   console.log(person.name); // "Greg"
   ```

5. 自身属性的枚举排序

   ```javascript
   - 对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。 Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象。
   let obj = { foo: 123 };
   Object.getOwnPropertyDescriptor(obj, 'foo')
   // {
   // value: 123,
   // writable: true,
   // enumerable: true,
   // configurable: true
   // }
   - 描述对象的 enumerable 属性，称为”可枚举性“，如果该属性为 false ，就表示某些操作会忽略当前属性
   - 有四个操作会忽略 enumerable 为 false 的属性。
       - for...in 循环：只遍历对象自身的和继承的可枚举的属性。
       - Object.keys() ：返回对象自身的所有可枚举的属性的键名。
       - JSON.stringify() ：只串行化对象自身的可枚举的属性。
       - Object.assign() ： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。
       
   - ES6 一共有 5 种方法可以遍历对象的属性。
   	- for...in：for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。
   	-  Object.keys(obj)：Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。
   	-  Object.getOwnPropertyNames(obj)：
   Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。
   	-  Object.getOwnPropertySymbols(obj)：Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
   	- Reflect.ownKeys(obj)：Reflect.ownKeys 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
   
   - ECMAScript 5 并没有定义枚举对象属性的顺序，并将其交给各 JavaScript 引擎自行决定。然而，ECMAScript 6 严格定义了枚举对象自身（own）属性时返回的属性名顺序。这对Object.getOwnPropertyNames() 和 Reflect.ownKeys返回的属性名集合有一定影响，包括从 Object.assign() 中获得的属性。
   - 枚举自身属性返回的属性名顺序的基本准则如下：
   1. 类型为数字（numeric）键会升序。
   2. 类型为字符的键按照被添加到对象时的顺序保持不变。
   3. 类型为 Symbol的键按照被添加到对象时的顺序保持不变。
   
   var obj = {
       a: 1,
       0: 1,
       c: 1,
       2: 1,
       b: 1,
       1: 1
   };
   obj.d = 1;
   console.log(Object.getOwnPropertyNames(obj).join("")); // "012acbd"
   
   - for-in循环的枚举顺序仍不明确，因为各 JavaScript 引擎的实现不同。同样 Object.keys()与JSON.stringify() 由于枚举顺序和 for-in 相同导致它们的具体结果也无确切定义
   ```

6. 更多的原型属性

   I. 改变对象的原型

   ```javascript
   - 一般情况下，原型在该对象由构造函数或 Object.create() 方法创建时出现。ECMAScript 5 下的 JavaScript 编程最重要的约定之一就是一个对象实例无法更改它的原型。
   - ECMAScript 5 添加了 Object.getPrototypeOf() 方法来提取给定对象的原型，对象实例依然缺乏修改其原型的标准方式。
   - ECMAScript 6 通过添加 Object.setPrototypeOf() 方法来对该约定做了变更。它允许你改变任何给定对象实例的原型。Object.setPrototypeof() 方法接收两个参数：需要改变原型的对象和你期望的原型对象。
   let person = {
       getGreeting() {
           return "Hello";
       }
   };
   let dog = {
       getGreeting() {
       	return "Woof";
       }
   };
   // 原型为 person
   let friend = Object.create(person);
   console.log(friend.getGreeting()); // "Hello"
   console.log(Object.getPrototypeOf(friend) === person); // true
   // 改变原型为 dog
   Object.setPrototypeOf(friend, dog);
   console.log(friend.getGreeting()); // "Woof"
   console.log(Object.getPrototypeOf(friend) === dog); // true
   
   - 对象原型的实际值由一个内部属性 [[Prototype]] 存储。Object.getPrototypeOf() 方法返回的就是 [[Prototype]] 的值，而 Object.setPrototypeOf() 则会更改它
   ```

   II. 使用super引用来方便获取prototype

   ```javascript
   //ES5
   let person = {
       getGreeting() {
       	return "Hello";
       }
   };
   let dog = {
       getGreeting() {
       	return "Woof";
       }
   };
   let friend = {
       getGreeting() {
       	return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
       }
   };
   // 设定 friend 的原型为 person
   Object.setPrototypeOf(friend, person);
   console.log(friend.getGreeting()); // "Hello, hi!"
   console.log(Object.getPrototypeOf(friend) === person); // true
   // 设定 friend 的原型为 dog
   Object.setPrototypeOf(friend, dog);
   console.log(friend.getGreeting()); // "Woof, hi!"
   console.log(Object.getPrototypeOf(friend) === dog); // true
   
   //ES6  —— Object.getPrototypeOf() 和 .call(this) 来调用原型方法显得有些笨重，所以 ES6 引入了 super
   let friend = {
       getGreeting() {
           // 相比上个例子，等同于：
           // Object.getPrototypeOf(this).getGreeting.call(this)
           return super.getGreeting() + ", hi!";
       }
   };
   
   // super 只能在简写方法中使用（concise methods），除此之外将发生语法错误
   let friend = {
       getGreeting: function() {
           // 语法错误
           return super.getGreeting() + ", hi!";
       }
   };
   ```

7. 何为“方法”

   ```javascript
   -  ES6 之前，“方法” 这一概念并未有过正式定义。方法泛指那些对象中值为函数而非数据的属性。ES6 正式将方法定义为带有 [[HomeObject]] 内部属性的函数，该属性指出方法的拥有者
   let person = {
   // 方法
   	getGreeting() {
       	return "Hello";
       }
   };
   // 不是方法
   function shareGreeting() {
   	return "Hi!";
   }
   - 该例中定义了 person 和名为 getGreeting() 的方法。由于该函数被直接分配给了 person 对象，所以 getGretting() 内部的 [[HomeObject]] 值为 person。另一方面，shareGretting() 由于在创建时没有分配给任何对象，所以不包含 [[HomeObject]]。大部分情况下该差异并不十分重要，不过要使用 super 引用的时候另当别论
   - 任何 super 引用都要由 [[HomeObject]] 来决定它们要做的工作。当使用时，首先做的是在[[HomeObject]] 上调用 Object.getPrototypeOf() 来提取原型的引用，接下来在原型中寻找调用方法的命名。最后，绑定 this 值并调用该方法
   ```

##### 解构

1. 对象解构

   ```javascript
   - 解构的核心是模式匹配，以变量名和冒号为模式进行匹配
   //ES5
   let options = {
       repeat: true,
       save: false
   };
   // 从对象中提取数据
   let repeat = options.repeat,
       save = options.save;
   
   //ES6
   let node = {
       type: "Identifier",
       name: "foo"
   };
   let { type, name } = node;
   console.log(type); // "Identifier"
   console.log(name); // "foo"
   
   - 当在解构中使用 var，let 或 const来声明变量时，必须要由初始化操作。下面的代码会因为未初始化的存在而抛出错误：
   // 语法错误！
   var { type, name };
   // 语法错误！
   let { type, name };
   // 语法错误！
   const { type, name };
   ```

   I. 解构赋值表达式

   ```javascript
   let node = {
       type: "Identifier",
       name: "foo"
   },
   type = "Literal",
   name = 5;
   // assign different values using destructuring
   ({ type, name } = node);
   console.log(type); // "Identifier"
   console.log(name); // "foo"
   
   - 解构赋值表达式会计算右侧的值（= 右侧）。也就是说你可以在任何期望传值的位置使用表达式
   - 当解构赋值表达式的右侧（= 后面的表达式）计算结果为 null 或 undefined 的时候一个错误将被抛出。因为任何读取 null 或 undefined 的操作都会发生运行时错误
   （runtime error）
   let node = {
       type: "Identifier",
       name: "foo"
   },
   type = "Literal",
   name = 5;
   function outputInfo(value) {
   	console.log(value === node); // true
   }
   outputInfo({ type, name } = node);
   console.log(type); // "Identifier"
   console.log(name); // "foo"
   ```

   II. 默认值

   ```javascript
   - 当你使用解构赋值表达式语句时，如果你定义了一个变量而该变量名在对象中找不到对应的属性名，那么该本地变量的值为 undefined
   let node = {
       type: "Identifier",
       name: "foo"
   };
   let { type, name, value } = node;
   console.log(type); // "Identifier"
   console.log(name); // "foo"
   console.log(value); // undefined
   
   let node = {
       type: "Identifier",
       name: "foo"
   };
   let { type, name, value = true } = node;
   console.log(type); // "Identifier"
   console.log(name); // "foo"
   console.log(value); // true
   ```

   III. 赋值给不同的变量名

   ```javascript
   let node = {
       type: "Identifier",
       name: "foo"
   };
   let { type: localType, name: localName } = node;
   console.log(localType); // "Identifier"
   console.log(localName); // "foo"
   
   let node = {
   	type: "Identifier"
   };
   let { type: localType, name: localName = "bar" } = node;
   console.log(localType); // "Identifier"
   console.log(localName); // "bar"
   ```

   IV. 嵌套对象解构

   ```javascript
   let node = {
       type: "Identifier",
       name: "foo",
       loc: {
           start: {
               line: 1,
               column: 1
       	},
       end: {
               line: 1,
               column: 4
           }
       }
   };
   let { loc: { start }} = node;
   console.log(start.line); // 1
   console.log(start.column); // 1
   
   // 提取 node.loc.start
   let { loc: { start: localStart }} = node;
   console.log(localStart.line); // 1
   console.log(localStart.column); // 1
   ```

2. 数组解构 

   ```javascript
   - 数据解构的语法和对象解构看起来类似，只是将对象字面量替换成了数组字面量，而且解构操作的是数组内部的位置（索引）而不是对象中的命名属性
   - 注意的是数组本身不会有任何影响
   
   let colors = [ "red", "green", "blue" ];
   let [ firstColor, secondColor ] = colors;
   console.log(firstColor); // "red"
   console.log(secondColor); // "green"
   
   let colors = [ "red", "green", "blue" ];
   let [ , , thirdColor ] = colors;
   console.log(thirdColor); // "blue"
   ```

   I. 结构赋值表达式

   ```javascript
   let colors = [ "red", "green", "blue" ],
       firstColor = "black",
       secondColor = "purple";
   [ firstColor, secondColor ] = colors;
   console.log(firstColor); // "red"
   console.log(secondColor); // "green"
   
   - 数组中的解构赋值表达式有一个独特的使用场景 —— 对两个变量的值进行交换。
   // 在 ECMAScript 5 中交换变量的值
   let a = 1,
       b = 2,
       tmp;
   tmp = a;
   a = b;
   b = tmp;
   console.log(a); // 2
   console.log(b); // 1
   
   // 在 ECMAScript 6 中交换变量的值
   let a = 1,
       b = 2;
   [ a, b ] = [ b, a ];
   console.log(a); // 2
   console.log(b); // 1
   
   - 和对象的解构赋值表达式相同，若表达式右侧的计算值为 null 和 undefined，那么该解构赋值表达式会抛出错误
   ```

   II. 默认值

   ```javascript
   - 数组中的解构赋值表达式同样可以在任意位置指定默认值。当某个位置的项未被传值或传入的值为 undefined，那么它的默认值会被使用
   let colors = [ "red" ];
   let [ firstColor, secondColor = "green" ] = colors;
   console.log(firstColor); // "red"
   console.log(secondColor); // "green"
   ```

   III. 嵌套的数组解构

   ```javascript
   let colors = [ "red", [ "green", "lightgreen" ], "blue" ];
   // 之后
   let [ firstColor, [ secondColor ] ] = colors;
   console.log(firstColor); // "red"
   console.log(secondColor); // "green"
   ```

   IV. 剩余项

   ```javascript
   let colors = [ "red", "green", "blue" ];
   let [ firstColor, ...restColors ] = colors;
   console.log(firstColor); // "red"
   console.log(restColors.length); // 2
   console.log(restColors[0]); // "green"
   console.log(restColors[1]); // "blue"
   
   - 剩余项在提取数组中特定的项并保持其它项可用的情况下十分好用，而且还有另一种实用的方法。
   // ECMAScript 5 中克隆数组的方法
   var colors = [ "red", "green", "blue" ];
   var clonedColors = colors.concat();
   console.log(clonedColors); //"[red,green,blue]"
   
   // ECMAScript 6 中克隆数组的方法
   let colors = [ "red", "green", "blue" ];
   let [ ...clonedColors ] = colors;
   console.log(clonedColors); //"[red,green,blue]"
   
   - 剩余项必须是解构语句中的最后项并且不能在后面添加逗号，因为该行为会抛出语法错误
   ```

3. 混合解构

   ```javascript
   - 可以创建更复杂的表达式来混合使用对象和数组解构。这样做你可以精准地获取对象与数组并存的数据结构中的信息
   let node = {
       type: "Identifier",
       name: "foo",
       loc: {
           start: {
               line: 1,
               column: 1
           },
           end: {
               line: 1,
               column: 4
           }
       },
       range: [0, 3]
   };
   let {
       loc: { start },
       range: [ startIndex ]
   } = node;
   console.log(start.line); // 1
   console.log(start.column); // 1
   console.log(startIndex); // 0
   
   - 该种实现的特别实用之处在于提取 JSON 中的数据时不必访问整个数据结构
   ```

4. 参数解构

   ```javascript
   - 当 JavaScript 的函数需要接受大量的可选参数时，一个普遍的实践是创建一个带有额外属性的对象用来明确
   // properties on options represent additional parameters
   function setCookie(name, value, options) {
       options = options || {};
       let secure = options.secure,
       path = options.path,
       domain = options.domain,
       expires = options.expires;
       // code to set the cookie
   }
   // third argument maps to options
   setCookie("type", "js", {
       secure: true,
       expires: 60000
   });
   
   function setCookie(name, value, { secure, path, domain, expires }) {
   	// code to set the cookie
   }
   setCookie("type", "js", {
       secure: true,
       expires: 60000
   });
   ```

   I. 必选的参数解构

   ```javascript
   - 参数解构有一个怪异之处：在默认情况下，未给参数解构传值会抛出一个错误
   // 错误!
   setCookie("type", "js");
   //第三个参数未见踪影，所以它的值就是惯例的 undefined 。发生错误的原因是参数解构本质上是解构声明的简写形式，当 setCookie() 函数被调用时，JavaScript 引擎实际上会这么做
   function setCookie(name, value, options) {
       //解构会在右侧的表达式计算结果为 null 或 undefined 时抛出错误，那么未给 setCookie()函数传递第三个参数的结果也是显而易见了
       let { secure, path, domain, expires } = options;
       // code to set the cookie
   }
   //解决方法
   function setCookie(name, value, { secure, path, domain, expires } = {}) {
   	// ...
   }
   ```

   II. 参数结构的默认值

   ```javascript
   - 可以使用解构赋值表达式来向解构的参数指定默认值，只需在参数后面添加等于符号和做为默认的值
   function setCookie(name, value,
       {
       secure = false,
       path = "/",
       domain = "example.com",
       expires = new Date(Date.now() + 360000000)
       } = {}
   ) {
   // ...
   }
   ```

##### Set与Map

```javascript
- set 是非重复值的集合。你一般不会像在数组中那样来访问 set 中的某个值；相反，它常被用来检查某个值是否存在。
- map 则是包含键和对应值的集合，所以 map 中的每个元素都有两块数据，当指定键的时候对应的值会被读取。map 常用作缓存以便之后需要的时候能快速提取数据
```

1. ES5中的Set与Map

   ```javascript
   //Set
   let set = Object.create(null);// set 对象没有原型，确保它不会继承任何属性
   set.foo = true;//当给 set 对象添加属性并设置值为 true 之后，条件判断语句可以轻松地检查某个值是否存在
       // 检查属性是否存在
       if (set.foo) {
       // do something
   }
   
   //Map
   et map = Object.create(null);
   map.foo = "bar";
   // 提取属性值
   let value = map.foo;
   console.log(value); // "bar"
   ```

2. 使用对象模拟问题

   ```javascript
   //1
   let map = Object.create(null);
   map[5] = "foo";
   console.log(map["5"]); // "foo"
   
   //2
   let map = Object.create(null),
   key1 = {},
   key2 = {};
   map[key1] = "foo";//map = {'[object Object]': 'foo'}
   console.log(map[key2]); // "foo"
   
   - JavaScript 有 in 操作符可以在不读取值的情况下检查某个属性是否在对象中存在，如果是的话则返回 true。不过，该操作符还会检查对象的原型，这就使得该操作只有在对象不存在原型的条件下（let obj = Object.create(null)）才是可靠的。即使这样，很多开发者都使用了上例中不当的方式而没有使用 in
   ```

3. ES6中的Set

   I. Set的增删改查

   ```javascript
   //set 在比较值是否相等的时候不会做强制类型转换
   
   //增
   let set = new Set();
   set.add(5);
   set.add("5");
   console.log(set.size); // 2
   //重复添加
   set.add(5); // duplicate - this is ignored
   console.log(set.size); // 2
   //添加对象不会转换为字符串
   key1 = {},
   key2 = {};
   set.add(key1);
   set.add(key2);
   console.log(set.size); // 4
   
   let set = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
   console.log(set.size); // 5
   
   //查
   console.log(set.has(5)); // true
   console.log(set.has(6)); // false
   
   //删
   set.delete(5);//删除项
   console.log(set.has(5)); // false
   console.log(set.size); // 1
   set.clear();//清空集合
   console.log(set.has("5")); // false
   console.log(set.size); // 0
   
   //改
   // 方法一
   let set = new Set([1, 2, 3]);
   set = new Set([...set].map(val => val * 2));
   // set的值是2, 4, 6
   // 方法二
   let set = new Set([1, 2, 3]);
   set = new Set(Array.from(set, val => val * 2));
   // set的值是2, 4, 6
   ```

   II. Set中的forEach()方法

   ```javascript
   - forEach() 方法接收一个含有三个参数的回调函数：
   	- 下一位置的值
   	- 和首个参数的值相同
   	- 操作的 set 本身    
   let set = new Set([1, 2]);
   set.forEach(function(value, key, ownerSet) {
   	console.log(key + " " + value);
   	console.log(ownerSet === set);
   });
   // 1 1
   // true
   // 2 2
   // true
   
   - forEach() 传入第二个参数 this 以便你在该方法中使用它
   let set = new Set([1, 2]);
   let processor = {
       output(value) {
       	console.log(value);
   	},
       process(dataSet) {
           dataSet.forEach(function(value) {
               this.output(value);
           }, this);
       }
   };
   processor.process(set);
   ```

   III. 将set转换为数组

   ```javascript
   let set = new Set([1, 2, 3, 3, 3, 4, 5]),
       array = [...set];
   console.log(array); // [1,2,3,4,5]
   ```

   IV. weak set

   ```javascript
   - set 类型根据它存储对象的方式，也被称为 strong set。一个对象存储在 set 内部或存储于一个变量在效果上是等同的。只要对该 Set 实例的引用存在，那么存储的对象在垃圾回收以释放内存的时候无法被销毁
   let set = new Set(),
   key = {};
   set.add(key);
   console.log(set.size); // 1
   // 销毁引用
   key = null;
   console.log(set.size); // 1
   // 重新获得了引用
   key = [...set][0];
   
   - 但某些时候，当其它引用解除之后 set 内部能自动解除相关引用是再好不过的。例如，当在一个网页中使用JavaScript 追踪一些可能在之后会被销毁 DOM 元素，你不希望有任何残留的 DOM 元素引用存在
   - weak set类型不允许存储原始值而专门存储弱对象引用。由于弱引用不会被当做剩余存在的引用，所以它不会阻止垃圾回收
   
   const a = [[1, 2], [3, 4]];
   const ws = new WeakSet(a);
   // WeakSet {[1, 2], [3, 4]}
   //注意，是 a 数组的成员成为 WeakSet 的成员，而不是 a 数组本身。这意味着，数组的成员只能是对象。
   const b = [3, 4];
   const ws = new WeakSet(b);
   // Uncaught TypeError: Invalid value used in weak set(…)
   ```

   V. weak set的增删查

   ```javascript
   let set = new WeakSet(),
       key = {};
   // add the object to the set
   set.add(key);
   console.log(set.has(key)); // true
   set.delete(key);
   console.log(set.has(key)); // false
   
   let key1 = {},
   key2 = {},
   set = new WeakSet([key1, key2]);
   console.log(set.has(key1)); // true
   console.log(set.has(key2)); // true
   ```

   VI. Set类型之间的差异

   ```javascript
   - weak set 和 一般 set 的最大区别是前者存储的是弱对象引用
   let set = new WeakSet(),
       key = {};
   // 将对象添加给 set
   set.add(key);
   console.log(set.has(key)); // true
   // 销毁了最后剩余的强引用，weak set 中的引用也随即消失
   key = null;
   //当该段代码执行后，weak set 中的引用就无法访问了
   
   - 普通set与weak set的区别
   	- 当调用 add()，has() 或 delete() 方法传入了一个非对象参数时，一个错误会被抛出。
   	- weak set 不是可迭代类型，因此不能被用在 for-of 循环中。
   	- weak set 无法暴露出自身的迭代器（例如 keys() 和 values() 方法），所以没有任何编程手段来确定 weak set 中的内容
   	- weak set 没有 forEach() 方法。
   	- weak set 没有 size 属性
   ```

4. ES6中的Map

   ```javascript
   - ECMAScript 6 中的 map 类型包含一组有序的键值对，其中键和值可以是任何类型。
   - 键的比较结果由 Object.is() 来决定，所以你可以同时使用 5 和 "5" 做为键来存储，因为它们是不同的类型。这和使用对象属性做为值的方法大相径庭，因为对象的属性会被强制转换为字符串类型。
   - Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
   let map = new Map();
   map.set("title", "Understanding ES6");
   map.set("year", 2016);
   console.log(map.get("title")); // "Understanding ES6"
   console.log(map.get("year")); // 2016
   ```

   I. Map方法

   ```javascript
   - 以下三个方法 map 和 set 都能使用：
   	- has(key) - 判断给定的 key 是否在 map 中存在
   	- delete(key) - 移除 map 中的 key 及对应的值
   	- clear() - 移除 map 中所有的键值对
   
   let map = new Map();
   map.set("name", "Nicholas");
   map.set("age", 25);
   
   console.log(map.size); // 2
   
   console.log(map.has("name")); // true
   console.log(map.get("name")); // "Nicholas"
   
   console.log(map.has("age")); // true
   console.log(map.get("age")); // 25
   
   map.delete("name");
   console.log(map.has("name")); // false
   console.log(map.get("name")); // undefined
   console.log(map.size); // 1
   
   map.clear();
   console.log(map.has("name")); // false
   console.log(map.get("name")); // undefined
   console.log(map.has("age")); // false
   console.log(map.get("age")); // undefined
   console.log(map.size); // 0
   ```

   II. 初始化Map

   ```javascript
   let map = new Map([["name", "Nicholas"], ["age", 25]]);
   console.log(map.has("name")); // true
   console.log(map.get("name")); // "Nicholas"
   console.log(map.has("age")); // true
   console.log(map.get("age")); // 25
   console.log(map.size); // 2
   ```

   III. Map中的forEach()方法

   ```javascript
   - map 的 forEach() 方法类似于 set 和 数组，它同样接收一个含有三个参数的回调函数：
   	- map 中下一位置的值
   	- 该值对应的键
   	- 正在读取的 map 本身
   let map = new Map([ ["name", "Nicholas"], ["age", 25]]);
   map.forEach(function(value, key, ownerMap) {
       console.log(key + " " + value);
       console.log(ownerMap === map);
   });
   //name Nicholas
   //true
   //age 25
   //true
   
   - forEach() 传入第二个参数来制定回调函数中的 this 值，其行为和 set 中的forEach() 一致
   ```

   IV. weak map

   ```javascript
   - 在 weak map 中，所有的键必须是对象（否则会抛出错误），而且这些对象都是弱引用，不会干扰垃圾回收
   - 当 weak map 中的键在 weak map 之外不存在引用的时候，该键及对应的值会被移除
   - weak map 的最佳实践是创建一个对象并和网页中的特定 DOM 元素关联。例如，某些作用于网页的 JavaScript 库会为每一个绑定的 DOM 元素维护一个由该库中衍生的自定义对象，并将其映射到作为缓存的对象内部
   - 弱引用指的是键的弱引用，而不只是值的弱引用。将对象存储为 weakmap 中的值仍然会在其余引用不存在的情况下妨碍垃圾回收
   
   let map = new WeakMap(),
       element = document.querySelector(".element");
   map.set(element, "Original");
   let value = map.get(element);
   console.log(value); // "Original"
   // 移除该元素
   element.parentNode.removeChild(element);
   element = null;// 现在 weak map 的内部为空
   
   //weak map使用
   let key1 = {},
       key2 = {},
       map = new WeakMap([[key1, "Hello"], [key2, 42]]);
   console.log(map.has(key1)); // true
   console.log(map.get(key1)); // "Hello"
   console.log(map.has(key2)); // true
   console.log(map.get(key2)); // 42
   //初始化weak map
   let key1 = {},
   key2 = {},
   map = new WeakMap([[key1, "Hello"], [key2, 42]]);
   console.log(map.has(key1)); // true
   console.log(map.get(key1)); // "Hello"
   console.log(map.has(key2)); // true
   console.log(map.get(key2)); // 42
   //weak map方法 —— set、get、has、delete，不存在clear
   let map = new WeakMap(),
       element = document.querySelector(".element");
   map.set(element, "Original");
   console.log(map.has(element)); // true
   console.log(map.get(element)); // "Original"
   map.delete(element);
   console.log(map.has(element)); // false
   console.log(map.get(element)); // undefined
   ```

   V. weak map私有对象数据

   ```javascript
   var Person = (function() {
       var privateData = {},
           privateId = 0;
       function Person(name) {
           Object.defineProperty(this, "_id", { value: privateId++ });
           privateData[this._id] = {
           	name: name
           };
       }
       Person.prototype.getName = function() {
       	return privateData[this._id].name;
       };
       return Person;
   }());//这种方式最大的问题在于当对象实例销毁时没有获知 privateData 内部相关数据的办法，于是该对象会驻留在内存中并包含额外的数据
   
   let Person = (function() {
       let privateData = new WeakMap();
       function Person(name) {
       	privateData.set(this, { name: name });
       }
       Person.prototype.getName = function() {
       	return privateData.get(this).name;
       };
       return Person;
   }());
   ```

   VI. weak map的实践与限制

   ```javascript
   map与weak map的选择
   	- 首要考虑的因素是你是否只想使用对象作为键
   		- 若是，那么最好的选择就是 weak map 。因为它能优化内存的占用并通过在对象销毁之后删除额外的信息来防止内存泄漏。
       -  weak map 稍微减少了自身内容的可见度，所以你不能使用 forEach() 方法，size 属性或 clear() 方法来管理集合中的项。如果你需要较强的操控能力，那么一般的 map会是个更好的选择，不过要留意内存的占用
       - 如果你想使用非对象类型作键，那么 map 就是你唯一的选择
   ```

##### 字符串扩展

1. 更佳的unicode支持

   ```javascript
   - JavaScript 允许采用 \uxxxx 形式表示一个字符，其中 xxxx 表示字符的 Unicode 码点。
       "\u0061" // "a"
   - 这种表示法只限于码点在 \u0000 ~ \uFFFF 之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
   
   - UTF-16 的前 2 个代码点由单个 16 位代码单元表示。这个范围被称作基本多语言面（Basic Multilingual Plane，BMP）。任何超出该范围的部分都是增补的语言面（supplementary plane），代码点将不能被单一的 16 位代码单元表示。
   - 为了解决这个问题，UTF-16 引入了代理项对（surrogate pair）来让两个 16 位代码单元表示一个代码点。这意味着字符既可能是包含单个代码单元的 16位 BMP 字符，也可能是由两个代码单元组成的位于增补语言面的 32 位字符
   - 在 ECMAScript 5 中，所有的字符串操作针对的是 16 位代码单元，意味着如果编码的 UTF-16 字符串包含代理项对，那么可能会得到意想不到的结果
   ```

   I. codePointAt()方法

   ```javascript
   - codePointAt()，可以提取给定位置字符串的对应 Unicode 代码点。该方法接收代码单元而非字符的位置并返回一个整型值
   - 除非操作的是非 BMP 字符，否则 codePointAt 方法的返回值与 charCodeAt() 相同。
   
   var text = "a" ;
   
   console.log(text.charCodeAt(0)); // 55362
   console.log(text.charCodeAt(1)); // 57271
   console.log(text.charCodeAt(2)); // 97
   
   console.log(text.codePointAt(0)); // 134071
   console.log(text.codePointAt(1)); // 57271
   console.log(text.codePointAt(2)); // 97
   
   - 对一个字符调用 codePointAt() 方法是判断它所包含代码单元数量的最容易的方法：
   function is32Bit(c) {
   	return c.codePointAt(0) > 0xFFFF;
   }
   console.log(is32Bit("" )); // true
   console.log(is32Bit("a")); // false
   ```

   II. String.fromCodePoint() 方法

   ```javascript
   - String.fromCodePoint() 使用给定的代码点来产生相应的单个字符
   
   console.log(String.fromCodePoint(134071)); // ""
   ```

   III. normalize() 方法

   ```javascript
   - Unicode 另一个有趣的方面是，不同的字符在某些排序或比较操作中被认为是相同的。有两种方式可以确立两者之间的关系。
   	- 第一，规范相等性
   	- 第二，字符间的兼容性
   
   - ECMAScript 6 通过给字符串提供 normalize() 方法来支持 Unicode 规范格式。该方法接收一个字符串参数来获取以下 Unicode 规范格式中的一种并据此运行：
   	- Normalization Form Canonical Composition ("NFC"), 默认的规范格式
   	- Normalization Form Canonical Decomposition ("NFD")
   	- Normalization Form Compatibility Composition ("NFKC")
   	- Normalization Form Compatibility Decomposition ("NFKD")
   
   - 只需记住，当比较字符串时，它们必须被规范成同一种格式
   var normalized = values.map(function(text) {
   	return text.normalize();
   });
   normalized.sort(function(first, second) {
       if (first < second) {
       	return -1;
       } else if (first === second) {
       	return 0;
       } else {
       	return 1;
       }
   });
   //该段代码讲 values 数组中的字符串转换为一种规范格式以便让元素可以被正确的排序。
   
   values.sort(function(first, second) {
           var firstNormalized = first.normalize(),
           secondNormalized = second.normalize();
       
           if (firstNormalized < secondNormalized) {
           	return -1;
           } else if (firstNormalized === secondNormalized) {
           	return 0;
           } else {
           	return 1;
           }
   });
   
   values.sort(function(first, second) {
       var firstNormalized = first.normalize("NFD"),
       secondNormalized = second.normalize("NFD");
       if (firstNormalized < secondNormalized) {
       	return -1;
       } else if (firstNormalized === secondNormalized) {
       	return 0;
       } else {
       	return 1;
       }
   });
   ```

2. 字符串的其他改进

   I. 确认子字符串的方法

   ```javascript
   - includes() 方法会在给定文本存在于字符串中的任意位置时返回 true，否则返回 false 。
   - startsWith() 方法会在给定文本出现在字符串开头时返回 true，否则返回 false 。
   - endsWith() 方法会在给定文本出现在字符串末尾时返回 true，否则返回 false 。
   
   - 每个方法都接收两个参数：需要搜索的文本和可选的起始索引值。
   - 当提供第二个参数后，includes() 和 startsWith() 会以该索引为起始点进行匹配，而 endsWith() 将字符串的长度与参数值相减并将得到的值作为检索的起始点。
   - 若第二个参数未提供，includes() 和 startsWith()会从字符串的起始中开始检索，endsWith() 则是从字符串的末尾。
   ```

   II. repeat()方法

   ```javascript
   - repeat() 方法，它接受一个数字参数作为字符串的重复次数。该方法返回一个重复包含初始字符串的新字符串，重复次数等于参数
   console.log("x".repeat(3)); // "xxx"
   console.log("hello".repeat(2)); // "hellohello"
   console.log("abc".repeat(4)); // "abcabcabcabc"
   ```

3. 正则表达式的改进

   I. 正则表达式副本

   ```javascript
   var re1 = /ab/i,
   // ES6 中尚可，但是在 ES5 中会抛出错误
   re2 = new RegExp(re1, "g");
   console.log(re1.toString()); // "/ab/i"
   console.log(re2.toString()); // "/ab/g"
   console.log(re1.test("ab")); // true
   console.log(re2.test("ab")); // true
   console.log(re1.test("AB")); // true
   console.log(re2.test("AB")); // false
   ```

   II. 标志位属性

   ```javascript
   - 在 ECMAScript 5 中，你可以使用 source 属性来获得正则表达式中的文本，不过你若想获得字符串表示的标志位，则需要像下面这样解析 toString() 方法输出的内容：
   function getFlags(re) {
   var text = re.toString();
   	return text.substring(text.lastIndexOf("/") + 1, text.length);
   }
   // toString() 输出 "/ab/g"
   var re = /ab/g;
   console.log(getFlags(re)); // "g"
   
   //ES6
   var re = /ab/g;
   console.log(re.source); // "ab"
   console.log(re.flags); // "g"
   ```

4. 模板字面量

   ```javascript
   模板字面量是 ECMAScript 6 针对 JavaScript 直到 ECMAScript 5 依然缺失的如下功能的回应：
   	- 多行字符串：针对多行字符串的形式概念（formal concept）。
   	- 基本的字符串格式化：将字符串中的变量置换为值的能力。
   	- 转义 HTML：能将字符串进行转义并使其安全地插入到 HTML 的能力。
   ```

   I. 基础语法

   ```javascript
   //模板字面量由反引号（`） 而非一般字符串使用的单或双引号囊括
   let message = `Hello world!`;
   console.log(message); // "Hello world!"
   console.log(typeof message); // "string"
   console.log(message.length); // 12
   
   let message = `\`Hello\` world!`;
   console.log(message); // "`Hello` world!"
   console.log(typeof message); // "string"
   console.log(message.length); // 14
   ```

   II. 多行字符串

   ```javascript
   //ES5解决方案
   var message = "Multiline \
   			  string";
   //输出的 message 字符串不包含新行，因为反斜杠被视作续延（continuation）信号
   console.log(message); // "Multiline string"
   
   //该行为被定义为一个 bug 而且许多开发者都建议避免使用这种形式
   var message = "Multiline \n\
   				string";
   console.log(message); // "Multiline
   					// string"
   
   var message = [
                   "Multiline ",
                   "string"
                ].join("\n");
   let message = "Multiline \n" +
   				"string";
   
   //ES6
   let message = `Multiline
   string`;
   console.log(message); // "Multiline
   					// string"
   console.log(message.length); // 16
   
   //反引号中的所有空白符都是字符串的一部分，使用缩进要小心
   let message = `Multiline
   				string`;
   console.log(message); // "Multiline
   						// string"
   console.log(message.length); // 31
   
   //请考虑将多行模板字面量的第一行空置并在第二行开始缩进
   let html = `
   <div>
   <h1>Title</h1>
   </div>`.trim();
   ```

   III. 字符串置换

   ```javascript
   - 模板字面量看上去像是普通 JavaScript 字符串的升级版。两者之间的真正区别在于前者包含的置换操作
   - 置换部分由 ${ 和 } 包含，其中可以放入任意 JavaScript 表达式
   - 模板字面量可以访问作用域中定义的任何变量。若变量未定义，在严格和非严格模式下都会抛出错误
   
   let name = "Nicholas",
   message = `Hello, ${name}.`;
   console.log(message); // "Hello, Nicholas."
   
   let count = 10,
       price = 0.25,
   message = `${count} items cost $ ${(count * price).toFixed(2)}.`;
   console.log(message); // "10 items cost $2.50."
   
   let name = "Nicholas",
       message = `Hello, ${
   		`my name is ${ name }`
   	}.`;
   console.log(message); // "Hello, my name is Nicholas."
   ```

   IV. 模板标签

   ```javascript
   //模板字面量真正的强大之处来源于模板标签。一个模板标签可以被转换为模板字面量并作为最终值返回。标签在模板的头部，即左 ` 字符之前指定
   let message = tag`Hello world`;
   
   - 一个标签仅代表一个函数，它接收需要处理的模板字面量。
   - 标签分别接收模板字面量中的片段，且必须将它们组合以得出结果。
   - 函数的首个参数为包含普通 JavaScript 字符串的数组，余下的参数为每次置换的对应值
   
   //标签函数一般使用剩余参数来定义，以便轻松地处理数据
   function tag(literals, ...substitutions) {
   	// 返回一个字符串
   }
   
   let count = 10,
       price = 0.25,
       message = passthru`${count} items cost $ ${(count * price).toFixed(2)}.`;
   // 注意：gitbook 解析 markdown 语法时存在一个 bug，在这里 $ $ 实际为 $$
   - 如果有一个 passthru() 函数，那么它会接收三个参数。
   	- 首当其冲的是一个 literals 数组，包含如下的元素：
           - 在首次置换位置之前的空字符串（""）。
           - 首次置换位置到第二次置换位置之前的字符串（" items cost $ "）。
           - 第二次置换位置之后的字符串（"."）。
       - 下个参数为 10，它刚好为 count 变量的值，同时也是 substitutions 数组的首个元素。
       - 最后的参数为 "2.50"，即 (count * price).toFixed(2) 的计算结果，并作为 substitutions 数组的第二个元素
   - 注意 literals 的首个元素为空字符串，以保证 literals[0] 总是代表字符串的起始位置，正如
   literals[literals.length - 1] 涵盖字符串的末尾。同时置换（substitution）元素数目也总是比字面量（literal）元素少 1，意味着表达式 substitutions.length === literals.length - 1 的值总是为 true
   
   function passthru(literals, ...substitutions) {
       let result = "";
       // 只根据 substitution 的数目来运行循环
       for (let i = 0; i < substitutions.length; i++) {
           result += literals[i];
           result += substitutions[i];
       }
       // 添加最后一个 literal
       result += literals[literals.length - 1];
       return result;
   }
   let count = 10,
       price = 0.25,
       message = passthru`${count} items cost $ ${(count * price).toFixed(2)}.`;
   console.log(message); // "10 items cost $2.50."
   
   - 模板标签也可以访问字符串的原始信息，主要是它可以在转义字符生效前访问它，而最简单的方式是使用内置的 String.raw() 标签。如
   let message1 = `Multiline\nstring`,
   message2 = String.raw`Multiline\nstring`;
   console.log(message1); // "Multiline
   					// string"
   console.log(message2); // "Multiline\\nstring"
   
   function raw(literals, ...substitutions) {
       let result = "";
       // 只根据 substitution 的数目来运行循环
       for (let i = 0; i < substitutions.length; i++) {
           result += literals.raw[i]; // use raw values instead
           result += substitutions[i];
       }
       // 添加最后一个 literal
       result += literals.raw[literals.length - 1];
       return result;
   }
   let message = raw`Multiline\nstring`;
   console.log(message); // "Multiline\\nstring"
   console.log(message.length); // 17
   //这里并非使用 literals 而是 literals.raw 来输出结果字符串。这意味着包括 Unicode 代码点在内的任何转义字符都会以原始的形式返回。
   //当你想在输出的字符串中包含转义字符时原始字符串非常好用（例如，如果你想要生成包含代码的文档，那么你期待的是输出实际代码而不是产生的效果）
   ```

##### 数组扩展

1. 创建数组

   I. Array.of()方法

   ```javascript
   - 在 ES6 之前创建数组主要存在两种方式：  Array  构造器与数组字面量写法
   - Array.of()  方法并没有使用  Symbol.species  属性来决定返回值的类型，而是使用了当前的构造器（即  of()  方法内部的  this  ）来做决定
   //ES5
   let items = new Array(2);//当使用单个数值参数来调用  Array  构造器时，数组的长度属性会被设置为该参数；
   console.log(items.length); // 2
   console.log(items[0]); // undefined
   console.log(items[1]); // undefined
   
   items = new Array("2");//用单个的非数值型参数来调用，该参数就会成为目标数组的唯一项
   console.log(items.length); // 1
   console.log(items[0]); // "2"
   
   items = new Array(1, 2);
   console.log(items.length); // 2
   console.log(items[0]); // 1
   console.log(items[1]); // 2
   
   items = new Array(3, "2");
   console.log(items.length); // 2
   console.log(items[0]); // 3
   console.log(items[1]); // "2"
   //ES6
   let items = Array.of(1, 2);
   console.log(items.length); // 2
   console.log(items[0]); // 1
   console.log(items[1]); // 2
   
   items = Array.of(2);
   console.log(items.length); // 1
   console.log(items[0]); // 2
   
   items = Array.of("2");
   console.log(items.length); // 1
   console.log(items[0]); // "2"
   ```

   II. Array.from()方法

   ```javascript
   //ES5
   function makeArray(arrayLike) {
       var result = [];
       for (var i = 0, len = arrayLike.length; i < len; i++) {
       	result.push(arrayLike[i]);
       }
       return result;
   }
   function doSomething() {
       var args = makeArray(arguments);
       // 使用 args
   }
   
   function makeArray(arrayLike) {
       //语义化欠缺
   	return Array.prototype.slice.call(arrayLike);
   }
   function doSomething() {
       var args = makeArray(arguments);
       // 使用 args
   }
   
   //ES6
   function doSomething() {
       var args = Array.from(arguments);
       // 使用 args
   }
   
   - 映射转换
   	- 如果你想实行进一步的数组转换，可以向  Array.from()  方法传递一个映射用的函数作为第二个参数
       function translate() {
       	return Array.from(arguments, (value) => value + 1);
       }
       let numbers = translate(1, 2, 3);
       console.log(numbers); // 2,3,4	
   	- 如果映射函数需要在对象上工作，你可以手动传递第三个参数给Array.from()  方法，从而指定映射函数内部的  this  值
       let helper = {
       	diff: 1,
       	add(value) {
       		return value + this.diff;
       	}
       };
       function translate() {
       	return Array.from(arguments, helper.add, helper);
       }
       let numbers = translate(1, 2, 3);
       console.log(numbers); // 2,3,4
   
   - 在可迭代对象上使用
   	- 该方法可以将任意包含  Symbol.iterator  属性的对象转换为数组
       let numbers = {
           *[Symbol.iterator]() {
               yield 1;
               yield 2;
               yield 3;
           }
       };
       let numbers2 = Array.from(numbers, (value) => value + 1);
       console.log(numbers2); // 2,3,4
   
   - 如果一个对象既是类数组对象，又是可迭代对象，那么  Array.from()  方法就会使用迭代器来决定需要转换的值
   ```

2. 所有数组上的新方法

   I. find()与findIndex()方法

   ```javascript
   - find()  与  findIndex()  方法均接受两个参数：一个回调函数、一个可选值用于指定回调函数内部的  this  。该	- 回调函数可接收三个参数：数组的某个元素、该元素对应的索引位置、以及该数组自身
      -  find()  与  findIndex()  方法均会在回调函数第一次返回  true  时停止查找
      - 二者唯一的区别是：  find()  方法会返回匹配的值，而  findIndex()  方法则会返回匹配位置的索引。
      
   let numbers = [25, 30, 35, 40, 45];
   console.log(numbers.find(n => n > 33)); // 35
   console.log(numbers.findIndex(n => n > 33)); // 2
   ```

   II. fill()方法

   ```javascript
   - fill()  方法能使用特定值填充数组中的一个或多个元素。当只使用一个参数的时候，该方法会用该参数的值填充整个数组
   let numbers = [1, 2, 3, 4];
   numbers.fill(1);
   console.log(numbers.toString()); // 1,1,1,1
   
   //若不想改变数组中的所有元素，而只想改变其中一部分，那么可以使用可选的起始位置参数与结束位置参数（不包括结束位置的那个元素）
   let numbers = [1, 2, 3, 4];
   numbers.fill(1, 2);
   console.log(numbers.toString()); // 1,2,1,1
   numbers.fill(0, 1, 3);
   console.log(numbers.toString()); // 1,0,0,1
   ```

   III. copyWIthin()方法

   ```javascript
   - copyWithin()  方法允许你在数组内部复制自身元素。为此你需要传递两个参数给  copyWithin()  方法：从什么位置开始进行填充，以及被用来复制的数据的起始位置索引
   let numbers = [1, 2, 3, 4];
   // 从索引 2 的位置开始粘贴
   // 从数组索引 0 的位置开始复制数据
   numbers.copyWithin(2, 0);
   console.log(numbers.toString()); // 1,2,1,2
   
   let numbers = [1, 2, 3, 4];
   // 从索引 2 的位置开始粘贴
   // 从数组索引 0 的位置开始复制数据
   // 在遇到索引 1 时停止复制
   numbers.copyWithin(2, 0, 1);
   console.log(numbers.toString()); // 1,2,1,4
   ```

3. 类型化数组

   I. 数值数据类型

   ```javascript
   - JS 数值使用 IEEE 754 标准格式存储，使用 64 位来存储一个数值的浮点数表示形式，该格式在 JS 中被同时用来表示整数与浮点数；当值改变时，可能会频繁发生整数与浮点数之间的格式转换。
   - 而类型化数组则允许存储并操作八种不同的数值类型：
   	- 8 位有符号整数（int8）
   	- 8 位无符号整数（uint8）
   	- 16 位有符号整数（int16）
   	- 16 位无符号整数（uint16）
   	- 32 位有符号整数（int32）
   	- 32 位无符号整数（uint32）
   	- 32 位浮点数（float32）
   	- 64 位浮点数（float64）
   - 如果将一个 int8 范围内的数表示为常规的 JS 数值，就浪费了 56 个位，而这些位原本可用来存储额外的 int8 值、或任意需求小于 56 位的数值。更有效地利用“位”是类型化数组的处理用途之一。
   - 所有与类型化数组相关的操作和对象都围绕着这八种数据类型。为了使用它们，首先需要创建一个数组缓冲区用于存储数据
   ```

   II. 数组缓冲区

   ```javascript
   - 数组缓冲区（array buffer）是内存中包含一定数量字节的区域，而所有的类型化数组都基于数组缓冲区
   
   let buffer = new ArrayBuffer(10); // 分配了 10 个字节
   console.log(buffer.byteLength); // 10
   
   - 使用  slice()  方法来创建一个包含已有缓冲区部分内容的新数组缓冲区。
   	- 该slice()  方法类似于数组上的同名方法，可以使用起始位置与结束位置参数，返回由原缓冲区元素组成的一个新的  ArrayBuffer  实例
       let buffer = new ArrayBuffer(10); // 分配了 10 个字节
       let buffer2 = buffer.slice(4, 6);
       console.log(buffer2.byteLength); // 2
   
   - 仅仅创建一个存储区域而不能写入数据，没有什么意义。你需要创建一个视图（view）来进行写入：
   - 数组缓冲区总是保持创建时指定的字节数，你可以修改其内部的数据，但永远不能修改它的容量。
   ```

   III. 使用视图操作数组缓冲区

   ```javascript
   - 数组缓冲区代表了一块内存区域，而视图（views）则是你操作这块区域的接口。
   - 视图工作在数组缓冲区或其子集上，可以读写某种数值数据类型的数据。  
   - DataView  类型是数组缓冲区的通用视图，允许你对前述所有八种数值数据类型进行操作
   let buffer = new ArrayBuffer(10),
       view = new DataView(buffer);
   
   - 可以在缓冲区的一个部分上创建视图，只需要指定可选参数——字节偏移量、以及所要包含的字节数。
   - 当未提供最后一个参数时，该  DataView  视图会默认包含从偏移位置开始、到缓冲区末尾为止的元素
   let buffer = new ArrayBuffer(10),
       view = new DataView(buffer, 5, 2); // 包含位置 5 与位置 6 的字节
   
   let buffer = new ArrayBuffer(10),
       view1 = new DataView(buffer), // 包含所有字节
       view2 = new DataView(buffer, 5, 2); // 包含位置 5 与位置 6 的字节
   console.log(view1.buffer === buffer); // true
   console.log(view2.buffer === buffer); // true
   console.log(view1.byteOffset); // 0
   console.log(view2.byteOffset); // 5
   console.log(view1.byteLength); // 10
   console.log(view2.byteLength); // 2
   
   - 对应于 JS 所有八种数值数据类型，  DataView  视图的原型分别提供了在数组缓冲区上写入与读取数据的方法。所有方法名都以“set”或“get”开始，其后跟随着对应数据类型的缩写。
   - 下面列出了能够操作 int8 或 uint8 类型的读取/写入方法：
   	- getInt8(byteOffset, littleEndian)  ：从 byteOffset处开始读取一个 int8 值；
   	- setInt8(byteOffset, value, littleEndian) ：从 byteOffset 处开始写入一个 int8 值；
   	- getUint8(byteOffset, littleEndian)  ：从 byteOffset 处开始读取一个 uint8 值；
   	- setUint8(byteOffset, value, littleEndian)  ：从 byteOffset 处开始写入一个 uint8值。
   	- “get”方法接受两个参数：开始进行读取的字节偏移量、以及一个可选的布尔值，后者用于指定读取的值是否采用低字节优先方式（注：默认值为  false  ）。
       - “set”方法则接受三个参数：开始进行写入的字节偏移量、需要写入的数据值、以及一个可选的布尔值用于指定是否采用低字节优先方式存储数据。
   
   - 而除了这些整数类方法之外，  DataView  也提供了下列读写方法以便处理浮点数：
   	- getFloat32(byteOffset, littleEndian)  ：从  byteOffset  处开始读取一个 float32 值；
   	- setFloat32(byteOffset, value, littleEndian)  ：从  byteOffset  处开始写入一个 float32值；
   	- getFloat64(byteOffset, littleEndian)  ：从  byteOffset  处开始读取一个 float64 值；
   	- setFloat64(byteOffset, value, littleEndian)  ：从  byteOffset  处开始写入一个 float64值。
   
   let buffer = new ArrayBuffer(2),
       view = new DataView(buffer);
   view.setInt8(0, 5);
   view.setInt8(1, -1);
   console.log(view.getInt8(0)); // 5
   console.log(view.getInt8(1)); // -1
   
   - 视图允许你使用任意格式对任意位置进行读写，而无须考虑这些数据此前是使用什么格式存储的
   
   et buffer = new ArrayBuffer(2),
       view = new DataView(buffer);
   view.setInt8(0, 5);
   view.setInt8(1, -1);
   console.log(view.getInt16(0)); // 1535
   //getInt16()  就能将前面写入的 16 位数据以单个 16 位整数的方式读取出来，其十进制值就是 1535 
   console.log(view.getInt8(0)); // 5
   console.log(view.getInt8(1)); // -1
   
   new ArrayBuffer(2) 0000000000000000
   view.setInt8(0, 5); 0000010100000000
   view.setInt8(1, -1); 0000010111111111
   ```

   IV. 类型化数组即为视图

   ```javascript
   - ES6 的类型化数组实际上也是针对数组缓冲区的特定类型视图，你可以使用这些数组对象来处理特定的数据类型，而不必使用通用的  DataView  对象。一共存在八种特定类型视图，对应着八种数值数据类型，还为处理  uint8  值提供了额外的选择
   ```

   V. 创建特定类型视图

   ```javascript
   - 类型化数组的构造器可以接受多种类型的参数，因此存在几种创建类型化数组的方式。
   	- 第一种方式是使用与创建  DataView  时相同的参数，即：一个数组缓冲区、一个可选的字节偏移量、以及一个可选的字节数量
       let buffer = new ArrayBuffer(10),
           view1 = new Int8Array(buffer),
           view2 = new Int8Array(buffer, 5, 2);
   console.log(view1.buffer === buffer); // true
   console.log(view2.buffer === buffer); // true
   console.log(view1.byteOffset); // 0
   console.log(view2.byteOffset); // 5
   console.log(view1.byteLength); // 10
   console.log(view2.byteLength); // 2
   	- 第二种方式是传递单个数值给类型化数组的构造器，此数值表示该数组包含的元素数量（而不是分配的字节数）。构造器将会创建一个新的缓冲区，分配正确的字节数以便容纳指定数量的数组元素，而你也可以使用  length  属性来获取这个元素数量
       let ints = new Int16Array(2),
           floats = new Float32Array(5);
   console.log(ints.byteLength); // 4
   console.log(ints.length); // 2
   console.log(floats.byteLength); // 20
   console.log(floats.length); // 5
   
   	- 第三种方式是向构造器传递单个对象参数，可以是下列四种对象之一：
   		- 类型化数组：数组所有元素都会被复制到新的类型化数组中。例如，如果你传递一个 int8类型的数组给  Int16Array  构造器，这些 int8 的值会被复制到 int16 数组中。新的类型化数组与原先的类型化数组会使用不同的数组缓冲区。
   		-可迭代对象：该对象的迭代器会被调用以便将数据插入到类型化数组中。如果其中包含了不匹配视图类型的值，那么构造器就会抛出错误。
   		- 数组：该数组的元素会被插入到新的类型化数组中。如果其中包含了不匹配视图类型的值，那么构造器就会抛出错误。
   		- 类数组对象：与传入数组的表现一致。
   let ints1 = new Int16Array([25, 50]),
       ints2 = new Int32Array(ints1);
   console.log(ints1.buffer === ints2.buffer); // false
   console.log(ints1.byteLength); // 4
   console.log(ints1.length); // 2
   console.log(ints1[0]); // 25
   console.log(ints1[1]); // 50
   
   console.log(ints2.byteLength); // 8
   console.log(ints2.length); // 2
   console.log(ints2[0]); // 25
   console.log(ints2[1]); // 50
   ```

   VI. 类型化数组与常规数组的相似点

   ```javascript
   - 公共方法
   	- 虽然这些方法与数组原型上的对应方法表现相似，但它们并不完全相同。类型化数组的方法会进行额外的类型检查以确保安全，并且返回值会根据  Symbol.species  属性来确定，会是某种类型化数组而非常规数组
       
   - 相同的迭代器
   	- 与常规数组相同，类型化数组也拥有三个迭代器，它们是  entries()  方法、  keys()  方法与values()  方法。这就意味着可以对类型化数组使用扩展运算符，或者对其使用  for-of  循环，就像对待常规数组
       
   - of()与from()方法
       - 所有的类型化数组都包含静态的  of()  与  from()  方法，作用类似于  Array.of()  与Array.from()  方法。其中的区别是类型化数组的版本会返回类型化数组，而不返回常规数组
       
       let ints = Int16Array.of(25, 50),
           floats = Float32Array.from([1.5, 2.5]);
   console.log(ints instanceof Int16Array); // true
   console.log(floats instanceof Float32Array); // true
   console.log(ints.length); // 2
   console.log(ints[0]); // 25
   console.log(ints[1]); // 50
   console.log(floats.length); // 2
   console.log(floats[0]); // 1.5
   console.log(floats[1]); // 2.5
   ```

   VII. 类型化数组与常规数组的区别

   ```javascript
   - 二者最重要的区别就是类型化数组并不是常规数组，类型化数组并不是从Array对象派生的，使用 Array.isArray()  去检测会返回 false 
   
   - 行为差异
   	- 常规数组可以被伸展或是收缩，然而类型化数组却会始终保持自身大小不变。你可以对常规数组一个不存在的索引位置进行赋值，但在类型化数组上这么做则会被忽略
   	- 类型化数组也会对数据类型进行检查以保证只使用有效的值，当无效的值被传入时，将会被替换为 0 
       let ints = new Int16Array(["hi"]);
       console.log(ints.length); // 1
       console.log(ints[0]); // 0
   
   - 遗漏方法
   	- concat()
   	- pop()
   	- push()
   	- shift()
   	- splice()
   	- unshift()
   
   - 附加方法 ————  set()  方法与  subarray()  方法
   	-  set()  方法从其他数组中复制元素到当前的类型化数组
   	- subarray()  方法则是将当前类型化数组的一部分提取为新的类型化数组
   	- set()  方法接受一个数组参数（无论是类型化的还是常规的）、以及一个可选的偏移量参数，后者指示了从什么位置开始插入数据（默认值为 0 ）。数组参数中的数据会被复制到目标类型化数组中，并会确保数据值有效
           let ints = new Int16Array(4);
           ints.set([25, 50]);
           ints.set([75, 100], 2);
           console.log(ints.toString()); // 25,50,75,100
   	- subarray()  方法接受一个可选的开始位置索引参数、以及一个可选的结束位置索引参数（像slice()  方法一样，结束位置的元素不会被包含在结果中），并会返回一个新的类型化数组。你可以同时省略这两个参数，从而创建原类型化数组的一个复制品
           let ints = new Int16Array([25, 50, 75, 100]),
               subints1 = ints.subarray(),
               subints2 = ints.subarray(2),
               subints3 = ints.subarray(1, 3);
           console.log(subints1.toString()); // 25,50,75,100
           console.log(subints2.toString()); // 75,100
           console.log(subints3.toString()); // 50,75
   ```

##### 迭代器与生成器

1. 循环的问题

   ```javascript
   - for循环非常直观，然而若它被嵌套使用而要追踪多个变量时，复杂度就会提高，由此也更容易引发错误。相似的 
   - for循环代码会被写在多个地方，一不小心就会写错循环变量。迭代器正是用来解决此问题的
   ```

2. 迭代器

   ```javascript
   - 迭代器是被专用设计用于迭代的对象，带有特定接口。
   - 所有的迭代器对象都拥有  next()  方法，调用时会返回一个结果对象。
   	- 结果对象有两个属性：对应下一个值的  value  ，以及一个布尔类型的  done  ，其值为  true  时表示没有更多值可供使用
   - 迭代器持有一个指向集合位置的内部指针，每当调用了  next()  方法，迭代器就会返回相应的下一个值。
   
   function createIterator(items) {
       var i = 0;
       return {
           next: function() {
               var done = (i >= items.length);
               var value = !done ? items[i++] : undefined;
               return {
                   done: done,
                   value: value
               };
           }
       };
   }
   var iterator = createIterator([1, 2, 3]);
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: 2, done: false }"
   console.log(iterator.next()); // "{ value: 3, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   // 之后的所有调用
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   ```

3. 生成器

   ```javascript
   - 生成器（ generator ）是能返回一个迭代器的函数。
   - 生成器函数由放在function关键字之后的一个星号（  *  ）来表示，并能使用新的  yield  关键字。将星号紧跟在  function关键字之后，或是在中间留出空格
   - 生成器函数会在每个  yield  语句后停止执行。
   - 生成器函数是 ES6 的一个重要特性，它能被用于所有可使用函数的位置
   // 生成器
   function *createIterator() {
       yield 1;
       yield 2;
       yield 3;
   }
   // 生成器能像正规函数那样被调用，但会返回一个迭代器
   let iterator = createIterator();
   console.log(iterator.next().value); // 1
   console.log(iterator.next().value); // 2
   console.log(iterator.next().value); // 3
   
   //yield  关键字可用于值或表达式，因此你可以通过生成器给迭代器添加项目，而不是机械式地将项目一个个列出
   function *createIterator(items) {
       for (let i = 0; i < items.length; i++) {
       	yield items[i];
       }
   }
   let iterator = createIterator([1, 2, 3]);
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: 2, done: false }"
   console.log(iterator.next()); // "{ value: 3, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   // 之后的所有调用
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   
   - yield  关键字只能用在生成器内部，用于其他任意位置都是语法错误，即使在生成器内部嵌套的函数中也不行
   function *createIterator(items) {
       items.forEach(function(item) {
           // 语法错误
           yield item + 1;
       });
   }
   ```

   I. 生成函数表达式

   ```javascript
   - 你可以使用函数表达式来创建一个生成器，只要在function关键字与圆括号之间使用一个星号（  *  ）
   - 不能用箭头函数创建生成器
   let createIterator = function *(items) {
       for (let i = 0; i < items.length; i++) {
       	yield items[i];
       }
   };
   let iterator = createIterator([1, 2, 3]);
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: 2, done: false }"
   console.log(iterator.next()); // "{ value: 3, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   // 之后的所有调用
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   ```

   II. 生成器对象方法

   ```javascript
   - 由于生成器就是函数，因此也可以被添加到对象中
   //ES5
   var o = {
       createIterator: function *(items) {
           for (let i = 0; i < items.length; i++) {
           	yield items[i];
           }
       }
   };
   let iterator = o.createIterator([1, 2, 3]);
   //ES6
   var o = {
       *createIterator(items) {
           for (let i = 0; i < items.length; i++) {
           	yield items[i];
           }
       }
   };
   let iterator = o.createIterator([1, 2, 3]);
   ```

4. ke可迭代对象和for-of循环

   ```javascript
   - 可迭代对象（ iterable ）是包含  Symbol.iterator  属性的对象，与迭代器紧密相关。这个Symbol.iterator 知名符号定义了为指定对象返回迭代器的函数。
   - 在 ES6 中，所有的集合对象（数组、 Set 与 Map ）、arguments以及字符串都是可迭代对象，因此它们都有默认的迭代器。可迭代对象被设计用于与 ES 新增的  for-of  循环配合使用。
   - 生成器默认会为  Symbol.iterator  属性赋值，因此它创建的所有迭代器都是可迭代对象
   
   //for-of  循环在循环每次执行时会调用可迭代对象的  next()  方法，并将结果对象的  value值存储在一个变量上。循环过程会持续到结果对象的  done  属性变成  true  为止
   let values = [1, 2, 3];
   /for-of  循环首先调用了  values  数组的  Symbol.iterator  方法，获取了一个迭代器，这个调用由 JS 引擎在后台进行
   for (let num of values) {
   	console.log(num);
   }
   ```

   I. 访问默认迭代器

   ```javascript
   - 可以使用  Symbol.iterator  来访问对象上的默认迭代器
   
   let values = [1, 2, 3];
   let iterator = values[Symbol.iterator]();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: 2, done: false }"
   console.log(iterator.next()); // "{ value: 3, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   
   //for-of  循环在执行之前会做类似的检查
   function isIterable(object) {
   	return typeof object[Symbol.iterator] === "function";
   }
   console.log(isIterable([1, 2, 3])); // true
   console.log(isIterable("Hello")); // true
   console.log(isIterable(new Map())); // true
   console.log(isIterable(new Set())); // true
   console.log(isIterable(new WeakMap())); // false
   console.log(isIterable(new WeakSet())); // false
   ```

   II. 创建可迭代对象

   ```javascript
   - 自定义对象默认情况下不是可迭代对象，但可以创建一个包含生成器的Symbol.iterator  属性，将它们变成可迭代对象
   let collection = {
       items: [],
       *[Symbol.iterator]() {
           for (let item of this.items) {
           	yield item;
           }
       }
   };
   collection.items.push(1);
   collection.items.push(2);
   collection.items.push(3);
   for (let x of collection) {
   console.log(x);
   }
   ```

5. 内置迭代器

   I. 集合迭代器

   ```javascript
   - ES6 具有三种集合对象类型：数组、 Map 与 Set 。它们都拥有如下的迭代器，便于探索其内容：
   	- entries()  ：返回一个包含键值对的迭代器；
   	- values()  ：返回一个包含集合中的值的迭代器；
   	- keys()  ：返回一个包含集合中的键的迭代器。
   
   - entries迭代器
   	- ntries()  迭代器会在每次  next()  被调用时返回一个双项数组，表示集合中每个元素的键与值：对于数组来说，第一项是数值索引；而对于 Set ，第一项既是键又是值； Map 的第一项也是键
   	let colors = [ "red", "green", "blue" ];
       let tracking = new Set([1234, 5678, 9012]);
       let data = new Map();
       data.set("title", "Understanding ES6");
       data.set("format", "ebook");
       for (let entry of colors.entries()) {
       	console.log(entry);
       }
       for (let entry of tracking.entries()) {
       	console.log(entry);
       }
       for (let entry of data.entries()) {
       	console.log(entry);
       }
   
       // [0, "red"]
       // [1, "green"]
       // [2, "blue"]
       // [1234, 1234]
       // [5678, 5678]
       // [9012, 9012]
       // ["title", "Understanding ES6"]
       // ["format", "ebook"]
   
   - values迭代器
   	- values()  迭代器仅仅能返回存储在集合内的值
   	let colors = [ "red", "green", "blue" ];
       let tracking = new Set([1234, 5678, 9012]);
       let data = new Map();
       data.set("title", "Understanding ES6");
       data.set("format", "ebook");
       for (let value of colors.values()) {
       	console.log(value);
       }
       for (let value of tracking.values()) {
       	console.log(value);
       }
       for (let value of data.values()) {
       	console.log(value);
       }
   	// "red"
   	// "green"
   	// "blue"
   	// 1234
   	// 5678
   	// 9012
   	// "Understanding ES6"
   	// "ebook"
   
   - keys迭代器
   	- keys()  迭代器能返回集合中的每一个键。
   		- 对于数组来说，它只返回了数值类型的键，永不返回数组的其他自有属性； 
   		- Set 的键与值是相同的，因此它的  keys()  与  values()  会返回相同的迭代器；
            - 对于 Map ，keys()  迭代器返回了每个不重复的键
       let colors = [ "red", "green", "blue" ];
       let tracking = new Set([1234, 5678, 9012]);
       let data = new Map();
       data.set("title", "Understanding ES6");
       data.set("format", "ebook");
       for (let key of colors.keys()) {
       	console.log(key);
       }
       for (let key of tracking.keys()) {
       	console.log(key);
       }
       for (let key of data.keys()) {
       	console.log(key);
       }
   
   - 当  for-of  循环没有显式指定迭代器时，每种集合类型都有一个默认的迭代器供循环使用。
   	- values()  方法是数组与 Set 的默认迭代器
   	- entries()  方法则是 Map 的默认迭代器
   
   - Map 默认迭代器的行为有助于在  for-of  循环中使用解构
   let data = new Map();
   data.set("title", "Understanding ES6");
   data.set("format", "ebook");
   // 与使用 data.entries() 相同
   for (let [key, value] of data) {
   	console.log(key + "=" + value);
   }
   ```

   II. 字符串迭代器

   ```javascript
   - ES5 标准化了字符串的方括号表示法，用于访问其中的字符。不过方括号表示法工作在码元而非字符上，因此它不能被用于正确访问双码元的字符
   //字符串包含一个Unicode 字符
   var message = "A B" ;
   for (let i=0; i < message.length; i++) {
   	console.log(message[i]);
   }
   // A
   // (blank) //(blank)  代表空行
   // (blank)
   // (blank)
   // (blank)
   // B
   
   - 字符串的默认迭代器正是用于解决字符串迭代问题，借助它就能处理字符而不是码元
   var message = "A B" ;
   for (let c of message) {
   	console.log(c);
   }
   // A
   // (blank)
   // 
   // (blank)
   // B
   ```

   III. NodeList迭代器

   ```javascript
   - 文档对象模型（ DOM ）具有一种  NodeList  类型，用于表示页面文档中元素的集合
   - 随着默认迭代器被加入 ES6 ， DOM 关于  NodeList  的规定也包含了一个默认迭代器（此规定在 HTML 规范而非 ES6 规范中），其表现方式与数组的默认迭代器一致
   var divs = document.getElementsByTagName("div");
   for (let div of divs) {
   	console.log(div.id);
   }
   ```

   IV. 扩展运算符与非数组的可迭代对象

   ```javascript
   - 扩展运算符能作用于所有可迭代对象，并且会使用默认迭代器来判断需要使用哪些值。所有的值都从迭代器中被读取出来，并按返回值的顺序插入数组
   
   let set = new Set([1, 2, 3, 3, 3, 4, 5]),
       array = [...set];
   console.log(array); // [1,2,3,4,5]
   
   let map = new Map([ ["name", "Nicholas"], ["age", 25]]),
       array = [...map];
   console.log(array); // [ ["name", "Nicholas"], ["age", 25]]
   
   - 你能不限次数地在数组字面量中使用扩展运算符，而且可以在任意位置用扩展运算符将可迭代对象的多个项插入数组，按扩展运算符所在的位置插入新数组，
   
   let smallNumbers = [1, 2, 3],
       bigNumbers = [100, 101, 102],
       allNumbers = [0, ...smallNumbers, ...bigNumbers];
   console.log(allNumbers.length); // 7
   console.log(allNumbers); // [0, 1, 2, 3, 100, 101, 102]
   ```

6. 迭代器高级功能

   I. 传递参数给迭代器

   ```javascript
   - 能通过  next()  方法向迭代器内传递参数。当一个参数被传递给next()  方法时，该参数就会成为生成器内部  yield  语句的值
   
   function *createIterator() {
       let first = yield 1;
       let second = yield first + 2; // 4 + 2
       yield second + 3; // 5 + 3
   }
   let iterator = createIterator();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next(4)); // "{ value: 6, done: false }"
   console.log(iterator.next(5)); // "{ value: 8, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   - 对于  next()  的首次调用是一个特殊情况，传给它的任意参数都会被忽略。由于传递给next()  的参数会成为  yield  语句的值，则首次调用给  next()  提供的参数就只会替换生成器函数中的第一个  yield  语句；但若要在生成器内部使用该值，又要求它在此  yield  语句之前就必须能被访问到，而这是不可能的。因此在首次调用  next()  时传递参数是没有意义的
   ```

   > ![generator内部代码执行](/src/img/generator-param.jpg)
   >
   > - 黄色表示对于  next()  的第一次调用、以及在生成器内部执行的代码；
   > - 水蓝色表示了对
   >   next(4)  的调用以及随之执行的代码；
   > - 紫色则表示对  next(5)  的调用以及随之执行的代
   >   码。
   > - 其中难点在于：在左侧代码执行之前，右侧的各个表达式是如何执行与停止的。这使得
   >   调试错综复杂的生成器要比调试正规函数更麻烦一些

   II. 在迭代器中抛出错误

   ````javascript
   - 能传递给迭代器的不仅是数据，还可以是错误条件。
   - 迭代器可以使用一个  throw()  方法，让迭代器在恢复执行时抛出一个错误
   - 既能模仿返回一个值，又能模仿抛出错误（这也就是退出函数的两种方式）
   
   function *createIterator() {
       let first = yield 1;
       let second = yield first + 2; // yield 4 + 2 ，然后抛出错误
       yield second + 3; // 永不会被执行
   }
   let iterator = createIterator();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next(4)); // "{ value: 6, done: false }"
   console.log(iterator.throw(new Error("Boom"))); // 从生成器中抛出了错误
   ````

   > ![generator-error](/src/img/generator-error.jpg)
   >
   > 在此示意图中，红色表示当  throw()  被调用时所执行的代码，红星说明了错误在生成器内部
   > 大约何时被抛出。前两个  yield  语句被执行之后，当调用  throw()  时，在任何其他代码执
   > 行之前错误就被抛出了

   ```javascript
   function *createIterator() {
       let first = yield 1;
       let second;
       try {
       	second = yield first + 2; // yield 4 + 2 ，然后抛出错误
       } catch (ex) {
       	second = 6; // 当出错时，给变量另外赋值
       }
       yield second + 3;
   }
   let iterator = createIterator();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next(4)); // "{ value: 6, done: false }"
   console.log(iterator.throw(new Error("Boom"))); // "{ value: 9, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   ```

   III. 生成器的return语句

   ```javascript
   - 由于生成器是函数，你可以在它内部使用  return  语句，既可以让生成器早一点退出执行，也可以指定在  next()  方法最后一次调用时的返回值
   - 在生成器内，return表明所有的处理已完成，因此done属性会被设为true，而如果提供了返回值，就会被用于value字段
   function *createIterator() {
       yield 1;
       return;
       yield 2;
       yield 3;
   }
   let iterator = createIterator();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   
   function *createIterator() {
       yield 1;
       return 42;
   }
   let iterator = createIterator();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: 42, done: true }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   
   - 扩展运算符与for-of循环会忽略return语句所指定的任意值。一旦它们看到done的值为true，它们就会停止操作而不会读取对应的value值。不过，在生成器进行委托时，迭代器的返回值会非常有用
   ```

   IV. 生成器委托

   ```javascript
   - 在某些情况下，将两个迭代器的值合并在一起会更有用。生成器可以用星号（  *  ）配合yield这一特殊形式来委托其他的迭代器
   
   function *createNumberIterator() {
       yield 1;
       yield 2;
   }
   function *createColorIterator() {
       yield "red";
       yield "green";
   }
   function *createCombinedIterator() {
       yield *createNumberIterator();
       yield *createColorIterator();
       yield true;
   }
   var iterator = createCombinedIterator();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: 2, done: false }"
   console.log(iterator.next()); // "{ value: "red", done: false }"
   console.log(iterator.next()); // "{ value: "green", done: false }"
   console.log(iterator.next()); // "{ value: true, done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   
   //此处createCombinedIterator()生成器委托了  createNumberIterator()  并将它的返回值赋值给了result变量。由于createNumberIterator()包含return 3语句，该返回值就是3。result变量接下来会作为参数传递给  createRepeatingIterator()  生成器，指示同一个字符串需要被重复几次（
   function *createNumberIterator() {
       yield 1;
       yield 2;
       return 3;
   }
   function *createRepeatingIterator(count) {
       for (let i=0; i < count; i++) {
       	yield "repeat";
       }
   }
   function *createCombinedIterator() {
       let result = yield *createNumberIterator();
       yield *createRepeatingIterator(result);
   }
   var iterator = createCombinedIterator();
   console.log(iterator.next()); // "{ value: 1, done: false }"
   console.log(iterator.next()); // "{ value: 2, done: false }"
   console.log(iterator.next()); // "{ value: "repeat", done: false }"
   console.log(iterator.next()); // "{ value: "repeat", done: false }"
   console.log(iterator.next()); // "{ value: "repeat", done: false }"
   console.log(iterator.next()); // "{ value: undefined, done: true }"
   ```

7. 异步任务运行

   I. 一个简单的任务运行器

   ```javascript
   - 由于yield能停止运行，并在重新开始运行前等待next()方法被调用，你就可以在没有回调函数的情况下实现异步调用
   
   function run(taskDef) {
       // 创建迭代器，让它在别处可用
       let task = taskDef();
       // 启动任务
       let result = task.next();
       // 递归使用函数来保持对 next() 的调用
       function step() {
           // 如果还有更多要做的
           if (!result.done) {
               result = task.next();
               step();
           }
       }
       // 开始处理过程
       step();
   }
   
   run(function*() {
       console.log(1);
       yield;
       console.log(2);
       yield;
       console.log(3);
   });
   ```

   II. 带数据的任务运行

   ```javascript
   function run(taskDef) {
       // 创建迭代器，让它在别处可用
       let task = taskDef();
       // 启动任务
       let result = task.next();
       // 递归使用函数来保持对 next() 的调用
       function step() {
           // 如果还有更多要做的
           if (!result.done) {
               result = task.next(result.value);
               step();
           }}
       // 开始处理过程
       step();
   }
   
   run(function*() {
       let value = yield 1;
       console.log(value); // 1
       value = yield value + 3;
       console.log(value); // 4
   });
   ```

   III. 异步任务运行器

   ```javascript
   function run(taskDef) {
       // 创建迭代器，让它在别处可用
       let task = taskDef();
       // 启动任务
       let result = task.next();
       // 递归使用函数来保持对 next() 的调用
       function step() {
           // 如果还有更多要做的
           if (!result.done) {
               if (typeof result.value === "function") {
                   result.value(function(err, data) {
                       if (err) {
                           result = task.throw(err);
                           return;
                       }
                       result = task.next(data);
                       step();
               	});
               } else {
                   result = task.next(result.value);
                   step();
               }
           }
       }
       // 开始处理过程
       step();
   }
   
   let fs = require("fs");
   function readFile(filename) {
       return function(callback) {
       	fs.readFile(filename, callback);
       };
   }
   
   run(function*() {
       let contents = yield readFile("config.json");
       doSomethingWith(contents);
       console.log("Done");
   });
   
   //吃橘子过程的异步模拟
    	function washHand(){
           console.log('洗手中');
           setTimeout(function(){
             i.next('洗完手');
           },2000);
         }
         function pealOrange(data){
           console.log(data + ', 剥桔子中');
           setTimeout(function(){
             i.next('剥好的橘子');          
           },3000);
         }
         function eat(data){
           console.log(`拿着${data}吃起来`);
           setTimeout(function(){
             console.log('吃完了橘子，感叹好吃');       
           },2000);
         }
   
         function *eatOrange(){
           let result = yield washHand();
           result = yield pealOrange(result);
           yield eat(result);
         }
   
         var i = eatOrange();
         i.next();
   ```
