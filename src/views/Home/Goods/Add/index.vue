<template>
  <div>
    <el-tag type="info" class="add_title">
      <i class="el-icon-info"> </i>
      <span>添加商品信息</span>
    </el-tag>
    <div>
      <el-steps :active="active - 0" finish-status="success">
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-tabs tabPosition="left" style="height: 720px;" v-model="active">
        <el-tab-pane label="基本信息" name="0">
          <div v-if="active == 0">
            <el-form labelPosition="top" label-width="80px" :model="goodsInfo" :rules="rule">
              <el-form-item label="商品名称" prop="name">
                <el-input v-model="goodsInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="商品价格" prop="price">
                <el-input-number style="width:100%;text-align: left;" v-model="goodsInfo.price"
                  controls-position="right" :min="0">
                </el-input-number>
              </el-form-item>
              <el-form-item label="商品重量" prop="weigth">
                <el-input-number style="width:100%;text-align: left;" v-model="goodsInfo.weigth"
                  controls-position="right" :min="0">
                </el-input-number>
              </el-form-item>
              <el-form-item label="商品数量" prop="count">
                <el-input-number style="width:100%;text-align: left;" v-model="goodsInfo.count"
                  controls-position="right" :min="0">
                </el-input-number>
              </el-form-item>
              <el-form-item label="商品分类" prop="type">
                <div class="block">
                  <el-cascader v-model="goodsInfo.type" :options="options"
                    :props="{ expandTrigger: 'hover', value: 'cat_name', label: 'cat_name' }">
                  </el-cascader>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="1">
          <div v-if="active == 1">
            <div>
              <p>123123</p>
              <el-checkbox label="备选项1" border>333</el-checkbox>
              <el-checkbox label="备选项2" border>222</el-checkbox>
            </div>
            <div>
              <p>123123</p>
              <el-checkbox label="备选项1" border>333</el-checkbox>
              <el-checkbox label="备选项2" border>222</el-checkbox>
            </div>
            <div>
              <p>123123</p>
              <el-checkbox label="备选项1" border>333</el-checkbox>
              <el-checkbox label="备选项2" border>222</el-checkbox>
            </div>
            <div>
              <p>123123</p>
              <el-checkbox label="备选项1" border>333</el-checkbox>
              <el-checkbox label="备选项2" border>222</el-checkbox>
            </div>
            <div>
              <p>123123</p>
              <el-checkbox label="备选项1" border>333</el-checkbox>
              <el-checkbox label="备选项2" border>222</el-checkbox>
            </div>
            <div>
              <p>123123</p>
              <el-checkbox label="备选项1" border>333</el-checkbox>
              <el-checkbox label="备选项2" border>222</el-checkbox>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品属性" name="2">
          <div v-if="active == 2">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品图片" name="3">
          <div v-if="active == 3">
            <h1>4</h1>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="4">
          <div v-if="active == 4">
            <div style="border: 1px solid #ccc;">
              <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig"
                :mode="mode" />
              <Editor style="height: 500px; overflow-y: hidden;" v-model="html" :defaultConfig="editorConfig"
                :mode="mode" @onCreated="onCreated" />
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="完成" name="5">
          <div v-if="active == 5">
            <h1>6</h1>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
import { getCategories } from '@/api/addgoods'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
export default {
  created () {
    this.getCategories()
  },
  data () {
    return {
      active: 0,
      num: 1,
      goodsInfo: {
        name: '',
        price: '',
        weigth: '',
        count: '',
        type: ''
      },
      rule: {
        name: [
          { required: 'true', message: '请输入名称', trigger: 'blur' }
        ],
        price: [
          { required: 'true', message: '请输入价格', trigger: 'blur' }
        ],
        weigth: [
          { required: 'true', message: '请输入重量', trigger: 'blur' }
        ],
        count: [
          { required: 'true', message: '请输入数量', trigger: 'blur' }
        ],
        type: [
          { required: 'true' }
        ]
      },
      options: [],
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },

  methods: {
    async getCategories () {
      const res = await getCategories()
      console.log(res)
      this.options = res.data.data
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  },
  mounted () {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy () {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  computed: {},
  watch: {},
  filters: {},
  components: { Editor, Toolbar }
}
</script>

<style scoped>
.add_title {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css">
</style>
