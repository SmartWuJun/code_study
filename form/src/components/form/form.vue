<!--
 * @Date: 2020-07-25 16:12:20
 * @LastEditors: wj
 * @Description: 
--> 
<template>
  <div class="ft-form">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FtForm',
  componentName: 'FtForm',
  provide () {
    return {
      form: this
    }

  },
  props: {
    model: {
      type: Object,
      default: () => { }
    },
    rules: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    validate (callback) {
      return new Promise((reslove) => {
        let valid = true;
        let count = 0;
        this.fields.forEach(field => {
          field.validate('', error => {
            if (error) {
              valid = false
            }
            if (++count === this.fields.length) {
              reslove(valid);
              callback && callback(valid)
            }
          })

        })

      })

    }
  },
}
</script>

<style lang="scss" scoped>
</style>
