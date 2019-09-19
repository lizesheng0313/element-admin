
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" @click="handleFilter">刷新</el-button>
      <el-button v-waves class="filter-item" type="primary" @click="handleAdd">新增</el-button>
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
      <el-table-column label="ID" width="50" align="center" prop="id"></el-table-column>

      <el-table-column label="标识名称" align="center" prop="typetitle">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.typetitle}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标识" align="center" prop="type"></el-table-column>
      <el-table-column label="标识标题" align="center" prop="ftitle"></el-table-column>
      <el-table-column label="最低标额" align="center" prop="minmoney"></el-table-column>
      <el-table-column label="最高标额" align="center" prop="maxmoney"></el-table-column>
      <el-table-column label="标识备注" align="center" prop="remark"></el-table-column>
      <el-table-column label="排序值" width="60" align="center" prop="listorder"></el-table-column>
      <el-table-column label="拖拽排序" align="center" width="80">
        <template slot-scope="{}">
          <svg-icon class="drag-handler" icon-class="drag" />
        </template>
      </el-table-column>

      <el-table-column
        label="是否在线"
        align="center"
        width="80"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <div v-if="row.isonline == -1">
            <el-tag type="info" effect="dark">否</el-tag>
          </div>
          <div v-else-if="row.isonline == 1">
            <el-tag type effect="dark">是</el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="150" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button-group>
            <el-radio-group v-model="row.state" @change="handleChangeState(row)">
              <el-radio-button :label="0">关闭</el-radio-button>
              <el-radio-button :label="1">启用</el-radio-button>
            </el-radio-group>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

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
    </el-dialog>
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
    handleChangeState(row) {
      let obj = {
        id: row.id,
        state: row.state
      };
      this.$store.dispatch("trading/actionChangestate", obj).then(res => {
        if ((res.code = 20000)) {
          this.getList();
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
    handleAdd() {
      this.temp = {
        typetitle: "",
        type: "",
        ftitle: "",
        minmoney: "",
        maxmoney: "",
        remark: "",
        centerurl: "",
        html: "",
        isonline: "",
        z1: true
      };
      this.dialogStatus = "add";
      this.dialogFormVisible = true;
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("trading/actionTradingAdd", this.temp)
            .then(res => {
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
            .dispatch("trading/actionChangeinfo", this.temp)
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
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>