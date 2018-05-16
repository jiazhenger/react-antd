import { createStore,combineReducers,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'

import * as reducer from './reducer'

// 创建一个 Store
let Store = '';
if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)){ // 如果没有安装插件
    Store = createStore(
        combineReducers(reducer),
        applyMiddleware(thunk)
    );
}else{ // 如果安装有插件
    Store = createStore(
        combineReducers(reducer),
        compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) //插件调试，未安装会报错
    );
}

// 获取当前 state
// 注册监听器

const previosValue = Store.getState();
Store.subscribe(()=>{
    const currentValue = Store.getState();
	console.log('初始值:', previosValue, '当前值:', currentValue)
});


export default Store;
