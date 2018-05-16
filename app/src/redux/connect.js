/*
 * connect：连接redux跟react
 * 
 * 
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import { withRouter} from 'react-router-dom';
// ===================================================================== 公共方法
import Http from '@common/global/http';
import Methods from '@common/global/methods';
import LocalStorage from '@common/global/localStorage';
import SessionStorage from '@common/global/sessionStorage';
//import Indexdb from '@common/global/indexdb';
import Config from '@common/config';
// ===================================================================== action
import * as Actions from './action';
// ===================================================================== 
export default (Component,option) => {
	// ======================================== 容器组件
	class App extends React.Component {
		render() {
			return <Component id={this.id} { ...this.props } />
		}
	}
	// ======================================== this.context.router 使用前提声明
	Component.contextTypes = {
		router: PropTypes.object
	}
	return connect(
		(state,props)=> ({state: state,$config: Config}),
		(dispatch, props) => (
			{
				$action: bindActionCreators(Actions, dispatch),
				$http: Http,
				$fn: Methods,
				$ls: LocalStorage,
				$ss: SessionStorage
				//$db: Indexdb
			}
		),
		(stateProps, dispatchProps, ownProps) => ({ ...ownProps, ...stateProps, ...dispatchProps })
	)(App)
}
