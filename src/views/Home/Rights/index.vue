<template>
  <div>
    <el-card>
      <el-table :data="rightList" style="width: 100%" stripe border>
        <el-table-column prop="index" label="#" width="50">
        </el-table-column>
        <el-table-column prop="authName" label="权限名称">
        </el-table-column>
        <el-table-column prop="path" label="路径">
        </el-table-column>
        <el-table-column label="权限登记">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level == 0">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level == 1">等级二</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level == 2">等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  created () {
    this.$store.dispatch('rights/getRightsList', 'list')
    console.log(this.rightList)
  },
  data () {
    return {}
  },
  methods: {
  },
  computed: {
    ...mapGetters(['rightList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
