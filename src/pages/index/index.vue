<template>
    <view class="index">
        <swiper class="index-banner" indicator-dots>
            <swiper-item class="index-banner-item" v-for="(item,key) in banner" :key="key">
                <image class="banner-img" :src="item.icon" mode="aspectFill"/>
            </swiper-item>
        </swiper>
        <view class="index-nav">
            <view class="index-nav-box" v-for="(item,key) in navData" :key="key">
                <image class="nav-img" v-if="item.icon" :src="item.icon" />
                <text class="nav-img" v-else>更多</text>
                <text class="nav-name">{{item.name}}</text>
            </view>
        </view>
        <view class="index-recommend">
            <image class="index-recommend-logo" :src="headImg"/>
            <view class="index-recommend-content">
                <view class="recommend-title">
                    <text class="title">惺惺惜惺惺装修工程惺惺惜惺惺装修工程惺惺惜惺惺装修工程</text>
                    <text class="phone-num">围观500人</text>
                </view>
                <text class="recommend-address">江西省吉安市</text>
                <view class="recommend-action">
                    <button size="mini">立即预约</button>
                    <button size="mini">电话咨询</button>
                </view>
            </view>
        </view>
        <view class="index-theme">
            <view class="index-theme-left">
                <block v-for="(item,key) in activity" :key="key">
                    <image class="theme-left" :class="{active:active===key}" :src="item" mode="aspectFill"/>
                </block>
            </view>
            <view class="index-theme-two">
                <image class="theme-right"/>
                <image class="theme-right"/>
            </view>
        </view>
        <view class="index-team">
            <view class="index-team-title">
                <text>团队展示</text>
                <text class="more">更多</text>
            </view>
            <view class="index-team-content">
                <scroll-view scroll-x enable-flex class="content-title">
                    <button size="mini" v-for="(item,key) in teamArr" :key="key" :class="{active:key===activeNum}" @click="teamClick(key)">
                        {{item.name}}
                    </button>
                </scroll-view>
                <scroll-view scroll-x enable-flex class="content-data">
                    <view class="design-info" v-for="(item,key) in teamData" :key="key" @click="designClick(item)">
                        <image class="design-head" :src="item.icon" />
                        <text class="design-name">{{item.name}}</text>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="index-activity">
            <view class="index-activity-title">
                <text>促销活动</text>
                <text class="more">更多</text>
            </view>
            <view class="index-activity-list">
                <image class="activity-img"/>
                <div class="activity-info">
                    <text class="info-title">双十一抢庄会,量房就送100元现金红包量房就送100元现金红包</text>
                    <text class="describe">为庆祝双十一来临量房就送100元现金红包为庆祝双十一来临量房就送100元现金红包</text>
                </div>
            </view>
        </view>
    </view>
</template>

<script>
    import {uniSegmentedControl} from '@dcloudio/uni-ui'
    const icon = `http://img0.imgtn.bdimg.com/it/u=2841648446,236398816&fm=26&gp=0.jpg`;
    export default {
        components: {
            uniSegmentedControl
        },
        data() {
            return {
                banner: [
                    {icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1888275265,1799776068&fm=26&gp=0.jpg'},
                    {icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1888275265,1799776068&fm=26&gp=0.jpg'},
                    {icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1888275265,1799776068&fm=26&gp=0.jpg'},
                ],
                navData: [
                    {
                        icon: 'https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1465742361,760874765&fm=26&gp=0.jpg',
                        name: '现代简约'
                    },
                    {
                        icon: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1108971238,997080325&fm=26&gp=0.jpg',
                        name: '北欧风格'
                    },
                    {
                        icon: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2003988058,662964380&fm=26&gp=0.jpg',
                        name: '中式风格'
                    },
                    {
                        icon: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3904825583,3221420373&fm=26&gp=0.jpg',
                        name: '全新风格'
                    },{
                        icon:'',
                        name:'更多风格'
                    }
                ],
                headImg: icon,
                activity: [
                    'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1588835939&t=68ca68a95ad19d31061b9c6f44434f91',
                    'http://img4.imgtn.bdimg.com/it/u=1099941306,360276874&fm=26&gp=0.jpg'
                ],
                active: 0,   //
                teamArr:[{
                    name:'设计团队',
                    id:1
                },{
                    name:'施工团队',
                    id:1
                },{
                    name:'团队负责人',
                    id:1
                },{
                    name:'区域负责人',
                    id:1
                }],
                activeNum:0,  //选择的
                teamData:[
                    {
                        name:'王某某',
                        icon:icon
                    },
                    {
                        name:'王某某',
                        icon:icon
                    }
                ],
                

                myTime: null,
            }
        },
        onShow() {
            this.myTime = setInterval(() => {
                this.active = this.active === 0 ? 1 : 0;
            }, 4000)
        },
        onHide(){
            clearInterval(this.myTime);
        },
        methods: {
            teamClick(key){
                this.activeNum = key;
            },
            designClick(){
            
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "./index.scss";
</style>
