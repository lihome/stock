<template>
  <tr @click="toggleDetail(summary.owner)">
    <td v-text="summary.owner"></td>
    <td>
      <Profit :amt="summary.samt" />
    </td>
    <td>
      <Profit :amt="summary.eamt" />
    </td>
    <td>
      <Profit :amt="summary.damt" />
    </td>
  </tr>
  <tr :id="summary.owner" style="display:none;">
    <td colspan="4">
      <div class="card w-100 pb-2" v-for="(codeSummary, idx) in summary.ecodeList" :key="idx">
        <div class="card-header d-flex">
          <div class="mr-auto" v-text="codeSummary.code"></div>
          <Profit :amt="codeSummary.amt"/>
        </div>
        <div>
          <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th style="min-width:98px;">Date</th>
                <th class="text-right">Qty.</th>
                <th class="text-right">Price<br>(HKD)</th>
                <th class="text-right">Amt.<br>(RMB)</th>
                <th class="">Mark</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(trade, tradeIdx) in codeSummary.tradeList" :key="tradeIdx">
                <td class="small" v-text="trade.date"></td>
                <td class="small"><Num8er :val="trade.qty" digits="0"/></td>
                <td class="small"><Num8er :val="trade.price"/></td>
                <td class="small"><Profit :amt="trade.amt"/></td>
                <td class="small" v-text="trade.remark"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import Profit from "@/components/Profit.vue";
import Num8er from "@/components/Num8er.vue";


@Options({
  components: {
    Profit,
    Num8er
  },
  props: {
    summary: Object
  }
})
export default class CompareSummary extends Vue {
  summary!: Object;

  toggleDetail(id: string) {
    // @ts-ignore
    $('#' + id).toggle()
  }
  

}
</script>

