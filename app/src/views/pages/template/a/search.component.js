import React from 'react';
// ===================================================================== antd
import { Button, Form, Input } from 'antd';
const FormItem = Form.Item;
// ===================================================================== grid 设置
const leftCol = 'col-md-10';
const rightCol = 'col-md-23';
// ===================================================================== 表单组件
class SearchFormComponent extends React.Component{
	searchModel = {
		A: 'code',
		B: 'name'
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const { searchParam, loading } = this.props;
		const { searchModel } = this;
		return (
			<div>
				<Form onSubmit={ (e)=> { this.props.$fn.onSubmit(e,this) } }>
					<ul className="search-form custom-form res-md-form">
						<li>
							<h6 className={leftCol}>代码：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator(searchModel.A,{initialValue:searchParam[searchModel.A]})(<Input placeholder="公司性质代码"/>)}
								</FormItem>
							</aside>
							<h6 className={leftCol}>名称：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator(searchModel.B,{initialValue:searchParam[searchModel.B]})(<Input placeholder="公司性质名称"/>)}
								</FormItem>
							</aside>
							<div className="col-sm-10 h10"></div>
							<div className="col-md-6"><Button type="primary" icon="reload" ghost  disabled={loading} onClick={()=>{this.props.$fn.reset(this,searchModel)}}>重置</Button></div>
							<div className="col-sm-3 h10"></div>
							<div className="col-md-6"><Button type="primary" icon="search" htmlType="submit" loading={loading}>查询</Button></div>
						</li>
					</ul>
				</Form>
			</div>
		)
	}
}

export default Form.create()(SearchFormComponent)