<template>
  <div class="row">
        
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { HttpUtil } from "../utils/HttpUtil";
import { trendService } from "../services/TrendService"

@Options({
  props: {}
})

export default class Labs extends Vue {



  async created() {
    console.log("===")
  }
}
</script>

<style scoped>
</style>