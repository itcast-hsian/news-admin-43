<template>
    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

// 去掉line-height
.el-aside {
    background-color: #d3dce6;
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
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>