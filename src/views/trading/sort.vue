
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.updatedtime"
        placeholder="更新"
        style="width: 75px"
        class="filter-item"
      >
        <el-option label="15秒" value="15" />
        <el-option label="30秒" value="30" />
        <el-option label="60秒" value="60" />
        <el-option label="静止" value="0" />
      </el-select>

      <el-select v-model="listQuery.state" placeholder="状态" style="width: 93px" class="filter-item">
        <el-option label="全部" value />
        <el-option label="未审核" value="0" />
        <el-option label="已审核" value="1" />
        <el-option label="已取消" value="-1" />
      </el-select>

      <el-select
        v-model="listQuery.sdtype"
        placeholder="审核方式"
        style="width: 100px"
        class="filter-item"
      >
        <el-option label="全部方式" value />
        <el-option label="提交审核" value="0" />
        <el-option label="手动审核" value="1" />
        <el-option label="手动审回" value="-1" />
      </el-select>

      <el-select
        v-model="listQuery.isnn"
        placeholder="角色选择"
        style="width: 100px"
        class="filter-item"
      >
        <el-option label="全部角色" value />
        <el-option label="正式角色" value="0" />
        <el-option label="财务角色" value="1" />
      </el-select>

      <el-date-picker
        v-model="listQuery.oddtime"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        type="datetimerange"
        :unlink-panels="true"
        class="filter-item"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />

      <el-input
        v-model="listQuery.trano"
        prefix-icon="el-icon-search"
        placeholder="会审订单号"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.trano_id"
        prefix-icon="el-icon-search"
        placeholder="会审编号"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.username"
        prefix-icon="el-icon-search"
        placeholder="请输入用户名"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-button v-waves class="filter-item" type="primary" @click="handleFilter">查询</el-button>
    </div>
    <el-table
      row-key="id"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      height="600"
      ref="dragTable"
    >
      <el-table-column label="ID" width="50" align="center" prop="id"></el-table-column>
      <el-table-column label="提交审核人" align="center" prop="username"></el-table-column>
      <el-table-column label="订单金额" align="center" prop="tradingamount"></el-table-column>
      <el-table-column label="订单标题" align="center" prop="tradingtitle"></el-table-column>
      <el-table-column label="订单归属人" align="center" prop="tradingworkname"></el-table-column>
      <el-table-column label="审核性质" align="center" prop="tjtype"></el-table-column>
      <el-table-column label="订单备注" align="center" prop="tradingremark"></el-table-column>
      <el-table-column label="提交审核人" align="center" prop="tradingworkname"></el-table-column>
      <el-table-column label="订单审核人" align="center" prop="tradingadmin"></el-table-column>
      <el-table-column label="审核方式" align="center" prop="tradintype"></el-table-column>

      <!--功能操作栏目--开始-->
      <el-table-column label="操作" align="center" width="100" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button-group>
            <el-button @click="handleUpdate(row)">编辑</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
  memberlist,
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import { apiSortLists } from "@/api/trading";
import Sortable from "sortablejs";
export default {
  name: "ComplexTable",
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      listLoading: true,
      roleNameList: [],
      edittapname: "first",
      listQuery: {
        updatedtime: "15",
        username: "",
        limit: 20,
        page: 1
      },
      showReviewer: false,
      showlogintime: false,
      temp: {
        safecode: "",
        password: "",
        role_id: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      dialogPvVisible: false,
      pvData: [],
      downloadLoading: false,
      oldList: [],
      newList: [],
      sortable: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      const { data } = await apiSortLists(this.listQuery);
      this.list = data;
      this.listLoading = false;
      this.oldList = this.list.map(v => v.id);
      this.newList = this.oldList.slice();
      this.$nextTick(() => {
        this.setSort();
      });
    },
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost", // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: evt => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0];
          this.list.splice(evt.newIndex, 0, targetRow);

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
          this.$store
            .dispatch("trading/actionSortChangeorder", this.newList)
            .then(res => {
              if (res.code == 20000) {
                this.getList();
              }
            });
        }
      });
    },
    handleChangeTime(e) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.getList();
      }, this.waitTime * 1000);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },

    handleUpdate(row) {
      this.temp = Object.assign({ ...row });
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    addData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("system/actionAdminadd", this.temp).then(res => {
            if (res.code == 20000) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success",
                duration: 2000
              });
              this.getList();
            }
          });
        }
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("system/actionAdminedit", this.temp)
            .then(res => {
              if (res.code == 20000) {
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "更新成功",
                  type: "success",
                  duration: 2000
                });
                this.getList();
              }
            });
        }
      });
    }
  }
};
</script>
<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
<style lang="scss" scoped>
.cancle {
  color: #42b983;
}
.query-time {
  font-size: 14px;
  color: #666;
  margin-left: 20px;
}
</style>