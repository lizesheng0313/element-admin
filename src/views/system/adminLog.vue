<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        prefix-icon="el-icon-search"
        :placeholder="$t('管理账号搜索')"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.membername"
        prefix-icon="el-icon-search"
        :placeholder="$t('用户账号搜索')"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button  class="filter-item" type="primary" @click="handleFilter">{{ $t('查询') }}</el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      height="630"
      :header-cell-style="{color:'#606266'}"
    >
      <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
      <el-table-column :label="$t('管理账号')" align="center" width="130" prop="username" />
      <el-table-column :label="$t('用户账号')" align="center" width="130" prop="membername" />
      <el-table-column :label="$t('操作类型')" align="center" width="130" prop="type" />
      <el-table-column :label="$t('操作信息')" align="center" prop="info" />
      <el-table-column :label="$t('操作IP')" align="center" prop="ip" />
      <el-table-column :label="$t('操作时间')" align="center" prop="time">
        <template slot-scope="scope">
          <span>{{ scope.row.time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; 

export default {
  name: "ComplexTable",
  components: { Pagination },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      edittapname: "first",
      listQuery: {
        page: 1,
        limit: 20,
        username: "",
        membername: ""
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$store
        .dispatch("system/actionAdminlog", this.listQuery)
        .then(response => {
          this.listLoading = false;
          this.list = response.data.items;
          this.total = response.data.total;
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    }
  }
};
</script>
