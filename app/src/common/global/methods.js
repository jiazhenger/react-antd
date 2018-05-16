import Config from '@common/config';
/* ====================================== 全局变量及方法  ====================================== */
export default {
	// ========================================================================  判断数据类型
	// 判断数据是否是对象 {}
	isObject(obj){
		return {}.toString.call(obj) === '[object Object]';
	},
	// 判断数据是否是对象{}，且对象长度 >0
	hasObject(obj){
		return this.isObject(obj) && Object.keys(obj).length > 0;
	},
	// 判断数据是否是函数 function
	isFunction(obj){
		return {}.toString.call(obj) === '[object Function]';
	},
	// 判断数据是否是数组 []
	isArray(obj){
		return {}.toString.call(obj) === '[object Array]';
	},
	// 判断数据是否是数级 []，且长度>0
	hasArray(obj){
		return this.isArray(obj) && obj.length > 0;
	},
	// 判断数据是否是字符串
	isString(obj){
		return {}.toString.call(obj) === '[object String]';
	},
	// 判断数据是否是数字
	isNumber(obj){
		return {}.toString.call(obj) === '[object Number]';
	},
	// 判断数据是否有效
	isValid(obj){
		return obj !== undefined && obj !=='' && obj !== null;
		//return obj !== undefined && obj !=='' && obj !== null && obj !== NaN;
	},
	// 判断数据的有效性
	isData(obj){
		return this.hasArray(obj) || this.hasObject(obj) || this.isValid(obj);
	},
    // ======================================================================== 阻止默认
    // 阻止冒泡不阻止默认行为
	stop(event){
		event.stopPropagation();
	},
	// 阻止冒泡并阻止默认行为
	prevent(event){
		event.preventDefault()
	},
	// ======================================================================== 返回测试数据
	// 将对象转为字符串
	json(data){
		return JSON.stringify(data,null,'\t');
	},
	// 将序列化对象转为对象
	data(param){
		if(!this.isValid(param) && !this.isString(param)) return {};
		
		let stack = {}
		let arr = (param.replace('?','')).split('&');
		
		arr.forEach((v,i)=>{
			let m = v.split('=');
			stack[m[0]] = m[1];
		})
		
		return stack
	},
	// 数组去重
	unique(arr){
		var data = arr || [];   
		var a = {};   
		for (var i=0; i<data.length; i++) {   
			var v = data[i];   
			if (typeof(a[v]) === 'undefined'){   
				a[v] = 1;
			}
		};
		data.length = 0;   
		for (var j in a){   
			data[data.length] = j;   
		}   
		return data;   
	},
	// 序列化对象 {} to ?a=1&b=2
	search(obj){
		if(!this.hasObject(obj)) return;
		let stack='?';
		for(let i in obj){
			stack+= i + '=' + JSON.stringify(obj[i]) + '&';
		}
		return stack.substring(0,stack.lastIndexOf('&'));
	},
	// 给 data 添加 key
	addKey(data){
		if(this.hasArray(data)){
			data.forEach((v,i)=>{
				data[i]['row-key'] = i+1;
			})
		}
		return data;
	},
	// 如果对象属性值为 undefined 或 null时，设置为 null
	setNull(obj){
		for(let i in obj){
			if(obj[i] === undefined || obj[i] === ''){
				obj[i] = null
			}
		}
		return obj;
	},
	// 如果对象属性值为 undefined 或 null时，设置为 ''
	setEmpty(obj){
		for(let i in obj){
			if(obj[i] === undefined || obj[i] === null){
				obj[i] = ''
			}
		}
		return obj;
	},
	// 如果数组元素为 null，移出此元素
	removeNull(arr){
		return arr.filter( v => this.isValid(v) )
	},
	// 分页配置
	showTotal(total,range,self,paginations){
		//if(self.state.pagination.pages <= 1){return ''}
		let pagination = paginations || 'pagination';
		return `当前页: ${self.state[pagination].current || 1}/${self.state[pagination].pages || 1}，本页条数：${range[1] - range[0] + 1}，总数: ${total}`
	},
	// ======================================================================== 页面公共处理部分 ======================================================================== //
	// ajax 主请求
	paginationFetch(options,self){
		let option = {
			api : '',
			param:{},
			pageNum: 1,
			pageNumTxt:'pageNum',	// 当前第几页
			pageSizeTxt:'pageSize',	// 每页面多少条数据
			pagesTxt:'pages',		// 总共多少条数据
			loading: 'loading',
			pagination:'pagination',
			dataKey: 'dataKey',	// 记录路由切换后的 key
			rowKey:'rowKey',	// 记录路由没有切换时的 key
			data:'data',
			isInit:false,
			http:'post',
			way:0,
			apiUrl:null,
			hasCover:true,	// 是否需要复原
			paginationType:0,
			noState:false,	// 无需 state 的页面
			isPagination:false
		}
		let opt = {...option,...options};
		
		let state = self.props.history.location.state;
		let pageNum = opt.pageNum || 1;
		let pageS = state && state[opt.pageSizeTxt] ? state[opt.pageSizeTxt] : self[opt.pageSizeTxt];
		if(opt.noState || opt.isPagination){
			pageS = self[opt.pageSizeTxt]
		}
		let pageSize = pageS || Config.pageSize;
		let pagation = {
			showSizeChanger:true,
			showQuickJumper:true,
			onShowSizeChange: (current, pageSize) => {
				self[opt.pageSizeTxt] = pageSize;
			}
		}
		self.setState({ [opt.loading]:true })	// 禁用按钮
		
		if(opt.paginationType === 1){
			pagation=Config.smallPage;
			pageSize = Config.smallPage.pageSize;
		}
		
		let api = `${opt.api}`;
		
		if(opt.way===1){
			api = `${opt.api}/${pageNum}/${pageSize}/`;
		}
		
		if(opt.apiUrl){
			api = `${opt.api}/${pageNum}/${pageSize}/${opt.apiUrl}`;
		}
		
		let param = {length:pageSize,start:(pageNum-1)*pageSize, ...opt.param}
		
		self.props.$http[opt.http](api,param).then(data=>{
			let resultData = this.addKey(data.content);
			self.setState({
					  [opt.data]: resultData,
				  [opt.pagesTxt]: data.totalPages,
			    [opt.pageNumTxt]: pageNum, 
				   [opt.loading]: false,
				[opt.pagination]: {
					total: data.totalElements, 
					pages: data.totalPages, 
					current: data.number+1,
					pageSize: pageSize,
					showTotal : (total,range) => {
						return this.showTotal(total,range,self,opt.pagination);
					},
					...pagation
				}
			})
				
			this.isFunction(opt.fn) && opt.fn(data);
			/*
			if(!opt.hasCover) return;
			
			let key = null;
			if(state){
				key = state[opt.dataKey];
			}
			if(self[opt.rowKey]){
				key = self[opt.rowKey]-1;
			}
			if(!opt.isInit){
				setTimeout(()=>{
					$('.js-search-table tbody tr').eq(key).find('td').each(function(){
						$(this).removeClass('active')
					});
				},100)
			}else{
				if(this.isNumber(key)){
					setTimeout(()=>{
						$('.js-search-table tbody tr').eq(key).find('td').addClass('active');
						$('.js-search-table tbody tr').eq(key).siblings().find('td').removeClass('active');
					},800)
				}
			}*/
		})
	},
	// 无路由返回页面，带分页及查询条件请求数据
	refreshFetch(self,add,options){
		let option = {
			fetchTxt: 'fetch',
			searchParamTxt:'searchParam',
			pageNumTxt:'pageNum',
			selectedRowKeysTxt: 'selectedRowKeys',
			paginationTxt: 'pagination'
		}
		let opt = {...option,...options};
		if(add){
			self[opt.fetchTxt](0,self[opt.searchParamTxt],{isInit:true})
			self.setState({ [opt.selectedRowKeysTxt]:[] })
		}else{
			self[opt.fetchTxt](self.state[opt.pageNumTxt],self[opt.searchParamTxt],{isInit:true})
		}
	},
	// 分页返回顶部
	returnTop(){
		const scrollTarget = document.getElementById('scrollTarget');
		window.scrollTo(0,scrollTarget.offsetTop + scrollTarget.clientHeight)
	},
	// 分页请求
	handlePagination(pagination, filters, sorter, self, options){
		let option = {
			fetchTxt: 'fetch',
			pageNumTxt:'pageNum',
			searchParamTxt:'searchParam',
			selectListTxt:'selectList',
			selectedRowKeysTxt:'selectedRowKeys'
		}
		let opt = {...option,...options};
		this.returnTop();
		self.setState({ [opt.pageNumTxt]: pagination.current, [opt.selectListTxt]:[], [opt.selectedRowKeysTxt]:[]  });
	    self[opt.fetchTxt](pagination.current,self[opt.searchParamTxt],{isPagination:true});
	    
	     self[opt.selectListTxt] = []
	    
	    this.isFunction(opt.fn) && opt.fn(pagination.current-1);
	},
	// 初始请求
	httpInit(self,options){
		let option = {
			pageNumTxt: 'pageNum',
			pageSizeTxt: 'pageSize',
			fetchTxt: 'fetch',
			searchParamTxt:'searchParam'
		}
		let opt = {...option,...options};
		let state = self.props.history.location.state;
		let pageNum = 1;
		let pageSize = Config.pageSize;
		
		if(state){
			pageNum = state[opt.pageNumTxt];
			pageSize = state[opt.pageSizeTxt]
			self[opt.searchParamTxt] = state[opt.searchParamTxt];
			self.setState({[opt.pageSizeTxt]: pageSize })
		}
		self[opt.fetchTxt](pageNum,self[opt.searchParamTxt],{isInit:true });
		console.log('返回固定参数：', state)
	},
	// 提交表单数据
	onSubmit(e,self,options){
		let option = {
			onSubmit: 'onSubmit'
		}
		let opt = {...option,...options};
		self.props.form.validateFields((err, values) => {
  			if(!err){
  				self.props[opt.onSubmit](values)
  			}
  		})
		e.preventDefault();
	},
	handleSubmit(self, values, options){
		let option = {
			pageNumTxt: 'pageNum',
			pageNum:1,
			fetchTxt: 'fetch',
			searchParamTxt:'searchParam',
			selectedRowKeysTxt:'selectedRowKeys',
			isNull:true
		}
		let opt = {...option,...options};
		let body = opt.isNull ? this.setNull(values) : this.setEmpty(values);
		self.setState({[opt.selectedRowKeysTxt]: [] })
		self[opt.fetchTxt](opt.pageNum,body,{});
		
		if(this.isObject(self[opt.searchParamTxt])){
			self[opt.searchParamTxt] = body;
		}
	},
	// 返回历史，并记录翻页
	goBack(self,path){
		self.props.history.replace({ pathname:path, state:self.props.location.state} )
	},
	// 获取 pageNum
	getPageNum(self,record,options){
		let option = {
			pageNumTxt: 'pageNum',
			pageSizeTxt:'pageSize',
			dataKey: 'dataKey',
			searchParamTxt:'searchParam',
			state:true
		}
		let opt = {...option,...options};
		let A = {
			[opt.pageNumTxt]: self.state[opt.pageNumTxt] || 1,
			[opt.pageSizeTxt]: self[opt.pageSizeTxt] || Config.pageSize,
			[opt.dataKey]: record['row-key']-1,
			[opt.searchParamTxt]: self[opt.searchParamTxt],
		}
		let B = {
			...A,
			state: record
		}
		return opt.state ? B : A
	},
	// 重置表单
	reset(self,search){
		self.props.form.resetFields();
		let stack = {}
		for(let i in search){
			stack[search[i]] = undefined;
		}
		self.props.form.setFieldsValue(stack)
	},
	// 禁用提交按钮判断条件
	hasError(fieldsError){
		return Object.keys(fieldsError).some(field => fieldsError[field]);
	}
}