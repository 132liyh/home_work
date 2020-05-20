import { request } from './request';


/**
 * 案例
 * @param {object} postData 
 */
export const FindChartList=(postData)=>{
      return request('case/getCaseList',postData);
}

/**
 * 案例详情
 * @param {object} postData 
 */
export const FindChartItem=(postData)=>{
      return request('case/getCaseItem',postData);
}

/**
 * 删除
 * @param {object} postData
 */
export const DeleteCase=(postData)=>{
    return request('case/deleteCase',postData);
}


/**
 * 登录
 * @param {object} postData 
 */
export const UserLogin=(postData)=>{
      return request('user/loginUser',postData)
}

/**
 * 添加案例
 * @param postData
 */
export const AddCase=(postData)=>{
    return request('case/addCase',postData)
}


/**
 * 详情
 * @param {Object} postData
 */
export const GetCaseItem=(postData)=>{
    return request('case/getCaseItem',postData);
}

/**
 * 管理员登录
 * @param postData
 */
export const AdminLoginData=(postData)=>{
    return request('user/loginAdminUser',postData);
}

/**
 * 添加收藏
 * @param {Object} postData
 */
export const AddCollect=(postData)=>{
    return request('case/collectCase',postData)
}

/**
 * 取消收藏
 * @param {Object} postData
 */
export const CancelCollect=(postData)=>{
    return request('case/collectCase',postData)
}

/**
 * 获取装修风格
 */
export const StyleList=()=>{
    return request('style/queryStyle')
}

/**
 * 添加装修风格
 * @param {Object} postData
 */
export const AddStyle=(postData)=>{
    return request('style/insertStyle',postData)
}

/**
 * 设计师列表
 * @param {Object} postData
 */
export const designerInfo=(postData)=>{
    return request('designerInfo/addDesigner',postData)
}

/**
 * 设计师注册
 * @param {Object} postData
 */
export const DesignerRegistration=(postData)=>{
    return request('designerInfo/selectDesigner',postData)
}


/**
 * 设计师详情
 * @param postData
 */
export const DesignerDetails=(postData)=>{
    return request('designerInfo/DesignerDetails',postData)
}


/**
 * 设计师s删除
 * @param {Object} postData
 */
export const DeleteDesigner=(postData)=>{
    return request('designerInfo/deleteDesigner',postData)
}

/**
 * 设计师关注
 * @param {Object} postData
 */
export const AddUserFocus=(postData)=>{
    return request('userFocus/addUserFocus',postData)
}

/**
 * 设计师关注
 * @param {Object} postData
 */
export const DeleteUserFocus=(postData)=>{
    return request('userFocus/deleteUserFocus',postData)
}