
import Vue from "vue";
import Router from "vue-router";

import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import FullContentLayout from "@/views/Layout/FullContentLayout.vue";

import TotoList from "@/views/pages/TotoList.vue";
import Eisenhower from "@/views/pages/Eisenhower.vue"
import Admin from "@/views/pages/Admin.vue"
import Help from "@/views/pages/Help.vue";
import Login from "@/views/pages/Login.vue";
import Contactme from "@/components/forms/Contactme.vue";
import Planning from "@/views/pages/Planning.vue";

import firebase from '@/apis/firebase/firebase';
import store from '@/store';




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
          component: Eisenhower,
          meta: {
            breadcrumb: "Eisenhower matrix",
            requiresAuth: true
          }
        },
        {
          path: "/app/help",
          name: "Help",
          component: Help,
          meta: {
            breadcrumb: "Help"
          }
        },
        {
          path: "/app/admin",
          name: "Admin",
          component: Admin,
          meta: {
            breadcrumb: "Admin",
            requiresAuth: true,
            adminOnly: true
          }
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  firebase.auth.onAuthStateChanged(function (user) {
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

    if (to.matched.some(record => record.meta.adminOnly)) {

      let user = store.getters.getUser;
      let isadmin: boolean = false;

      if (user && user.data && user.data.roles) {
        let roles = store.getters.getUser.data.roles;
        isadmin = roles && roles.includes('admin') ? true : false
      }

      if (!isadmin) {
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
