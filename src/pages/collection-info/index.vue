<template>
  <view class="collection-info">
      <uni-icons class="collection-info-filled" @click="fabulous" type="heart-filled" :color="collectionData.filled==1?'#ffaa55':'#999'" size="20" />
      <swiper class="swiper" indicator-dots v-if="collectionData.banner.length">
          <swiper-item v-for="(item,key) in collectionData.banner" :key="key">
              <image :src="item" />
          </swiper-item>
        </swiper>
        <view class="collection-info-title">
            <text>{{collectionData.title}}</text>
        </view>
        <view class="collection-info-tips">
            <text class="tips-box" v-for="(item,key) in collectionData.content" :key="key">
                  {{item}}
            </text>
        </view>
  </view>
</template>

<script>
import {api} from '../../utils/util';
import collection from '../collection/collection.json';
import { uniIcons } from '@dcloudio/uni-ui';
import { FindChartItem } from '../../utils/api';
export default {
      components: {
            uniIcons,
      },
    data() {
        return {
            collectionData: {
                banner:[],
                content:[],
                title:'',
                filled:1
            }
        }
    },
    onLoad(){
        const {id} = api.getData();

        FindChartItem({id}).then(()=>{

        })
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
        
    },
    methods:{
          fabulous(){                
                this.$set(this.collectionData,'filled',this.collectionData.filled==1?0:1);
                uni.showNavigationBarLoading();
                const time = setTimeout(() => {
                      uni.hideNavigationBarLoading();
                      clearTimeout(time);
                }, 500);                
          }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>