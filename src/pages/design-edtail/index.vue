<template>
    <view class="design">
        <view class="design-info">
            <image class="head-img" :src="userData.imagePath"/>
            <view class="user-box">
                <text class="user-name">{{userData.name}}</text>
                <text>|</text>
                <text class="user-work">{{userData.workYear || 0}}年</text>
            </view>
        </view>
        <view class="design-user">
            <view class="user-data">
                <text class="user-title">个人介绍</text>
                <text class="user-content">{{userData.content}}</text>
            </view>
        </view>
        <view class="design-user">
            <view class="user-data">
                <text class="user-title">个人案例</text>
                <swiper class="swiper">
                    <swiper-item>
                        <view class="swiper-item uni-bg-red">A</view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
        <view class="design-follow" @click="followFn" v-if="showFollow">
            <text>{{follow?'关注':'取消关注'}}</text>
        </view>
    </view>
</template>

<script>
    import {AddUserFocus, DeleteUserFocus, DesignerDetails} from "../../utils/api";
    import {api} from "../../utils/util";

    export default {
        data() {
            return {
                follow: false,
                userData:{},
                showFollow:false,
            }
        },
        onLoad() {
            this.showFollow = api.getInfo('token');
            api.showLoad();
            const {id} = api.getData();
            DesignerDetails({id}).then(({code,data,msg})=>{
                api.hideLoad();
                if(code===500){
                    api.tipsBack({
                        content:msg
                    });
                    return false;
                }
                uni.setNavigationBarTitle({
                    title:data.name
                });
                this.userData = data;
            })
        },
        methods: {
            followFn() {
                if(!api.judgeLogin()){
                    return false;
                }
                api.showLoad();
                const {id} = api.getData();
                const userFocus = this.follow?AddUserFocus:DeleteUserFocus;
                userFocus({
                    designerId:id,
                    userId:this.showFollow
                }).then(({code,data})=>{
                    if(code===500){
                        api.toast('错误');
                    }
                    this.follow = !this.follow;
                    api.hideLoad();
                })
            }
        },
    };
</script>

<style scoped lang="scss">
    @import "./index.scss";
</style>