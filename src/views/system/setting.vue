<template>
  <div class="app-container">
    <el-form
    ref="dataForm"
    :model="temp"
    label-position="right"
    label-width="80px"    >
    <el-tabs v-model="Tap">
      <el-tab-pane label="系统设置" name="systeam">

     <el-form-item label="工作天数:">
        <el-input v-model="temp.WorkHoliday" style="width:300px;" />
      </el-form-item>
      <el-form-item label="上班时间 :">
        <el-input v-model="temp.commutertime_start" style="width:300px;" />
      </el-form-item>
      <el-form-item label="下班时间 :">
        <el-input v-model="temp.commutertime_end" style="width:300px;" />
      </el-form-item>
      <el-form-item label="工作天数 :">
        <el-input v-model="temp.dayall" style="width:300px;" />
      </el-form-item>
      <el-form-item label="日限制数 :">
        <el-input v-model="temp.dayline" style="width:300px;" />
      </el-form-item>
      <el-form-item label="天数限制 :">
        <el-input v-model="temp.daylimit" style="width:300px;" />
      </el-form-item>
      <el-form-item label="默认编码 :">
        <el-input v-model="temp.defaultcode" style="width:300px;" />
      </el-form-item>

      </el-tab-pane>

      <el-tab-pane label="工作参数" name="work">

      <el-form-item label="描述内容 :">
        <el-input v-model="temp.description" style="width:300px;" />
      </el-form-item>
      <el-form-item label="一号邮箱 :">
        <el-input v-model="temp.email_1" style="width:300px;" />
      </el-form-item>
      <el-form-item label="二号邮箱 :">
        <el-input v-model="temp.email_2" style="width:300px;" />
      </el-form-item>
      <el-form-item label="三号邮箱 :">
        <el-input v-model="temp.email_3" style="width:300px;" />
      </el-form-item>
      <el-form-item label="四号邮箱 :">
        <el-input v-model="temp.email_4" style="width:300px;" />
      </el-form-item>
      <el-form-item label="关键词:">
        <el-input v-model="temp.keyword" style="width:300px;" />
      </el-form-item>
      <el-form-item label="要求业绩 :">
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
      <el-form-item label="业绩取消 :">
        <el-radio-group v-model="temp.iskillorder">
          <el-radio-button :label="0">关</el-radio-button>
          <el-radio-button :label="1">开</el-radio-button>
        </el-radio-group>
      </el-form-item>

      </el-tab-pane>
  
    </el-tabs>

    <div class="dialog-footer" style="width:1500px;margin:10px 120px " >
      <el-button type="primary" @click="handleSave" style="width:150px;">保存</el-button>
    </div>
  </el-form>

  </div>
</template>



<script>
export default {
  data() {
    return {
      Tap: 'systeam',
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