/* ======================================  state 状态  ====================================== */
import React from 'react';
// ===================================================================== antd
import { Icon, BackTop } from 'antd';
// =====================================================================
class BackupComponent extends React.Component{
	render(){
		return (
			<BackTop visibilityHeight={50}><Icon type="to-top" style={{fontSize:30,color:'#1890ff' }} /></BackTop>
		)
	}
}
export default BackupComponent