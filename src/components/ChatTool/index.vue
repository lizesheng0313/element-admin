<template>
  <div class="chat-tool">
    <div
      class="chat-icon"
      :class="{'transtion':showTranstion}"
      @mousedown="chatToolMove"
      v-show="isShowIframe"
      :style="{top:positionY+'px',left:positionX+'px'}"
    >
      <div class="iconfont iconhuabanfuben" v-if="!showTranstion"></div>
    </div>
    <div v-show="!isShowIframe" class="chat-tool-show_box">
      <header class="chat-header">
        <span class="iconguanbi iconfont" @click="handleCloseTool"></span>
      </header>
      <iframe src="http://47.56.21.107/im/h5/" frameborder="0"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showTranstion: false,
      isShowIframe: true,
      positionX: 20,
      positionY: 20
    };
  },
  methods: {
    handleCloseTool() {
      this.showTranstion = false;
      this.isShowIframe = true;
    },
    handleShowTool() {
      this.showTranstion = true;
      setTimeout(() => {
        this.isShowIframe = false;
      }, 190);
    },
    chatToolMove(e) {
      let odiv = e.target; // 获取目标元素
      // 算出鼠标相对元素的位置
      let x1 = e.clientX;
      let y1 = e.clientY;
      let x2, y2;
      console.log("开始");
      console.log(x1, y1);
      let disX = e.clientX - this.positionX;
      let disY = e.clientY - this.positionY;
      document.onmousemove = e => {
        // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        // 移动当前元素
        this.positionX = left;
        this.positionY = top;
      };
      document.onmouseup = e => {
        x2 = e.clientX;
        y2 = e.clientY;
        console.log("结束");
        console.log(x2, y2);
        if (x1 == x2 && y1 == y2) {
          this.showTranstion = true;
          setTimeout(() => {
            this.isShowIframe = false;
          }, 190);
        }
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.chat-tool {
  position: relative;
  z-index: 999999;
  .transtion {
    animation: 0.2s chatToolAnimation ease-in;
  }
  .chat-icon {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    width: 45px;
    height: 45px;
    border-radius: 100px;
    background: #1890ff;
    cursor: pointer;
    .iconhuabanfuben {
      font-size: 22px;
    }
  }
  .chat-icon:hover {
    opacity: 0.9;
  }
  .chat-tool-show_box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .chat-header {
      height: 35px;
      background: #42b983;
      position: relative;
      line-height: 35px;
    }
    iframe {
      width: 100%;
      height: 100%;
    }
    .iconguanbi {
      font-size: 20px;
      position: relative;
      left: 20px;
      color: #fff;
    }
  }
}
@keyframes chatToolAnimation {
  100% {
    width: 110px;
    height: 160px;
  }
}
</style>
