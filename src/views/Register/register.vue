<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { Avatar, Sugar, AlarmClock } from '@element-plus/icons-vue'
import Register from '@/components/Register/register.vue'
import Login from '@/components/Register/login.vue'
const checkMode = () => {
    currentMode.value = !currentMode.value
    if (currentMode.value) {
        modeText.value = '未有账号？去注册'
    } else {
        modeText.value = '已有账号？去登录'
    }
}
const modeText = ref('已有账号？去登录')
const currentMode = ref(false)
onMounted(() => {

})
</script>
<template>
    <div class="form-class">
        <el-button @click="checkMode" type="primary" class="change-mode-style">{{ modeText }}</el-button>
        <Register v-if="!currentMode"/>
        <Login v-else-if="currentMode"/>
    </div>
</template>
<style lang="stylus" scoped>
.form-class
    width 100vw
    height 80vh
    display flex
    flex-direction column
    justify-content center
    align-items center
    .change-mode-style 
        margin-bottom 50px
</style>