<template>
    <view class="user">
        <view class="user-info">
            <view class="user-head">
                <open-data type="userAvatarUrl" />
            </view>
            <view class="user-nikename">
                <open-data type="userNickName" />
            </view>
        </view>
        <view class="user-list">
            <view v-for="(item,key) in myList" :key="key" 
                class="user-list-box"
                hover-class="list-click"
                :hover-stay-time="70">
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
export default {
    data(){
        return{
            rightIcon:'\u21A3',
            myList:[
                {
                    name:'我的收藏',
                    icon:'/static/images/collection.png',
                },{
                    name:'我的关注',
                    icon:'/static/images/teampng.png',
                },{
                    name:'我的预约',
                    icon:'/static/images/subscribe.png',
                },{
                    name:'联系客服',
                    icon:'/static/images/customer.png',
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>