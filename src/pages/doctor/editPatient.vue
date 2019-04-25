<template>
  <f7-page name="addPatient">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-navbar title="Add a Patient" back-link="Back">
        <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  href="/doctorHome">Home</f7-button>
        </f7-nav-right>
      </f7-navbar>
    </f7-navbar>
    <f7-block>
        <f7-block-title>Patient ID : {{id}} </f7-block-title>
    </f7-block>
    <f7-list>
      <f7-list-input type="text" label="Patient Name" placeholder="John Doe" :value="selected.patientName" @input="selected.patientName = $event.target.value"></f7-list-input>
      <f7-list-input type="date" label="Patient DOB" placeholder="18" :value="selected.patientDOB" @input="selected.patientDOB = $event.target.value"></f7-list-input>
      <f7-list-item title="Gender" smart-select :smart-select-params="{closeOnSelect: true, openIn:'sheet'}">
          <select v-model="selected.patientGender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
          </select>
      </f7-list-item>
      <f7-list-input label="Contact" placeholder="XXXXXXXXXX" :value="selected.patientContact" @input="selected.patientContact = $event.target.value"></f7-list-input>    
      <f7-list-input label="Emergency Contact" placeholder="XXXXXXXXXX" :value="selected.patientEmergencyContact" @input="selected.patientEmergencyContact = $event.target.value"></f7-list-input>
    </f7-list>
    <f7-block>
        <f7-block-title>Allergies</f7-block-title>
        <f7-list>
            <f7-list-input v-for="(allergy,index) in selected.allergies" v-bind:key="index" :placeholder="'Allergy '+(index+1)" :value="selected.allergies[index]" @input="selected.allergies[index] = $event.target.value"></f7-list-input>
        </f7-list>
        <f7-button @click="addAllergy">Add an an Allergy</f7-button>
        <f7-button @click="removeAllergy">Remove an Allergy</f7-button>
    </f7-block>
    <f7-block>
        <f7-button type="submit" class="col" @keyup.enter.native="confirmAction" @click="confirmAction"  raised fill>SUBMIT</f7-button>
    </f7-block>
  </f7-page>
</template>

<script>
import firebase from '../../js/firebaseInit'
import functions from '../../js/functions'
export default {
    data() {
        return {
            id: "",
            selected: {}
        }
    },
    beforeMount(){
        this.id = this.$f7route.params.id
        functions.getDocument('patients/'+this.id,this,"selected")
    },
    methods:{
        addAllergy(){
            this.selected.allergies.push('')
        },
        removeAllergy(){
            this.selected.allergies.pop()
        },
        confirmAction(){
            let data = `
            Name : `+ this.selected.patientName +`
            <br>DOB : `+ this.selected.patientDOB +`
            <br>Gender : `+ this.selected.patientGender +`
            <br>Emergency Contact : `+ this.selected.patientEmergencyContact +`
            `
            this.$f7.dialog.confirm(data,"Confirm data",this.savePatient,this.return)
        },
        savePatient(){
            let DOB = new Date(this.selected.patientDOB+"")
            let D = new Date()
            let curTimestamp = D.getTime()
            let differenceTimestamp = parseInt(curTimestamp) - parseInt(DOB.getTime())
            console.log(differenceTimestamp);
            let patientAge = Math.floor(differenceTimestamp/31557600000)
            if(this.patientName != "" && this.patientAge != "" && this.patientGender != "" && this.patientEmergencyContact != "" && this.patientContact != ""){
                firebase.db.doc("patients/"+this.patientId).set({
                    patientName: this.selected.patientName,
                    patientDOB: this.selected.patientDOB,
                    patientAge: patientAge,
                    patientGender: this.selected.patientGender,
                    patientContact: this.selected.patientContact,
                    patientEmergencyContact: this.selected.patientEmergencyContact,
                    allergies: this.selected.allergies
                })
                .then(data=>{
                    let $ = this
                    this.$f7.dialog.alert("Patient "+ this.selected.patientName + " Added","", function(){$.$f7router.refreshPage()});
                    this.incrementPatientID()
                    this.$f7router.refreshPage()
                })
            }
            else{
                this.$f7.dialog.alert("Please Enter Valid Data")
            }
        },
    }
}
</script>
