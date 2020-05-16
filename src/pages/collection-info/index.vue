<template>
  <view class="collection-info">
      <uni-icons class="collection-info-filled" @click="fabulous" type="heart-filled" :color="collectionData.isUserCase===1?'#ffaa55':'#999'" size="20" />
      <swiper class="swiper" indicator-dots v-if="collectionData.imagePath.length">
          <swiper-item v-for="(item,key) in collectionData.imagePath" :key="key">
              <image :src="item" model="aspectFill" />
          </swiper-item>
        </swiper>
        <view class="collection-info-title">
            <text>{{collectionData.name || ''}}---{{collectionData.styleName || ''}}</text>
        </view>
        <view class="collection-info-tips">
            <text class="tips-box">
                  {{collectionData.content || ''}}
            </text>
        </view>
  </view>
</template>

<script>
import {api} from '../../utils/util';
import collection from '../collection/collection.json';
import { uniIcons } from '@dcloudio/uni-ui';
import {AddCollect, CancelCollect, GetCaseItem} from '../../utils/api';
export default {
      components: {
            uniIcons,
      },
    data() {
        return {
            collectionData: {
                banner:[],
                content:'',
                name:'',
                styleName:'',
                isUserCase:0,
            }
        }
    },
    onLoad(){
        const {id} = api.getData();
        
        GetCaseItem({
            id,
            userId:api.getInfo("token")
        }).then(({code,data})=>{
            if(code!==200){
                api.tipsBack({
                    content:'内容走丢了'
                })
                return false;
            }
            this.collectionData = data;

            uni.setNavigationBarTitle({
                title: data.name || '经典案例'
            });
        })
        
    },
    methods:{
          fabulous(){
              console.log(1)
                if(!api.judgeLogin()){
                    return false;
                }
                api.showLoad();
                const {id} = api.getData();
                const postData={
                    caseId: id,
                    userId: api.getInfo('token'),
                }
                
                const CollectAjax =  (this.collectionData.isUserCase===1)?CancelCollect:AddCollect;

                CollectAjax(postData).then(({code})=>{
                    api.hideLoad();
                    if(code===200){
                        this.$set(this.collectionData,'isUserCase',this.collectionData.isUserCase===1?0:1);
                        uni.showNavigationBarLoading();
                        const time = setTimeout(() => {
                            uni.hideNavigationBarLoading();
                            clearTimeout(time);
                        }, 500);
                    }
                })
          }
    }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>