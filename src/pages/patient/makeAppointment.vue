<template>
    <f7-page :name="'Patient '">
        <f7-navbar :title="'Patient - '+ id + ' : Make Appointment'" back-link="Back">
            <f7-nav-right style="padding-right: 20px;">
                <f7-button raised fill  :href="'/patientHome/'+this.id">Home</f7-button>
            </f7-nav-right>
        </f7-navbar>
        <f7-block>
            <f7-block-title>Enter the details of the appointment</f7-block-title>
            <f7-list>
                <f7-list-input label="Date of Appointment" type="date" :value="appDate" @input="appDate = $event.target.value"></f7-list-input>
                <f7-list-input label="Time of Appointment" type="time" :value="appTime" @input="appTime = $event.target.value"></f7-list-input>
            </f7-list>
        </f7-block>
        <f7-block>
        <f7-button type="submit" class="col" @keyup.enter.native="confirmAction" @click="confirmAction"  raised fill>SUBMIT</f7-button>
    </f7-block>
    </f7-page>   
</template>

<script>
import firebase from '../../js/firebaseInit'
export default {
    data(){
    return {
      id : "",
      appDate: "",
      appTime: ""
    }
  },
  beforeMount(){
      this.id = this.$f7route.params.id
  },
  methods:{
      confirmAction(){
          this.$f7.dialog.confirm("Are you sure?","Confirm",this.addAppointment,this.return)
      },
      addAppointment(){
        //   let time = (new Date(this.appDate)).getTime()
        firebase.db.doc('appointments/'+this.id).set({
            date: this.appDate,
            time: this.appTime,
            approved: false
        })
        .then(snapshot=>{
            firebase.db.doc('patients/'+this.id).update({
                appointment: "Not Approved",
                appointmentDate: this.appDate,
                appointmentTime: this.appTime
            })
            .then(snapshot=>{
                this.$f7.dialog.alert("Your appointment has been requested. Please await the doctor's approval")
                this.$f7router.navigate("/patientHome/"+this.id)
            })
        })      
      }
  }
}
</script>

<style>

</style>
