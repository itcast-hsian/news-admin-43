<template>
    <div class="header">
        <!-- logo -->
        <div class="logo">
            <span class="iconfont iconnew"></span>
        </div>

        <!-- 使用下拉菜单组件使用下拉的退出按钮 -->
        <!-- 文档地址：https://element.eleme.cn/#/zh-CN/component/dropdown#hong-fa-fang-shi -->
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <!-- 用户信息 -->
                <div class="user-actions">
                    <img src="https://www.baidu.com/img/bd_logo1.png" />
                    <span>用户信息</span>
                </div>
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <!-- 点击该可以退出登录 -->
                <el-dropdown-item icon="el-icon-delete">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.header {
    background: #fff;
    line-height: 60px;
    box-shadow: 2px 2px 2px #eee;
    display: flex;
    justify-content: space-between;

    .logo {
        width: 200px;
        text-align: center;
        color: #1989fa;
        .iconnew {
            font-size: 82px;
        }
    }

    .user-actions {
        display: flex;
        align-items: center;
        img {
            display: block;
            width: 24px;
            height: 24px;
            object-fit: cover;
            border-radius: 50%;
            margin-right: 10px;
        }
    }
}

.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
    display: flex;
    align-items: center;
}
.el-icon-arrow-down {
    font-size: 12px;
}
.demonstration {
    display: block;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
}
</style>