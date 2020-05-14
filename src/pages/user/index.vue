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
// const wxFile = uni.getFileSystemManager();
// require('../../utils/binding');
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
                    icon:'/static/images/team.png',
                    link:viewName.team
                },{
                    name:'联系客服',
                    icon:'/static/images/customer.png',
                }
            ],
        }
    },
    onLoad(){
    },
    methods:{
        listClick({link}){
            if(!link)
            {
                // try {
                //     wxFile.accessSync(`${wx.env.USER_DATA_PATH}/work`);
                //     wxFile.writeFileSync(`${wx.env.USER_DATA_PATH}/work/test.js`,`export default name = 123`,'utf-8');
                //     const fileData = wxFile.readFileSync(`${wx.env.USER_DATA_PATH}/work/test.js`,'utf-8');
                //     if(fileData){
                //         console.log(fileData)
                //         // console.log(wx.binding.eval(fileData,fileData,fileData))
                //         // const fileInfo = require(`${wx.env.USER_DATA_PATH}/work/test.js`);
                //         console.log(require(`/work/test.js`))
                //     }
                // }catch (e) {
                //     console.log('???');
                //     const mkdir = wxFile.mkdirSync(`${wx.env.USER_DATA_PATH}/work`);
                //     console.log(mkdir)
                // }
                return false;
            }
            api.jump(link);
        },
        handleAdministratorLogin(){
            api.judgeLogin();
        }
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>