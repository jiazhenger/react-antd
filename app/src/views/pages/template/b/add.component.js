import React from 'react';
// ===================================================================== antd
import { Form, Input, Select, Radio, DatePicker, Modal, Icon, message } from 'antd';
const FormItem = Form.Item;
// ===================================================================== grid 设置
const leftCol = 'col-md-22';
const rightCol = 'col-md-78';
// ===================================================================== 新增弹窗
class ModalComponent extends React.Component {
	state = {}
	// 提交数据
  	handleOk = () => {
  		this.props.form.validateFields((err, values) => {
  			// 验证通过
			if (!err) {
				this.setState({ modalLoading : true })
				// 添加
				if(this.props.isAdd){
					this.props.$http.post('companyNature/addOrUpdate',{...values}).then(data=>{
						this.setState({ modalLoading : false })
						this.props.showModal(false);
						message.success('添加数据成功!', 1, ()=>{
							this.props.refreshFetch(true);
							this.props.form.resetFields();
						});
					},data=>{
						this.setState({ modalLoading : false })
						message.error(data.msg, 1);
					})
				}else{ // 修改
					this.props.$http.post('companyNature/addOrUpdate',{id:this.props.selectedRows[0].id,...values}).then(data=>{
						this.setState({ modalLoading : false })
						this.props.showModal(false);
						message.success('修改数据成功!', 1, ()=>{
							this.props.refreshFetch();
							this.props.form.resetFields();
						});
					},data=>{
						this.setState({ modalLoading : false })
						message.error(data.msg, 1);
					})
				}
			}
		})
  	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return (
			<Modal
				title={this.props.isAdd ? '新增' : '编辑'}
	     		visible={this.props.visible}
	      		onOk={this.handleOk}
	      		onCancel={()=>{
	      			this.props.showModal(false);
			  		this.setState({ modalLoading : false })
			  		this.props.form.resetFields();
	      		}}
	      		wrapClassName="vertical-center-modal"
	      		cancelText="取消"
	      		okText='保存'
			>
				<Form>
					<ul className="custom-form sub-form res-md-form">
						<li>
							<h6 className={leftCol}>组织编码：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator('aa',{initialValue:5100})(
										<Input disabled={true} />
									)}
								</FormItem>
							</aside>
						</li>
						<li>
							<h6 className={leftCol}>组织名称<i>*</i>：</h6>
							<aside className={rightCol}>
								<FormItem hasFeedback>
									{getFieldDecorator('a',{ initialValue:this.props.model.a, rules: [{ required: true, message: '组织名称不能为空' }]})(
										<Input placeholder="输入组织名称" />
									)}
								</FormItem>
							</aside>
						</li>
						<li>
							<h6 className={leftCol}>上级组织<i>*</i>：</h6>
							<aside className={rightCol}>
								<FormItem hasFeedback>
									{getFieldDecorator('b',{ initialValue:this.props.model.b, rules: [{ required: true, message: '上级组织不能为空' }]})(
										<Input placeholder="输入上级组织" />
									)}
								</FormItem>
							</aside>
						</li>
						<li>
							<h6 className={leftCol}>公司类别<i>*</i>：</h6>
							<aside className={rightCol}>
								<FormItem hasFeedback>
									{getFieldDecorator('dddd',{ initialValue:null, rules: [{ required: true, message: '上级组织不能为空' }]})(
										<Select placeholder="选择公司类别">
											<Select.Option key="a">a</Select.Option>
										</Select>
									)}
								</FormItem>
							</aside>
						</li>
						<li className="radio-feedback">
							<h6 className={leftCol}>是否关联公司<i>*</i>：</h6>
							<aside className={rightCol}>
								<FormItem hasFeedback>
									{getFieldDecorator('radioGroup',{initialValue: null,rules: [{ required: true, message: '关联公司不能为空' }]})(
							            <Radio.Group>
							           		<Radio value={1}>是</Radio>
							           		<Radio value={0}>否</Radio>
							            </Radio.Group>
							        )}
								</FormItem>
							</aside>
						</li>
						<li>
							<h6 className={leftCol}>公司：</h6>
							<aside className={rightCol}>
								<FormItem>
									{getFieldDecorator('c',{ initialValue:this.props.model.c, rules: [{ required: true, message: '公司不能为空' }]})(
										<Input placeholder="输入公司" />
									)}
								</FormItem>
							</aside>
						</li>
						<li>
							<h6 className={leftCol}>组织层级<i>*</i>：</h6>
							<aside className={rightCol}>
								<FormItem hasFeedback>
									{getFieldDecorator('dss',{ initialValue:null, rules: [{ required: true, message: '组织层级不能为空' }]})(
										<Select placeholder="选择组织层级">
											<Select.Option key="a">a</Select.Option>
										</Select>
									)}
								</FormItem>
							</aside>
						</li>
						<li className="ie-calendar-picker">
							<h6 className={leftCol}>有效开始日期<i>*</i>：</h6>
							<aside className={rightCol}>
								<FormItem hasFeedback>
									{getFieldDecorator('dssa',{ rules: [{ required: true, message: '有效开始日期不能为空' }]})(
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
						</li>
						<li className="ie-calendar-picker">
							<h6 className={leftCol}>有效结束日期<i>*</i>：</h6>
							<aside className={rightCol}>
								<FormItem hasFeedback>
									{getFieldDecorator('sss',{ rules: [{ required: true, message: '有效结束日期不能为空' }]})(
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
					</ul>
				</Form>
				{
					this.state.modalLoading || this.props.modalLoading ? <div className="pop"><Icon type="loading" style={{ fontSize: 24 }} spin /></div> : ''
				}
			</Modal>
		)
	}
}
export default Form.create()(ModalComponent);