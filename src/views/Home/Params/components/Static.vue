<template>
  <div>
    <el-button type="primary">添加属性</el-button>
    <el-table border style="margin-top: 20px;" :data="checkedOptions">
      <el-table-column width="48px" type="expand">
        <template v-slot="scope">
          <el-tag v-for="(item, index) in scope.row.attr_vals" :key="index">
            {{ item }}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputConfirm(scope.$index)" @blur="handleInputConfirm(scope.$index)">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.$index)">
            + New Tag
          </el-button>
        </template>
      </el-table-column>
      <el-table-column label="#" width="48px" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="attr_name"></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { categoriesTag } from '@/api/params'
export default {
  props: {
    checkedOptions: {
      type: Array,
      required: true
    }
  },
  created () {
  },
  data () {
    return {
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    showInput (row) {
      console.log(row)
      this.inputVisible = true
      console.log(this.$refs.saveTagInput)
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus()
      })
    },

    handleInputConfirm (index) {
      const inputValue = this.inputValue
      if (inputValue) {
        this.$emit('addTag', inputValue, index)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
