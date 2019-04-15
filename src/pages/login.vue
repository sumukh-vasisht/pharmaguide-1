<template>
  <f7-page>
    <f7-navbar title="PharmaGuide"></f7-navbar>

      <f7-page login-screen>
        <f7-login-screen-title>PharmaGuide</f7-login-screen-title>
        <!-- Login Form Component -->
        <f7-list form @keypress.native.enter="Login">
          <f7-list-input
            label="USERNAME"
            type="text"
            placeholder="Your username"
            :value="username"
            @input="username = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="PASSWORD"
            type="password"
            placeholder="Your password"
            :value="password"
            @input="password = $event.target.value"
          ></f7-list-input>
        </f7-list>
        <!-- End of login form component -->
    <f7-block>
      <f7-button fill raised class="col" @keyup.enter.native="Login" @click='Login'>Sign In</f7-button>
    </f7-block>
  </f7-page>


    
  </f7-page>
</template>

<script>
import firebase from '../js/firebaseInit'
  export default {
    data(){
      return {
        password:'',
        username:'',
      }
    },
    methods: {
      Login() {
        let user = this.username + "@gmail.com";
        let pswd = this.password;
        firebase.auth.signInWithEmailAndPassword(user,pswd)
        .then(auth=>{
          //Route
            this.$f7router.navigate('/doctorHome')
        })
        .catch(err=>{
          this.$f7.dialog.alert(err.message);
        })
      }
    }
  }
</script>