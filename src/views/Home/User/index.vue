<template>
  <div class="el-main">
    <el-card class="box-card">
      <!-- header -->
      <div style="display:flex">
        <div style="width:33%">
          <el-input placeholder="请输入内容" v-model="obj.query" @keyup.enter.native="seachUser">
            <template #suffix>
              <i class="el-icon-delete" v-if="obj.query.length !== 0" @click="emptyInput"></i>
            </template>
            <template slot="append">
              <el-button @click="seachUser"><i class="el-icon-search"></i></el-button>
            </template>
          </el-input>
        </div>
        <div>
          <el-button type="primary" style="margin-left:20px" @click="addTask">添加用户</el-button>
        </div>
      </div>
      <!-- content -->
      <el-table :data="userList" style="width: 100%" stripe border fit>
        <el-table-column prop="index" label="#" width="60px">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" active-color="#409eff" inactive-color="#dcdfe6"
              @change="changeState(scope.row.id, scope.row.mg_state)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <!-- 修改 -->
            <el-button type="primary" size="mini" icon="el-icon-edit"
              @click="editUser(scope.row.username, scope.row.id)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="delUser(scope.row.id)">
            </el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="addTask"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
          :page-sizes="[1, 2, 5, 10]" :page-size.sync="pageSize[2]" layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加用户 dialog -->
    <div>
      <el-dialog title="添加用户对话框" :visible.sync="previewDialog1" width="50%">
        <el-form label-width="100px" :model="userInfo1" :rules="rules1" ref="userInfo1" resetFields>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="userInfo1.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="userInfo1.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo1.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userInfo1.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="previewDialog1 = false">取 消</el-button>
          <el-button type="primary" @click="commitUser1">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 修改用户信息 -->
    <div>
      <el-dialog title="添加用户对话框" :visible.sync="previewDialog2" width="50%">
        <el-form label-width="100px" :model="userInfo2" :rules="rules2" ref="userInfo2" resetFields>
          <el-form-item label="用户名">
            <el-input v-model="username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo2.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="userInfo2.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="previewDialog2 = false">取 消</el-button>
          <el-button type="primary" @click="commitUser2">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除 -->
      <el-dialog title="提示" :visible.sync="delUserdialog" width="30%" >
        <span>此操作将永久删除改用户，是否继续</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delUserdialog = false">取 消</el-button>
          <el-button type="primary" @click="delUser1">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, editUser } from 'vuex'
import { addUser, delUser } from '@/api/user'
export default {
  components: {
  },
  created () {
    this.getUserList()
    console.log(this.userList)
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
      previewDialog1: false,
      userInfo1: {
        username: '', password: '', email: '', mobile: ''
      },
      rules1: {
        username: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }],
        password: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }],
        email: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }],
        mobile: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }]
      },
      previewDialog2: false,
      userInfo2: {
        email: '', mobile: '', id: ''
      },
      username: '',
      rules2: {
        username: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }],
        password: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }],
        email: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }],
        mobile: [{ min: 3, max: 6, trigger: 'blur', required: 'ture' }]
      },
      delUserdialog: false,
      Id: null
    }
  },
  methods: {
    ...mapActions(['getUserList', 'delUser']),
    getUserList () {
      this.$store.dispatch('users/getUserList', this.obj)
    },
    changeState (id, type) {
      this.$store.dispatch('users/changeUserState', { id, type })
    },
    handleSizeChange (val) {
      this.obj.pagesize = val
      this.$store.dispatch('users/getUserList', this.obj)
    },
    handleCurrentChange (val) {
      this.obj.pagenum = val
      this.$store.dispatch('users/getUserList', this.obj)
    },
    seachUser () {
      this.$store.dispatch('users/getUserList', this.obj)
    },
    emptyInput () {
      this.obj.query = ''
      this.$store.dispatch('users/getUserList', this.obj)
    },
    // 添加用户
    addTask () {
      this.previewDialog1 = true
    },
    async commitUser1 () {
      try {
        this.$refs.userInfo1.validate()
        this.previewDialog1 = false
        try {
          await addUser(this.userInfo1)
          this.$store.dispatch('users/getUserList', this.obj)
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 修改信息
    editUser (name, id) {
      this.previewDialog2 = true
      this.username = name
      this.userInfo2.id = id
    },
    async commitUser2 () {
      // try {
      console.log(this.userInfo2)
      this.$refs.userInfo2.validate()
      this.previewDialog2 = false
      // try {
      const res = await editUser(this.userInfo2)
      console.log(res)
      //     this.$store.dispatch('users/getUserList', this.obj)
      //   } catch (err) {
      //     console.log(err)
      //   }
      // } catch (err) {
      //   console.log(err)
      // }
    },
    delUser (id) {
      this.delUserdialog = true
      this.Id = id
      console.log(this.Id)
    },
    async delUser1 () {
      const res = await delUser(this.Id)
      console.log(res)
      this.getUserList()
      this.delUserdialog = false
    }

  },
  computed: {
    ...mapGetters(['userList', 'total'])
  },
  watch: {},
  filters: {}
}
</script>

<style scoped lang="less">
.el-main {
  display: block;
  flex: 1;
  flex-basis: auto;

  .box-card {
    margin: 15px 0;
  }

  .el-table {
    margin-top: 20px;

    .el-button {
      width: 44px;
      height: 28px;
    }
  }
}

.el-icon-delete:before {
  display: inline-block;
  margin-top: 13px;
}

.el-main {
  padding: unset;
}
</style>
