<template>
  <div class="uk-margin-bottom" uk-height-viewport="expand: true">
    <table class="uk-table uk-table-striped uk-table-small">
      <thead>
      <th>Company</th>
      <th>Contact</th>
      <th>E-Mail</th>
      <th>Phone</th>
      <th>Web</th>
      </thead>
      <tbody v-if="companies" uk-scrollspy="target:>tr; cls:uk-animation-slide-top-small; delay:100;">
      <tr v-for="row in companies" :key="row.id" class="">
        <td>
          <span>{{row.companyName}}</span>
        </td>
        <td>
          <span>{{row.firstname}} {{row.lastname}}</span>
        </td>
        <td>
          <span><a class="nx-link" v-if="row.email" :href="'mailto:'+row.email">{{row.email}}</a></span>
        </td>
        <td>
          <span><a class="nx-link" :href="'tel:'+row.phone">{{row.phone}}</a></span>
        </td>
        <td>
          <span><a class="nx-link" :title="row.companyName+' Website'" :href="row.web" target="_blank">{{row.web}}</a></span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="uk-margin uk-flex uk-flex-right">
    <router-link to="/" class=" uk-button uk-button-secondary uk-button-small"> <font-awesome-icon icon="plus-circle" /> Add Company</router-link>
    <div class="uk-margin-left uk-button uk-button-secondary uk-button-small" @click="triggerUpdate"> <font-awesome-icon icon="rotate" /> Update List</div>
  </div>

</template>

<script>

export default {
  name: "CompanyList",
  data() {
    return { companies: false}
  },
  mounted() {
    console.log(this.companies)
    if(!this.companies){
      console.log("response scheint false")
      this.triggerUpdate()
    }
  },
  methods:{
    async triggerUpdate(){
      window.ipcRenderer.invoke('read-table', 'SELECT * FROM Company').then((result) => {
        console.log(result)
        this.companies = result
      })
    }
  },
}
</script>

<style scoped>
tr{
  border-radius: 9px;
  margin-top:30px;
  cursor: pointer;
}
tr:not(:first-of-type){

}
tr td:last-of-type{
  border-bottom-right-radius: 9px;
  border-top-right-radius: 9px;
}
tr td:first-of-type{
  border-bottom-left-radius: 9px;
  border-top-left-radius: 9px;
}
</style>
