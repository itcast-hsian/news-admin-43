<template>
    <el-container>
        <!-- 头部组件 -->
        <el-header>
            <Header/>
        </el-header>
        
        <el-container>
            <el-aside width="200px">
                <!-- 侧边栏组件 -->
                <Aside/>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入头部组件
import Header from "@/components/Header.vue"
// 导入侧边栏组件
import Aside from "@/components/Aside.vue"

export default {
    // 注册组件
    components: {
        Header,
        Aside
    }
};
</script>

<style scoped lang="less">
// 去掉line-height
.el-aside {
    background-color: #0c1c2c;
    color: #333;
    text-align: center;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
}

// 把最外层的el-container设置为100vh
#app > .el-container {
    height: 100vh;
    min-width: 1200px;
    min-height: 900px;
}
</style>