import { api } from "./util";
import store from "../store";

/**
 * 图片显示地址
 */
export const imgUrl = 'https://img.51jja.cn';

/**
 * 上传图片路径
 */
export const QiNiuUrl = 'https://upload.qiniup.com';

/**
 * api接口前缀
 */
let baseUrl = `http://312a98832s.qicp.vip/`;
//打包后的
// switch (process.env.NODE_ENV) {
//       // 正式环境
//       case 'production':
//             baseUrl = 'http://312a98832s.qicp.vip:38698/';
//             break;

//       // 测试的(比如打包体验版)
//       case 'development':
//             baseUrl = 'http://312a98832s.qicp.vip:38698/';
//             break;
// }
// 导出
export {
      baseUrl
}

/**
 * 请求接口
 * @param {String} url 请求地址
 * @param {Object} postData 请求参数
 */
export const request = async (url, postData = {}) => {
      const [error, { data }] = await uni.request({
            url: url.includes('http') ? url : `${baseUrl}${url}`,
            method: 'POST',
            data: postData,
      });
      return data;
      // return new Promise((resolve,reject)=>{
      //       uni.request({
      //             url: url.includes('http') ? url : `${baseUrl}${url}`,
      //             data: postData,
      //             method: "POST",
      //             success({data}) {
      //                   resolve(data);
      //             },
      //             fail(err) {
      //                   reject(err);
      //             }
      //       })
      // })
};

/**
 * 请求支付
 * @param {Object} data 请求支付的参数
 *  @value timestamp 时间戳
 *  @value nonce_str 加密串
 *  @value package 名字
 *  @value 加密值
 * @returns {Promise<unknown>} 返回成功或失败
 */
export const wxPay = (data) => {
      return new Promise((resolve, reject) => {
            uni.requestPayment({
                  timeStamp: String(data.timestamp),
                  nonceStr: data.nonce_str,
                  package: data.package,
                  signType: 'MD5',
                  paySign: data.sign,
                  success(res) {
                        resolve(res)
                  },
                  fail(err) {
                        reject(err);
                  }
            })
      })
}

/**
 * 请求上传图片接口
 * @param data 上传的图片
 * @returns {Promise<unknown>} 成功或失败
 */
export const upload = (file) => {
      return new Promise((resolve, reject) => {
            request('index/qiniu_token').then(({ data }) => {
                  uni.uploadFile({
                        url: QiNiuUrl,  //上传文件地址
                        filePath: file,  //上传文件
                        name: 'file',
                        header: {
                              'content-type': 'multipart/form-data'
                        },
                        formData: {
                              token: data,
                        },
                        success: ({ data }) => {
                              resolve(JSON.parse(data))
                        },
                        fail(err) {
                              reject(err);
                        }
                  })
            })
      })
};