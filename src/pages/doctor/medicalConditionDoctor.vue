<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
        <f7-button raised fill  href="/doctorHome">Home</f7-button>
      </f7-nav-right>
    </f7-navbar>

    <f7-block-title>Add Medical Condition</f7-block-title>

    <f7-list id="medicalConditions" v-for="(medicalCondition,index) in medicalConditions" v-bind:key="index" no-hairlines-md>

    <f7-list-input id = "medicalConditionDate"
        label="Enter Date"
        type="date"
        placeholder="Enter Date"
        :value="medicalConditions[index].date" 
        @input="medicalConditions[index].date = $event.target.value"
      ></f7-list-input>

    <f7-list-input id = "medicalConditionIssue"
        label="Enter The Issue"
        type="text"
        placeholder="Enter The Issue"
        :value="medicalConditions[index].issue" 
        @input="medicalConditions[index].issue = $event.target.value"
      ></f7-list-input>

    <f7-list id="medicines" v-for="(medicine,index) in medicines" v-bind:key="index" inset>  
        <f7-block-title>Add Medication</f7-block-title>

    <f7-list-input id="medicine"
        label="Enter Medicine Name"
        type="text"
        placeholder="Enter Medicine Name"
        :value="medicines[index].medicineName" 
        @input="medicines[index].medicineName = $event.target.value"
      ></f7-list-input>

    <f7-list-input id="quantity"
        label="Enter The Quantity"
        type="text"
        placeholder="Enter The Quantity"
        :value="medicines[index].quantity" 
        @input="medicines[index].quantity = $event.target.value"
      ></f7-list-input>

    </f7-list>

    <f7-block>      
            <f7-button class="col" :disabled= "isDisabled" v-on:click = "addMedicine(index)">Add another medicine</f7-button>      
            <f7-button class="col" :disabled= "isDisabled" @click="removeMedicine">Remove a medicine</f7-button>
    </f7-block>

    </f7-list>

    <f7-block-title><hr></f7-block-title>

    <f7-block>      
            <f7-button class="col"  @click="addMedicalCondition">Add Another Medical Condition</f7-button>      
            <f7-button class="col" :disabled= "isDisabled" @click="removeMedicalCondition">Remove a Medical Condition</f7-button>
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
      medicalConditions: [{
        date : '',
        issue : '',
        medicines: [{
        medicineName : '',
        quantity : '',
      }]
      }]

    }
  },
  beforeMount(){
    this.id = this.$f7route.params.id
  },
  methods : {
    addMedicine : function(index) {
      console.log(index)
      this.medicalConditions[index].medicines.push({
        medicineName : '',
        quantity : '',
      });
    },
    removeMedicine(){
      this.medicines.pop()
    },
    addMedicalCondition(){
      this.medicalConditions.push({
        date : '',
        issue : '',
        medicines: [{
        medicineName : '',
        quantity : '',
      }]
      })
    },
    removeMedicalCondition(){
      this.medicalConditions.pop()
    }
    }
}
</script>