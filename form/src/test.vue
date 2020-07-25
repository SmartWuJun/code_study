<!--
 * @Date: 2020-07-25 16:26:51
 * @LastEditors: wj
 * @Description: 
--> 

<template>
  <div>
    <ft-form ref="form" :model="form" :rules="rules">
      <ft-form-item label="name" prop="name">
        <ft-input v-model="form.name"></ft-input>
      </ft-form-item>
      <ft-form-item label="desc" prop="desc">
        <ft-input v-model="form.desc"></ft-input>
      </ft-form-item>
      <ft-form-item label="age" prop="age">
        <ft-input v-model="form.age"></ft-input>
      </ft-form-item>
    </ft-form>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
import FtForm from './components/form/form.vue';
import FtFormItem from './components/form/formItem.vue';
import FtInput from './components/form/input.vue';


export default {
  components: {
    FtFormItem, FtInput, FtForm
  },
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('年龄不能为空'));
      }
      value = value - 0;
      if (!Number.isInteger(value)) {
        callback(new Error('请输入数字值'));
      } else {
        if (value < 18) {
          callback(new Error('必须年满18岁'));
        } else {
          callback();
        }
      }
    };
    return {
      form: {
        name: '',
        desc: '',
        age: ''
      },
      rules: {
        name: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '描述不能为空', trigger: 'change' },
          { validator: checkAge, trigger: 'blur' }
        ],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]

      }
    }
  },
  mounted () {
    console.log(this.$refs.form.$options);
  },
  methods: {
    submit () {
      this.$refs.form.validate(valid => {
        if (!valid) {
          console.log('验证失败');
          return
        }

        console.log('验证通过')
      })
    }
  },

}
</script>

<style lang="scss" scoped>
</style>
