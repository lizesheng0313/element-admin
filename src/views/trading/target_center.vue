
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select
        v-model="listQuery.updatedtime"
        :placeholder="$t('更新')"
        style="width: 75px"
        class="filter-item"
      >
        <el-option label="15秒" value="15" />
        <el-option label="30秒" value="30" />
        <el-option label="60秒" value="60" />
        <el-option label="静止" value="0" />
      </el-select>

      <el-select
        v-model="listQuery.state"
        :placeholder="$t('状态')"
        style="width: 93px"
        class="filter-item"
      >
        <el-option label="全部" value="" />
        <el-option label="未审核" value="0" />
        <el-option label="已审核" value="1" />
        <el-option label="已取消" value="-1" />
      </el-select>

      <el-select
        v-model="listQuery.sdtype"
        :placeholder="$t('审核方式')"
        style="width: 100px"
        class="filter-item"
      >
        <el-option label="全部方式" value="" />
        <el-option label="提交审核" value="0" />
        <el-option label="手动审核" value="1" />
        <el-option label="手动审回" value="-1" />
      </el-select>

      <el-select
        v-model="listQuery.isnn"
        :placeholder="$t('角色选择')"
        style="width: 100px"
        class="filter-item"
      >
        <el-option label="全部角色" value="" />
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
        :placeholder="$t('会审订单号')"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />

      <el-input
        v-model="listQuery.trano_id"
        prefix-icon="el-icon-search"
        :placeholder="$t('会审编号')"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />


      <el-input
        v-model="listQuery.username"
        prefix-icon="el-icon-search"
        :placeholder="$t('请输入用户名')"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />


      <el-button v-waves class="filter-item" type="primary" @click="handleFilter">{{ $t('查询') }}</el-button>

    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      height="600"
      size="mini"
      :header-cell-style="{color:'#606266'}"
    >
      
      <el-table-column :label="$t('提交审核人')"  align="center" prop="username"></el-table-column>
      <el-table-column :label="$t('订单金额')"  align="center" prop="tradingamount"></el-table-column>
      <el-table-column :label="$t('订单标题')"  align="center" prop="tradingtitle"></el-table-column>
      <el-table-column :label="$t('订单归属人')"  align="center" prop="tradingworkname"></el-table-column>
      <el-table-column :label="$t('审核性质')"  align="center" prop="tjtype"></el-table-column>
      <el-table-column :label="$t('订单备注')"  align="center" prop="tradingremark"></el-table-column>
      <el-table-column :label="$t('订单状态')"  align="center" prop="tradingstate"></el-table-column>
      <el-table-column :label="$t('提交审核人')"  align="center" prop="tradingworkname"></el-table-column>
      <el-table-column :label="$t('订单审核人')"  align="center" prop="tradingadmin"></el-table-column>
      <el-table-column :label="$t('审核方式')"  align="center" prop="tradintype"></el-table-column>
      <el-table-column :label="$t('订单时间')"  align="center" prop="tradingtrano">
        <template slot-scope="scope">
          <span>{{ scope.row.oddtime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <!--功能操作栏目--开始-->
      <el-table-column
        :label="$t('操作')"
        align="center"
        width="100"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row}">
          <el-button-group>
            <el-button @click="handleUpdate(row)">编辑</el-button>
          </el-button-group>
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

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="450px"
      center="true"
      size="mini"
    >
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="20%">
        <template>
          <el-tabs v-model="edittapname" type="card">
            <el-form-item label="管理账号 :" prop>
              <el-input v-model="temp.username" :disabled="dialogStatus != 'add'" placeholder="只能为数字或字母，新增后不可修改" />
            </el-form-item>
            <el-form-item label="登录密码 :" prop="password">
              <el-input v-model="temp.password" type="password" placeholder="密码长度为6-12位字符" />
            </el-form-item>
            <el-form-item label="安全码 :" prop="safecode">
              <el-input v-model="temp.safecode" type="password" placeholder="安全码长度为6-12数字" />
            </el-form-item>
            <el-form-item label="用户姓名 :" prop="tip" >
              <el-input v-model="temp.tip" placeholder="可选项" />
            </el-form-item>
            <el-form-item label="用户选择 :">
              <el-select v-model="temp.role_id" placeholder="请选择对应角色">
                <el-option
                  v-for="item in roleNameList"
                  :key="item.role_id"
                  :label="item.role_name"
                  :value="item.role_id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-radio-group v-model="temp.islock" >
              <el-radio-button :label="0">正常</el-radio-button>
              <el-radio-button :label="1">锁定</el-radio-button>
            </el-radio-group>
          </el-tabs>
        </template>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('取消') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='add'?addData():updateData()"
        >{{ $t('确定') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t('确定') }}</el-button>
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
      textMap: {
        update: "编辑管理员",
        add: "新增管理员"
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
    this.getRoleName();
    this.getList();
  },
  methods: {
    getRoleName() {
      this.$store.dispatch("system/actionAdminrolelist").then(res => {
        this.roleNameList = res.data;
      });
    },
    getList() {
      this.listLoading = true;
      this.$store
        .dispatch("system/actionAdminlis", this.listQuery)
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
    handleAddAdmin() {
      this.temp = {
        role_id: "",
        safecode: "",
        password: "",
        role_id: "",
        username: "",
        tip: ""
      };
      this.dialogStatus = "add";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
      });
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
          this.$store
            .dispatch("system/actionAdminadd", this.temp)
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
