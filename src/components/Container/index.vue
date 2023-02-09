<script lang="ts" setup>
import { ref } from 'vue';
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
const textSearchValue = ref('')
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
        <el-input
            v-model="textSearchValue"
            type="textarea"
            placeholder="请输入要查询的信息"
            size="large"
            class="input-style"
            :autosize="{ minRows: 3, maxRows: 4 }"
        />
    </div>
</template>

<style lang="stylus">
.container-card-style
    display grid
    grid-template-columns repeat(3, 1fr)
    grid-template-rows repeat(3, 1fr)
    padding 20px
    margin-top 50px
    .single-block-style
        margin 10px
        cursor pointer
        .single-card-style
            // height 150px
            // width 400px
            display flex
            justify-content center
            align-items center
.input-block-style
    margin-top 50px
    display flex
    justify-content center
    align-items center
    .input-style
        width 768px  
</style>