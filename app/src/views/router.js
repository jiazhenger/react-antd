/* ====================================== 模块子路由配置  ====================================== */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
// ===================================================================== 异步加载
import { Bundle } from '@common/async/bundle';
// ===================================================================== 同步路由
import Index from './index';
import NotFoundPage from './404';
// ===================================================================== 异步路由
const A = Bundle(() => import('./pages/template/a/index'));
const B = Bundle(() => import('./pages/template/b/index'));
// ===================================================================== 二级路由
export default ({ match }) => {
	return (
		<Switch>
				<Route path={match.url} component={ Index } exact />
				
				{/* 模板 */}
				<Route path="/template" render={({ match })=>(
					<Switch>
						<Route path={`${match.url}/a`} component={ A } exact />
						<Route path={`${match.url}/b`} component={ B } exact />
					</Switch>
				)} />
				
				<Route component={NotFoundPage} />
		</Switch>
	)
}
