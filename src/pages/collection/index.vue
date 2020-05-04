<template>
    <view class="collection">
        <view class="collection-list" 
            v-for="(item,key) in collection" 
            :key="key"
            hover-class="list-click"
            :hover-stay-time="70"
            @click="listClick(item)">
            <image class="list-icon" :src="item.icon" mode="aspectFill" />
            <view class="list-content">
                <text class="list-title">
                    {{item.title}}
                </text>
                <text class="list-tips" v-if="item.content">{{item.content | content}}</text>
            </view>
        </view>
        
        <uni-load-more :status="statusTips" />
    </view>
</template>
<script>
import collection from './collection.json';
import {api, viewName} from '../../utils/util';
export default {
    data() {
        return {
            collection: collection,
            statusTips:'loading'
        }
    },
    filters: {
        content(value) {
            return value?value[0]:'';
        }
    },
    onLoad(){
        const time = setTimeout(()=>{
            this.statusTips = 'noMore';
            clearTimeout(time);
        },2000);
    },
    methods:{
        listClick({id}){
            api.jump(viewName.collectionInfo,{
                id
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
