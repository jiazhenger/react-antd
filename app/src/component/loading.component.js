/* ======================================  state 状态  ====================================== */
import React from 'react';
// ===================================================================== antd
import { Spin } from 'antd';
// =====================================================================
export default ()=>(
	<div className="loading-wraper fxmc">
    	<Spin size="large" />
    </div>
)
/*
export default ()=>(
	<div className="loading-wraper fxmc">
    	<dl className="loading-circle">
        	<dd><i></i><i></i><i></i><i></i></dd>
        	<dd><i></i><i></i><i></i><i></i></dd>
        	<dd><i></i><i></i><i></i><i></i></dd>
		</dl>
    </div>
)
*/