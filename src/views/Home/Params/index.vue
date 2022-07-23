<template>
  <el-card>
    <el-tag type="warning" class="params_title" cls>
      <!-- <p>{{this.checkedOptions[0].inputVisible}}</p> -->
      <i class="el-icon-info"> </i>
      <span>注意：只允许为第三级分类设置相关参数！</span>
    </el-tag>
    <div class="block">
      <el-cascader :options="options" :props="{ expandTrigger: 'hover', value: 'cat_name', label: 'cat_name' }"
        @change="add()" ref="cascader">
      </el-cascader>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="动态参数" name="first">
        <Dynamic :CheckedOptions="CheckedOptions" @addTag="addTag"></Dynamic>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="second">
        <Static :CheckedOptions="CheckedOptions" @addTag="addTag"></Static>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import Dynamic from './components/dynamic.vue'
import Static from './components/Static.vue'

import { getCategories } from '@/api/addgoods'
import { categories } from '@/api/params'

export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      value: '',
      options: [],
      activeName: 'first',
      rel: null,
      checkedOptions: [],
      CheckedOptions: []
    }
  },
  methods: {
    async getCategories () {
      const res = await getCategories()
      this.options = res.data.data
    },
    async add () {
      const level = this.$refs.cascader.getCheckedNodes()[0].level
      const id = this.$refs.cascader.getCheckedNodes()[0].data.cat_id
      if (level === 3) {
        if (this.activeName === 'first') {
          this.rel = 'many'
        } else {
          this.rel = 'only'
        }
        const res = await categories(id, this.rel)
        this.checkedOptions = res.data.data
        this.checkedOptions.forEach(item => {
          item.attr_vals = item.attr_vals.split(' ')
          if (item.attr_vals[0] === '') item.attr_vals.pop()
          item.inputVisible = false
          item.inputValue = ''
        })
        this.CheckedOptions = this.checkedOptions
      } else {
        this.$message.error('请选择三级分类')
      }
    },
    addTag (val, index) {
      this.CheckedOptions[index].attr_vals.push(val)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Dynamic, Static }
}
</script>

<style scoped>
.params_title {
  width: 100%;
  margin-bottom: 20px;
}
</style>
