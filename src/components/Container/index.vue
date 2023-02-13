<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { searchText } from '@/api/search'
import { dealResponse } from '@/utils/dealRequest'
import { Search } from '@element-plus/icons-vue'
import { userInfoStore } from '@/stores/user'
const drawData = [
    {
        text:'Explain quantum computing in simple terms',
    },
    {
        text:'能记住对话过程中，前面提过的内容',
    },
    {
        text:'回答中偶尔会有事实性错误',
    },
    {
        text:'生蚝煮熟了还叫生蚝吗',
    },
    {
        text:'可以用教AI修正错误回答',
    },
    {
        text:'可能会输出有偏见或歧视性的回答',
    },
    {
        text:'N95口罩和KN95口罩的区别',
    },
    {
        text:'懂得拒绝不合理的提问',
    },
    {
        text:'E对2021年以后发生的事情不了解',
    },
]
const userStore = userInfoStore()
const textSearchValue = ref('')
const textResponse = ref('')
const getData = async () => {
    try {
        // '给我一个去泰国旅游的计划'
        const res = await searchText({ prompt: textSearchValue.value})
        dealResponse(res)
        userStore.setIsVip(res.code)
        textResponse.value = res.data as string
        // textResponse.value = textResponse.value.substring(2)
    } catch (err: any) {
        console.log(err)
    }
}
onMounted(() => {
    // getData()
})
</script>

<template>
    <div class="container-card-style">
        <div v-for="item in drawData" :key="item.text" class="single-block-style">
            <el-card shadow="hover">
                <div class="single-card-style">{{ item.text }}</div>
            </el-card>
        </div>
    </div>
    <div class="input-block-style">
        <!-- <el-input v-model="textSearchValue" placeholder="请输入要查询的信息" class="search-input-style"/>
        <el-button type="primary" @click="getData" class="search-class">查询</el-button> -->
        <el-input
            v-model="textSearchValue"
            placeholder="请输入要查询的信息"
            class="search-input-style"
            >
            <template #append>
                <el-button type="primary" @click="getData" class="search-class" :icon="Search"></el-button>
            </template>
        </el-input>
        <el-input
            v-model="textResponse"
            type="textarea"
            size="large"
            class="input-style"
            :autosize="{ minRows: 3, maxRows: 4 }"
            disabled
        />
    </div>
</template>

<style lang="stylus">
.container-card-style
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-template-rows repeat(3, 1fr)
    padding 15px
    margin-top 20px
    .single-block-style
        margin 10px
        cursor pointer
        .single-card-style
            display flex
            justify-content center
            align-items center
.input-block-style
    margin-top 50px
    display flex
    flex-direction column
    justify-content center
    align-items center
    .search-input-style
        width 768px
        height 50px
        margin-bottom 30px  
    .input-style
        width 768px  
    // .search-class
    //     margin-bottom 30px
</style>