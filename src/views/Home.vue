<template>
  <div class="main">
    <div class="list-group">
      <a href="#compareQuery" class="list-group-item list-group-item-action py-2 text-primary">查询&gt;</a>
      <a href="#ownerSummary" class="list-group-item list-group-item-action py-2 text-primary">汇总&gt;</a>
      <a href="#labs" class="list-group-item list-group-item-action py-2 text-primary">Labs&gt;</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {}
})
export default class Home extends Vue {}
</script>

<style scoped>
  .main {
    padding-top: 100px;
  }
</style>