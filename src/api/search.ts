import { httpService } from '@/utils/request'
interface requestParams  {
    prompt: string
}
const searchText = (params: requestParams) => {
    return httpService.post('/api/chat/completions', params)
}
export { searchText }
