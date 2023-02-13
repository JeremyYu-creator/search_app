import { httpService } from '@/utils/request'
import type { RegisterCode, RegisterUser, UserLogin } from '@/typing/userRequest'

// 注册获取验证码接口
const getRegisterCode = (params: RegisterCode) => {
    return httpService.post('/api/chat/user/register/code', params)
}

// 注册接口
const setRegister = (params: RegisterUser) => {
    return httpService.put('/api/chat/user/register', params)
}

// 登录接口
const userlogin = (params: UserLogin) => {
    return httpService.post('/api/chat/user/login', params)
}

export { getRegisterCode, setRegister, userlogin }
