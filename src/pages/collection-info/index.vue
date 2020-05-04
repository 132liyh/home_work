<template>
  <view class="collection-info">
      <swiper class="swiper" indicator-dots v-if="collectionData.banner.length">
          <swiper-item v-for="(item,key) in collectionData.banner" :key="key">
              <image :src="item" />
          </swiper-item>
        </swiper>
        <view class="collection-info-title">
            <text>{{collectionData.title}}</text>
        </view>
        <view class="collection-info-tips">
            <view class="tips-box" v-for="(item,key) in collectionData.content" :key="key">
                <text>
                    {{item}}
                </text>
            </view>
        </view>
  </view>
</template>

<script>
import {api} from '../../utils/util';
import collection from '../collection/collection.json'
export default {
    data() {
        return {
            collectionData: {
                banner:[],
                content:[],
                title:''
            }
        }
    },
    onLoad(){
        const {id} = api.getData();
        this.collectionData = collection.find((item)=>{
            return item.id==id;
        })
        if(!this.collectionData.banner && !this.collectionData.content){
            api.tipsBack({
                content:'内容走丢了'
            })
        }
        uni.setNavigationBarTitle({
            title: this.collectionData.title || '经典案例'
        });
        
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>