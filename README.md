# react-redux-fundamentals-beginner(axios+middleware+thunk)

## File Structures

```sh
src/
├── reducers.js
├── createStore.js
├── getJSONData.js
├── index.js (入口文件，用于客户端/浏览器)
└── App.js (React组件，需要自己放到路由配置中)
```

SSR参考：
```sh
src/server/ 
└── server.js (用于Express服务端渲染)
```

## Installation And Test


**Step 1.** First, using an absolute path into your app folder directory.

```sh
$ cd /{your_directory}/react-redux-fundamentals-beginner\(axios+middleware+thunk\)
```


**Step 2.** Before doing all dev stuff make sure you have `Node 14+` installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ sudo npm install
```

**Step 3.** Run this project with `create-react-app`

```sh
$ npm run start
```

**Step 4.** When you done, this will spin up a server that can be accessed at

```sh
http://localhost:3000
```

