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
      <f7-list-item :link="'/viewPatient/'+patient" v-for="patient in filteredPatients" :title="patient" v-bind:key="patient"></f7-list-item>
    </f7-list>
    <f7-block>        
        <f7-button class="col" raised fill href='/addPatient'>Add Grade</f7-button>
    </f7-block>
    </f7-page>   
</template>

<script>
import functions from '../js/functions'
export default {
    data(){
        return {
            documents: [],
            search:"",
        }
    },
    beforeMount(){
        functions.getAllDocs("patients",this)
    },
    computed:{
        filteredPatients: function(){
            return this.documents.filter(doc=>{
                return doc.match(this.search)
            })
        }  
    }
}
</script>

<style>

</style>
