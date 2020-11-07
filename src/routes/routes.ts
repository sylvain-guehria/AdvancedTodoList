
import Vue from "vue";
import Router from "vue-router";

import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import FullContentLayout from "@/pages/Layout/FullContentLayout.vue";

import TotoList from "@/pages/TotoList.vue";
import Planning from "@/pages/Planning.vue";
import DashboardForm from "@/pages/Forms/DashboardForm.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/pages/Login.vue";
import Contactme from "@/pages/Contactme.vue";

import firebase from '../firebase/firebase';




Vue.use(Router);

let router = new Router({
  linkExactActiveClass: "nav-item active",
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login",
      component: FullContentLayout,
      meta: {
        hideForAuth: true
      },
      children: [
        {
          path: "login",
          name: "Login",
          component: Login,
          meta: {
            hideForAuth: true
          }
        },
        {
          path: "contactme",
          name: "Contactme",
          component: Contactme,
          meta: {
            hideForAuth: true
          }
        }
      ]
    },
    {
      path: "/app",
      component: DashboardLayout,
      redirect: "/app/todos",
      meta: {
        breadcrumb: "...",
        requiresAuth: true
      },
      children: [
        {
          path: "/app/todos",
          name: "Todo list",
          component: TotoList,
          meta: {
            breadcrumb: "Todos",
            requiresAuth: true
          }
        },
        {
          path: "/app/planning",
          name: "Planning",
          component: Planning,
          meta: {
            breadcrumb: "Planning",
            requiresAuth: true
          }
        },
        {
          path: "/app/eisenhower",
          name: "Eisenhower matrix",
          component: DashboardForm,
          meta: {
            breadcrumb: "Eisenhower matrix",
            requiresAuth: true
          }
        },
        {
          path: "/app/help",
          name: "Help",
          component: Notifications,
          meta: {
            breadcrumb: "Help"
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  firebase.auth.onAuthStateChanged(function(user) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!user) {
              next({ path: '/login' });
          } else {
              next();
          }

      } else {
          next();
      }

      if (to.matched.some(record => record.meta.hideForAuth)) {
          if (user) {
              next({ path: '/app' });
          } else {
              next();
          }
      } else {
          next();
      }
  });
});

export default router;
