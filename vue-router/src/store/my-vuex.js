/*
 * @Date: 2020-08-01 21:43:26
 * @LastEditors: wj
 * @Description:
 */

let Vue;

class Store {
    constructor(options) {
        this.$options = options;


        this._vm = new Vue({
            data: {
                $$state: options.state
            }

        })



        this._mutations = options.mutations;
        this._actions = options.actions;


        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    get state () {
        return this._vm._data.$$state
    }
    set state (v) {
        console.error('不能手动修改')
    }

    commit (type, payload) {
        let fun = this._mutations[type];

        if (fun) {
            fun(this.state, payload);
        }
    }

    dispatch (type, payload) {
        let fun = this._actions[type];

        if (fun) {
            fun(this, payload);
        }

    }
}

function install (_vue) {
    Vue = _vue;

    Vue.mixin({
        beforeCreate () {
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store;
            }
        }
    })

}

export default {
    Store,
    install
}