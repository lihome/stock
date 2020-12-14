<template>
  <div class="container-fluid">
    <div class="row">
      <!-- card start -->
      <div class="card w-100">
        <div class="card-header">Compare Query</div>
        <div class="card-body">
          <form>
            <div class="row">
              <label class="col-md-2 col-form-label">开始时间:</label>
              <div class="col-md-4">
                <input
                  id="edate"
                  type="date"
                  class="form-control"
                  v-model="sdate"
                  @change="compareQuery"
                />
              </div>
              <label class="col-md-2 col-form-label">结束时间:</label>
              <div class="col-md-4">
                <input
                  id="edate"
                  type="date"
                  class="form-control"
                  v-model="edate"
                  @change="compareQuery"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- card end -->
    </div>

    <div class="row">
      <!-- table start -->
      <table class="table table-bordered">
        <thead class="thead-light">
          <tr>
            <th scope="col">Owner</th>
            <th class="text-right">Amt.(From)</th>
            <th class="text-right">Amt.(To)</th>
            <th class="text-right">Amt.(Diff)</th>
          </tr>
        </thead>
        <tbody>
          <CompareSummary v-for="(row, idx) in compareSummaryList" :key="idx" :summary="row" />
        </tbody>
      </table>
      <!-- table end -->
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { LoggerUtil } from "@/utils/LoggerUtil";

import moment from "moment";
import { tradeService } from "@/services/TradeService";
import Profit from "@/components/Profit.vue";
import CompareSummary from "@/components/CompareSummary.vue"

import { DATE_FORMAT } from "@/Contants";

@Options({
  components: {
    Profit,
    CompareSummary,
  }
})
export default class CompareQuery extends Vue {
  private sdate: string = "";
  private edate: string = "";
  private compareSummaryList: stock.OwnerCompareSummary[] = [];

  created() {
    let dt = moment();

    this.makeWeekday(dt);
    this.edate = dt.format(DATE_FORMAT);

    dt.add(-1, "d");
    this.makeWeekday(dt);
    this.sdate = dt.format(DATE_FORMAT);

    this.compareQuery();
  }

  private makeWeekday(dt: moment.Moment): void {
    if (dt.days() == 6) {
      dt.add(-1, "d");
    } else if (dt.days() == 0) {
      dt.add(-2, "d");
    }
  }

  async compareQuery() {
    console.log(this.sdate, "--", this.edate);
    this.compareSummaryList = await tradeService.compareQuery(
      this.sdate,
      this.edate
    );
  }
}
</script>

<style scoped>
</style>