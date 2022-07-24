<template>
  <div>
    <el-card>
      <el-input placeholder="请输入内容" style="width:400px">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <!-- 表单 -->
      <el-table border :data="goodsList">
        <el-table-column label="#" width="50px" type=index></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款" prop="order_pay">
          <template v-slot="{ row }">
            <el-tag effect="dark" type='success' v-if="row.pay_status * 1 === 3">已支付</el-tag>
            <el-tag effect="dark" type='danger' v-else>未支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" prop="create_time"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="primary" icon="el-icon-edit" @click="editAddress(row.user_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="optionDialog"></el-dialog>
  </div>
</template>

<script>
import { getOrders } from '@/api/orders'
export default {
  async created () {
    const res = await getOrders(this.objPage)
    this.goodsList = res.data.data.goods
  },
  data () {
    return {
      objPage: {
        pagesize: 10,
        pagenum: 1
      },
      goodsList: [],
      optionDialog: false
    }
  },
  methods: {
    editAddress (id) {
      this.optionDialog = true
      console.log(id)
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
