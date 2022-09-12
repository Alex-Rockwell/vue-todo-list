
<template>
  <TodoList />
</template>

<script setup>
import TodoList from './components/TodoList.vue';
</script>

<style lang="scss">
@charset "UTF-8";
@font-face {
  font-family: 'VelaSans';
  src: url("../fonts/VelaSans/Static/Web/VelaSans-Regular.woff2");
  font-weight: 400;
  font-style: normal; }
@font-face {
  font-family: 'Montserrat';
  src: url("../fonts/Montserrat/static/Montserrat-Regular.ttf");
  font-weight: 400;
  font-style: normal; }
@font-face {
  font-family: 'Montserrat';
  src: url("../fonts/Montserrat/static/Montserrat-Bold.ttf");
  font-weight: 700;
  font-style: bold; }
@font-face {
  font-family: 'AGAvantGardeCyr';
  src: url("../fonts/agavantgardecyr-book.ttf");
  font-weight: 400;
  font-style: normal; }

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'VelaSans', sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: #16191D;
  line-height: 1.3;
  min-height: 100vh;
}
.container {
  max-width: 1310px;
  margin: 0 auto;
}
</style>
