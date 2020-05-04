<template>
  <view class="subscribe">
      <view class="subscribe-title">
          <text class="big">专业家装设计师</text>
          <text class="small">对于家的设计 以人为本 满足您的需求</text>
      </view>
      <view class="subscribe-list">
          <view class="list-box" v-for="(item,key) in list" :key="key" @click="hide(key)">
              <image class="list-icon" :src="item.icon" mode="widthFix" />
              <view class="list" :class="{hide:active==key}">
                  <text v-for="(tips,index) in item.tips" :key="index">
                      {{tips}}
                  </text>
              </view>
          </view>
      </view>
      <view class="subscribe-content">
        <view class="subscribe-title">
            <text class="big">在施工地</text>
            <text class="small">55项专利工艺 欧洲8+N工艺体系 为您打造10年如新的家</text>
        </view>
        <view class="subscribe-content-tips">
            <text>当前共有112个工地火热进行中</text>
        </view>
        <view class="subscribe-content-site">
            <view class="site-box" v-for="(item,key) in siteDat" :key="key" >
                <text class="title">{{item.title}}</text>
                <view>
                    <text class="num">{{item.num}}</text>套
                </view>
                <text class="address">{{item.address}}</text>
            </view>
        </view>
      </view>
      <view class="subscribe-spet">
          <view class="spet-box" v-for="(item,key) in spetList" :key="key" >
              <text>{{item}}</text>
              <text class="bg">{{key+1}}</text>
          </view>
      </view>
  </view>
</template>

<script>
import {List,siteDat,spetList} from './list';

export default {
    data() {
        return {
            list: List,
            active:-1,
            siteDat:siteDat,
            spetList:spetList,

            myTime:null
        }
    },
    methods:{
        hide(key){
            this.active = key;
            if(this.myTime){
                clearTimeout(this.myTime);
            }
            this.myTime = setTimeout(() => {
                this.active = -1;
            }, 2000);
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>