<template>
  <div>
    <ViewTitle title="Add Customer" />
    <CustomerForm />
  </div>
</template>

<script>
import CustomerForm from "@/components/layouts/CustomerForm";
import HistoryBack from "@/components/navigation/HistoryBack";
import ViewTitle from "@/components/ViewTitle";
export default {
  name: "ProjectNew",
  components: {
    ViewTitle,
    HistoryBack,
    CustomerForm
  },
  mounted() {

  },
  unmounted() {

  }
}
</script>

<style scoped>


</style>