<template>
    <div>
        <!-- model：就是这个表单绑定data里面的那个对象 -->
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <!-- 单选，单选使用el-radio-group，文档地址：https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
            里面的特殊资源-->
            <el-form-item label="类型">
                <el-radio-group v-model="form.type">
                    <el-radio :label="1">文章</el-radio>
                    <el-radio :label="2">视频</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 富文本编辑器 -->
            <el-form-item label="内容" class="editor" v-if="form.type === 1">
                <vue-editor v-model="form.content"></vue-editor>
            </el-form-item>

            <el-form-item label="视频" v-if="form.type === 2">
                <!-- action：上传链接 -->
                <!-- limit：限制上传文件的数量 -->
                <!-- on-remove：移除文件的事件 -->
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :limit="1"
                    :on-remove="handleRemove"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传mp4,avi文件，且不超过2m</div>
                </el-upload>
            </el-form-item>

            <!-- 多选框 -->
            <el-form-item label="栏目">
                <el-checkbox-group v-model="form.categories">
                    <!-- 循环展示出菜单的多选框 -->
                    <el-checkbox 
                    :label="item.id" 
                    name="type"
                    v-for="(item, index) in menus"
                    :key="index"
                    >{{item.name}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <!-- 多张图片的上传 -->
            <el-form-item label="封面">
                <!-- action:  上传图片的地址
				list-type: 图片上传组件使用图片列表布局
				handlePictureCardPreview: 图片预览的事件
                handleRemove：移除图片的事件
                on-success: 图片上传成功后的回调函数-->
                <el-upload
                    :action="$axios.defaults.baseURL + '/upload'"
                    :headers="{
                        Authorization: token
                    }"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleImageRemove"
                    :on-success="handleImageSuccess"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
                <!-- 预览图片的弹窗 -->
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
            </el-form-item>

            <!-- 提交按钮 -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 富文本编辑器 https://github.com/davidroyer/vue2-editor
import { VueEditor } from "vue2-editor";

export default {
    data() {
        return {
            // 表单的数据对象
            form: {
                // 标题
                title: "",
                type: 1,
                // 文章内容,  
                // 如果是普通文章，这个值获取的是富文本编辑器里面的内容
                // 如果是视频文章，这个值就获取上传视频成功后的链接
                content: "<h1>Some initial content</h1>",
                // 栏目id的集合： [ {id: 1} ]
                categories: [],
                // 封面图片id的集合：[ {id: 1} ]
                cover: []
            },
            // 图片预览要使用的属性
            dialogImageUrl: "",
            dialogVisible: false,
            // 栏目列表
            menus: [],
            token: ""
        };
    },
    components: {
        VueEditor
    },
    mounted(){
        // token
        const {token} = JSON.parse(localStorage.getItem("userInfo"));
        this.token = token;

        // 请求栏目数据
        this.$axios({
            url: "/category"
        }).then(res => {
            // data是栏目的数据
            const {data} = res.data;
            // 不需要头条的
            data.splice(0, 1);
            // 保存到data
            this.menus = data;
        })
    },
    methods: {
        // 视频移除的事件
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 封面图片移除的事件
        handleImageRemove(file, fileList) {
            console.log(file, fileList);
        },
        // 预览图片的事件
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 图片上传成功后的事件
        handleImageSuccess(response, file, fileList){
            console.log(response)
        },
		// 发布文章的点击事件
		onSubmit(){
            // 转换下栏目的id数据格式
            this.form.categories = this.form.categories.map(v => {
                return {
                    id: v
                }
            });

            console.log(this.form)
		}
    }
};
</script>

<style scoped lang="less">
.editor /deep/ .el-form-item__content {
    line-height: unset;
}
</style>