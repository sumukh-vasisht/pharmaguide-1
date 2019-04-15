<template>
<f7-app :params="f7params">
  <!-- Status bar overlay for fullscreen mode-->
  <f7-statusbar></f7-statusbar>
<f7-view class="view-main" :domCache="false" :pushState="true" main tab tab-active url="/"></f7-view>

</f7-app>
</template>
<script>

  import routes from '../js/routes.js';

  export default {
    data() {
      return {
        // Framework7 Parameters
        f7params: {
          name: 'PharmaGuide', // App name
          theme: 'auto', // Automatic theme detection
          pushState: true,
          history: true,
          // App root data
          data: function () {
            return {
              
            };
          },

          // App routes
          routes: routes,

          // Register service worker
          serviceWorker: {
            path: '/service-worker.js',
          },
        },
      }
    },
    mounted() {
      this.$f7ready((f7) => {

        // Call F7 APIs here
      });
    }
  }
</script>