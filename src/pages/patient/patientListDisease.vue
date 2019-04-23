<template>
    <f7-page>
    <f7-navbar>
      <f7-navbar title="Patient's disease list" back-link="Back">
        <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  :href="'/patientHome/'+this.id">Home</f7-button>
        </f7-nav-right>
      </f7-navbar>
    </f7-navbar> 
    <f7-list>
      <f7-list-item :link="'/patientMedicalHistory/'+id+'/'+disease" v-for="(disease,index) in documents" :title="(index+1)+ '. ' +disease" v-bind:key="index"></f7-list-item>
    </f7-list>
    </f7-page>   
</template>

<script>
import functions from '../../js/functions'
export default {
    data(){
        return {
            documents: [],
            id: ""
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
