<template>
    <view class="case">
        <view class="case-input">
            <text class="input-title">标题</text>
            <view class="input-box">
                <input type="text" v-model="caseTitle" placeholder="请输入标题" />
            </view>
        </view>
        <view class="case-input">
            <text class="input-title">主图</text>
            <image class="add-img" @click="selImg('logo')" src="/static/images/add.png" />
        </view>
        <view class="case-input">
            <text class="input-title">详情主图</text>
            <view class="list-img">
                <image class="add-img" v-for="(item,key) in detailImg" :key="key" :src="item" />
                <image class="add-img" @click="selImg('detail')"  src="/static/images/add.png" />
            </view>
        </view>
        <view class="case-input">
            <text class="input-title">详情内容</text>
            <textarea auto-height class="input-content" v-model="caseContent" placeholder="请输入内容" />
        </view>
        <view class="case-save">
            <button type="primary" :loading="loading">保存</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                caseTitle: '',
                caseContent:'',
                detailImg:[],

                loading:false
            }
        },
        methods:{
            selImg(){
                uni.chooseImage({
                    success({tempFilePaths}){
                        console.log(tempFilePaths)
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>