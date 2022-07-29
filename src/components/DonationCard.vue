<template>
  <div class="uk-width-1-1">
    <div class="uk-card uk-card-primary uk-card-small" uk-scrollspy="cls: uk-animation-slide-top-medium; delay:0; repeat:true">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Statisfied?</h3>
      </div>
      <div class="uk-card-body">
        <div class="uk-flex uk-flex-center">
          <div class="uk-width-1-1 uk-width-2-3@m">
            <p >You have already saved at least <b>{{ donationTimeString }}</b> by using this app. More time for family, friends &amp; other projects or just to relax...</p>
            <p>
              If you like Joomet, please consider donating a <font-awesome-icon icon="coffee" /> to support the development of this tool.
            </p>
          </div>
        </div>

        <div  class="uk-grid-small uk-flex uk-flex-center" uk-grid>
          <div>
            <a href="https://www.paypal.com/donate/?hosted_button_id=VUPWMB8LREFKA" target="_blank" class="uk-button nx-button-paypal">
              <font-awesome-icon :icon="[ 'fab', 'paypal' ]" /> Paypal
            </a>
          </div>
          <div>
            <a href="https://donate.stripe.com/14kcOQ0qc6fVarKcMM" target="_blank" class="uk-button nx-button-stripe">
              <font-awesome-icon :icon="[ 'fab', 'stripe' ]" /> Stripe </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DonationCard",
  props: {
    donationTimeString: {
      type: String,
      default: "a few minutes"
    }
  }
}
</script>

<style scoped>

</style>