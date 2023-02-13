<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { userInfoStore } from '@/stores/user'
const tipType = ref('warning')
const router = useRouter()
const isUser = ref(true)
const userStore = userInfoStore()
const goToRegister = () => {
  router.push({
    name: 'register',
  })
}
const noticeText = ref('您还不是VIP，当前只能享受部分服务')
onMounted(() => {
    userStore.isVip === 0 ? tipType.value = 'success' : tipType.value = 'warning'
    userStore.isVip === 0 ? noticeText.value = '尊贵的VIP，您可享受完整服务' : noticeText.value = '您还不是VIP，当前只能享受部分服务'
})
</script>
<template>
    <div class="header-title-style">
        <h1>ChatGPT</h1>
        <!--:title="noticeText"-->
        <el-alert :type="tipType" center show-icon class="el-alert-style" v-if="isUser">
            <template #title>
                <div class="el-alert-title-style">
                    {{ noticeText }}
                </div>
            </template>
        </el-alert>
        <el-button  @click="goToRegister">个人中心</el-button>
    </div>
</template>

<style lang="stylus" scoped>
.header-title-style
    display flex
    justify-content space-between
    align-items center
    .el-alert-style
        width 30%
        .el-alert-title-style
            font-size 14px
</style>