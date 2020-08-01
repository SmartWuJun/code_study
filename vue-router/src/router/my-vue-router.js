/*
 * @Date: 2020-08-01 19:53:08
 * @LastEditors: wj
 * @Description: 
 */
let Vue;
class MVueRouter {
    constructor(options) {
        this.$options = options;

        Vue.util.defineReactive(this, 'curPath', '/')

        window.addEventListener('hashchange', this.onHashChange.bind(this))

        window.addEventListener('load', this.onHashChange.bind(this))

        this.routeMap = {};

        this.$options.routes.forEach(v => {
            this.routeMap[v.path] = v;
        })
        console.log('%c 🦀  this.routeMap: ', 'font-size:20px;background-color: #7F2B82;color:#fff;', this.routeMap);


    }
    onHashChange () {
        let path = location.hash.slice(1);
        this.curPath = path;
        console.log('%c 🥩 this: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', this);
    }
    static install (_Vue) {
        Vue = _Vue;

        Vue.mixin({
            beforeCreate () {
                console.log('this', this)
                if (this.$options.router) {
                    Vue.prototype.$router = this.$options.router;
                }
            }
        })


        Vue.component('router-link', {
            props: {
                to: {
                    type: String
                }
            },
            render (h) {
                console.log('this', this)
                return h('a', {
                    attrs: { href: `#${this.to}` }
                }, this.$slots.default)
            }
        })





        Vue.component('router-view', {
            render (h) {
                // let com = null;
                // this.$router.$options.routes.forEach(v => {
                //     if (v.path === this.$router.curPath) { 
                //         com = v.component;
                //     }
                // })
                let { routeMap, curPath } = this.$router;
                let com = routeMap[curPath].component || null;
                return h(com);
            }
        })



    }
}


export default MVueRouter;