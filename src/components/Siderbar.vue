<template>
  <div class="sidebar">
    <el-menu
      text-color="#fff"
      active-text-color="#ffd04b"
      background-color="#545c64"
    >
      <el-menu-item index="1">
        <span>不合格单据</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
 
<script>
export default {};
</script>
 
<style scoped>
.sidebar{
display: block;
  position: absolute;
  width:200px;
  top:0;
  bottom: 0;
  overflow-y: scroll;
  background-color: #545c64;
}
</style>