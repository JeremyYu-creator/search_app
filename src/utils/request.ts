import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios' 
import { ElMessage } from 'element-plus';
// import pinia from '@/stores/index'
import { userInfoStore } from '@/stores/user'

export interface IDataWithError<T> {
  data: T;
  code: number;
  msg: string;
}
class HttpService {
  private http!: AxiosInstance;

  constructor() {
    this.http = axios.create({
    //   baseURL: authUtils.getBaseURL(),
      timeout: 60000,
    });

    this.addInterceptors(this.http);
  }

  get<T>(url: string, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.get(url, config));
  }

  post<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.post(url, param, config));
  }

  postDownload<T>(url: string, param: unknown) {
    return this.handleErrorWrapper<T>(this.http.post(url, param, { responseType: 'arraybuffer' }));
  }

  put<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.put(url, param, config));
  }

  delete<T>(url: string, param: unknown, config?: AxiosRequestConfig) {
    return this.handleErrorWrapper<T>(this.http.delete(url, { data: param, ...config }));
  }

  private addInterceptors(http: AxiosInstance) {
    // 一、请求拦截器
    // const router = useRouter()
    http.interceptors.request.use((config: any) => {
      const userStore = userInfoStore()
      // 1、添加token和项目id
      const token = userStore.token
      console.log(token, 'token的显示')
      if (token) {
        config.headers['Authorization'] = token;
      }
      // 2、验证请求状态码
      // 注意这里的状态码是最外层的，也就是200、500这种，具体业务逻辑需要跟返回的data进行判断
      config.validateStatus = (status: any) => {
        // console.log(status,111)
        switch (status) {
          case 401:
            break;
          case 500:
            ElMessage(
              {
                message: `${status},请重试！`,
                type: 'error'
              }
            )
            break;
          default:
            // console.warn(`status= ${status}`);
            break;
        }
        return status >= 200 && status < 400;
      };
      return config;
    });

    // 二、响应拦截器
    http.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error:any) => {
        return Promise.reject(error);
      },
    );
  }

  private async handleErrorWrapper<T>(p: AxiosPromise): Promise<IDataWithError<T>> {
    return p
      .then((response: any) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        return {
          error
        };
      });
  }
}

export const httpService = new HttpService();
