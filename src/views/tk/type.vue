<template>
  <div class="app-container">
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
      <el-table-column align="center" label="题型">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small"/>
            <el-button
              class="cancel-btn"
              size="mini"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
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
    <el-pagination
      style="text-align: center; margin-top: 10px"
      @current-change="pageSizeChange"
      :hide-on-single-page="true"
      background
      layout="prev, pager, next"
      :total="listQuery.total">
</el-pagination>
  </div>
</template>

<script>
import { fetchList, del } from '@/api/tk_type'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        keywords: '',
        page: 1,
        total: 100
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
        v.originalTitle = v.title //  will be used when user click the cancel button
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      this.$message({
        message: '更新成功',
        type: 'success'
      })
    },
    async deleteRow(row) {
      const response = await del(row.id)
      if (!response.error_code) {
        this.list = this.list.filter((record) => {
          return record.id !== row.id
        })
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    pageSizeChange(page) {
      this.listQuery.page = page
      this.getList()
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
