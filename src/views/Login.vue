<template>
    <div class="container">
        <!-- model: 表示声明当前表单的数据对象（这个表单最终的数据存放到data的form对象里面） -->
        <el-form :model="form" label-width="80px" class="form">
            <el-form-item label="账号">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 表单的数据对象
            form: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        onSubmit() {
            // 提交登录请求
            console.log("submit!");
        }
    }
};
</script>

<style scoped lang="less">
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // 屏幕高度可以看做是100个vh,相当于高度100%

    .form{
        width: 450px;
    }
}
</style>