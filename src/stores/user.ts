import { defineStore } from 'pinia'

interface FormType {
    account: string,
    password: string,
    // code: string,
}
export const userInfoStore = defineStore({
    id: 'UserInfo', // id: 必须的，在所有 Store 中唯一
    // state: 返回对象的函数
    state: () => ({
        token: '',
        userInfo: {
            account: '',
            password: '',
        },
        isVip: 1,
    }),
    getters: {},
    actions: {
        // 不使用箭头函数
        setToken(token: string) {
            this.token = token;
        },
        setUserInfo(userInfo: FormType) {
            this.userInfo = userInfo;
        },
        setIsVip(code: number) {
            this.isVip = code
        }
    },
    persist: { // 实际上是通过storage方式进行存储, 注意默认是sessionStorage
        enabled: true,
        strategies: [
            {
                key: 'UserInfo',
                // storage: localStorage,
                storage: sessionStorage,
            }
        ]
    }
})
