/* ====================================== 异步加载路由  ====================================== */
import React, { Component } from "react";
// ===================================================================== loadding 
import LoadingComponent from '@cpt/loading.component';
// =====================================================================
export const Bundle = (importComponent) => {
    class AsyncComponent extends Component {
    	state = { component: () => <LoadingComponent/> }

        async componentDidMount() {
            const { default: component } = await importComponent();
            
        	//if(!this._isMounted) return;
        	
        	this.setState({ component: component });
        }
        
        componentWillUnmount(){
        	// 解决组件被提前移出报错问题
        	//this._isMounted = false;
        	
			//this.setState = (state,callback)=>{ return;}
		}

        render() {
            const Component = this.state.component;

            return Component ? <Component {...this.props} /> : <LoadingComponent/>;
        }
    }

    return AsyncComponent;
}

export const BundleImport = (path)=>{
	return Bundle(() => import('@views' + path));
}

export default { Bundle, BundleImport }
