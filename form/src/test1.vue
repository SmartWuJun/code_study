

    <!--
 * @Date: 2020-07-25 16:02:34
 * @LastEditors: wj
 * @Description: 
--> 
<template>
  <el-form :model="form" :rules="rules" ref="ruleForm">
    <el-form-item label="活动名称1" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="活动描述" prop="desc">
      <el-input v-model="form.desc"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      form: {
        name: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '描述不能为空', trigger: 'change' }
        ]

      },


    }
  },
  mounted () {
    console.log(1)
    console.log('xxx', this.$refs.ruleForm.$options);
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
