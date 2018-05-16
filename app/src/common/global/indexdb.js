/* ====================================== indexdb 离线存储  ====================================== */
//import F from './methods';
import Config from '@common/config';
// ====================================== 删除数据库
//window.indexedDB.deleteDatabase(Config.indexdb);
// ====================================== 创建表
const DB = (tableName = Config.indexdbTable)=>{
	let req = window.indexedDB.open(Config.indexdb, Config.indexdbVersion);;
	return new Promise((resolve, reject) => {
		req.onsuccess = (e) => {
			let db = e.target.result;
			let transaction = db.transaction(tableName,'readwrite'); 
			let store=transaction.objectStore(tableName);
			resolve(store);
			req = null;
		}
		req.onerror = e => {
			console.log(Config.indexdb + '数据库使用失败：' + e.srcElement.error.message);
			reject(e.message);
		}
		req.onupgradeneeded = e => {
			let db = e.target.result;
			if(!db.objectStoreNames.contains(tableName)){
			    db.createObjectStore(tableName);
			}
			console.log(Config.indexdbTable + ' 表创建成功');
		};
    })
}
// ====================================== 创建表
export default {
	// ====================================== 保存数据，
	// 如果不存在则添加，如果存在则覆盖，
	// 即可添加字符串，也可添加对象
	set(key, data){
		DB().then( store => {
			let req = store.get(key);
			req.onsuccess = (e) => {
			store.put(data, key);
			}
		});
	},
	// ====================================== 获取数据
	get(key){
		return new Promise((resolve, reject) => {
			DB().then( store => {
				let req = store.get(key);
				req.onsuccess = (e) => {
					resolve(e.target.result);
				}
				req.onerror = (e) => {
					console.log("你要查找的数据：'" + key + "' 不存在于 '" + Config.indexdbTable + "' 中");
				}
			})
		});
	}
}
