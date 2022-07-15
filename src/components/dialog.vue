<template>
  <el-dialog :visible.sync="visible" @close="$emit('update:show', false)" :show="show" :addData="addData" width="30%">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cnacel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    addData: {
      type: {
        Object,
        default () {
          return {}
        }
      }
    }
  },
  data () {
    return {
      visible: this.show
    }
  },
  watch: {
    show () {
      this.visible = this.show
    }
  },
  methods: {
    cnacel () {
      this.visible = false
    },
    confirm () {
      this.visible = false
    }
  }
}
</script>
