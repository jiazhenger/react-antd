import React from 'react';
import connect from '@redux/connect';
// =====================================================================
class Index extends React.Component {
	componentDidMount(){
		this.props.$action.doType('Do_Home',{menu:[]})
	}
	render(){
		return (
			<div className="p10">
				<h2>欢迎登录能力平台项目管理系统</h2>
			</div>
		)
	}
}

export default connect(Index)
