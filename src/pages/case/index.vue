<template>
  <view class="case-list">
       <view class="case-list-content left">
             <view class="list-content" v-for="(item,key) in leftInfo" :key="key" @click="caseClick(item)">
                  <image class="list-img" :src="item.imageUrl" mode="widthFix" />
                  <text class="list-name">{{item.name}}</text>
             </view>
       </view>
       <view class="case-list-content right">
            <view class="list-content" v-for="(item,key) in rightInfo" :key="key" @click="caseClick(item)">
                  <image class="list-img" :src="item.imageUrl" mode="widthFix" />
                  <text class="list-name">{{item.name}}</text>
            </view>
       </view>
       <div class="loading">
            <uni-load-more :status="statusTips" />
       </div>
       <!-- <button open-type="getUserInfo" @getuserinfo="getuserinfo">getInfo</button> -->
  </view>
</template>

<script>
import {FindChartList} from '../../utils/api'
import { api, viewName } from '../../utils/util';
export default {
      data() {
            return {
                  caseData:[],
                  statusTips:'loading',
            }
      },
      computed: {
            leftInfo(){
                  if(!this.caseData){
                        return false;
                  }
                  return this.caseData.filter((item,key)=>{
                        if(key%2===0){
                              return item;
                        }
                  })
            },
            rightInfo(){
                  if(!this.caseData){
                        return false;
                  }
                  return this.caseData.filter((item,key)=>{
                        if(key%2!==0){
                              return item;
                        }
                  })
            }
      },
      onLoad(){
            // console.log(this.leftInfo);
            // console.log(this.rightInfo);
            const postData={
                  "page": {
                        "index": 0,
                        "size": 0
                  },
                  "paging": true,
                  "type": 0
            }
            FindChartList(postData).then(({code,date})=>{
                  this.caseData = date;
                  
                  const time = setTimeout(()=>{
                        this.statusTips = 'noMore';
                        clearTimeout(time);
                  },500);
            })
      },
      methods:{
            caseClick({id}){
                  api.jump(viewName.collectionInfo,{
                        id
                  })
            },
            // getuserinfo({detail}){
            //       if(detail.userInfo){
            //             // detail.userInfo.nickName
            //       }
            // }
      }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>