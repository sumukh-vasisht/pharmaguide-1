<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  href="/pharmacistHome/">Home</f7-button>
        </f7-nav-right>
    </f7-navbar>
    <f7-block>
    <f7-list>
    <f7-list-item>Patient ID : {{id}}</f7-list-item>

    <f7-list-item>Patient Name : {{selectedPatient.patientName}}</f7-list-item>

    <f7-list-item>Age : {{selectedPatient.patientAge}}</f7-list-item>
  
    <f7-list-item>Gender : {{selectedPatient.patientGender}}</f7-list-item>

    <f7-list-item>Contact Number : {{selectedPatient.patientContact}}</f7-list-item>

    </f7-list>
    </f7-block>
    <f7-block>
    <f7-block-title>PRESCRIPTIONS:</f7-block-title>
    <f7-list>
      <f7-list-item v-for="med in selectedPatientPrescription.prescription" v-bind:key="med">
        {{ med.medicineName }} : {{med.quantity}}
      </f7-list-item>
    </f7-list>
    </f7-block>
      <f7-block>
        <f7-button @click="clearMeds">Delivered</f7-button>
      </f7-block>





    <f7-row>
          <f7-col>
            <f7-button raised fill  href="/pharmacistHome/">Home</f7-button>
          </f7-col>      
    </f7-row>

  </f7-page>
</template>
<script>
import firebase from '../../js/firebaseInit';
import functions from '../../js/functions';
export default {
  data(){
    return {
      id : "",
      selectedPatient:{},
      selectedPatientPrescription: [],
    }
  },
  beforeMount(){
    this.id = this.$f7route.params.id
    functions.getDocument("patients/"+this.id,this,"selectedPatient")
    functions.getDocument("prescriptions/"+this.id,this,"selectedPatientPrescription")
  },
  methods:{
    clearMeds(){
      firebase.db.doc('prescriptions/'+this.id).set({})
    }
  }
}
</script>
