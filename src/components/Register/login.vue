<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { Avatar, Sugar, AlarmClock } from '@element-plus/icons-vue'
import { userInfoStore } from '@/stores/user'
import { userlogin } from '@/api/user'
import { dealResponse } from '@/utils/dealRequest'
import { useRouter } from 'vue-router';
// import pinia from '@/stores/index'
const userStore = userInfoStore()
const router = useRouter()
interface FormType {
    account: string,
    password: string,
    // code: string,
}
const formLabelAlign = reactive({
    account: '',
    password: '',
    // code: '',
} as FormType)
const labelPosition = ref('right')
const login = async() => {
    if (!formLabelAlign.account || !formLabelAlign.password) {
        ElMessage({
            message: '请填写账号和密码',
            type: 'error',
        })
    } else {
        const res = await userlogin({
            email: formLabelAlign.account,
            password: formLabelAlign.password,
        })
        if (dealResponse(res, true, '登陆成功')) {
            userStore.setUserInfo(formLabelAlign)
            userStore.setToken(res.data as string)
            console.log(userStore)
            router.push('/')
        }
        console.log(res)
    }
}
</script>
<template>
    <el-form
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 660px"
    >
        <el-form-item label="账号">
            <el-input v-model="formLabelAlign.account" clearable placeholder="请输入账号" size="large" input-style="width: 450px" :prefix-icon="Avatar"/>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" clearable placeholder="请输入密码" size="large" input-style="width: 450px" :prefix-icon="Sugar"/>
        </el-form-item>
        <!-- <el-form-item label="验证码">
            <el-input v-model="formLabelAlign.code" clearable placeholder="请输入验证码" size="large" input-style="width: 450px" :prefix-icon="AlarmClock"/>
        </el-form-item> -->
        <el-form-item label="">
            <!-- <el-button @click="sendCode" type="primary">获取验证码</el-button> -->
            <el-button @click="login" type="primary">
                登录
            </el-button>
        </el-form-item>
    </el-form>
</template>
<style lang="stylus">
</style>