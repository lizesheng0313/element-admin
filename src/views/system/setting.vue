<template>
  <el-form
    ref="dataForm"
    :model="temp"
    label-position="right"
    label-width="25%"
    style="width:500px;margin:100px auto 100px auto"
  >
    <template>
      <el-form-item label="工作天数:">
        <el-input v-model="temp.WorkHoliday" style="width:300px;" />
      </el-form-item>
      <el-form-item label="上班开始时间 :">
        <el-input v-model="temp.commutertime_start" style="width:300px;" />
      </el-form-item>
      <el-form-item label="下班结束时间 :">
        <el-input v-model="temp.commutertime_end" style="width:300px;" />
      </el-form-item>
      <el-form-item label="工作总天数 :">
        <el-input v-model="temp.dayall" style="width:300px;" />
      </el-form-item>
      <el-form-item label="dayline :">
        <el-input v-model="temp.dayline" style="width:300px;" />
      </el-form-item>
      <el-form-item label="天数限制 :">
        <el-input v-model="temp.daylimit" style="width:300px;" />
      </el-form-item>
      <el-form-item label="默认码 :">
        <el-input v-model="temp.defaultcode" style="width:300px;" />
      </el-form-item>
      <el-form-item label="描述 :">
        <el-input v-model="temp.description" style="width:300px;" />
      </el-form-item>
      <el-form-item label="邮箱1 :">
        <el-input v-model="temp.email_1" style="width:300px;" />
      </el-form-item>
      <el-form-item label="邮箱2 :">
        <el-input v-model="temp.email_2" style="width:300px;" />
      </el-form-item>
      <el-form-item label="邮箱3 :">
        <el-input v-model="temp.email_3" style="width:300px;" />
      </el-form-item>
      <el-form-item label="邮箱4 :">
        <el-input v-model="temp.email_4" style="width:300px;" />
      </el-form-item>
      <el-form-item label="关键词:">
        <el-input v-model="temp.keyword" style="width:300px;" />
      </el-form-item>
      <el-form-item label="要求 :">
        <el-input v-model="temp.requirement" style="width:300px;" />
      </el-form-item>
      <el-form-item label="网页标题 :">
        <el-input v-model="temp.webtitle" style="width:300px;" />
      </el-form-item>
      <el-form-item label="单词上限 :">
        <el-input v-model="temp.wordMax" style="width:300px;" />
      </el-form-item>
      <el-form-item label="单词下限 :">
        <el-input v-model="temp.wordMin" style="width:300px;" />
      </el-form-item>
      <el-form-item label="iskillorder :">
        <el-radio-group v-model="temp.iskillorder">
          <el-radio-button :label="0">关</el-radio-button>
          <el-radio-button :label="1">开</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </template>
    <div class="dialog-footer" style="text-align:center">
      <el-button type="primary" @click="handleSave" style="width:150px;">保存</el-button>
    </div>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      temp: {
        role_id: "",
        safecode: "",
        password: "",
        role_id: "",
        username: "",
        tip: ""
      }
    };
  },
  mounted() {
    this.getRead();
  },
  methods: {
    getRead() {
      this.$store.dispatch("system/actionSettingRead").then(res => {
        this.temp = res.data;
      });
    },
    handleSave() {
      this.$store.dispatch("system/actionSettingEdit", this.temp).then(res => {
        this.getRead();
        this.$notify({
          title: "成功",
          message: "设置保存成功",
          type: "success",
          duration: 2000
        });
      });
    }
  }
};
</script>

<style>
</style>