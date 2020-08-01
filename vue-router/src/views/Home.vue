<!--
 * @Date: 2020-08-01 19:31:20
 * @LastEditors: wj
 * @Description: 
--> 
<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />-->

    <div @click="$store.commit('add')">count: {{$store.state.count}}</div>
    <div @click="$store.dispatch('asyncAdd')">async count: {{$store.state.count}}</div>
    <!-- <div>getters: {{$store.getters.doubleCounter}}</div> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  mounted () {
    this.$store.state = 100;
  },
  methods: {
    name () {

    }
  },
};
</script>
