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
                <text class="input-title">设计师</text>
            </view>
            <view class="style-type">
                <picker mode="selector" :range="designData" range-key="name" @change="change($event,'designNum')">
                    <text class="input-title">{{caseType.name}}</text>↓
                </picker>
            </view>
        </view>
        <view class="case-input type">
            <view>
                <text class="input-title">装修风格</text>
            </view>
            <view class="style-type">
                <picker mode="selector" :range="styleData" range-key="name" @change="change($event,'styleNum')">
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
        <uni-popup ref="style" :maskClick="false">
            <view class="add-style">
                <text class="title">新增风格</text>
                <image class="add-img" @click="selImg('style')" :src="styleImg?styleImg:'/static/images/add.png'" mode="aspectFill"/>
                <input class="input" v-model="styleName" type="text" placeholder="请输入风格类型">
                <button class="add" size="mini" type="primary" @click="addSave">添加</button>
            </view>
        </uni-popup>
    </view>
</template>

<script>
    import {AddCase, AddStyle, DesignerRegistration, StyleList} from "../../utils/api";
    import {baseUrl, upload} from "../../utils/request";
    import {api} from "../../utils/util";
    import {uniPopup} from "@dcloudio/uni-ui";

    export default {
        components: {
            uniPopup
        },
        data() {
            return {
                caseTitle: '',
                caseAddress:'',
                caseContent: '',
                logoImg: '',
                detailImg: [],
                styleData:[],
                styleNum:-1,
                
                styleImg:'',
                styleName:'',


                designData:[],
                designNum:-1
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
            },
            caseType(){
                if(this.designNum===-1){
                    return {
                        name:'请选择'
                    };
                }
                return this.designData[this.designNum];
            }
        },
        onLoad(){
          const {addStyle} = api.getData();
           if(addStyle && api.getInfo('type')){
               this.$refs.style.open();
           }
          StyleList().then(({data})=>{
              this.styleData = data || [];
          })
            api.showLoad();
            DesignerRegistration({groupId: 1}).then(({code, data}) => {
                this.designData = data;
                api.hideLoad();
            });
        },
        methods: {
            selImg(type) {
                uni.chooseImage({
                    count: (type === 'detail') ? (5 - this.detailImg.length) : 1,
                    success:({tempFilePaths})=> {
                        this.imgUpload(type,tempFilePaths,0);
                    }
                })
            },
            imgUpload(type,file,key){
                api.showLoad();
                upload(file[key]).then(({data})=>{
                    if(type === 'detail'){
                        this.detailImg = [...this.detailImg,`${baseUrl}file/getFile?filePath=${data}`];
                    }
                    else {
                        this[`${type}Img`] = `${baseUrl}file/getFile?filePath=${data}`;
                    }
                    if(file.length-1>key){
                        this.imgUpload(type,file,key+1);
                    }
                    api.hideLoad();
                }).catch((err)=>{
                    api.toast(`第${key+1}张失败`);
                })
            },
            addSave(){
                if(!this.styleImg){
                    api.toast('请添加装修风格');
                    return false;
                }
                if(!this.styleName){
                    api.toast('请添加装修名称');
                    return false;
                }
                AddStyle({
                    createId:api.getInfo('token'),
                    imagePath:this.styleImg,
                    name:this.styleName
                }).then(({code})=>{
                    if(code===200){
                        api.toast('添加成功');
                        uni.navigateBack();
                    }
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
                    styleId:this.styleType.id,
                    designerId:this.caseType.id,
                }).then(({code})=>{
                    if(code===200){
                        api.toast('发布成功');
                        uni.navigateBack();
                    }
                    else {
                        api.toast('发布失败');
                    }
                })
            },
            change({detail},type){
                this[type] = parseInt(detail.value);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "./index.scss";
    .add-style{
        width: turn(500);
        background: $color-fff;
        border-radius: turn(10);
        padding: turn(20);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        .add-img{
            width: turn(100);
            height: turn(100);
            margin: $size-28;
        }
        .input{
            border: turn(1) solid $color-zhu;
            padding: turn(10) turn(20);
            font-size: $size-32;
        }
        .add{
            font-weight: normal;
            padding: turn(2) turn(80);
            margin-top: $size-32;
        }
    }
</style>