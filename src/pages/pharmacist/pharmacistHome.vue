<template>
  <f7-page :name="'Pharmacist '">
    <f7-navbar :title="'Patient ID'" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  @click="logout">Logout</f7-button>
        </f7-nav-right>
    </f7-navbar>
    <f7-list no-hairlines-md>
      <f7-list-input
        label="ENTER PATIENT ID"
        type="text"
        placeholder="Enter patient ID"
        :value="patientId"
        @input="patientId = $event.target.value">
      </f7-list-input>
    </f7-list>

    <f7-block>
      <f7-button fill raised class="col" @keyup.enter.native="submitPatientId" @click='submitPatientId'>Submit</f7-button>
    </f7-block>

  </f7-page>
</template>
<script>
import firebase from '../../js/firebaseInit';
import functions from '../../js/functions';
export default {
    data(){
      return {
        patientId:'',
      }
    },
    methods:{
      submitPatientId(){
        console.log("entered");
        this.$f7router.navigate('/prescriptions/'+  this.patientId)
      },
      logout() {
      firebase.auth.signOut()
      .then(x=>{
         this.$f7router.navigate('/')
      })
      },
    }
}
</script>
