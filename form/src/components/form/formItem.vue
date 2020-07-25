

<template>
  <div class="ft-form-item">
    <span class="label" :class="{'i-form-item-label-required':isRequired}">{{label}}</span>
    <div>
      <slot></slot>
      <i class="i-form-item-message" v-if="validateState==='error'">{{validateMessage}}</i>
    </div>
  </div>
</template>

<script>
import schema from 'async-validator';
export default {
  name: 'ftFormItem',
  componentName: 'FtFormItem',
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isRequired: false,
      validateState: '',
      validateMessage: ''

    }
  },
  mounted () {
    if (this.prop) {
      this.form.fields.push(this);
      //缓存初始值 重置时使用
      this.initValue = this.form.model[this.prop];
      this.setRules();
    }

  },
  methods: {
    setRules () {
      let myRules = this.getRules();
      if (myRules.length) {
        this.isRequired = myRules.some(v => v.required);
      }

      this.$on('on-form-blur', this.handleBlur)
      this.$on('on-form-change', this.handleChange)
    },
    getRules () {
      let formRules = this.form.rules;
      let rules = formRules ? formRules[this.prop] : [];
      return [].concat(rules);
    },
    handleBlur () {
      this.validate('blur');
    },
    handleChange () {
      this.validate('change');
    },

    validate (trigger, callback) {
      let allRules = this.getRules();
      let curRules = allRules.filter(v => !trigger || v.trigger === trigger);
      console.log('%c 🥫 curRules: ', 'font-size:20px;background-color: #FCA650;color:#fff;', curRules);

      if (!curRules || !curRules.length) {
        return true;
      }

      let descriptor = {};
      descriptor[this.prop] = curRules;

      let validator = new schema(descriptor);

      let obj = {};
      obj[this.prop] = this.form.model[this.prop];
      validator.validate(obj, (errors) => {
        console.log('%c 🍈 errors: ', 'font-size:20px;background-color: #F5CE50;color:#fff;', errors);
        if (errors) {
          this.validateState = 'error';
          this.validateMessage = errors[0].message;
        } else {
          this.validateState = 'success';
          this.validateMessage = '';

        }
        callback && callback(this.validateMessage);

      })



    },
    resetFeild () {
      this.validateState = '';
      this.validateMessage = '';
      this.form.model[this.prop] = this.initValue
    }
  },
}
</script>

<style  scoped>
.label {
  width: 100px;
}
.ft-form-item {
  display: flex;
  margin-bottom: 5px;
}
.i-form-item-label-required:before {
  content: '*';
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>