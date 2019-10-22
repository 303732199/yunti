<template>
  <div class="app-container">
    <div style="padding: 10px 0; text-align: right">
      <el-button type="primary" size="mini" icon="el-icon-plus">添加角色</el-button>
      <el-button type="plain" size="mini" icon="el-icon-delete">批量删除</el-button>
    </div>
    <el-table v-loading="listLoading" size="small" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column type="expand" label="展开">
         <template slot-scope="{row}">
          <div>权限列表：
            <el-tag
              style="margin: 5px 5px 5px 0"
              v-for="route in row.routes"
              :key="route.path"
              size="mini"
              closable
            >
            {{route.path}}
          </el-tag>
          </div>
      </template>
      </el-table-column>
      <el-table-column align="center" label="ID" width="80" type="index">
      </el-table-column>
      <el-table-column label="角色名称" width="120px">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.name" class="edit-input" size="small"/>
            <el-button
              class="cancel-btn"
              size="mini"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.name }}</span>
        </template>
      </el-table-column>
       <el-table-column align="center" label="角色描述" prop="description">
      </el-table-column>
      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="text"
            @click="row.edit=!row.edit"
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
import { getRoles } from '@/api/role'

export default {
  name: 'InlineEditTable',
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
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
      const { data } = await getRoles()
      this.list = data.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.name //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.name = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.name
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
