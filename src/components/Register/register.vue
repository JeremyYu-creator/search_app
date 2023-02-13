<script lang="ts" setup>
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { Avatar, Sugar, AlarmClock } from '@element-plus/icons-vue'
import { getRegisterCode, setRegister } from '@/api/user'
import { dealResponse } from '@/utils/dealRequest'
import { userInfoStore } from '@/stores/user'
interface FormType {
    account: string,
    password: string,
    code: string,
}
const userStore = userInfoStore()

const formLabelAlign = reactive({
    account: '',
    password: '',
    code: '',
} as FormType)
const labelPosition = ref('right')
// 注册用户
const registerUser = async (userInfo: FormType) => {
    try {
        const res = await setRegister({
            email: formLabelAlign.account,
            password: formLabelAlign.password,
            code: formLabelAlign.code
        })
        dealResponse(res,true,'注册成功')
    } catch (err:any) {
        
    }
}
// 用户获取验证码
const sendCode = async() => {
    if (!formLabelAlign.account) {
        ElMessage({
            message: '请填写账号',
            type: 'error',
        })
    } else {
        const res = await getRegisterCode({ email: formLabelAlign.account })
        console.log(res)
        dealResponse(res)
        if (res.data) {
            ElMessage({
                message: '请注意查看您的邮箱',
                type: 'warning'
            })
        }
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
        <el-form-item label="验证码">
            <el-input v-model="formLabelAlign.code" clearable placeholder="请输入验证码" size="large" input-style="width: 450px" :prefix-icon="AlarmClock"/>
        </el-form-item>
        <el-form-item label="">
            <el-button @click="sendCode" type="primary">获取验证码</el-button>
            <el-button @click="registerUser" type="primary">
                注册
            </el-button>
        </el-form-item>
    </el-form>
</template>
<style lang="stylus">
</style>