<template>
    <div>
        <!-- tableData 表格的数据，这个数据是由后台返回的 -->
        <el-table :data="tableData" style="width: 100%">
            <!-- 表格的每一列 -->
            <!-- prop是当前这列的属性，展示出数据中每个对象的匹配的属性值 -->
            <el-table-column prop="title" label="标题" width="500"></el-table-column>

            <el-table-column label="类型" width="180">
				<!-- 自定义模板，这个scope是一个对象 -->
				<template slot-scope="scope">
					<!-- scope.row表示这行的数据的对象，类似for循环里的item -->
					{{scope.row.type === 1 ? '文章' : '视频' }}
				</template>
			</el-table-column>

            <el-table-column label="时间">
				<!-- 使用自定义模板，通过moment来转换时间格式 -->
				<template slot-scope="scope">
					{{ moment(scope.row.create_date).format("YYYY-MM-DD hh:mm:ss") }}
				</template>
			</el-table-column>

            <el-table-column label="操作">
				<!-- 自定义模板 -->
				<!-- scope.row表示这行的数据的对象，类似for循环里的item -->
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
// 导入时间转换的工具库
import moment from "moment";

export default {
    data() {
        return {
			// 表格数据
			tableData: [],
			moment
        };
	},
	mounted(){
		// 请求文章列表
		this.$axios({
			url: "/post",
			params: {
				pageIndex: 1,
				pageSize: 5,
				category: 999 // 这个是固定，因为头条栏目会返回所有的文章
			}
		}).then(res => {
			// data是文章的列表数据
			const {data} = res.data;
			// 保存数据到data
			this.tableData = data;
		})
	}
};
</script>

<style>
</style>