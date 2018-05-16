/* ====================================== 模块子路由配置  ====================================== */
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
// ===================================================================== 同步路由
import Main from './views/main';
import Login from './views/login';
import NotFoundPage from './views/404';
// ===================================================================== 二级路由
class AppRouter extends React.Component{
	componentWillMount(){
		// 路由监听
		this.props.history.listen((location,action)=>{ 
			//console.log(location)
			if(action !== 'POP'){
				const main = document.getElementById('main');
				if(main !== undefined && main !== null && main.scrollTop !== 0){ main.scrollTop = 0 }
			}
		})
	}
	//componentDidUpdate(nextProps, nextState){}
	render(){
		return (
			<Switch>
				<Route path='/login' component={ Login } exact />
				<Route path='/' component={ Main }/>
				<Redirect from="/index" to="/" />
				<Route component={NotFoundPage} />
			</Switch>
		)
	}
}
export default withRouter(AppRouter)