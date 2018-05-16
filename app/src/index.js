import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// ======================================================== 注册服务器
import registerServiceWorker from './registerServiceWorker';
// ======================================================== 全局 css 样式
// ======================================================== 设置日历语言为中文
import 'moment/locale/zh-cn';
// ======================================================== redux
import { Provider } from 'react-redux';
import Store from '@redux/store';
// ======================================================== 入口文件
import App from './App';
// ======================================================== 启动 react
ReactDOM.render((<Provider store={Store}><App/></Provider>),document.getElementById('root'));	// redux 启动
// ======================================================== 注册服务
registerServiceWorker();
