<template>
  <el-container class="container">
    <el-header style="display:flex;justify-content: space-between;padding: 0 10px;">
      <div class="home_header">
        <img src="http://liufusong.top/hm-admin/img/heima.b5a855ee.png" alt="" style="">
        <span>后台管理系统</span>
      </div>
      <el-button size="small" class="home_header_btn" @click="deltoken">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :style="isCollapse ? 'width:64px' : 'width:200px'">
        <el-button type=" danger" style="width:200px" v-if="!isCollapse" @click="handleCollapseClick">| | |
        </el-button>
        <el-button type="danger" style="width:64px;margin: 0;" v-else @click="handleCollapseClick">| | |
        </el-button>
        <el-menu default-active="users" background-color="#373d41" text-color="#fff" unique-opened
          active-text-color="#c00000" :collapse="isCollapse" router>
          <el-submenu :index="item.path" v-for="(item, index) in list" :key="item.id">
            <template #title v-if="!isCollapse"><i :class="arr[index]"></i>{{ item.authName }}</template>
            <template #title v-else><i :class="arr[index]"></i></template>
            <el-menu-item :index="el.path" v-for="el in item.children" :key="el.id">
              <i class="el-icon-menu"></i>{{ el.authName }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <crumbs></crumbs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getMenus } from '@/api/home'
import Crumbs from '@/components/crumbs.vue'
export default {
  created () {
    this.getMenus()
  },

  data () {
    return {
      list: [],
      arr: ['el-icon-user',
        'el-icon-platform-eleme',
        'el-icon-goods',
        'el-icon-document-copy',
        'el-icon-monitor'],
      isCollapse: false
    }
  },
  methods: {
    async getMenus () {
      try {
        const res = await getMenus()
        this.list = res.data.data
        console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    },
    deltoken () {
      this.$store.commit('setToken', '')
      this.$router.back()
    },
    handleCollapseClick () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: { Crumbs }
}
</script>

<style scoped lang="less">
.el-header {
  padding: 100px;
  display: flex;
  align-items: center;

  .home_header {

    img {
      height: 56px;
      width: 56px;
    }

    span {
      display: inline-block;
      width: 250px;
      color: #fff;
      font-size: 22px;
      margin-left: 10px;
    }
  }

  .home_header_btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    height: 40px;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
}

.container {
  height: 100vh;

  .el-header {
    background-color: #383d41;
  }

  .el-aside {
    background-color: #383d41;
  }

  .el-main {
    background-color: #eaedf2;
  }

  .el-menu {
    border-right: none;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
