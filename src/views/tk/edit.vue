<template>
  <div class="app-container">
    <el-form>
      <el-row>
        <el-col :xs="24" :md="4">
            <el-form-item label="难度">
              <el-select size="small" v-model="listQuery.difficult" placeholder="请选择">
                <el-option
                  v-for="item in difficult"
                  :key="item.value"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :md="4">
            <el-form-item label="题型">
              <el-select size="small" v-model="listQuery.type" placeholder="请选择">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :md="6">
            <el-form-item label="审核人员">
              <el-select size="small" v-model="listQuery.admin" placeholder="请选择">
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
        </el-col>
        <el-col :xs="24" :md="8">
            <el-form-item label="创建时间">
               <el-date-picker
                 v-model="listQuery.daterange"
                 type="daterange"
                 range-separator="至"
                 start-placeholder="开始日期"
                 end-placeholder="结束日期">
    </el-date-picker>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="padding: 10px 0; text-align: right">
      <el-button type="primary" size="small" icon="el-icon-delete">批量删除</el-button>
    </div>

  </div>
</template>

<script>
import { fetchList } from '@/api/article'
export default {
  data() {
    return {
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await fetchList(this.listQuery)
      const items = data.items
      this.list = items.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }

  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
