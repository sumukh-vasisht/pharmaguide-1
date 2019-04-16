<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
        <f7-row>
          <f7-col>
            <f7-button raised fill  href="/">Home</f7-button>
          </f7-col>
          <f7-col>
            <f7-button raised fill  href="/medicalConditionDoctor">Medical Conditions</f7-button>
          </f7-col>
          <f7-col>
            <f7-button raised fill  href="/medicationDoctor">Medications</f7-button>
          </f7-col>
        </f7-row>
        </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Patient ID : {{id}}</f7-block-title>

    <f7-block-title>Patient Name : {{selected.patientName}}</f7-block-title>

    <f7-block-title>Age : {{selected.patientAge}}</f7-block-title>
  
    <f7-block-title>Gender : {{selected.patientGender}}</f7-block-title>

    <f7-block-title>Date of Birth : {{selected.patientDOB}}</f7-block-title>

    <f7-block-title>Emergency Contact Number : {{selected.patientEmergencyContact}}</f7-block-title>
    
    <!--<f7-block>      
      <f7-button :href="'/editMatchplate/'+id" raised fill>Edit Matchplate {{id}}</f7-button>
    </f7-block>-->
  </f7-page>
</template>
<script>
import firebase from '../js/firebaseInit';
import functions from '../js/functions';
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
