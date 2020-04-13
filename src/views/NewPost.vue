<template>
    <div>
		<!-- model：就是这个表单绑定data里面的那个对象 -->
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>

			<!-- 单选，单选使用el-radio-group，文档地址：https://element.eleme.cn/#/zh-CN/component/form#biao-dan-yan-zheng
			里面的特殊资源 -->
			<el-form-item label="类型">
				<el-radio-group v-model="form.type">
					<el-radio label="文章"></el-radio>
					<el-radio label="视频"></el-radio>
				</el-radio-group>
			</el-form-item>

			<el-form-item label="内容" class="editor">
				<vue-editor v-model="form.content"></vue-editor>
			</el-form-item>
		</el-form>		
    </div>
</template>

<script>
// 富文本编辑器 https://github.com/davidroyer/vue2-editor
import { VueEditor } from "vue2-editor";

export default {
	data(){
		return {
			// 表单的数据对象
			form: {
				title: "",
				type: 1,
				content: "<h1>Some initial content</h1>"
			}
		}
	},
	components: {
		VueEditor
	},
};
</script>

<style scoped lang="less">
.editor /deep/ .el-form-item__content{
	line-height: unset;
}
</style>