<template>
  <div>
    <el-card>
      <el-button type="primary" class="add">添加角色</el-button>
      <el-table :data="user" style="width: 100%" stripe border>
        <el-table-column label="#" width="48px" type="expand">
          <template v-slot="{ row }">
            <el-row style="display: flex; border-top: 1px solid #eee; align-items: center;"
              v-for="(item, index) in row.children " :key="index">
              <el-col :span="5">
                <el-tag>{{ item.authName }}</el-tag>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item1, index) in item.children" :key="index" style="border-top: 1px solid  #eee;">
                  <el-col :span="6" style="display: block;">
                    <el-tag type="success">{{ item.authName }} </el-tag>
                  </el-col>
                  <el-col :span="18" style="display: inline-block;">
                    <el-tag v-for="(item2, index) in item1.children" :key="index" closable @close="del(item2, row)">{{
                        item2.authName
                    }}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
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
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="30%">
      <el-tree :data="rightTree" :props="defaultProps" show-checkbox label="authName" default-expand-all>
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { delRolesRight } from '@/api/roles'
import { mapActions, mapGetters } from 'vuex'
export default {
  created () {
    this.$store.dispatch('roles/userList')
    this.$store.dispatch('roles/tree')
    this.user = JSON.parse(JSON.stringify(this.userlist))
  },
  data () {
    return {
      user: '',
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      delInfo: {
        roleId: '',
        rightId: ''
      }
    }
  },
  methods: {
    ...mapActions(['userList', 'tree']),
    fofo (id) {
      this.dialogVisible = true
    },

    del (item2, row) {
      this.delInfo.rightId = row.id
      this.delInfo.roleId = item2.id
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        await delRolesRight({ rightId: this.delInfo.roleId, roleId: this.delInfo.rightId })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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

.el-tag {
  display: inline-block;
  height: 32px;
  padding: 0 10px;
  margin: 10px;
  line-height: 30px;
  font-size: 12px;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>
