<template>
  <div>
    <el-card>
      <el-button type="primary">添加分类</el-button>
      <el-table border style="margin-top:20px">
        <el-table-column label="#" width="50px"></el-table-column>
        <el-table-column label="分类名称"></el-table-column>
        <el-table-column label="是否有效"></el-table-column>
        <el-table-column label="排序"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[1, 2, 5, 10]" :page-size.sync="pageSize[2]" layout="total, sizes, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { categories } from '@/api/categories'
export default {
  created () { },
  data () {
    return {
      currentPage: 1,
      pageSize: [1, 2, 5, 10],
      objPage: {
        type: '',
        pagenum: 1,
        pagesize: 4
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.obj.pagesize = val
    },
    handleCurrentChange (val) {
      this.obj.pagenum = val
    },
    async categories () {
      // const res = await categories(this.objPage)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
