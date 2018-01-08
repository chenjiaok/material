<template>
  <div class="jumbotron">
    <h1>{{ msg }}</h1>
    <p> 这是一个在线的物料查询管理系统，可以通过本系统在线管理你的物料（创建物料、更改物料、查询订单信息、库存管理以及采购计划管理）。</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '欢迎来到物料管理系统',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>         
