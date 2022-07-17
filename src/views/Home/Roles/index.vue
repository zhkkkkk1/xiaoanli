<template>
  <div>
    <el-card>
      <el-button type="primary" class="add">添加角色</el-button>
      <el-table :data="userlist" style="width: 100%" stripe border>
        <el-table-column label="#" width="48px" type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item, index) in scope.row.children" :key="item.id"
              :class="['roles_data', 'bom', index === 0 ? 'top' : '']">
              <el-col :span="5">
                <el-tag>{{ item.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(val, ind) in item.children" :key="val.id"
                  :class="['roles_data', ind === 0 ? '' : 'top']">
                  <el-col :span="6">
                    <el-tag type="success">{{ val.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag v-for="item1 in val.children" :key="item1.id" closable
                      @close="open(scope.row.id, item1.id)">{{ item1.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>c
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
      <el-tree :data="rightTree" :props="defaultProps" @node-click="handleNodeClick" show-checkbox label="authName"
        default-expand-all>
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
    console.log(this.userlist)
  },
  data () {
    return {
      dialogVisible: false,
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
