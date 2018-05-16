import React from 'react';
import connect from '@redux/connect';
// ===================================================================== antd
import { Form, Icon, Input, Button, message } from 'antd';
const FormItem = Form.Item
// =====================================================================
class Login extends React.Component {
	state={}
	handleSubmit = (e) => {
	    e.preventDefault();
	    this.props.$ls.remove('storecode');	// 清除本地 storecode
	    this.props.form.validateFields((err, values) => {
			if (!err) {
				this.setState({ submitLoading:true })
	       		this.props.$http.post(`user/wms/login/`,values).then(data=>{
					this.props.$ss.set('init',data);						// 保存初始化数据
				},data=>{
					message.error(data.message,2);
					this.setState({ submitLoading:false })
				})
			}
	    });
	}
	
	componentDidMount(){
		// 注销登录
		let init = this.props.$ss.get('init');
		if(this.props.$fn.hasObject(init)){	// 如果 init 存在, 表示已登录
			this.props.history.replace('/');
		}
	}
	render() {
	    const { getFieldDecorator, getFieldsError } = this.props.form;
	    return (
			<div className="login-form wh fxmc">
				<div className="login-box">
					<h2>能力平台后台管理系统</h2>
					<Form onSubmit={this.handleSubmit} className="custom-form sub-form">
						<div className="input">
							<FormItem hasFeedback>
								{getFieldDecorator('username', {
									rules: [{ required: true, message: '请输入用户名' }],})(
									<Input prefix={<Icon type="user" />} placeholder="Username" readOnly={this.state.submitLoading} />
								)}
							</FormItem>
						</div>
						<div className="input">
							<FormItem hasFeedback>
								{getFieldDecorator('password', { rules: [{ required: true, message: '请输入密码' }] })(
									<Input prefix={<Icon type="lock"/>} type="password" placeholder="Password" readOnly={this.state.submitLoading} />
								)}
							</FormItem>
						</div>
						<div>
							<Button disabled={this.props.$fn.hasError(getFieldsError())} type="primary" htmlType="submit" loading={this.state.submitLoading} className="login-form-button">登录</Button>
						</div>
			  		</Form>
				</div>
			</div>
	    );
	}
}
const LoginForm = Form.create()(Login);

export default connect(LoginForm)
