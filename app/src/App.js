/* ====================================== App 入口文件  ====================================== */
import React from 'react';
import connect from '@redux/connect';
import { HashRouter } from 'react-router-dom'; // BrowserRouter
// import './App.css';
// ===================================================================== router
import AppRouter from './router';
// ===================================================================== 二级路由
class App extends React.Component{
	render(){
		return <HashRouter key="HashRouter"><AppRouter { ...this.props } /></HashRouter>
	}
}
export default connect(App)