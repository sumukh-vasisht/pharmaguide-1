<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
        <f7-button raised fill  href="/doctorHome">Home</f7-button>
      </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Add Medical Condition</f7-block-title>

    <f7-list>
    <f7-list-item >Date : {{date}}</f7-list-item> </f7-list>

    <f7-list id="medicalConditions" v-for="(medicalCondition,index) in medicalConditions" v-bind:key="index" no-hairlines-md>

    <f7-list-input id = "medicalConditionIssue"
        label="Enter The Issue"
        type="text"
        placeholder="Enter The Issue"
        :value="medicalConditions[index].issue" 
        @input="medicalConditions[index].issue = $event.target.value"
      ></f7-list-input>

    <f7-list v-for="(medicine,indexMed) in medicalConditions[index].prescription" v-bind:key="indexMed" inset>  
        <f7-block-title>Add Medication</f7-block-title>

    <f7-list-input id="medicine"
        label="Enter Medicine Name"
        type="text"
        placeholder="Enter Medicine Name"
        :value="medicalConditions[index].prescription[indexMed].medicineName" 
        @input="medicalConditions[index].prescription[indexMed].medicineName = $event.target.value"
      ></f7-list-input>

    <f7-list-input id="quantity"
        label="Enter The Quantity"
        type="text"
        placeholder="Enter The Quantity"
        :value="medicalConditions[index].prescription[indexMed].quantity" 
        @input="medicalConditions[index].prescription[indexMed].quantity = $event.target.value"
      ></f7-list-input>

    </f7-list>

    <f7-block>      
            <f7-button class="col" v-on:click = "addMedicine(index)">Add another medicine</f7-button>      
            <f7-button class="col" v-on:click = "removeMedicine(index)">Remove a medicine</f7-button>
    </f7-block>

    <f7-block-title><hr></f7-block-title>

     </f7-list>

    <f7-block>      
            <f7-button class="col"  @click="addMedicalCondition">Add Another Medical Condition</f7-button>      
            <f7-button class="col" @click="removeMedicalCondition">Remove a Medical Condition</f7-button>
      </f7-block>
    <f7-block>
      <f7-button @click="addIssue" raised fill>Submit</f7-button>
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
      date : '',
      pushedTimeStamp : "",
      medicalConditions: [{
        pushedTimeStamp : (new Date).getTime(),
        issue : '',
        prescription: [{
        medicineName : '',
        quantity : '',
      }]
      }]

    }
  },
  beforeMount(){
    this.id = this.$f7route.params.id
    this.date = (new Date()).toLocaleDateString('en-GB')
    this.date = this.date.replace(/\//g,"-");
    this.pushedTimeStamp = (new Date).getTime()
  },
  methods : 
  {
    addMedicine : function(index) {
      console.log(index)
      this.medicalConditions[index].prescription.push({
        medicineName : '',
        quantity : '',
      });
    },
    removeMedicine(index){
      this.medicalConditions[index].prescription.pop()
    },
    addMedicalCondition(){
      this.medicalConditions.push({
        pushedTimeStamp : (new Date).getTime(),
        issue : '',
        prescription: [{
        medicineName : '',
        quantity : '',
      }]
      })
    },
    removeMedicalCondition(){
      this.medicalConditions.pop()
    },
    addIssue()
    {   
      let chkarray = []
      let chknums = []
      this.medicalConditions.forEach(condition=>{
        chkarray.push(condition.issue)
        condition.prescription.forEach(med=>{
          chkarray.push(med.medicineName)
          chknums.push(med.quantity)
        })
      })
      if(functions.checkString(chkarray) && functions.checkNumber(chknums)){
        let promiseMed = []
        let promisePre = []
        this.medicalConditions.forEach(condition=>{
          condition.issue = condition.issue.toUpperCase()
          condition.issue = condition.issue.replace(/ /g,"_")
          promiseMed.push(firebase.db.doc('medicalHistory/'+this.id+'/medicalHistory/'+condition.issue+ " " +this.date).set({
            dod : this.pushedTimeStamp,
            issue: condition.issue,
            prescription : condition.prescription
          }))
          promisePre.push(firebase.db.doc('prescriptions/'+this.id).update({
            
          }))
        })      
        Promise.all(promiseMed)
        .then(snapshot=>{
          this.$f7.dialog.alert("Patient Details Updated")
        })
      }
      else{
        this.$f7.dialog.alert("Please check your inputs")
      }     
    }
  }
}
</script>