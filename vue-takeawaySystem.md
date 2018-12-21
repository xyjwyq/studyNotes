### Vue外卖系统笔记

---

I. 目标

1. 掌握Vue.js项目在实战中的应用
2. 学会使用Vue.js
3. 组件化，模块化的开发方式

II. 内容

1. vue-cli
2. axios（ajax通信）
3. webpack构建工具
4. mock,js（模拟数据）
5. ES6、eslint代码风格检查工具

III. 需掌握

1. 标准开发流程，做事的方式
2. 工程化、标准化、模块化思想
3. 移动端开发常用小技巧
4. flex弹性布局
5. 交互设计

IV. 如何做技术选型

1. 技术方面
   - 社区 
   - 开源框架的其他方面（文档、轻重级）
2. 人才方面
   - 学习成本
   - 团队技术积累

V. Vue的核心思想

1. 数据驱动
2. 组件

VI. 如何在公司中开发一个项目

- 产品产出需求文档，产品原型

- 读文档，梳理需求
- 评审需求（提出需求文档中问题） ==》 PM修改需求文档
- 拿到UI图，交互设计稿
- 详细设计（拆分需求模块，技术选型，调研技术）（最重要，一定要做好详细设计）
- 详细设计评审
- 项目排期
- 进入开发
- 搭建项目框架
- 模拟Mock数据
- 实现页面
- 自测
- 联调
- 过冒烟case（测试先给你写了测试用例，测试这些点能不能逻辑，流程能不能走通，能不能走完整）
- 提交测试代码，部署测试环境，测试人员介入测试
- 改bug
- 部署上线
- 验证

---

`脚手架(cli)`：帮你减少 为了减少重复性工作而做的重复性工作的工具

---

I. 搭建项目框架

1. 安装脚手架

   ```
   npm install vue-cli -g
   ```

2. 生成webpack的Vue模板

   ```javascript
   vue init webpack 项目名
   npm install/cnpm install
   // npm run init/cnpm run init
   npm run dev/ cnpm run dev
   ```

3. 项目目录中各个文件的作用

   - `build 目录`：项目构建的相关代码
     - `build.js`：生产环境的构建代码
     - `check-version.js`：检查node，npm等一些工具的额版本问题
     - `utils.js`：一些通用的方法
     - `vue-loader.conf.js`：vue加载器
     - `webpack.base.conf.js`：webpavk基本环境配置
     - `webpack.dev.conf.js`：webpack开发环境配置
     - `webpack.prod.conf.js`：webpack产品环境配置，只要是一个静态的配置文件
   - `config 目录`：项目开发环境配置相关的代码
     - `dev.env.js`：开发环境变量
     - `index.js`：项目的一些配置变量
     - `prod.env.js`：生产环境变量
     - `test.env.js`：测试环境变量
   - `src 目录`：编码是在该文件完成的
     - `assets`：放置图片等静态资源
     - `components`：组件文件夹
     - `router`：路由文件夹
     - `App.vue`：html模板
     - `main.js`：程序主入口
   - `static 目录`：放置静态资源，主要放置相对较大，不能压缩的静态文件
   - `.babelrc`：ES6/ES7转为ES5的转换配置
   - `.eslintignore`：定义不去做语法校验的目录
   - `.eslintrc`：eslint的相关配置
   - `.gitignore`：定义不被提交到git上的文件夹
   - `postcsssrc.js`：css-loader相关配置
   - `index.heml`：入口页面
   - `package-lock.json`：项目必须含有的包信息
   - `package.json`：记载项目所使用模块信息以及基本信息

4. mock数据

   - 安装mock

     ```javascript
     npm install mock.js --save-dev
     npm install axios --save
     
     npm install css-loader
     npm install style-loader
     npm install stylus --save-dev
     npm install stylus-loader
     npm install postcss-loader
     ```


---



