import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app';

import Home from '../components/Home.vue'
import Muro from '../components/Muro.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/muro',
            name: 'muro',
            component: Muro,
            meta: {
                requiresAuth: true
            }
        },
    ]
})

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser;
    
    if (to.meta.requiresAuth && currentUser == null) {
      next('/')
    } else {
      next()
    }
})

export default router;