<template>
  <div class="text-right" v-text="val.toFixed(digits)"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    val: Number,
    digits: Number,
  }
})
export default class Profit extends Vue {
  val!: number
  digits: number = 2
}
</script>

