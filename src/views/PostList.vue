<template>
    <div>
        <!-- tableData 表格的数据，这个数据是由后台返回的 -->
        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px;">
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
                <template
                    slot-scope="scope"
                >{{ moment(scope.row.create_date).format("YYYY-MM-DD hh:mm:ss") }}</template>
            </el-table-column>

            <el-table-column label="操作">
                <!-- 自定义模板 -->
                <!-- scope.row表示这行的数据的对象，类似for循环里的item -->
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
		<!-- size-change: 分页条数切换时候触发的事件 -->
		<!-- current-change: 页数切换触发的事件 -->
		<!-- current-page: 当前页数 -->
		<!-- page-size：当前显示的条数 -->
		<!-- total: 总条数 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
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
			moment,
			pageIndex: 1,
			pageSize: 5,
			total: 0
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
		// 封装一个请求的方法
		getList(){
			this.$axios({
				url: "/post",
				params: {
					pageIndex: this.pageIndex,
					pageSize: this.pageSize,
					category: 999
				}
			}).then(res => {
				// data是文章的列表数据
				const { data, total } = res.data;
				// 保存数据到data
				this.tableData = data;
				this.total = total;
			})
		},
        handleSizeChange(val) {
			// 修改条数
			this.pageSize = val;
			// 重新请求接口
			this.getList();
		},
		// 页数,val是当前的页数
        handleCurrentChange(val) {
			// 修改页数
			this.pageIndex = val;
			// 重新请求接口
			this.getList();
		},
		// 删除的事件， item是当前点击的文章数据对象
		handleDelete(item){
			const {token} = JSON.parse(localStorage.getItem("userInfo"));

			this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				// 发起编辑的接口
				this.$axios({
					url: "/post_update/" + item.id,
					method: "POST",
					data: {
						open: 0 // 表示关闭文章
					},
					headers: {
						Authorization: token
					}
				}).then(res => {
					const {message} = res.data;
					// 提示用户编辑成功
					this.$message.success(message);
					// 重新请求当前的数据
					this.getList();
				})
			})			
		}
    }
};
</script>

<style>
</style>