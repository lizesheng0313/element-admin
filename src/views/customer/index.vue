<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.checktype"
        :placeholder="$t('查询方式')"
        clearable
        style="width: 100px"
        class="filter-item"
      >
        <!--<el-option v-for="item in importanceOptions" :key="item.value" :label="item.label" :value="item.value" />-->

        <el-option label="精准查询" value="1" />
        <el-option label="模糊查询" value="0" />
      </el-select>

      <el-input
        v-model="listQuery.username"
        prefix-icon="el-icon-search"
        :placeholder="$t('请输入用户名')"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.name"
        :placeholder="$t('请输入姓名')"
        style="width: 100px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.tel"
        :placeholder="$t('请输入手机')"
        style="width: 110px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.qq"
        :placeholder="$t('请输入QQ')"
        style="width: 120px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.regip"
        :placeholder="$t('请输入注册IP')"
        style="width: 125px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-select
        v-model="listQuery.membergroupid"
        :placeholder="$t('会员分组')"
        clearable
        style="width: 100px"
        class="filter-item"
      >
        <el-option label="组1" value="1" />
        <el-option label="组2" value="2" />
        <el-option label="组3" value="3" />
      </el-select>

      <el-select
        v-model="listQuery.onlinestatu"
        :placeholder="$t('状态')"
        clearable
        style="width: 80px"
        class="filter-item"
      >
        <el-option label="在线" value="1" />
        <el-option label="离线" value="0" />
      </el-select>

      <el-select
        v-model="listQuery.isnb"
        :placeholder="$t('属性')"
        clearable
        style="width: 80px"
        class="filter-item"
      >
        <el-option label="正式" value="0" />
        <el-option label="测试" value="1" />
      </el-select>

      <el-date-picker
        v-model="listQuery.countTime"
        value-format="yyyy-MM-dd HH:mm:ss"
        :default-time="['00:00:00', '23:59:59']"
        type="daterange"
        :unlink-panels="true"
        class="filter-item"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />

      <el-button v-waves class="filter-item" type="primary" @click="handleFilter">{{ $t('查询') }}</el-button>

      <el-checkbox
        v-model="showlogintime"
        class="filter-item"
        style="margin-left:15px;"
        @change="tableKey=tableKey+1"
      >{{ $t('登录时间') }}</el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      fit
      highlight-current-row
      style="width: 100%;"
      height="630"
      @sort-change="sortChange"
      size="mini"
      :header-cell-style="{color:'#606266'}"
    >
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
      />

      <el-table-column :label="$t('账号')" width="130px" align="center" prop="islock">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.username}}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('姓名')" width="130px" align="center" prop="userbankname" />

      <el-table-column :label="$t('金额')" width="130px" align="center" prop="balance">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.balance }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('组号')" align="center" prop="zuhao">
        <template slot-scope="{row}">
          <el-tag type="danger">{{ row.zuhao }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column :label="$t('上级分组')" align="center" prop="shangjifenzu" />
      <el-table-column :label="$t('总绩')" align="center" prop="zongji" />
      <el-table-column :label="$t('返佣')" align="center" prop="fanyong" />
      <el-table-column :label="$t('业绩返佣')" align="center" prop="yejifanyong" />
      <el-table-column
        :label="$t('欠缺业绩')"
        width="100px"
        align="center"
        style="color:red"
        prop="qianqueyeji"
      />
      <el-table-column :label="$t('设备')" align="center" prop="loginsource" />
      <el-table-column :label="$t('注册时间')" width="130px" align="center" prop="regtime">
        <template slot-scope="scope">
          <span>{{ scope.row.regtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showlogintime"
        :label="$t('登录时间')"
        width="130px"
        align="center"
        prop="onlinetime"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.onlinetime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!--功能操作栏目--开始-->
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="300"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button-group>
            <el-button @click="handleUpdate(row)">编辑</el-button>
          </el-button-group>
          <el-dropdown style="margin-left:5px;position:relative:top:3px">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click="handleUpdate(row)">资料</el-dropdown-item>
              <el-dropdown-item @click="handleUpdate(row)">记录</el-dropdown-item>
              <el-dropdown-item @click="handleUpdate(row)">维护</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<el-button
            v-if="row.status!='published'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'published')"
          >{{ $t('table.publish') }}</el-button>-->
          <!-- <el-button
            v-if="row.status!='draft'"
            size="mini"
            @click="handleModifyStatus(row,'draft')"
          >{{ $t('table.draft') }}</el-button>-->
          <!--<el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleModifyStatus(row,'deleted')"
          >{{ $t('table.delete') }}</el-button>-->
        </template>
      </el-table-column>
      <!--功能操作栏目--结束-->
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="400px"
      center="true"
      size="mini"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="20%">
        <template>
          <el-tabs v-model="edittapname" type="card">
            <el-tab-pane label="基本资料" name="first">
              <el-form-item label="账号 :" prop="username" size="mini">
                <el-input v-model="temp.username" :disabled="true" />
              </el-form-item>
              <el-form-item label="姓名 :" prop="userbankname">
                <el-input v-model="temp.userbankname" />
              </el-form-item>
              <el-form-item label="组号 :" prop="zuhao">
                <el-input v-model="temp.zuhao" />
              </el-form-item>
              <el-form-item label="电话 :" prop="tel">
                <el-input v-model="temp.tel" />
              </el-form-item>
              <el-form-item label="QQ :" prop="qq">
                <el-input v-model="temp.qq" />
              </el-form-item>

              <el-timeline>
                <el-timeline-item icon="el-icon-people" color="#005AB5">
                  注册IP为 ：
                  <span>{{ temp.regip }}</span>
                </el-timeline-item>
                <el-timeline-item>
                  注册时间 ：
                  <span>{{ temp.regtime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </el-timeline-item>
                <el-timeline-item icon="el-icon-people" color="#ACD6FF">
                  最后登录 ：
                  <span>{{ temp.logintime | parseTime('{y}-{m}-{d} {h}:{i}:{s}') }}</span>
                </el-timeline-item>
              </el-timeline>
            </el-tab-pane>

            <el-tab-pane label="账户信息" name="second">
              <el-form-item label="总绩 :" prop="zongji">
                <el-input v-model="temp.zongji" />
              </el-form-item>
              <el-form-item label="返佣1 :" prop="fanyong">
                <el-input v-model="temp.fanyong" />
              </el-form-item>
              <el-form-item label="返佣2 :" prop="yejifanyong">
                <el-input v-model="temp.yejifanyong" />
              </el-form-item>
              <el-form-item label="欠缺 :" prop="qianqueyeji">
                <el-input v-model="temp.qianqueyeji" />
              </el-form-item>
              <el-form-item label="密码 :" prop="password">
                <el-input v-model="temp.tel" />
              </el-form-item>
              <el-form-item label="电话 :" prop="tradepassword">
                <el-input v-model="temp.tel" />
              </el-form-item>
              <!-- <el-form-item label="锁定 :" prop="islock">
                    <el-switch v-model="temp.islock" />
              </el-form-item>-->

              <el-radio-group v-model="temp.islock">
                <el-radio-button :label="0">正常</el-radio-button>
                <el-radio-button :label="1">锁定</el-radio-button>
              </el-radio-group>
            </el-tab-pane>

            <el-tab-pane label="所有上组" name="third">
              <el-form-item label="暂空 :" prop="zongji">
                <el-input v-model="temp.zongji" />
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </template>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('table.confirm') }}</el-button>
      </span>
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
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  components: { Pagination },
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
      total: 0,
      listLoading: true,
      edittapname: "first",

      listQuery: {
        checktype: "",
        username: "",
        countTime: [],
        name: "",
        tel: "",
        qq: "",
        regip: "",
        membergroupid: "",
        onlinestatu: "",
        isnb: "",
        limit: 20,
        importance: "",
        title: "",
        type: "",
        startTime: "",
        endTime: "",
        page: 1
      },
      importanceOptions: [
        { value: "1", label: "精准查询" },
        { value: "2", label: "模糊查询" }
      ],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "+id" },
        { label: "ID Descending", key: "-id" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      showlogintime: false,
      temp: {
        islock: "0",
        id: "",
        zuhao: 1,
        fanyong: "",
        yejifanyong: "",
        zongji: "",
        qianqueyeji: "",
        userbankname: "",
        qq: "",
        tel: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑用户",
        create: "Create"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        title: [
          { required: true, message: "title is required", trigger: "blur" }
        ]
      },
      downloadLoading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$store
        .dispatch("mem/getMemList", this.collatingFormData(this.listQuery))
        .then(response => {
          this.listLoading = false;
          this.list = response.data.items;
          this.total = response.data.total;
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },

    collatingFormData(formData) {
      const copyFormData = JSON.parse(JSON.stringify(formData));
      copyFormData["startTime"] = copyFormData.countTime[0] || "";
      copyFormData["endTime"] = copyFormData.countTime[1] || "";
      return copyFormData;
    },

    handleUpdate(row) {
      this.temp = row;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$store.dispatch("mem/postMemDetails", this.temp).then(res => {
            if (res.code == 20000) {
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            }
          });
          // updateArticle(tempData).then(() => {
          //   for (const v of this.list) {
          //     if (v.id === this.temp.id) {
          //       const index = this.list.indexOf(v);
          //       this.list.splice(index, 1, this.temp);
          //       break;
          //     }
          //   }
          //   this.dialogFormVisible = false;
          //   this.$notify({
          //     title: "成功",
          //     message: "更新成功",
          //     type: "success",
          //     duration: 2000
          //   });
          // });
        }
      });
    },
    handleDelete(row) {
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
      const index = this.list.indexOf(row);
      this.list.splice(index, 1);
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal, this.list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  }
};
</script>
