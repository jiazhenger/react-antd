/* ====================================== http 请求  ====================================== */
// axios http 请求
import axios from 'axios';
// localStorage 本地存储
import F from './methods';
import SS from './sessionStorage';
//import Store from '@redux/store';
import Config from '@common/config';
// ===================================================== 公共函数
// 错误提法信息
const logError = (msg)=>{
	console.log('%cj+2 错误提示：' + msg,'color:red');
}
// 友情提示
//const logPromp = (msg)=>{ console.log('%cj+2 友情提示：' + msg,'color:#ce6007'); }
// 配置头信息
const config = ()=>{
	return {
		baseURL:Config.api,	// api 线上地址
		headers: {
			//'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			//'authorization' : localStorage.token,
			'Content-Type': 'application/json'
		},
		timeout: 30000,
		withCredentials : true
	}
}

// 接口错误处理
const error = (err, url) =>{
	if(err.status === 404){
		//vue.$router.push({ path:'/404', query:{ api:url } });
		logError('你访问的 api 不存在，请检查: '+  err.url);
	}else if(err.status === 500){
        logError('服务器内部错误: '+  url);
    }else if(err.status === 0){
        logError('可能存在服务器拒绝 cors 跨域请求 || 访问的服务器不存在 || 访问的 api 没有返回数据 || 访问的 api 返回数据格式错误：' + url);
    }else{
    	logError('服务器出错：' + url);
    }
}
// 处理请求参数
/*
const manageBody = (body,param,promise) => {
	let mbody = body;
	if(F.isFunction(mbody)){
		mbody = body.call(promise, param);
		if(!F.isObject(mbody)){
			logError('请求参数是 函数时，必须返回一个对象参数 {}');
			return {}
		}
		return mbody;
	}else if(F.hasObject(body)){
		return body;
	}else{
		//logPromp('请求参数格式有 {} 与 函数返回 {} 或不传三种, 如请求数据不正确，请确认是否需要传参');
		return {}
	}
}

// 初始化请求
const httpInit = (url, body, action) => {
	return new Promise((resolve,reject) => {
		// 如果是初次请求
		if(!SS.get('init')){
			httpRequest(Config.init,{},'get').then(data=>{
				SS.set('init',{storehouse:data});						// 保存初始化数据
				let mbody = manageBody(body,data,this);	// 函数返回带公参
				//Store.dispatch({type:'Do_Storehouse',storehouse:data.data});
				httpRequest(url,mbody,action).then( result => resolve(result))
			})
		}else{
			let mbody = manageBody(body,SS.get('init'),this);	// 函数返回带公参
			Store.dispatch({type:'Do_Storehouse',storehouse: SS.get('init')['storehouse'] });
			httpRequest(url,mbody,action).then( result => resolve(result));
		}
	})
}
*/
// 封装公参
const publicParam = (body, action) => {
	if(!F.hasObject(body)) return '';
	//let param = LS.get('login');
	let param = body;
	let str='';
	for(let i in param){
		if(param[i] !== ''){
			str += i + '=' + param[i] + '&' 
		}
	}
	return encodeURI( '?' + str);	// encodeURI 不对 [:, /, ;,?] 进行编码
}

// http 核心封装
const coreRequest = (url, body, action) => {
	return new Promise((resolve,reject) => {
		let param = publicParam(body);
		let promise;
		console.log(action + ' 数据：', body);
		if(action === 'get'){
			let uri = body ? (url + param) : url;
			promise = axios[action](uri, config());
			console.log('%c' + action + ' === ' + Config.api + url + param, 'color:blue')		// 输出 api
		}else{
			if(url === Config.init){
				promise = axios[action](url, {}, config());
			}else{
				promise = axios[action](url, body, config());
			}
			console.log('%c' + action + ' === ' + Config.api + url, 'color:blue')		// 输出 api
		}
		promise.then(res => {	// 接口正确接收数据处理
			let data = res.data;
			let code = data['code'];
			// 数据请求成功		
			if(code === 0){
				if(!F.isValid(data.data)){
					resolve({data:{'j+2提示': '接口未返回数据 data'}});
					return false;
				}
				let result = data.data || [];
				resolve(result);
				console.log(url,result);
				//if(Config.cache && cache){ DB.set(url,data);}	// 缓存数据
			}else if(code === 3){
				let port = window.location.port === 80 ? '' : ':' + window.location.port;
				let url = window.location.protocol + '//' + window.location.hostname + port + window.location.pathname + '#/login';
				SS.remove('init');
				window.location.replace(url);
			} else { // 数据请求失败
				console.log(url,data);
				reject(data);
			}
		}, (err) => { 					// 接口错误处理
			error(err, Config.api + url);
			//alert('网络或服务器出错！')
		})
	})
}
// http 不带缓存请求
//const httpRequest = (url, body, action = 'get') => coreRequest(url, body, action)
// get 请求
export const get = (url,param={},config) => coreRequest(url,param,'get')
// delete 请求
export const del = (url,body={},config) => coreRequest(url,body,'delete')
// post 请求
export const post = (url,body={},config) => coreRequest(url,body,'post')
export default { get, post, del }
