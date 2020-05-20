<template>
    <view class="login">
        <image class="login-logo" src="/static/images/logo.jpg"/>
        <text class="login-tips">我们需要获取您得到个人信息</text>
        <view class="login-btn">
            <button size="mini" @click="backView">暂不授权</button>
            <button size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary">立即授权</button>
            <button class="admin" size="mini" @click="$refs.admin.open()" type="primary">管理员登录</button>
        </view>
        <uni-popup ref="admin">
            <view class="admin-login">
                <text class="title">管理员登录</text>
                <input class="input" v-model="adminUser" placeholder="请输入账号" type="text"/>
                <input class="input" v-model="adminPwd" placeholder="请输入密码" type="password"/>
                <view class="btn">
                    <button size="mini" @click="$refs.admin.close()">取消</button>
                    <button class="admin" size="mini" type="primary" @click="adminLogin">登录</button>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    // <<<<<<< HEAD
    // import {api, viewName} from "../../utils/util";
    // import {AdminLoginData, UserTest} from "../../utils/api";
    // import {uniPopup} from "@dcloudio/uni-ui";
    // =======
    import {api, viewName} from "../../utils/util";
    import {AdminLoginData, UserLogin} from "../../utils/api";
    import {uniPopup} from "@dcloudio/uni-ui";

    export default {
        components: {
            uniPopup
        },
        data() {
            return {
                adminUser: "",
                adminPwd: ""
            };
        },
        methods: {
            backView() {
                uni.navigateBack();
            },
            adminLogin() {
                if (!this.adminUser) {
                    api.toast("请输入用户名");
                    return false;
                }
                if (!this.adminPwd) {
                    api.toast("请输入密码");
                    return false;
                }
                AdminLoginData({
                    userName: this.adminUser,
                    password: this.adminPwd
                }).then(({code, data,msg}) => {
                    if (code === 200) {
                        api.toast("登录成功");
                        api.setInfo("type", "1");
                        api.setInfo("token", data.id);
                        uni.navigateBack();
                        return false;
                    }
                    api.toast(msg)
                });
            },
            getUserInfo({detail}) {
                if (!detail.userInfo) {
                    api.toast("请同意授权");
                    return false;
                }
                api.showLoad();

                uni.login({
                    success({code}) {
                        const {nickName, avatarUrl} = detail.userInfo;
                        UserLogin({
                            wxCode: code,
                            userName: nickName,
                            wxImagePath: avatarUrl
                        }).then(({data}) => {
                            api.toast("登录成功");
                            api.setInfo("token", data.id);
                            uni.navigateBack();
                        });
                        api.hideLoad();
                    },
                    fail() {
                        api.hideLoad();
                    }
                });
            }
        }
    };
    // export default {
    //   components: {
    //     uniPopup
    //   },
    //   data() {
    //     return {
    //       adminUser: "",
    //       adminPwd: ""
    //     };
    //   },
    //   methods: {
    //     backView() {
    //       uni.navigateBack();
    //     },
    //     adminLogin() {
    //       if (!this.adminUser) {
    //         api.toast("请输入用户名");
    //         return false;
    //       }
    //       if (!this.adminPwd) {
    //         api.toast("请输入密码");
    //         return false;
    //       }
    //       AdminLoginData({
    //         userName: this.adminUser,
    //         password: this.adminPwd
    //       }).then(({ code, data }) => {
    //         console.log(code, data);
    //         if (code === 200) {
    //           uni.switchTab({
    //             url: viewName.user
    //           });
    //           uni.setStorage({
    //             key: "admin",
    //             data: data,
    //             success: function(res) {
    //               console.log(res);
    //             }
    //           });
    //         }
    //       });
    //     },
    //     getUserInfo({ detail }) {
    //       if (!detail.userInfo) {
    //         api.toast("请同意授权");
    //         return false;
    //       }
    //       api.showLoad();
    //       // >>>>>>> a2ec818712443bc9e377456ad6b551a2c8a0cf6b
    //       export default {
    //         components: {
    //           uniPopup
    //         },
    //         data() {
    //           return {
    //             adminUser: "",
    //             adminPwd: ""
    //           };
    //         },
    //         methods: {
    //           backView() {
    //             uni.navigateBack();
    //           },
    //           adminLogin() {
    //             if (!this.adminUser) {
    //               api.toast("请输入用户名");
    //               return false;
    //             }
    //             if (!this.adminPwd) {
    //               api.toast("请输入密码");
    //               return false;
    //             }
    //             AdminLoginData({
    //               userName: this.adminUser,
    //               password: this.adminPwd
    //             }).then(({ code, data }) => {
    //               if (code === 200) {
    //                 api.toast("登录成功");
    //                 api.setInfo("type", "1");
    //                 api.setInfo("token", data.id);
    //                 uni.navigateBack();
    //               }
    //             });
    //           },
    //           getUserInfo({ detail }) {
    //             if (!detail.userInfo) {
    //               api.toast("请同意授权");
    //               return false;
    //             }
    //             api.showLoad();

    //             uni.login({
    //               success({ code }) {
    //                 const { nickName, avatarUrl } = detail.userInfo;
    //                 UserTest({
    //                   wxCode: code,
    //                   userName: nickName,
    //                   wxImagePath: avatarUrl
    //                 }).then(({ data }) => {
    //                   api.toast("登录成功");
    //                   api.setInfo("token", data.id);
    //                   uni.navigateBack();
    //                 });
    //                 api.hideLoad();
    //               },
    //               fail() {
    //                 api.hideLoad();
    //               }
    //             });
    //           }
    //         }
    //       };
    //     }
    //   }
    // };
</script>

<style lang="scss" scoped>
    .login {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        &-logo {
            width: turn(200);
            height: turn(200);
        }
        
        &-tips {
            text-align: center;
            margin-bottom: turn(100);
            font-size: $size-28;
        }
        
        &-btn {
            width: 100%;
            box-sizing: border-box;
            padding: 0 turn(32);
            display: flex;
            align-items: center;
            
            button {
                font-weight: normal;
                font-size: $size-32;
                padding: turn(5) turn(35) !important;
                
                &.admin {
                    background: $color-zhu;
                }
            }
        }
    }
    
    .admin-login {
        width: turn(500);
        background: $color-fff;
        border-radius: turn(10);
        padding: turn(20);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .title {
            margin-bottom: turn(20);
        }
        
        .input {
            margin-top: turn(30);
            border: turn(1) solid $color-zhu;
            border-radius: turn(16);
            padding: turn(10) turn(20);
            font-size: $size-32;
        }
        
        .btn {
            width: 100%;
            display: flex;
            margin-top: turn(30);
            justify-content: space-around;
            
            button {
                padding: turn(5) turn(35) !important;
                font-weight: normal;
            }
        }
    }
</style>