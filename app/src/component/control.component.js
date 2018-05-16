/* ======================================  state 状态  ====================================== */
import React from 'react';
// ===================================================================== antd
import {  Affix, Button } from 'antd';
// =====================================================================
class ControlComponent extends React.Component{
	render(){
		return (
			<Affix>
				<nav className="control-btn-group">
					<Button ghost type="primary" size={this.props.$config.navSize} disabled={this.props.loading} icon="plus-circle-o" onClick={()=>{ this.props.handleAddEditor(true) }}>新增</Button>
					<Button ghost type="primary" size={this.props.$config.navSize} icon="edit"
						disabled={this.props.selectedRowKeys.length === 0}
						onClick={()=>{ this.props.handleAddEditor(false) }}
					>编辑</Button>
					<Button ghost type="primary" size={this.props.$config.navSize} icon="export">导出</Button>
				</nav>
			</Affix>
		)
	}
}
export default ControlComponent