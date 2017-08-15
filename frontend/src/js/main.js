// 一、导入第三方包
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';

// 1.1、记得手动use启用插件
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(MintUI);

// 二、导入我们自己的东西

// 2.1 过滤器插件
import Filter from './vue/filter.js';
Vue.use(Filter);

// 2.2 路由实例
import router from './vue/router.js';

// 2.3 组件
import App from '../component/App.vue';  // 根组件

// 三、创建一个Vue实例，关联视图，把根组件渲染到视图中
new Vue({
    el: '#app',
    render: c => c(App),
    router
});
