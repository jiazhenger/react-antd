// ===================================================================== 刷新页面
export const key = (state=0,action)=>{
	switch(action.type){
		case 'Do_Refresh':
			return state+1
		default:
			return state
	}
}
// ===================================================================== 刷新页面
export const home = (state={menu:[]},action)=>{
	switch(action.type){
		case 'Do_Home':
			delete action.type;
			return {...action}
		default:
			return state
	}
}
