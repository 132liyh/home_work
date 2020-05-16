<template>
  <view>
    <view class="end-title">
      <view @tap="change(0)" :class="{btna:btnnum == 0}">设计师</view>
      <view @tap="change(1)" :class="{btna:btnnum == 1}">注册设计师</view>
    </view>
    <view class="end-cont" :class="{dis:btnnum == 0}">0信息</view>
    <view class="end-cont" :class="{dis:btnnum == 1}">1信息</view>
  </view>
</template>

<script>
import { designerInfo } from "../../utils/api";
import { api, viewName } from "../../utils/util";

export default {
  data() {
    return {
      btnnum: 0,
      designerInfo: {
        groupId: 1
      }
    };
  },
  onLoad() {
    this.designerlistRequest();
  },
  methods: {
    change(e) {
      this.btnnum = e;
      console.log(this.btnnum);
    },
    designerlistRequest() {
      designerInfo(this.designerInfo).then(({ code, data }) => {
        this.caseData = data;
        const time = setTimeout(() => {
          this.statusTips = "noMore";
          clearTimeout(time);
        }, 500);
      });
    }
  }
};
</script>

<style scoped>
.end-title {
  display: flex;
}
.end-title view {
  flex-grow: 1;
  padding: 15rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  border-bottom: 2rpx solid #020202;
}

.end-cont {
  display: none;
}

.btna {
  color: #ffffff;
  background: rgb(193, 210, 240);
}
.dis {
  height: 100vh;
  display: block;
}
</style>