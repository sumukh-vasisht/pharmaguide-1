<template>
  <f7-page name="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-navbar title="PharmaGuide">
        <f7-nav-right style="padding-right: 20px;">
          <f7-button raised fill  @click="logout">Logout</f7-button>
        </f7-nav-right>
      </f7-navbar>
    </f7-navbar>
    <f7-list>
      <f7-list-item link="/viewPatients" title="View Patients"></f7-list-item>
      <f7-list-item link="/addPatient" title="Add Patient"></f7-list-item>
    </f7-list>
  </f7-page>
</template>

<script>
import firebase from '../js/firebaseInit'
export default {
  methods: {
    logout() {
      firebase.auth.signOut()
      .then(x=>{
         this.$f7router.navigate('/')
      })
    },
  }
}
</script>