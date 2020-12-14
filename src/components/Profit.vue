<template>
  <div class="text-right" :class="amt >= 0 ? 'text-danger': 'text-success'" v-text="(amt >= 0 ? '+':'-') + Math.abs(amt).toFixed(digits)"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    amt: Number,
    digits: Number,
  }
})
export default class Profit extends Vue {
  amt!: number
  digits: number = 2
}
</script>

