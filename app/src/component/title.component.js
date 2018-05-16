/* ======================================  state 状态  ====================================== */
import React from 'react';
// ===================================================================== antd
import { Icon, Button } from 'antd';
// =====================================================================
class TitleComponent extends React.Component{
	render(){
		return (
			<div className="my-bar">
				<h3>{this.props.title}
					{
						this.props.showButton ? (
							<Button ghost  size="small" className="ml10" icon="bars" onClick={()=>{ this.props.onShow() }}>{!this.props.isDetail ? '详情' : '返回'}</Button>
						) : null
					}
				</h3>
				<Icon type={this.props.fold ? 'down-circle-o': 'up-circle-o'} onClick={()=>{ this.props.onChange() }} style={{
					color:'#fff',
					fontSize:'20px',
					cursor:'pointer',
					lineHeight:'inherit'
				}} />
			</div>
		)
	}
}
export default TitleComponent