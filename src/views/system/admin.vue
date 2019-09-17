
<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.username"
        prefix-icon="el-icon-search"
        :placeholder="$t('请输入用户名')"
        style="width: 130px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button v-waves class="filter-item" type="primary" @click="handleFilter">{{ $t('查询') }}</el-button>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        @click="handleAddAdmin"
      >{{ $t('新增管理员') }}</el-button>
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
      <el-table-column :label="$t('管理账号')" align="center" prop="username">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('备注')" align="center" prop="tip">
        <template slot-scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.tip }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('角色名称')" align="center" prop="role_name" />
      <el-table-column :label="$t('最后登陆IP')" align="center" prop="loginip"></el-table-column>
      <el-table-column :label="$t('最后登陆地区')" align="center" prop="iparea"></el-table-column>
      <!--<el-table-column :label="$t('角色ID')" align="center" prop="role_id" />-->
      <el-table-column :label="$t('最后登录时间')" align="center" prop="logintime">
        <template slot-scope="scope">
          <span>{{ scope.row.logintime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
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
              <el-input
                v-model="temp.username"
                :disabled="dialogStatus != 'add'"
                placeholder="只能为数字或字母，新增后不可修改"
              />
            </el-form-item>
            <el-form-item label="登录密码 :" prop="password">
              <el-input v-model="temp.password" type="password" placeholder="密码长度为6-12位字符" />
            </el-form-item>
            <el-form-item label="安全码 :" prop="safecode">
              <el-input v-model="temp.safecode" type="password" placeholder="安全码长度为6-12数字" />
            </el-form-item>
            <el-form-item label="用户姓名 :" prop="tip">
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
            <el-form-item label="是否锁定 :">
              <el-radio-group v-model="temp.islock">
                <el-radio-button :label="0">正常</el-radio-button>
                <el-radio-button :label="1">锁定</el-radio-button>
              </el-radio-group>
            </el-form-item>
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
        tip: "",
        islock:0
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
