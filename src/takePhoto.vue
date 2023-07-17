<template>
  <div>
    <video id="localVideo" autoplay playsinline muted></video>
    <div v-for="(item,index) in imgList " :key="index" class="item">
  <img :src="item" alt="" />
</div>
  <button @click="takePhoto">takePhoto</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const imgList = ref([])
  // 获取本地音视频流
  async function getLocalStream(constraints) {
    // 获取媒体流
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    playLocalStream(stream)

  }
  function playLocalStream(stream) {
    const videoEl = document.getElementById('localVideo') 
    videoEl.srcObject = stream
  }
  
  
  
  getLocalStream({
    audio: false,
    video: {
      width: 1280,
      height: 720,
    },
  })
// 拍照
function takePhoto() {
  const videoEl = document.getElementById('localVideo') 
  const canvas = document.createElement('canvas')
  canvas.width = videoEl.videoWidth
  canvas.height = videoEl.videoHeight
  const ctx = canvas.getContext('2d')
  // ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)

  // 添加滤镜
  const filterList = [
    'blur(5px)', // 模糊
    'brightness(0.5)', // 亮度
    'contrast(200%)', // 对比度
    'grayscale(100%)', // 灰度
    'hue-rotate(90deg)', // 色相旋转
    'invert(100%)', // 反色
    'opacity(90%)', // 透明度
    'saturate(200%)', // 饱和度
    'saturate(20%)', // 饱和度
    'sepia(100%)', // 褐色
    'drop-shadow(4px 4px 8px blue)', // 阴影
  ]

  for (let i = 0; i < filterList.length; i++) {
    ctx.filter = filterList[i]
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
    imgList.value.push(canvas.toDataURL('image/png'))
  }
  console.log('🚀🚀🚀 / imgList', imgList)

}

// 获取所有视频输入设备
async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  console.log('🚀🚀🚀 / devices', devices)
  let videoDevices = devices.filter((device) => device.kind === 'videoinput')
}


// 切换设备
async function handleDeviceChange(deviceId) {
  getLocalStream()
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      deviceId: { exact: deviceId },
      // facingMode: {exact: 'user'} // 强制前置摄像头 //  user、environment 和 left、right 分别为前后左右摄像头

    },
  })
}
// 切换前后摄像头
function switchCamera(val) {
  let constraints = {
    video: true, // 开启默认摄像头
    audio: true,
  }
  constraints.video = {
    // 强制切换前后摄像头时，当摄像头不支持时，会报一个OverconstrainedError［无法满足要求的错误］
    facingMode: { exact: val === 1 ? 'user' : 'environment' },
    // 也可以这样当前后摄像头不支持切换时，会继续使用当前摄像头，好处是不会报错
    // facingMode: val === 1 ? 'user' : 'environment',
  }

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      confirm('切换成功')
      playLocalStream(stream)
    })
    .catch((err) => {
      confirm('你的设备不支持切换前后摄像头')
    })
}
// switchCamera(1) // 切换前置摄像头



</script>

<style  scoped>

</style>