<template>
    <div>
        <!-- tableData 表格的数据，这个数据是由后台返回的 -->
        <el-table :data="tableData" style="width: 100%">
            <!-- 表格的每一列 -->
            <!-- prop是当前这列的属性，展示出数据中每个对象的匹配的属性值 -->
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作">
				<!-- 自定义模板 -->
				<!-- slot-scope="scope" 这个scope是当前这行的数据对象，类似for循环里的item -->
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
export default {
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ]
        };
    }
};
</script>

<style>
</style>