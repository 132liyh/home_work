<template>
  <view class="calc">
      <view class="calc-input">
          <input type="text" placeholder="请输入地址" v-model="userAddress">
      </view>
      <view class="calc-input">
          <input type="text" placeholder="请输入您房屋面积" v-model="userSize">
      </view>
      <view class="calc-input sel">
          <picker class="left" :range="SelData.selRoom" range-key="value" @change="selData('room',$event)">
              <text>{{showData('selRoom',room).value}}</text>
          </picker>
          <picker class="right" :range="SelData.selKitchen" range-key="value" @change="selData('kitchen',$event)">
              <text>{{showData('selKitchen',kitchen).value}}</text>
          </picker>
      </view>
      <view class="calc-input sel">
          <picker class="left" :range="SelData.selSaloon" range-key="value" @change="selData('saloon',$event)">
              <text>{{showData('selSaloon',saloon).value}}</text>
          </picker>
          <picker class="right" :range="SelData.selToilet" range-key="value" @change="selData('toilet',$event)">
              <text>{{showData('selToilet',toilet).value}}</text>
          </picker>
      </view>
      <view class="calc-input">
          <picker :range="navData" range-key="name" @change="selData('styleNUm',$event)">
              <text>{{styleData.name}}</text>
          </picker>
      </view>
      <view class="calc-input">
          <picker :range="SelData.selGrade" range-key="value" @change="selData('grade',$event)">
              <text>{{showData('selGrade',grade).value}}</text>
          </picker>
      </view>
      <view class="calc-input">
          <input type="tel" placeholder="请输入手机号" v-model="userMobile">
      </view>
      <view class="calc-input btn">
          <button type="primary" plain @click="start">立即预约</button>
      </view>
      
  </view>
</template>

<script>
    import SelData from './type'
    import {StyleList} from "../../utils/api";
export default {
    data() {
        return {
            SelData,
            room:0,   //房间
            saloon:0,   //客厅
            kitchen:0,   //厨房
            toilet:0,    //厕所
            grade:0,     //档次

            navData:[],   //风格
            styleNUm:-1,    //风格

            userAddress:'',
            userSize:'',
            userMobile:''
        }
    },
    computed:{
      styleData(){
          if(this.styleNUm){
              return {
                  name:"请选择装修风格"
              }
          }
          return this.navData[this.styleNUm]
      }
    },
    onLoad(){
        StyleList().then(({data})=>{
            this.navData = data;
        })
    },
    methods:{
        showData(type,num){
            return SelData[type][num] || {value:'请选择'}
        },
        selData(type,{detail}){
            this[type] = detail.value;
        },
        start(){
            if(this.userAddress){
                api.toast('请输入地址');
                return false;
            }
            if(this.userSize){
                api.toast('请输入房屋面积');
                return false;
            }
            if(this.userMobile){
                api.toast('请输入手机号');
                return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>