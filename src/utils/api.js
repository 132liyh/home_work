import { request } from './request';


/**
 * 案例
 * @param {object} postData 
 */
export const FindChartList=(postData)=>{
      return request('chart/findChartList',postData);
}

/**
 * 案例详情
 * @param {object} postData 
 */
export const FindChartItem=(postData)=>{
      return request('chart/findChartItem',postData);
}


/**
 * 登录
 * @param {object} postData 
 */
export const UserLogin=(postData)=>{
      return request('user/loginUser',postData)
}



/**
 * 登录
 * @param {object} postData 
 */
export const UserTest=(postData)=>{
      return request('user/demo',postData)
}