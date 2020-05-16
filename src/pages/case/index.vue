<template>
    <view class="case-list">
        <view class="case-list-search">
            <input type="text" placeholder="请输入需要搜索的案例名称" v-model="searchName" />
            <button size="mini" type="warn" @click="searchData">搜索</button>
        </view>
        <view class="case-list-content left">
            <view class="list-content" v-for="(item,key) in caseData" :key="key" @click="caseClick(item)" @longpress="longPress(item,key)">
                <image class="list-img" :src="item.imagePath" mode="aspectFill"/>
                <text class="list-name">{{item.name}}</text>
            </view>
        </view>
        <!--<view class="case-list-content right">
            <view class="list-content" v-for="(item,key) in rightInfo" :key="key" @click="caseClick(item)">
                <image class="list-img" :src="item.imagePath" mode="widthFix"/>
                <text class="list-name">{{item.name}}</text>
            </view>
        </view>-->
        <div class="loading">
            <uni-load-more :status="statusTips"/>
        </div>
        
        <!--<view class="case-list-add">
            <navigator url="/pages/add-case/index" hover-class="none">
                <image class="add-img" src="/static/images/add-case.png"/>
            </navigator>
        </view>-->
        <uni-fab
                class="uni-fab-box"
                :pattern="pattern"
                :content="content"
                horizontal="right"
                ref="fabInfo"
                direction="vertical"
                @trigger="trigger"/>
        <!-- <button open-type="getUserInfo" @getuserinfo="getuserinfo">getInfo</button> -->
    </view>
</template>

<script>
    import {DeleteCase, FindChartList} from '../../utils/api'
    import {api, viewName} from '../../utils/util';
    import {uniFab} from '@dcloudio/uni-ui';

    export default {
        components: {
            uniFab
        },
        data() {
            return {
                searchName:'',
                caseData: [],
                statusTips: 'loading',
                postData: {
                    "page": {
                        "index": 0,
                        "size": 0
                    },
                    "paging": true,
                    "type": 0
                },
                pattern: {
                    color: '#fff',
                    selectedColor: '#fff',
                    backgroundColor: '#ffaa55',
                },
                content: [],
                showFab: false
            }
        },
        computed: {
        
        },
        onLoad() {
            FindChartList(this.postData).then(({code, data}) => {
                this.caseData = data;
                const time = setTimeout(() => {
                    this.statusTips = 'noMore';
                    clearTimeout(time);
                }, 500);
            })
        },
        onShow() {
            this.showFab = api.getInfo('token') || api.getInfo('type');
            let btnArr = [
                {
                    iconPath: "/static/images/case.png",
                    text: '发布案例',
                    path: viewName.addCase
                }
            ]
            if(api.getInfo('type')){
                btnArr.push({
                    iconPath: "/static/images/style.png",
                    text: '新增风格',
                    path: `${viewName.addCase}?addStyle=1`
                });
                this.content = btnArr
            }
            else {
                this.content = btnArr
            }
        },
        methods: {
            searchData(){
              if(!this.searchName)
                  return false;
            },
            caseClick({id}) {
                api.jump(viewName.collectionInfo, {
                    id
                })
            },
            trigger({item}) {
                api.jump(item.path);
                this.$refs.fabInfo.close()
            },
            longPress({id},key){
                if(!api.getInfo('type')){
                    return false
                }
                uni.showActionSheet({
                    itemList: ['查看详情','删除'],
                    success:({tapIndex})=>{
                        if(tapIndex===0){
                            this.caseClick({id});
                            return false;
                        }
                        if(tapIndex===1){
                            uni.showModal({
                                title:'温馨提示',
                                content:'确认删除吗?',
                                success:({confirm})=>{
                                    if(confirm){
                                        DeleteCase({
                                            caseId:id
                                        }).then(({code})=>{
                                            if(code===200){
                                                api.toast('删除成功');
                                                this.caseData.splice(key,1);
                                            }
                                        })
                                    }
                                }
                            })
                        }
                        
                    }
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import './index.scss';
    
    .uni-fab-box {
        transform: scale(0.8, 0.8);
        position: fixed;
        right: turn(20);
        bottom: turn(20);
    }
</style>