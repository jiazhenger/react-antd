import React from 'react';
// ===================================================================== antd
import { Button, Form, Input, DatePicker, Select, Icon } from 'antd';
const FormItem = Form.Item;
// ===================================================================== grid 设置
const leftCol = 'col-md-10';
const rightCol = 'col-md-23';
// ===================================================================== 表单组件
class SearchFormComponent extends React.Component{
	state={}
	searchModel = {
		A: 'code',
		B: 'startTime',
		C: 'endTime',
		D: 'RangePicker',
		E: 'time',
		F: 'select',
		G: 'g',
		H: 'h'
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
							<h6 className={leftCol}>开始日期：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator(searchModel.B,{initialValue:searchParam[searchModel.B]})(
										<DatePicker style={{width:'100%'}}
											placeholder="开始日期"
											format="YYYY-MM-DD"
											disabledDate={(startValue)=>{
								          		const endValue = this.state.endValue;
	    										if (!startValue || !endValue) { return false; }
	    										return startValue.valueOf() > endValue.valueOf();
								          	}}
											onChange={(value) => {this.setState({startValue:value})}}
								        />
									)}
								</FormItem>
							</aside>
							<h6 className={leftCol}>结束日期：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator(searchModel.C,{initialValue:searchParam[searchModel.C]})(
										  <DatePicker style={{width:'100%'}}
								        	placeholder="结束日期"
								        	format="YYYY-MM-DD"
											disabledDate={(endValue) => {
												const startValue = this.state.startValue;
												if (!endValue || !startValue) { return false; }
												return endValue.valueOf() <= startValue.valueOf();
											}}
											onChange={(value) => { this.setState({endValue:value}) }}
								        />
									)}
								</FormItem>
							</aside>
						</li>
						<li>
							<h6 className={leftCol}>有效日期：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator(searchModel.D,{initialValue:searchParam[searchModel.D]})(<DatePicker.RangePicker format="YYYY-MM-DD" style={{width:'100%'}} />)}
								</FormItem>
							</aside>
							<h6 className={leftCol}>日期：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator(searchModel.E,{initialValue:searchParam[searchModel.E]})(<DatePicker style={{width:'100%'}} placeholder="到期日" format="YYYY-MM-DD" />)}
								</FormItem>
							</aside>
							<h6 className={leftCol}>下拉框：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator(searchModel.F,{initialValue:searchParam[searchModel.F]})(
										<Select placeholder="选择出库类别">
											<Select.Option value="">全部</Select.Option>
											<Select.Option value={0}>销售出库</Select.Option>
											<Select.Option value={1}>仓店调拨</Select.Option>
											<Select.Option value={2}>预售出库</Select.Option>
											<Select.Option value={3}>仓间调拨</Select.Option>
											<Select.Option value={4}>退货出库</Select.Option>
										</Select>
									)}
								</FormItem>
							</aside>
						</li>
						<li>
							<h6 className={leftCol}>带文本：</h6>
							<aside className={`${rightCol} fx`}>
								<FormItem className="flex">
									{getFieldDecorator(searchModel.G,{initialValue:searchParam[searchModel.G]})(<Input placeholder="带文本"/>)}
								</FormItem>
								<p className="pl5">CNY</p>
							</aside>
							<h6 className={leftCol}>带图标：</h6>
							<aside className={`${rightCol} fx`}>
								<FormItem className="flex">
									{getFieldDecorator(searchModel.H,{initialValue:searchParam[searchModel.H]})(<Input placeholder="带图标"/>)}
								</FormItem>
								<p className="pl5"><Icon type="search" className="icon-search"/></p>
							</aside>
						</li>
						<li>
							<div className="col-sm-75 h10"></div>
							<div className="col-md-6"><Button type="primary" icon="reload" ghost  disabled={loading} onClick={()=>{this.props.$fn.reset(this,searchModel)}}>重置</Button></div>
							<div className="col-sm-3 h10"></div>
							<div className="col-md-6"><Button type="primary" icon="search" htmlType="submit" loading={loading}>查询</Button></div>
							<div className="col-sm-3 h10"></div>
							<div className="col-md-6"><Button type="primary" icon="export">导出</Button></div>
						</li>
					</ul>
				</Form>
			</div>
		)
	}
}

export default Form.create()(SearchFormComponent)