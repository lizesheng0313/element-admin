
<template>
  <div class="app-container">
    <div class="menu">
      <div
        class="menu_item"
        v-for="(item,index) in menuList"
        :key="index"
        @click="handleChangeState(item)"
        :class="{active:groupType == item.type}"
      >{{item.title}}</div>
    </div>
    <el-table
      row-key="id"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      ref="dragTable"
    >
      <el-table-column label="提交审核人" align="center" prop="id"></el-table-column>
      <el-table-column label="订单金额" align="center" prop="typetitle"></el-table-column>
      <el-table-column label="订单标题" align="center" prop="type"></el-table-column>
      <el-table-column label="订单归属人" align="center" prop="ftitle"></el-table-column>
      <el-table-column label="审核性质" align="center" prop="minmoney"></el-table-column>
      <el-table-column label="订单备注" align="center" prop="maxmoney"></el-table-column>
      <el-table-column label="订单状态" align="center" prop="remark"></el-table-column>
      <el-table-column label="提交审核人" align="center" prop="listorder"></el-table-column>
      <el-table-column label="订单审核人" align="center"></el-table-column>
    </el-table>
    <!-- 
    <el-dialog title="编辑" :visible.sync="dialogFormVisible" width="550px" center="true" size="mini">
      <el-form ref="dataForm" :model="temp" label-position="right" label-width="20%">
        <template>
          <el-form-item label="标识名称 :" prop="typetitle">
            <el-input v-model="temp.typetitle" placeholder="请输入标识名称" />
          </el-form-item>
          <el-form-item label="标识 :" prop="type">
            <el-input v-model="temp.type" placeholder="请输入标识" />
          </el-form-item>
          <el-form-item label="标识标题 :" prop="ftitle">
            <el-input v-model="temp.ftitle" placeholder="请输入标识标题" />
          </el-form-item>
          <el-form-item label="最低标额 :" prop="minmoney">
            <el-input v-model="temp.minmoney" placeholder="请输入最低标额" />
          </el-form-item>
          <el-form-item label="最高标额 :" prop="maxmoney">
            <el-input v-model="temp.maxmoney" placeholder="请输入最高标额" />
          </el-form-item>
          <el-form-item label="标识备注 :" prop="remark">
            <el-input v-model="temp.remark" placeholder="请输入标识备注" />
          </el-form-item>
          <el-form-item label="centerurl :" prop="centerurl">
            <el-input v-model="temp.center_url" placeholder="center_url" />
          </el-form-item>
          <el-form-item label="html :" prop="html">
            <el-input v-model="temp.html" placeholder="html" />
          </el-form-item>

          <el-form-item label="是否在线 :" prop="isonline">
            <el-radio-group v-model="temp.isonline">
              <el-radio-button :label="-1">否</el-radio-button>
              <el-radio-button :label="1">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态 :">
            <el-checkbox v-model="temp.z1">z1</el-checkbox>
            <el-checkbox v-model="temp.z2">z2</el-checkbox>
            <el-checkbox v-model="temp.z3">z3</el-checkbox>
            <el-checkbox v-model="temp.z4">z4</el-checkbox>
            <el-checkbox v-model="temp.z5">z5</el-checkbox>
            <el-checkbox v-model="temp.z6">z6</el-checkbox>
            <el-checkbox v-model="temp.z7">z7</el-checkbox>
            <el-checkbox v-model="temp.z8">z8</el-checkbox>
            <el-checkbox v-model="temp.z9">z9</el-checkbox>
            <el-checkbox v-model="temp.z10">z10</el-checkbox>
          </el-form-item>
        </template>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogStatus==='add'?createData():updateData()">确定</el-button>
      </div>
    </el-dialog>-->
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
      waitTime: 0,
      tableKey: 0,
      timer: null,
      list: null,
      groupType: "all",
      menuList: [],
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
      temp: {},
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
  mounted() {
    this.$store.dispatch("trading/actionLookMenu").then(res => {
      this.menuList = res.data.items;
    });
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$store
        .dispatch("trading/actionLooklists", { type: this.groupType })
        .then(res => {
          this.list = res.data.items;
          this.listLoading = false;
        });
    },
    handleChangeState(item) {
      this.groupType = item.type;
      this.getList();
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
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.menu {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  background: #f5f7fa;
  font-size: 14px;
  margin-bottom: 10px;
  border: 1px solid #e4e7ed;
  display: flex;
  justify-content: space-around;
  .menu_item {
    cursor: pointer;
    height: 35px;
    color: #909399;
    line-height: 35px;
    text-align: center;
    width: 100%;
  }
  .active {
    cursor: default;
    color: #409eff;
    background-color: #fff;
    border-right-color: #dcdfe6;
    border-left-color: #dcdfe6;
  }
}
</style>