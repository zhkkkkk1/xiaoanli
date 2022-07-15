<template>
  <div>
    <el-card>
      <el-button type="primary" class="add">添加角色</el-button>
      <el-table :data="userlist" style="width: 100%" stripe border>
        <el-table-column label="#" width="48px" type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="index" label="#" width="48px">
        </el-table-column>
        <el-table-column prop="roleName" label="角色姓名">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="success" icon="el-icon-delete" size="mini">删除</el-button>
          <el-button type="info" icon="el-icon-share" size="mini" @click="fofo(userlist.id)">分配权限</el-button>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-tree :data="rightTree" :props="defaultProps" @node-click="handleNodeClick" show-checkbox label="authName">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('roles/userList')
    this.$store.dispatch('roles/tree')
    console.log(this.rightTree)
  },
  data () {
    return {
      dialogVisible: false,
      children: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    ...mapActions(['userList', 'tree']),
    fofo (id) {
      this.dialogVisible = true
      this.children = this.userlist[id].children
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    handleNodeClick (data) {
      console.log(data)
    }
  },
  computed: {
    ...mapGetters(['userlist', 'rightTree'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
:deep(.el-card) {
  padding-top: 20px;
}

.add {
  margin-bottom: 20px;
}
</style>
