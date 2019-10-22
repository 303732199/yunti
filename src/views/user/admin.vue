<template>
  <div class="app-container">
    <el-form size="small" inline>
      <el-form-item label="角色">
        <el-select size="small" v-model="listQuery.difficult" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.title"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="姓名">
        <el-select size="small" v-model="listQuery.type" placeholder="请选择">
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="padding: 10px 0; text-align: right">
      <el-button type="primary" size="mini" icon="el-icon-plus">添加</el-button>
      <el-button type="plain" size="mini" icon="el-icon-delete">批量删除</el-button>
    </div>
    <el-table v-loading="listLoading" size="small" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="truename" label="姓名">
      </el-table-column>

      <el-table-column align="center" prop="username" label="账号">
      </el-table-column>

      <el-table-column  align="center" prop="role_name" label="角色">
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" prop="add_user" label="添加人员" width="110">
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="text"
            @click=""
          >
              编辑
            </el-button>
          <el-button
            size="mini"
            type="text"
            @click="deleteRow(row)"
          >
              <span style="color: #F56C6C">删除</span>
            </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/member'

export default {
  name: 'InlineEditTable',
  data() {
    return {
      // 难度
      roles: [
        { id: 1, title: '超级管理员' },
        { id: 2, title: '题库管理员' },
        { id: 3, title: '文章管理员' }
      ],
      list: null,
      listLoading: true,
      listQuery: {
        role: '',
        page: 1,
        limit: 10
      }
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
