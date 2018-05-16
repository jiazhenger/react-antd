import React from 'react';
import connect from '@redux/connect';
import moment from 'moment';
// ===================================================================== 公共组件
import ControlComponent from '@cpt/control.component';
import BackupComponent from '@cpt/backup.component';
// ===================================================================== 私有组件
import SearchComponent from './search.component';
import ModalAddComponent from './add.component';
// ===================================================================== antd
import { Table } from 'antd';
// ===================================================================== 主页面
class B extends React.Component {
	state = {
		model:{ },
		pagination:{},
		data:[{
			'row-key':1,
			code:1845578854456,
			name:'测试数据',
			createBy:'柘城柘城撒旦是柘城柘城撒旦是',
			createTimestamp:1548944564646,
			editBy:'大幅度反弹在礵礵礵夺大幅度反弹在礵礵礵夺大幅度反弹在礵礵礵夺大幅度反弹在礵礵礵夺',
			updateTimestamp:45646481132131
		}],
		selectedRowKeys:[],
		selectedRows:[]
	}
	
	searchParam = {}
	selectList=[]
	
	componentDidMount(){
		this.props.$action.doType('Do_Home',{menu:['主数据管理','公司性质']});
		this.fetch()
	}
	
	fetch = (pageNum,param,opt={}) => {
		//this.props.$fn.paginationFetch({ api:'companyNature/search', param:param, pageNum:pageNum, isPagination:opt.isPagination }, this)
	}
	
	columns = [
		{ dataIndex:'row-key', 			title: '序号', 		className:'col-key' },
		{ dataIndex:'code', 			title: '公司性质代码' },
		{ dataIndex:'name', 			title: '公司性质描述' },
		{ dataIndex:'createBy', 		title: '创建人' },
		{ dataIndex:'createTimestamp', 	title: '创建时间', 	className:'res-col', render: text => text && moment(text).format('YYYY-MM-DD hh:mm:ss') },
		{ dataIndex:'editBy', 			title: '修改人',		className:'res-col', render: text => text || '---' },
		{ dataIndex:'updateTimestamp', 	title: '修改时间',	className:'res-col', render: text => text && moment(text).format('YYYY-MM-DD hh:mm:ss') }
	]
	// 新增及添加
	
	render(){
		const { selectedRowKeys }  = this.state;
		const rowSelection = {
	  		fixed:'left',
	  		selectedRowKeys,
	  		type:'radio',
			onChange : (selectedRowKeys, selectedRows) => {
				this.setState({selectedRowKeys : selectedRowKeys, selectedRows:selectedRows })
			}
		}
		return [
			<ControlComponent key="control" { ...this.props }
				handleAddEditor={ (flag) =>{ this.setState({ visible:true, isAdd: flag }); }}
				selectedRowKeys={ this.state.selectedRowKeys }
				loading = { this.state.loading }
			/>,
			<div key="main">
				<div className="search-wraper">
					<SearchComponent
	  					{...this.props}
	  					loading={ this.state.loading }
	  					onSubmit={ (value)=>{
	  						this.props.$fn.handleSubmit(this,value);
	  					} }
	  					searchParam={ this.searchParam }
	  				/>
  				</div>
  				
  				<div className="table-wraper">
  					<Table className={ this.state.isDetail ? 'tab-col' : ''}
	  					columns={this.columns}
	  					dataSource={this.state.data}
	  					rowKey={record => record['row-key']}
	  					rowSelection={rowSelection}
	  					loading={this.state.loading}
	  					pagination={this.state.pagination}
	  					bordered={this.props.$config.tableBorder}
	  					scroll={this.props.$config.tableScroll}
	  					size={this.props.$config.tableSize}
	  					onChange={(pagination, filters, sorter)=> { this.props.$fn.handlePagination(pagination, filters, sorter, this) } }
	  				/>
  				</div>
  				<div style={{height:1000}}></div>
			</div>,
			<ModalAddComponent key="ModalAddComponent" { ...this.props }
			   	visible={ this.state.visible }
			   	isAdd={ this.state.isAdd }
				showModal={ (bool=true)=>{ this.setState({ visible:bool }) } }
				model={ this.state.model }
				refreshFetch={ (flag)=>{ this.props.$fn.refreshFetch(this,flag) } }
				selectedRows = { this.state.selectedRows }
			/>,
			<BackupComponent key="BackupComponent"/>
		]
	}
}

export default connect(B)
