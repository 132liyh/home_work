<template>
    <view class="case">
        <view class="case-input">
            <text class="input-title">标题</text>
            <view class="input-box">
                <input type="text" v-model="caseTitle" placeholder="请输入标题"/>
            </view>
        </view>
        <view class="case-input">
            <text class="input-title">地区</text>
            <view class="input-box">
                <input type="text" v-model="caseAddress" placeholder="请输入地区"/>
            </view>
        </view>
        <view class="case-input">
            <view>
                <text class="input-title">主图</text>
                <text class="tips">(长按删除)</text>
            </view>
            <view class="list-img">
                <image class="add-img" v-if="logoImg" @longpress="longPress('logo')" @click="selImg('logo')" :src="logoImg" mode="aspectFill" />
                <image class="add-img" v-if="!logoImg" @click="selImg('logo')" src="/static/images/add.png"/>
            </view>
        </view>
        <view class="case-input">
            <view>
                <text class="input-title">详情主图</text>
                <text class="tips">(长按删除)</text>
            </view>
            <view class="list-img">
                <image class="add-img" v-for="(item,key) in detailImg" @longpress="longPress('detail',key)" :key="key"
                       :src="item" mode="aspectFill"/>
                <image v-if="detailImg.length<=1" class="add-img" @click="selImg('detail')" src="/static/images/add.png"/>
            </view>
        </view>
        <view class="case-input">
            <text class="input-title">详情内容</text>
            <textarea auto-height class="input-content" v-model="caseContent" placeholder="请输入内容"/>
        </view>
        <view class="case-save">
            <button type="primary" :loading="loading" @click="save">保存</button>
        </view>
    </view>
</template>

<script>
    import {AddCase, GetFile} from "../../utils/api";
    import {upload} from "../../utils/request";
    import {api} from "../../utils/util";

    export default {
        data() {
            return {
                caseTitle: '',
                caseAddress:'',
                caseContent: '',
                logoImg: '',
                detailImg: [],

                loading: false
            }
        },
        methods: {
            selImg(type) {
                uni.chooseImage({
                    count: (type === 'logo') ? 1 : (5 - this.detailImg.length),
                    success:({tempFilePaths})=> {
                        if(type === 'logo'){
                            this.logoImg = tempFilePaths[0];
                        }
                        else {
                            this.detailImg = [...this.detailImg,...tempFilePaths];
                        }

                        this.imgUpload(tempFilePaths,0);
                    }
                })
            },
            imgUpload(file,key){
                api.showLoad(`上传第${key+1}张`);
                upload(file[key]).then(({data})=>{
                    console.log(data);
                    GetFile(data).then((res)=>{
                        console.log(res);
                        if(file.length-1<key){
                            this.imgUpload(file,key+1);
                        }
                        api.hideLoad();
                    })
                }).catch((err)=>{
                    console.log(err)
                    api.toast(`第${key+1}张失败`);
                })
            },
            longPress(type,key) {
                if(type === 'logo'){
                    this.logoImg = '';
                }
                else {
                    this.detailImg.splice(key,1); 
                    console.log(1111111);
                }
            },
            save(){
                AddCase({
                    name:"首次发送案例",
                    caseImagePath:"http://b-ssl.duitang.com/uploads/item/201901/09/20190109072726_aNNZd.thumb.700_0.jpeg",
                    content:"测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
                    district:"11",
                    fitStage:"11",
                    createId:2,
                    imagePaths:[
                        "http://b-ssl.duitang.com/uploads/item/201901/09/20190109072726_aNNZd.thumb.700_0.jpeg",
                        "http://b-ssl.duitang.com/uploads/item/201901/09/20190109072726_aNNZd.thumb.700_0.jpeg"
                    ]
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./index.scss";
</style>