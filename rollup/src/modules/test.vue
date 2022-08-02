<template>
  <div>
    <div>测试 Test</div>
    <el-btn type="primary">按钮</el-btn>
  </div>
</template>

<script>
import { Button } from "element-ui";
export default {
  name: "Test",
  components: {
    "el-btn": Button,
  },
  mounted() {
    let engine = {};
    console.log(engine?.as());

    setTimeout(() => {
      console.log("7788");
    }, 2000);
  },
};
</script>

<style lang="scss" scoped></style>
