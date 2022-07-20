<template>
  <el-card>
    <el-tag type="warning" class="params_title" cls>
      <i class="el-icon-info"> </i>
      <span>注意：只允许为第三级分类设置相关参数！</span>
    </el-tag>
    <div class="block">
      <el-cascader v-model="value" :options="options"
        :props="{ expandTrigger: 'hover', value: 'cat_name', label: 'cat_name' }">
      </el-cascader>
    </div>
  </el-card>
</template>

<script>
import { getCategories } from '@/api/addgoods'

export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      value: '',
      options: []
    }
  },
  methods: {
    async getCategories () {
      const res = await getCategories()
      console.log(res)
      this.options = res.data.data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.params_title {
  width: 100%;
  margin-bottom: 20px;
}
</style>
