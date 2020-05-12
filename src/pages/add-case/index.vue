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
        <view class="case-input type">
            <view>
                <text class="input-title">装修风格</text>
            </view>
            <view class="style-type">
                <picker mode="selector" :range="styleData" range-key="name" @change="change">
                    <text class="input-title">{{styleType.name}}</text>↓
                </picker>
            </view>
        </view>
        <view class="case-input">
            <view>
                <text class="input-title">主图</text>
                <text class="tips">(长按删除)</text>
            </view>
            <view class="list-img">
                <image class="add-img bg" v-if="logoImg" @longpress="longPress('logo')" @click="selImg('logo')" :src="logoImg" mode="aspectFill" />
                <image class="add-img" v-if="!logoImg" @click="selImg('logo')" src="/static/images/add.png"/>
            </view>
        </view>
        <view class="case-input">
            <view>
                <text class="input-title">详情主图</text>
                <text class="tips">(长按删除){{detailImg.length}}/5</text>
            </view>
            <view class="list-img">
                <image class="add-img bg" v-for="(item,key) in detailImg" @longpress="longPress('detail',key)" :key="key"
                       :src="item" mode="aspectFill"/>
                <image v-if="detailImg.length<=4" class="add-img" @click="selImg('detail')" src="/static/images/add.png"/>
            </view>
        </view>
        <view class="case-input">
            <text class="input-title">详情内容</text>
            <textarea auto-height class="input-content" v-model="caseContent" placeholder="请输入内容"/>
        </view>
        <view class="case-save">
            <button type="primary" :disabled="!caseTitle || !logoImg || !caseContent" :loading="loading" @click="save">保存</button>
        </view>
    </view>
</template>

<script>
    import {AddCase, GetFile, StyleList} from "../../utils/api";
    import {baseUrl, upload} from "../../utils/request";
    import {api} from "../../utils/util";

    export default {
        data() {
            return {
                caseTitle: '',
                caseAddress:'',
                caseContent: '',
                logoImg: '',
                detailImg: [],
                styleData:[],
                styleNum:-1,
            }
        },
        computed:{
            styleType(){
                if(this.styleNum===-1){
                    return {
                        name:'请选择'
                    };
                }
                return this.styleData[this.styleNum];
            } 
        },
        onLoad(){
          StyleList().then(({data})=>{
              this.styleData = data || [];
          })
        },
        methods: {
            selImg(type) {
                uni.chooseImage({
                    count: (type === 'logo') ? 1 : (5 - this.detailImg.length),
                    success:({tempFilePaths})=> {
                        this.imgUpload(type,tempFilePaths,0);
                    }
                })
            },
            imgUpload(type,file,key){
                api.showLoad();
                upload(file[key]).then(({data})=>{
                    if(type === 'logo'){
                        this.logoImg = `${baseUrl}file/getFile?filePath=${data}`;
                    }
                    else {
                        this.detailImg = [...this.detailImg,`${baseUrl}file/getFile?filePath=${data}`];
                    }
                    if(file.length-1>key){
                        this.imgUpload(type,file,key+1);
                    }
                    api.hideLoad();
                }).catch((err)=>{
                    api.toast(`第${key+1}张失败`);
                })
            },
            longPress(type,key) {
                if(type === 'logo'){
                    this.logoImg = '';
                }
                else {
                    this.detailImg.splice(key,1);
                }
            },
            save(){
                if(!this.styleType.id){
                    api.toast('请选择装修风格');
                    return false;
                }
                AddCase({
                    name:this.caseTitle,
                    caseImagePath:this.logoImg,
                    content:this.caseContent,
                    district:this.caseAddress,
                    fitStage:"11",
                    createId:api.getInfo('token'),
                    imagePaths:this.detailImg,
                    styleId:this.styleType.id
                }).then(({code})=>{
                    if(code===200){
                        api.toast('发布成功');
                        uni.navigateBack();
                    }
                })
            },
            change({detail}){
                this.styleNum = parseInt(detail.value);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./index.scss";
</style>