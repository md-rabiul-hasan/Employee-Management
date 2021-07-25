require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router'

Vue.use(VueRouter)


Vue.component('employee-index', require('./components/employees/Index.vue').default);

const router = new VueRouter({
    mode  : 'history',
    routes: routes
});

const app = new Vue({
    el    : '#app',
    router: router
});
