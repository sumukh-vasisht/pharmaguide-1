<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Appointment Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  href="/doctorHome">Home</f7-button>
        </f7-nav-right>
    </f7-navbar>
    <f7-list no-hairlines-md>
        <f7-list-item>Patient ID : {{id}}</f7-list-item>

        <f7-list-item>Patient Name : {{selectedPatient.patientName}}</f7-list-item>

        <f7-list-item>Appointment Date : {{selectedAppointment.date}}</f7-list-item>
        
        <f7-list-item>Appointment Time : {{selectedAppointment.time}}</f7-list-item>
    </f7-list>
    <f7-block>
      <f7-row>
        <f7-col>
          <f7-button raised fill  @click="confirm">Confirm appointment</f7-button>
        </f7-col>
        <f7-col>
          <f7-button raised fill @click="cancel">Cancel appointment</f7-button>
        </f7-col>
      </f7-row><br>
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
      selectedPatient:{},
      selectedAppointment: {}
    }
  },
  beforeMount(){
    this.id = this.$f7route.params.id
    console.dir(this.id);
    functions.getDocument("patients/"+this.id,this,"selectedPatient")
    functions.getDocument("appointments/"+this.id,this,"selectedAppointment")

  },
  methods:{
    confirm(){
        firebase.db.doc('appointments/'+this.id).set({
            approved: true,
            })
            .then(snapshot=>{
                firebase.db.doc('patients/'+this.id).update({
                appointment: "Approved",
            })
            .then(snapshot2=>{
                this.$f7router.navigate('/appointments')

        })
    })
    },
    cancel(){
            firebase.db.doc('appointments/'+this.id).set({
            approved: false,
            }).then(snapshot=>{
                this.$f7router.navigate('/appointments')
        })
    },
  }
}
</script>
