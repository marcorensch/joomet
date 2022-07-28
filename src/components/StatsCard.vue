<template>
  <div  class="uk-card uk-card-default uk-border-rounded uk-card-shadow " :class="item.containerClasses">
    <div class="uk-card-header">
      <h3 class="uk-card-title">{{ item.title }}</h3>
    </div>
    <div class="uk-card-body">
      <template v-if="item.type == 'number'">
        <div class="uk-text-center">
          <div class="uk-width-expand uk-margin-bottom">
            <span class="uk-text-primary uk-text-large">{{ item.value }}</span>
          </div>
          <div class="uk-width-expand">
            <span class="uk-text-muted nx-text-small">{{ item.description }}</span>
          </div>
        </div>
      </template>
      <template v-else-if="item.type == 'text'">

      </template>
      <template v-else>
        <div class="uk-flex uk-flex-center">
          <div class="uk-width-1-2 uk-width-1-1@m">
            <canvas ref="canvas"></canvas>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div v-if="item.type == 'spacer'"></div>
</template>

<script>
import Chart from 'chart.js/auto';
import StatisticCard from "@/modules/StatisticCard.mjs";

export default {
  name: "Card",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted() {
    if(this.item.type !== 'number'){
      this.drawCanvas();
    }
  },
  methods: {
    drawCanvas() {
      const styling = {
        hoverOffset: 2,
        borderWidth: 2,
        borderColor: '#25202a'
      }
      this.item.value.datasets[0] = Object.assign(this.item.value.datasets[0], styling) ;
      console.log(this.item.value.datasets[0])
      const ctx = this.$refs.canvas.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: this.item.value,
      });
    }
  }
}
</script>

<style scoped>

</style>