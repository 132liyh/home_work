<template>
    <view class="user">
        <view class="user-info" @click="handleAdministratorLogin" >
            <view class="user-head">
                <open-data type="userAvatarUrl" />
            </view>
            <view class="user-nikename">
                <open-data type="userNickName" />
            </view>
            <text class="right-icon">{{rightIcon}}</text>
        </view> 
        <view class="user-list">
            <view v-for="(item,key) in myList" :key="key" 
                class="user-list-box"
                hover-class="list-click"
                :hover-stay-time="70"
                @click="listClick(item)">
                <image class="list-icon" :src="item.icon" />
                <view class="list-right">
                    <text class="list-name">{{item.name}}</text>
                    <text class="right-icon">{{rightIcon}}</text>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import {viewName, api} from '../../utils/util';

export default {
    data(){
        return{
            rightIcon:'\u21A3',
            myList:[
                {
                    name:'我的预约',
                    icon:'/static/images/subscribe.png',
                },{
                    name:'我的收藏',
                    icon:'/static/images/collection.png',
                    link:viewName.collection
                },{
                    name:'我的关注',
                    icon:'/static/images/teampng.png',
                    link:viewName.team
                },{
                    name:'联系客服',
                    icon:'/static/images/customer.png',
                }
            ],
            adminLLogin: viewName.userLogin,
        }
    },
    methods:{
        listClick({link}){
            if(!link)
                return false;
            api.jump(link);
        },
        handleAdministratorLogin(){
            uni.navigateTo({
                url: this.adminLLogin,
                success: (res) => {
                    console.log(res);
                },
                fail: (err) => {
                    console.log(err);
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>