<template>
    <view class="index">
        <swiper class="index-banner" indicator-dots>
            <swiper-item class="index-banner-item" v-for="(item,key) in banner" :key="key">
                <image class="banner-img" :src="item.icon" mode="aspectFill"/>
            </swiper-item>
        </swiper>
        <view class="index-nav">
            <view class="index-nav-box" v-for="(item,key) in navDataCom" :key="key" @click="getTeamMore(item)">
                <image class="nav-img" v-if="item.imagePath" :src="item.imagePath"/>
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
                    <button size="mini" @click="subscribe">立即预约</button>
                    <button size="mini" @click="callPhone">电话咨询</button>
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
                <image class="theme-right"
                       src="https://iph.href.lu/282x162?text=%E4%B8%8D%E6%98%BE%E7%A4%BA%E6%95%B0%E6%8D%AE%E5%B0%B1%E7%82%B9%E6%88%91"
                       @click="openDeBug"/>
                <image class="theme-right"/>
            </view>
        </view>
        <view class="index-team">
            <view class="index-team-title">
                <text>团队展示</text>
                <text class="more">更多</text>
            </view>
            <view class="index-team-content">
                <!--<scroll-view scroll-x enable-flex class="content-title">
                    <button size="mini" v-for="(item,key) in teamArr" :key="key" :class="{active:key === activeNum}"
                            @click="teamClick(key)">
                        {{item.name}}
                    </button>
                </scroll-view>-->
                <scroll-view scroll-x enable-flex class="content-data">
                    <view class="design-info" v-for="(item,key) in designData" :key="key" @click="designClick(item)">
                        <image class="design-head" :src="item.imagePath"/>
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
    import {api, viewName} from '../../utils/util';
    import {DesignerRegistration, StyleList} from "../../utils/api";

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
                navData: [],
                headImg: icon,
                activity: [
                    'http://t8.baidu.com/it/u=3571592872,3353494284&fm=79&app=86&size=h300&n=0&g=4n&f=jpeg?sec=1588835939&t=68ca68a95ad19d31061b9c6f44434f91',
                    'http://img4.imgtn.bdimg.com/it/u=1099941306,360276874&fm=26&gp=0.jpg'
                ],
                active: 0,   //
                // teamArr: [{
                //     name: '设计团队',
                //     id: 1
                // }, {
                //     name: '施工团队',
                //     id: 2
                // }, {
                //     name: '团队负责人',
                //     id: 3
                // }, {
                //     name: '区域负责人',
                //     id: 4
                // }],
                activeNum: 0,  //选择的
                designData: [],
                myTime: null,
            }
        },
        computed:{
            navDataCom(){
                let navBackData = this.navData;
                if(navBackData.length >= 5){
                    navBackData = navBackData.slice(0,4);
                }
                navBackData.push({
                    name:'更多'
                })
                return navBackData;
            }
        },
        onShow() {
            this.myTime = setInterval(() => {
                this.active = this.active === 0 ? 1 : 0;
            }, 4000)
        },
        onLoad() {
            StyleList().then(({data})=>{
                this.navData = data;
            });
            DesignerRegistration({groupId:1}).then(({code, data}) => {
                this.designData = data;
            });
        },
        onHide() {
            clearInterval(this.myTime);
        },
        methods: {
            teamClick(key) {
                this.activeNum = key;
            },
            getTeamMore(item) {
                api.jump(viewName.teamMore)
            },

            designClick() {

            },
            subscribe() {
                api.jump(viewName.subscribe);
            },
            callPhone() {
                uni.makePhoneCall({
                    phoneNumber: '13800138000'
                })
            },
            openDeBug() {
                uni.setEnableDebug({
                    enableDebug: true
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "./index.scss";
</style>
