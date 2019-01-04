import Vue from 'vue'
import App from './App.vue'
// import router from './router'

Vue.config.productionTip = false

import Router from 'vue-router';
import Home from './views/Home.vue'
import About from './views/About.vue'

Vue.use(Router);

const myRouter = new Router({
  routes: [{
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ],
  mode: 'hash'
});

new Vue({
  // router,
  router: myRouter,
  render: h => h(App)
}).$mount('#app')