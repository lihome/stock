<template>
  <div class="container">
   
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="col-3 text-center">Owner</li>
        <li class="col-3 text-center">Qty</li>
        <li class="col-3 text-center">Amt</li>
        <li class="col-3 text-center"></li>
      </ol>
    </nav>

    <div id="accordion">
      <div class="card" v-for="(row, idx) in ownerList" :key="idx">
        <div class="card-header">
          <div class="row">
            <div class="col-3" v-text="row.owner"></div>
            <div class="col-3" v-text="row.qty"></div>
            <div class="col-3" v-text="row.amt"></div>
            <a class="card-link" data-toggle="collapse" :href="'#card_' + row.owner">Detail</a>
          </div>
        </div>
        <div :id="'card_' + row.owner" class="collapse hide" data-parent="#accordion">
          <div class="card-body">
            <div class="code-group" v-for="(code, codeIdx) in row.codeList" :key="codeIdx">
              <div class="row">
                <div class="col-3" v-text="code.code"></div>
                <div class="col-2" v-text="code.qty"></div>
                <div class="col-2" v-text="code.price"></div>
                <div class="col-5" v-text="code.amt"></div>
              </div>
              <table border="1" class="table" width="100%">
                <tr>
                  <td>Date</td>
                  <td>Qty</td>
                  <td>Price</td>
                  <td>Amt</td>
                  <td>Remark</td>
                </tr>
                <tr v-for="(trade, tradeIdx) in code.tradeList" :key="tradeIdx">
                  <td v-text="trade.date"></td>
                  <td v-text="trade.qty"></td>
                  <td v-text="trade.price"></td>
                  <td v-text="trade.amt"></td>
                  <td v-text="trade.remark"></td>
                </tr>

              </table>

            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { CsvUtil } from "@/utils/CsvUtil";
import { HttpUtil } from "@/utils/HttpUtil";
import { LoggerUtil } from "@/utils/LoggerUtil";
import { tradeService } from '../services/TradeService';

@Options({
  components: {
  }
})
export default class OwnerSummary extends Vue {
  private ownerList: stock.OwnerSummary[] = [];

  async created() {

    this.ownerList = await tradeService.ownerSummary();

  }

  readCSVFile(e: Event): void {
    var me = this;
    const target = <HTMLInputElement>e.target!;
    if (!target.files || !target.files.length) {
      return LoggerUtil.log("target.files null");
    }

    const reader = new FileReader();
    reader.readAsText(target.files[0]);
    reader.onload = async function() {
      const list = await tradeService.ownerSummaryFromImport(<string>this.result);
      me.loadDatas(list);
    };
    // restore file status
    target.value = "";
  }

  loadDatas(ownerList: stock.OwnerSummary[]) {
    this.ownerList = ownerList;
  }

}
</script>
<style scoped>
  .code-group {
    border: 1px solid;
  }
</style>