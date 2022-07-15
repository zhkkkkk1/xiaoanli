<template>
  <div class="el-main">
    <el-card class="box-card">
      <!-- header -->
      <div style="display:flex">
        <div style="width:33%">
          <el-input placeholder="请输入内容" v-model="obj.query" @keyup.enter.native="seachUser">
            <template #suffix>
              <i class="el-icon-delete" v-if="obj.query.length !== 0" @click="obj.query = ''"></i>
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
          <template>
            <!-- 修改 -->
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="addTask"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="addTask"> </el-button>
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
    <div>
      <Dialog :show.sync="previewDialog"></Dialog>
    </div>
  </div>
</template>

<script>
import Dialog from '@/components/dialog.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    Dialog
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
      previewDialog: false
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
    addTask (id) {
      this.previewDialog = true
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
