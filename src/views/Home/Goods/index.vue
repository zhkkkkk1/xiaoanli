<template>
  <el-card>
    <!-- header -->
    <div v-if="$route.path === '/goods'">
      <div style="display:flex">
        <div style="width:33%">
          <el-input placeholder="请输入内容" v-model="obj.query" @keyup.enter.native="seachUser">
            <template #suffix>
              <i class="el-icon-delete" v-if="obj.query.length !== 0" @click="obj.query = ''"></i>
            </template>
            <template slot="append">
              <el-button @click="seachUser"><i class="el-icon-search"></i></el-button>
            </template>
          </el-input>
        </div>
        <div>
          <el-button type="primary" style="margin-left:20px" @click="addTask; $router.push('/goods/add')">添加用户
          </el-button>
        </div>
      </div>
      <!-- content -->
      <el-table :data="goodsList" style="width: 100%" stripe border fit>
        <el-table-column prop="index" label="#" width="60px">
        </el-table-column>
        <el-table-column prop="goods_name" label="商品名称">
        </el-table-column>
        <el-table-column prop="goods_price" label="商品价格">
        </el-table-column>
        <el-table-column prop="goods_weight" label="商品数量">
        </el-table-column>
        <el-table-column prop="add_time" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template>
            <!-- 修改 -->
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="addTask"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="addTask"> </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[1, 2, 5, 10]" :page-size.sync="pageSize[2]" layout="total, sizes, prev, pager, next, jumper"
          :total="total1">
        </el-pagination>
      </div>
    </div>
    <router-view></router-view>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('goods/getGoodsList', this.obj)
    console.log(this.goodsList)
  },
  data () {
    return {
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      currentPage: 1,
      pageSize: [1, 2, 5, 10],
      previewDialog: false
    }
  },
  methods: {
    handleSizeChange (val) {
      this.obj.pagesize = val
      this.$store.dispatch('goods/getGoodsList', this.obj)
    },
    handleCurrentChange (val) {
      this.obj.pagenum = val
      this.$store.dispatch('goods/getGoodsList', this.obj)
    },
    seachUser () {
      this.$store.dispatch('goods/getGoodsList', this.obj)
    },
    addTask (id) {
      this.previewDialog = true
    }
  },
  computed: {
    ...mapGetters(['goodsList', 'total1'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.demo-input-size {
  width: 33%;
  margin-right: 20px;
}

.box-card {
  margin-top: 20px;
}

.el-button--danger {
  background-color: #f56c6c;
  border-color: unset;
}

.el-table {
  margin-top: 20px;
}

.block {
  margin-top: 20px;
}
</style>
