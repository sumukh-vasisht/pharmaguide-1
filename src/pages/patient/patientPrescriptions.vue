<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  href="/patientHome">Home</f7-button>
        </f7-nav-right>
    </f7-navbar>

     <f7-block-title>Patient ID : {{id}}</f7-block-title>
     <f7-block-title>Name of Medicine : </f7-block-title>
     <f7-block-title>Dosage : </f7-block-title>


  </f7-page>
</template>
<script>
import firebase from '../../js/firebaseInit';
import functions from '../../js/functions';
export default {
  data(){
    return {
      id : "",
      selected:{}
    }
  },
  beforeMount(){
    this.id = this.$f7route.params.id
    console.dir(this.$f7router.url);
    console.dir(this.$f7router);
    functions.getDocument("patients",this,"selected")
  }
}
</script>
