###  技巧与归纳

---

### 目录

- [HTML](#html)
- [CSs](#css)
  - [居中问题](#居中问题)
- [JS](#js)

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



---

### JS

---



---









