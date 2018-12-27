import Vue from 'vue'
import Router from 'vue-router'
import Body from '@/components/Body'
import Header1 from '@/components/Header'
import Footer from '@/components/Footer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        header: Header1,
        body: Body,
        footer : Footer
      }
    }
  ]
})
