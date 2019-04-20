<template>
    <f7-page name="addPatient">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-navbar title="Patients List" back-link="Back">
        <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  href="/doctorHome">Home</f7-button>
        </f7-nav-right>
      </f7-navbar>
    </f7-navbar> 
    <f7-list>
      <f7-list-input
        type="text"
        placeholder="Search"
        :value="search"
        @input="search = $event.target.value"
      ></f7-list-input>
      <f7-list-item :link="'/medicalHistory/'+id+'/'+disease" v-for="disease in filteredDiseases" :title="disease" v-bind:key="disease"></f7-list-item>
    </f7-list>
    </f7-page>   
</template>

<script>
import functions from '../../js/functions'
export default {
    data(){
        return {
            documents: [],
            id: "",
            search: ""
        }
    },
    computed:{
    filteredDiseases: function(){
      this.search = this.search.toUpperCase()
      return this.documents.filter(doc=>{
        return doc.match(this.search)
      })
    }
  },
    beforeMount(){
        this.id = this.$f7route.params.id
        functions.getAllDocs("medicalHistory/"+this.id+"/medicalHistory",this)
    },
}
</script>

<style>

</style>
