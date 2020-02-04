<template>
  <div id="app">
    
<!--   router-view 显示的是当前路由地址所对应的内容 ==》显示是helloWorld.vue的内容 -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
</style>
