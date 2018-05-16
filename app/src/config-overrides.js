/* ====================================== 自定义 webpack 配置  ====================================== */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const resolve = dir => require('path').join(__dirname,dir);
module.exports = function override(config, env) {
	// 自定义文件目录
	config.resolve.alias['@'] = resolve('src');
  	config.resolve.alias['@common'] = resolve('src/common');
  	config.resolve.alias['@cpt'] = resolve('src/component');
  	
  	config.resolve.alias['@assets'] = resolve('src/assets');
  	config.resolve.alias['@css'] = resolve('src/assets/css');
  	config.resolve.alias['@images'] = resolve('src/assets/images');
  	config.resolve.alias['@js'] = resolve('src/assets/js');
  	
  	config.resolve.alias['@views'] = resolve('src/views');
  	
  	config.resolve.alias['@redux'] = resolve('src/redux');
	// 用于按需加载组件代码和样式的 babel 插件
	//config = injectBabelPlugin(['import', { libraryName: 'antd', style: 'css' }], config);
	// 自定制主题
	config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
	config = rewireLess(config, env, {
		//modifyVars: { "@primary-color": "#0aa679" },
	});
	return config;
};