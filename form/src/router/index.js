/*
 * @Date: 2020-07-25 16:23:29
 * @LastEditors: wj
 * @Description:
 */

import Vue from 'vue';
import Router from 'vue-router';
import Test from '../test.vue';
import Test1 from '../test1.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/test',
            component: Test
        },
        {
            path: '/', component: Test1
        }
    ]
})
