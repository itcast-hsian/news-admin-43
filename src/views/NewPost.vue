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
                    <el-radio label="文章"></el-radio>
                    <el-radio label="视频"></el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 富文本编辑器 -->
            <el-form-item label="内容" class="editor">
                <vue-editor v-model="form.content"></vue-editor>
            </el-form-item>

            <el-form-item label="视频">
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
                <el-checkbox-group v-model="form.category">
                    <el-checkbox label="A" name="type"></el-checkbox>
                    <el-checkbox label="B" name="type"></el-checkbox>
                    <el-checkbox label="C" name="type"></el-checkbox>
                    <el-checkbox label="D" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <!-- 多张图片的上传 -->
            <el-form-item label="封面">
                <!-- action:  上传图片的地址
				list-type: 图片上传组件使用图片列表布局
				handlePictureCardPreview: 图片预览的事件
                handleRemove：移除图片的事件-->
                <el-upload
                    action="https://jsonplaceholder.typicode.com/posts/"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleImageRemove"
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
                title: "",
                type: 1,
                content: "<h1>Some initial content</h1>",
                category: []
            },
            // 图片预览要使用的属性
            dialogImageUrl: "",
            dialogVisible: false
        };
    },
    components: {
        VueEditor
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
		// 发布文章的点击事件
		onSubmit(){
			console.log("submit")
		}
    }
};
</script>

<style scoped lang="less">
.editor /deep/ .el-form-item__content {
    line-height: unset;
}
</style>