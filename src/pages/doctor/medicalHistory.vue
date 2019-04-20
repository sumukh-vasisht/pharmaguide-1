<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient '+ id + ' Medical History' + disease" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
        <f7-button raised fill  href="/doctorHome">Home</f7-button>
      </f7-nav-right>
    </f7-navbar>
      <f7-list>
        <f7-list-item>Condition : {{medicalHistory.issue}} </f7-list-item>
        <f7-list-item>Date of diagnosis : {{(new Date(this.medicalHistory.dod)).toLocaleDateString('en-GB')}} </f7-list-item>
        <f7-list-item>Prescribed Medication : </f7-list-item>
        <f7-list-item v-for="(med,index) in medicalHistory.prescription" v-bind:key="index">{{index+1}}<br>Name : {{med.name}}<br>Quantity : {{med.quantity}}<br></f7-list-item>
      </f7-list>
  </f7-page>
</template>

<script>
import firebase from '../../js/firebaseInit';
import functions from '../../js/functions';
export default {
  data(){
    return {
      id : "",
      disease : "",
      date : "",
      medicalHistory: {},
    }
  },
  beforeMount(){
    this.id = this.$f7route.params.id
    this.disease = this.$f7route.params.disease
    functions.getDocument('medicalHistory/'+this.id+'/medicalHistory/'+this.disease, this, "medicalHistory")
    // this.date = (new Date(this.medicalHistory.dod)).toLocaleDateString('en-GB')
  }
}
</script>