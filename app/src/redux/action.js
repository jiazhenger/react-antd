/*
 * action 是一个对象，只是含有type的key的对象
 * this.props.action.ajax() 进入直接调用
 * 	
 * action 中的函数返回的变量，通能会绑定到 action 对象上，那么，reducer 中可以取任何 action 函数返回的值
 * 
 */
// 改变 reduder
export const doType = (type,param) => ({ type: type, ...param })
export const dispatch = (type,param) => dispatch => { dispatch({ type: type,  ...param}) }
export default { doType, dispatch }
