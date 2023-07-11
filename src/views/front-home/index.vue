<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<script setup lang="ts"></script>

<style scope lang="less">
.box-card {
  width: 90%;
  margin: 0 auto;
  margin-top: 40px;
}
</style>
