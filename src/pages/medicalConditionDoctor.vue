<template>
  <f7-page :name="'Patient '">
    <f7-navbar :title="'Patient Details - '+ id" back-link="Back">
      <f7-nav-right style="padding-right: 20px;">
        <f7-button raised fill  href="/">Home</f7-button>
      </f7-nav-right>
    </f7-navbar>

  </f7-page>
</template>

<script>
import firebase from '../js/firebaseInit';
import functions from '../js/functions';
export default {
  data(){
    return {
      id : "",
    }
  },
  beforeMount(){
    this.id = this.$f7route.params.id
  }
}
</script>