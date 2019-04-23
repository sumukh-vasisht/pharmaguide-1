<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  href="/doctorHome">Home</f7-button>
        </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <f7-block-title>Patient Details</f7-block-title>
    <f7-list>
    <f7-list-item>Patient ID : {{id}}</f7-list-item>

    <f7-list-item>Patient Name : {{selected.patientName}}</f7-list-item>

    <f7-list-item>Age : {{selected.patientAge}}</f7-list-item>
  
    <f7-list-item>Gender : {{selected.patientGender}}</f7-list-item>

    <f7-list-item>Date of Birth : {{selected.patientDOB}}</f7-list-item>

    <f7-list-item>Contact Number : {{selected.patientContact}}</f7-list-item>

    <f7-list-item>Emergency Contact Number : {{selected.patientEmergencyContact}}</f7-list-item>
    </f7-list>
    <f7-block-title>Allergies</f7-block-title>
    <f7-list>
      <f7-list-item v-for="(allergy,index) in selected.allergies" v-bind:key="index" :title="(index+1) + '. ' + allergy"></f7-list-item>
    </f7-list>
    </f7-block>
    <f7-block>
    <f7-row>
          <f7-col>
            <f7-button raised fill  :href="'/medicalConditionDoctor/'+id">Add Medical Conditions</f7-button>
          </f7-col>
          <f7-col>
            <f7-button raised fill :href="'/listDisease/'+id">View Medical History</f7-button>
          </f7-col>
        </f7-row>
    </f7-block>
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
    functions.getDocument("patients/"+this.id,this,"selected")
  }
}
</script>
