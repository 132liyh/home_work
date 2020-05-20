// 正则验证
const list = {
    tel: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    email: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
};


// 延迟
let openView = true;
/**
 * 导出常用方法
 */
export const api = {
    /**
     * 正则
     */
    verification(type, data) {
        return list[type].test(data);
    },
    /**
     * 判断登录
     */
    judgeLogin() {
        let token = api.getInfo('token');
        let type = api.getInfo('type');
        if (!token && !type) {
            api.jump(viewName.userLogin);
            return false;
        }
        return token;
    },
    /**
     * 获取存储值
     * @param {string} info
     *
     */
    getInfo(info) {
        let data = uni.getStorageSync(info);
        if (data !== '' && data) {
            return data;
        }
        return 0;
    },
    /**
     * 移除存储值
     * @param {string} key 存储的key
     *
     */
    removeInfo(key) {
        uni.removeStorageSync(key);
    },
    /**
     * 设置存储值
     * @param {string} key 存储时的key
     * @param {string} val 存储时的值
     *
     */
    setInfo(key, val) {
        uni.setStorageSync(key, val);
    },
    /**
     * 页面跳转--默认登录页哦
     * @param {string} url 跳转页面的路径
     * @param {object} data  携带的参数
     *
     */
    jump(url = '', data = {}) {
        api.showLoad();
        let info = "?";
        if (data && typeof data == "object") {
            for (let key in data) {
                info += `${key}=${data[key]}&`
            }
            url += info;
        } else {
            url += info + data;
        }
        process.env.NODE_ENV !== 'production' ? console.log(`跳转${url}`) : '';
        if (openView) {
            openView = false;
            uni.navigateTo({
                url: url,
                success() {
                    const time = setTimeout(() => {
                        openView = true;
                        api.hideLoad();
                        clearTimeout(time);
                    }, 500);
                }
            })
        }
    },
    /**
     * 处理手机号--前三****后四
     * @param {string} tel 手机号
     *
     */
    handleTel(tel) {
        if (tel)
            return `${tel.substr(0, 3)} **** ${tel.substr(tel.length - 4, tel.length)}`;
    },
    /**
     * toast提示
     * @param {string} title 显示的文本
     */
    toast(title) {
        uni.showToast({
            title: title,
            icon: 'none',
            // #ifdef MP-WEIXIN
            duration: 2000,
            mask: true,
            // #endif
        });
    },
    /**
     * load提示文字
     */
    showLoad(title) {
        uni.showLoading({
            mask: true,
            title: title || '加载中'
        });
    },
    /**
     * 隐藏load
     */
    hideLoad() {
        uni.hideLoading();
    },
    /**
     * 获取参数(包括其他页面)
     * @param {number} n
     *
     */
    getData(n = 1) {
        return getCurrentPages()[getCurrentPages().length - n].options;
    },
    /**
     * 获取当前页面路由
     */
    getRoute() {
        return getCurrentPages()[getCurrentPages().length - 1].route;
    },
    /**
     * 对象转字符串
     * @param {object} data
     */
    objToStr(data) {
        let info = "?";
        for (let key in data) {
            if (key) {
                info += `${key}=${data[key]}&`
            }
        }
        return info;
    },
    /**
     * 字符串转对象
     * @param {string} data
     */
    // strToObj(data){

    // },
    /**
     * 当前路由加上参数分享
     */
    getShareData() {
        let info = "";
        let data = api.getData();
        if (data) {
            for (let key in data) {
                if (key) {
                    info += `${key}=${data[key]}&`
                }
            }
        }
        let sharePath = `${viewName.index}?path=${encodeURIComponent(api.getRoute())}&query=${encodeURIComponent(info)}`;
        return sharePath;

    },
    /**
     *
     * 获取当前位置
     * @param {void} callback
     */
    async getLocation() {
        return await new Promise((resolve, reject) => {
            uni.getLocation({
                type: 'gcj02',
                altitude: true,
                success(res) {
                    resolve(res);
                },
                fail(err) {
                    reject(err);
                }
            })
        })
    },
    /**
     *
     * 时间操作
     * @param {string} date
     */
    formatTime(date = new Date()) {
        function formatNumber(n) {
            const str = n.toString()
            return str[1] ? str : `0${str}`
        }

        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()

        const t1 = [year, month, day].map(formatNumber).join('-')
        const t2 = [hour, minute, second].map(formatNumber).join(':')

        return `${t1} ${t2}`
    },
    /**
     * 错误提示一般用与返回上一页
     * @param {Object} obj
     *  @value title
     *  @value content 必填
     */
    tipsBack(obj) {
        if (!obj.content) {
            console.error('content必须');
            return false;
        }
        uni.showModal({
            title: obj.title || '温馨提示',
            content: obj.content,
            showCancel: false,
            success() {
                uni.navigateBack();
            }
        })
    }
};


/**
 * 页面集合
 */
export const viewName = {
    /**
     * 首页
     */
    index: `/pages/index/index`,
     /**
     * 更多团队页面
     */
    teamMore: `/pages/index/teamMore/teamMore`,
    /**
     * 经典案例
     */
    case: `/pages/case/index`,
    /**
     * 设计
     */
    design: `/pages/design/index`,
    /**
     * 设计详情
     */
    designEdtail: `/pages/design-edtail/index`,
    /**
     * 案例
     */
    addCase: `/pages/add-case/index`,
    /**
     * 我的
     */
    user: `/pages/user/index`,
    /**
     * 用户登录
     */
    userLogin: `/pages/login/index`,
    /**
     * 预约
     */
    subscribe: `/pages/subscribe/index`,
    /**
     * 团队简介
     */
    subscribeList: `/pages/subscribe-list/index`,
    /**
     * 收藏
     */
    collection: `/pages/collection/index`,
    /**
     * 我的关注
     */
    team: `/pages/team/index`,
    /**
     * 收藏详情
     */
    collectionInfo: `/pages/collection-info/index`,
}