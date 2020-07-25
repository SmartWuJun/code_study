<!--
 * @Date: 2020-07-25 16:34:42
 * @LastEditors: wj
 * @Description: 
--> 

<template>
  <input :value="value" class="ft-input" @blur="handleBlur" @input="handleChange" />
</template>

<script>
import emitter from '../../utils/emitter';
export default {
  name: 'ftInput',
  mixins: [emitter],
  props: {
    value: {
      type: String,
      default: ''
    },

  },
  data () {
    return {
      curVal: this.value
    }
  },
  methods: {
    handleBlur (e) {
      console.log('blur')
      this.$emit('input', e.target.value)

      this.dispatch('FtFormItem', 'on-form-blur', e.target.value)
      console.log('%c 🍼️ this.value: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', e.target.value);
    },
    handleChange (e) {
      this.$emit('input', e.target.value)
      this.dispatch('FtFormItem', 'on-form-change', e.target.value)


    }
  },
}
</script>

<style lang="scss" scoped>
</style>