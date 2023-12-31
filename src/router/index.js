import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'

import appFirebase from '@/firebaseInit';

import { getAuth, onAuthStateChanged } from "firebase/auth";
const auth = getAuth(appFirebase);


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/createStages',
    name: 'CreateStages',
    component: () => import('@/views/CreateStages.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/beneficiario/:id',
    name: 'Details',
    meta: { requiresAuth: true },
    component: () => import('@/views/Details.vue'),
    props: true,
    children: [
      {
        path: '',
        name: 'SumaryBeneficiary',
        component: () => import('@/components/Beneficiary/SumaryBeneficiary.vue'),
        props: true
      },
      {
        path: 'edit',
        name: 'EditBeneficiary',
        component: () => import('@/views/Edit.vue'),
        props: true
      },
      {
        path: 'sum',
        name: 'SumBeneficiary',
        component: () => import('@/components/Beneficiary/SumBeneficiary.vue'),
        props: true,
      }, {
        path: 'stage-beneficiary',
        name: 'EditStageBeneficiary',
        component: () => import('@/components/Beneficiary/EditStageBeneficiary.vue'),
        props: true,
      }
    ]
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router