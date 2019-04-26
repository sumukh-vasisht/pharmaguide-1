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
        <f7-block-title>Patient ID : {{patientId}} </f7-block-title>
    </f7-block>
    <f7-list>
      <f7-list-input type="text" label="Patient Name" placeholder="John Doe" :value="patientName" @input="patientName = $event.target.value"></f7-list-input>
      <f7-list-input type="date" label="Patient DOB" placeholder="18" :value="patientDOB" @input="patientDOB = $event.target.value"></f7-list-input>
      <f7-list-item title="Gender" smart-select :smart-select-params="{closeOnSelect: true, openIn:'sheet'}">
          <select v-model="patientGender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
          </select>
      </f7-list-item>
      <f7-list-input label="Contact" placeholder="XXXXXXXXXX" :value="patientContact" @input="patientContact = $event.target.value"></f7-list-input>    
      <f7-list-input label="Emergency Contact" placeholder="XXXXXXXXXX" :value="patientEmergencyContact" @input="patientEmergencyContact = $event.target.value"></f7-list-input>
    </f7-list>
    <f7-block>
        <f7-block-title>Allergies</f7-block-title>
        <f7-list>
            <f7-list-input v-for="(allergy,index) in allergies" v-bind:key="index" :placeholder="'Allergy '+(index+1)" :value="allergies[index]" @input="allergies[index] = $event.target.value"></f7-list-input>
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
export default {
    data() {
        return {
            patientId:"",
            patientName:"",
            patientDOB:"",
            patientGender:"",
            patientContact:"",
            patientEmergencyContact:"",
            allergies:[]
        }
    },
    beforeMount(){
        firebase.db.doc('patientID/patientIdNum').get()
        .then(snapshot=>{
            this.patientId = snapshot.data().idNum
        })
    },
    methods:{
        addAllergy(){
            this.allergies.push('')
        },
        removeAllergy(){
            this.allergies.pop()
        },
        confirmAction(){
            let data = `
            Name : `+ this.patientName +`
            <br>DOB : `+ this.patientDOB +`
            <br>Gender : `+ this.patientGender +`
            <br>Contact :` + this.patientContact +`
            <br>Emergency Contact : `+ this.patientEmergencyContact +`
            <br>Allergies: <br> `+ this.allergies.join("<br>") + `
            `
            
            this.$f7.dialog.confirm(data,"Confirm data",this.savePatient,this.return)
        },
        savePatient(){
            let DOB = new Date(this.patientDOB+"")
            let D = new Date()
            let curTimestamp = D.getTime()
            let differenceTimestamp = parseInt(curTimestamp) - parseInt(DOB.getTime())
            console.log(differenceTimestamp);
            let patientAge = Math.floor(differenceTimestamp/31557600000)
            if(this.patientName != "" && this.patientAge != "" && this.patientGender != "" && this.patientEmergencyContact != "" && this.patientContact != ""){
                firebase.db.doc("patients/"+this.patientId).set({
                    patientName: this.patientName,
                    patientDOB:this.patientDOB,
                    patientAge: patientAge,
                    patientGender: this.patientGender,
                    patientContact: this.patientContact,
                    patientEmergencyContact: this.patientEmergencyContact,
                    allergies: this.allergies
                })
                .then(data=>{
                    let $ = this
                    this.$f7.dialog.alert("Patient "+ this.patientName + " Added","", function(){$.$f7router.refreshPage()});
                    this.incrementPatientID()
                    this.$f7router.refreshPage()
                })
            }
            else{
                this.$f7.dialog.alert("Please Enter Valid Data")
            }
        },
        incrementPatientID(){
            firebase.db.doc('patientID/patientIdNum').update({
                idNum: parseInt(this.patientId)+1+""
            })
            .then(data=>{
                let DOB = this.patientDOB.replace(/-/g,"")
                let userID = this.patientId+"@gmail.com"
                let password = this.patientId + DOB
                firebase.auth.createUserWithEmailAndPassword(userID , password)  
                this.$f7.dialog.alert("Username : " + this.patientId + "<br>Password : " + password)              
            })
        }
    }
}
</script>
