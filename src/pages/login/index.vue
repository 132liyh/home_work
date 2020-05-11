<template>
      <view class="login">
            <image class="login-logo" src="/static/images/logo.jpg" />
            <text class="login-tips">
                  我们需要获取您得到个人信息
            </text>
            <view class="login-btn">
                 <button size="mini" @click="backView">暂不授权</button>
                 <button size="mini" open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary">立即授权</button>
            </view>
      </view>
</template>

<script>
import { api } from '../../utils/util';
import { UserTest } from '../../utils/api';
export default {
      data() {
            return {
            }
      },
      methods: {
            backView() {
                  uni.navigateBack();
            },
            getUserInfo({detail}){
                  if(!detail.userInfo){
                        api.toast('请同意授权');
                        return false;
                  }
                  
                  uni.login({
                        success({code}){
                            const {nickName,avatarUrl} = detail.userInfo;
                              UserTest({
                                  wxCode:code,
                                  userName:nickName,
                                  wxImagePath:avatarUrl,
                              }).then((res)=>{
                                    console.log(res);
                              })
                        }
                  })
            }
      },
}
</script>

<style lang="scss" scoped>
.login{
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      &-logo{
            width: turn(200);
            height: turn(200);
      }
      &-tips{
            text-align: center;
            margin-bottom: turn(100);
            font-size: $size-28;
      }
      &-btn{
            width: 100%;
            box-sizing: border-box;
            padding: 0 turn(32);
            display: flex;
            align-items: center;
            button{
                  font-weight: normal;
                  font-size: $size-32;
                  padding: turn(5) turn(35) !important;
            }
      }
}
</style>