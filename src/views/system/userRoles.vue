<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddRole">{{ $t('permission.addRole') }}</el-button>

    <el-table
      :data="rolesList"
      v-loading="listLoading"
      style="width: 100%;margin-top:30px;"
      border
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
    >
      <el-table-column align="center" label="角色ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column align="center" label="角色昵称">
        <template slot-scope="scope">{{ scope.row.role_name }}</template>
      </el-table-column>
      <el-table-column align="center" label="添加时间">
        <template slot-scope="scope">{{ scope.row.oddtime |parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </el-table-column>
      <el-table-column align="center" label="创建者">
        <template slot-scope="scope">{{ scope.row.produce_name }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope)"
          >{{ $t('permission.editPermission') }}</el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope)"
          >{{ $t('permission.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'Edit Role':'New Role'">
      <el-form :model="role" label-width="80px" label-position="left">
        <el-form-item label="Name">
          <el-input v-model="role.role_name" placeholder="Role Name" />
        </el-form-item>
        <el-form-item label="Menus">
          <el-checkbox-group v-model="ruleList">
            <el-checkbox
              :label="item.title"
              v-for="(item,index) in role.role"
              :key="index"
              @change="handleChnageRule($event,item)"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">{{ $t('permission.cancel') }}</el-button>
        <el-button type="primary" @click="confirmRole">{{ $t('permission.confirm') }}</el-button>
      </div>
    </el-dialog>
    <chat-tool></chat-tool>
  </div>
</template>

<script>
import ChatTool from "@/components/ChatTool";
import { parseTime } from "@/utils";
// import path from "path";
// import i18n from "@/lang";
export default {
  components: { ChatTool },
  data() {
    return {
      listLoading: true,
      newrole: {},
      role: {},
      routes: [],
      ruleList: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: "new",
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "title"
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$store.dispatch("system/getRoleList").then(res => {
        this.listLoading = false;
        this.rolesList = res.data;
      });
    },
    handleAddRole() {
      this.ruleList = [];
      this.role = { role_name: "" };
      this.$store.dispatch("system/actionRuleRead").then(res => {
        this.role = { ...res.data };
      });
      this.dialogType = "new";
      this.dialogVisible = true;
    },
    async confirmRole() {
      let role = {};
      this.role.role.forEach(element => {
        let x = element.value;
        role[x] = element.key;
      });
      let obj = {
        role_name: this.role.role_name,
        role
      };
      if (this.dialogType == "new") {
        this.$store.dispatch("system/actionRuleAdd", obj).then(res => {
          if (res.code === 20000) {
            this.getList();
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "新增用户角色成功"
            });
          }
        });
      } else {
        let role = {};
        this.role.role.forEach(element => {
          let x = element.value;
          role[x] = element.key;
        });
        let obj = {
          id: this.role.id,
          role_name: this.role.role_name,
          role
        };
        this.$store.dispatch("system/actionRoleEdit", obj).then(res => {
          if (res.code === 20000) {
            this.getList();
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "编辑用户角色成功"
            });
          }
        });
      }
    },
    handleChnageRule(e, item) {
      e === true ? (item.key = "1") : (item.key = 0);
    },
    handleEdit(scope) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.role = { ...scope.row };
      this.ruleList = [];
      this.role.role.forEach(element => {
        element.key === "1"
          ? this.ruleList.push(element.title)
          : this.ruleList.push("");
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
</style>
