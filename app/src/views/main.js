import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import connect from '@redux/connect';
import Router from './router';
// ===================================================================== antd
import { Layout, Menu, Breadcrumb, Icon, Button, Affix, Modal, message } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
// ===================================================================== 算计key
let pathname = window.location.hash.replace('#/','');
let patharr = pathname.split('/');
// =====================================================================
class Main extends React.Component{
	pathname = window.location.hash.replace('#/','')
	state={}
	componentDidMount(){
		this.resize()
		window.onresize = ()=>{ this.resize() }
	}
	resize = () =>{
		if(document.body.clientWidth < 992){
			this.setState({collapsed: true})
		}else{
			this.setState({collapsed: false})
		}
	}
	// 注销登录
	logout = ()=>{
		Modal.confirm({
			title: '确认退出登录?',
			content: null,
			cancelText: "取消",
	      	okText: '确认',
    		onOk : () => {
				this.props.$http.get(`user/loginout/`).then(data=>{
					message.success('退出登录成功！',1, ()=>{
						this.props.$ss.remove('init')
						this.props.history.replace('/login');
					});
				},data=>{
					message.error(data.message,2);
					this.setState({ submitLoading:false })
				})
			},
			onCancel() {
				
			}
		});
	}
	render(){
		return (
			<section className="frame-wraper">
				<Header className="header clearfix" style={{background:'#fff',height:'auto', padding:0}}>
					<div className="col-md-12 logo">react 后台模板
						<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={()=>{ this.setState({collapsed: !this.state.collapsed}) }} />
					</div>
					<div className="col-md-88">
						<div className="nav">
							<span>欢迎<b>XXX</b>登录能力平台</span>
							<Button ghost type="primary" size="small" icon="sync" onClick={()=>{ this.props.$action.doType('Do_Refresh') }}>刷新</Button>
							<Button ghost type="primary" size="small" icon="logout" onClick={ this.logout }>退登录</Button>
						</div>
					</div>
					{/*
					<Menu className="col-md-85" theme="primary" mode="horizontal" defaultSelectedKeys={[this.pathname]} style={{ lineHeight: '64px' }}>
				        <SubMenu key="sub1" title={<span><Icon type="user" />管理</span>}>
							<Menu.Item key="management-organization"><NavLink to='/management-organization'>模板一</NavLink></Menu.Item>
							<Menu.Item key="create-purchase-order"><NavLink to='/create-purchase-order'>模板二</NavLink></Menu.Item>
						</SubMenu>
			      	</Menu>
			      	*/}
		    	</Header>
		    	<Layout>
					<Sider id="menu" width={200} style={{ background:'#fff'}} breakpoint="lg" reverseArrow={true} trigger={null} collapsedWidth={0} collapsed={this.state.collapsed}>
				        <Affix>
					        <Menu mode="inline" defaultOpenKeys={[patharr[0]]} defaultSelectedKeys={[patharr[1]]} onSelect={this.resize} style={{ height: '100%', borderRight: 0 }}>
								<SubMenu key="template" title={<span><Icon type="user" />模板</span>}>
									<Menu.Item key="a"><NavLink to='/template/a'>模板一</NavLink></Menu.Item>
									<Menu.Item key="b"><NavLink to='/template/b'>模板二</NavLink></Menu.Item>
								</SubMenu>
							</Menu>
						</Affix>
					</Sider>
					<Layout className="content-wraper">
						<div id="scrollTarget">
							{
								this.props.state.home.menu.length > 0 ? (
									<Breadcrumb style={{ margin: '16px 0', fontSize:12 }}>
							        	<Breadcrumb.Item key="icon"><Icon type="home" style={{fontSize:16,marginRight:5,marginTop:2}} /> 首页</Breadcrumb.Item>
							        	{
							        		this.props.state.home.menu.map((v,i)=> <Breadcrumb.Item key={i}>{v}</Breadcrumb.Item>)
							        	}
							        </Breadcrumb>
								) : (<div className="h10"></div>)
							}
						</div>
				       
						<Content className="content">
							<Route component={ Router } {...this.props} key={this.props.state.key} />
				        </Content>
					</Layout>
		    	</Layout>
			</section>
		)
	}
}

export default connect(Main)
