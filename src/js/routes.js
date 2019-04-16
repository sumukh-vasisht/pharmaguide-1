import LoginPage from '../pages/login.vue'
import DoctorHome from '../pages/doctorHome.vue'
import AddPatient from '../pages/addPatient.vue'
import ListPatients from '../pages/listPatients.vue'
import ViewPatient from '../pages/viewPatient.vue'
import HomePage from '../pages/home.vue';
import AboutPage from '../pages/about.vue';
import FormPage from '../pages/form.vue';
import CatalogPage from '../pages/catalog.vue';
import ProductPage from '../pages/product.vue';
import SettingsPage from '../pages/settings.vue';
import DynamicRoutePage from '../pages/dynamic-route.vue';
import RequestAndLoad from '../pages/request-and-load.vue';
import NotFoundPage from '../pages/404.vue';
import MedicalConditionDoctor from '../pages/medicalConditionDoctor.vue';
import MedicationDoctor from '../pages/medicationDoctor.vue';

var routes = [
  {
    path: '/',
    component: DoctorHome,
  },
  {
    path: '/doctorHome',
    component: DoctorHome,
  },
  {
    path: '/addPatient',
    component: AddPatient,
  },
  {
    path: '/listPatients',
    component: ListPatients,
  },
  {
    path: '/viewPatient/:id',
    component: ViewPatient,
  },
  {
    path: '/home',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/viewPatient',
    component: ViewPatient,
  },
  {
    path: '/medicalConditionDoctor',
    component: MedicalConditionDoctor,
  },
  {
    path: '/medicationDoctor',
    component: MedicationDoctor,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
