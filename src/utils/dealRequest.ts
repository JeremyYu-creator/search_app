import type { ResponseType } from '@/typing/response'
import { ElMessage } from 'element-plus'
const dealResponse = (data: ResponseType, isNeedSuccess?: boolean, successText?: string) => {
    if (data.code === 0) {
        if (isNeedSuccess) {
            ElMessage({
                message: `${successText}`,
                type: 'success',
            })
        }
        return data.data
    } else {
        ElMessage({
            message: `${data.msg}`,
            type: 'error',
        })
        return data.data
    }
}

export {dealResponse }