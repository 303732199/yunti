<template>
  <div class="app-container">
    <el-form size="small" inline>
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
      <el-form-item label="创建时间">
         <el-date-picker
           v-model="listQuery.daterange"
           type="daterange"
           range-separator="至"
           start-placeholder="开始日期"
           end-placeholder="结束日期">
         </el-date-picker>
      </el-form-item>
    </el-form>
    <div style="padding: 10px 0; text-align: right">
      <el-button type="primary" size="mini" icon="el-icon-delete">批量删除</el-button>
    </div>
    <el-table v-loading="listLoading" size="small" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="题型">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" label="难度">
        <template slot-scope="scope">
          <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon"/>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="审核人员" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="题目">
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
  </div>
</template>

<script>
import { fetchList } from '@/api/tk'

export default {
  name: 'InlineEditTable',
  data() {
    return {
      // 难度
      difficult: [
        { id: 1, label: '简单' },
        { id: 2, label: '中等' },
        { id: 3, label: '困难' }
      ],
      // 题型
      types: [
        { id: 1, label: '单选题' },
        { id: 2, label: '多选题' },
        { id: 3, label: '判断题' }
      ],
      list: null,
      listLoading: true,
      listQuery: {
        difficult: 1,
        daterange: '',
        type: '',
        admin: '',
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
