###  技巧与归纳

---

### 目录

- [HTML](#html)
- [CSs](#css)
  - [居中问题](#居中问题)
  - [animation与transition的区别](#animation与transition的区别)
- [JS](#js)
  - [ES6中Map结构实现](#es6中map结构实现)

---

### HTML

---



---

### CSS

---

##### 居中问题

```css
/*自身居中*/

    /*限制宽高*/
    div{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100px;
        height: 100px;
        margin-left: -50px;
        margin-top: -50px;
        background-color: #000;
    }

	/*不限制宽高*/
    div{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 20%;
        height: 30%;
        transform: translate(-50%, -50%);
        background-color: #000;
    }

	/*不限制宽高*/
    div{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto auto;
        width: 100px;
        height: 100px;
        background-color: #000;
    }

/*子元素居中*/
    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }

/*块级元素水平居中*/
    div{
        width: 100px;
        height: 100px;
        margin: 0 auto;/*一定要有宽度*/
    }
```

#####  animation与transition的区别

```css

transition 
	- 强调过度
	- 需要事件触发，所以没办法在网页加载时自动发生，即需要属性发生变化时才能执行动画
	- 一次性，不能重发发生，除非再一次触发
	- 只能定义初始状态与结束状态，不能定义中间状态，即只有两个状态
	- 一条transition规则，只能定义一个属性的变化，不能涉及多个属性

animation
	- 强调流程与控制
	- 无需事件触发，可在网页加载时执行，即该属性作用在元素上即可执行
	- 可重复触发，可设置触发次数以及无限触发
	- 可通过keyframes定义起始，结束以及多个中间状态
	- 可以同时定义多个属性的变化
```





---

### JS

---

##### ES6中Map结构实现

```javascript
     function MyMap(arr = []) {
        this.init();
        for (let i = 0; i < arr.length; i++) {
            this.set(...arr[i]); 
        }
      }

      MyMap.fn = MyMap.prototype;
      MyMap.fn.len = 8;
      MyMap.fn.bucket = [];

      MyMap.fn.init = function() {
        this.size = 0;
        for (let i = 0; i < this.len; i++) {
          this.bucket[i] = { next: null };
        }
      };

      MyMap.fn.makeHash = function(key) {
        let hash = 0;
        if (typeof key === "string") {
          let len = key.length < 3 ? 3 : key.length;
          for (let i = len - 3; i < len; i++) {
            hash += key[i] ? key[i].charCodeAt() : 0;
          }
        } else {
          hash = +key;
        }
        return hash;
      };

      MyMap.fn.set = function(key, value) {
        let hash = this.makeHash(key);
        let list = this.bucket[hash % this.len];
        let node = list;
        while (node.next) {
          if (node.next.key === key) {
            node.next.value = value;
            return;
          } else {
            node = node.next;
          }
        }
        node.next = { key, value, next: null };
        this.size++;
      };

      MyMap.fn.get = function(key) {
        let hash = this.makeHash(key),
          list = this.bucket[hash % this.len],
          node = list;
        while (node.next) {
          if (node.next.key === key) {
            return node.next.value;
          } else {
            node = node.next;
          }
        }
      };

      MyMap.fn.has = function(key) {
        let hash = this.makeHash(key),
          list = this.bucket[hash % this.len],
          node = list;
        while (node.next) {
          if (node.next.key === key) {
            return true;
          } else {
            node = node.next;
          }
        }
        return false;
      };

      MyMap.fn.delete = function(key) {
        let hash = this.makeHash(key),
          list = this.bucket[hash % this.len],
          node = list;
        while (node.next) {
          if (node.next.key === key) {
            node.next = node.next.next;
            this.size--;
            return true;
          } else {
            node = node.next;
          }
        }
        return false;
      };

      MyMap.fn.clear = function() {
        this.init();
      };

      MyMap.fn.forEach = function(func, thisArg = window) {
        let _self = this;
        for (let i = 0; i < _self.size; i++) {
          func.apply(thisArg, [_self.key, _self.value, _self]);
        }
      };
```



---









