<template>
    <div class="container">
        <!-- model: 表示声明当前表单的数据对象（这个表单最终的数据存放到data的form对象里面） -->
        <!-- :rules: 表示声明当前表单的验证规则 -->
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="form">
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
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
            },
            // 表单的验证规则
            // required: 表示必填
            // message: 错误时候提示
            // trigger 什么时候触发验证
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入手机号码",
                        trigger: "blur"
                    },
                    {
                        min: 11,
                        max: 11,
                        message: "手机号码格式错误",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        onSubmit() {
            // 找到表单，表单下面有一个validate方法可以校验表单的验证是否全部通过
            // 如果通过valid的值是true。反之就是false
            this.$refs.form.validate(valid => {
                if (valid) {
                    // 提交表单登录
                    this.$axios({
                        url: "/login",
                        method: "POST",
                        data: this.form
                    }).then(res => {
                        // data是用户的数据，里面包含了token和user的详细信息
                        const {data} = res.data;

                        // 判断当前用户是否有权限
                        if(data.user.role.type !== "admin"){
                            this.$message({
                                message: '当前用户没有权限,必须是管理员',
                                type: 'warning'
                            });
                            return;
                        }

                        // 转换成字符串
                        const userStr = JSON.stringify(data);
                        // 保存到本地，可以给其他的组件使用
                        localStorage.setItem("userInfo", userStr);
                        // 登录成功的提示
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });

                        this.$router.push("/")
                    })
                }
            });
        }
    }
};
</script>

<style scoped lang="less">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; // 屏幕高度可以看做是100个vh,相当于高度100%

    .form {
        width: 450px;
    }
}
</style>