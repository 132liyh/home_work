<template>
    <view class="team">
        <view class="team-list" 
            hover-class="list-click"
            :hover-stay-time="70"
            v-for="(item,key) in teamList" :key="key">
            <image class="team-logo" :src="item.icon" mode="" />
            <view class="team-box">
                <text>
                    {{item.name}}
                </text>
                <text class="right-icon">{{rightIcon}}</text>
            </view>
        </view>
        <uni-load-more :status="statusTips" />
    </view>
</template>

<script>
export default {
    data() {
        return {
            rightIcon:'\u21A3',
            teamList: [
                {
                    icon:'http://img0.imgtn.bdimg.com/it/u=2841648446,236398816&fm=26&gp=0.jpg',
                    name:'全一 Team'
                }
            ],
            statusTips:'loading'
        }
    },
    onLoad(){
        const time = setTimeout(()=>{
            this.statusTips = 'noMore';
            clearTimeout(time);
        },2000);
    },
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>