// 一、导入第三方包
import VueRouter from 'vue-router';

// 二、导入自己写的组件

// index组件
import vIndex from '../../component/index/index.vue';

// news组件
import vNewsList from '../../component/news/list.vue';
import vNewsDetail from '../../component/news/detail.vue';

// photo组件
import CphotoList from '../../component/photo/list.vue';
import CphotoDetail from '../../component/photo/detail.vue';

// goods组件
import CgoodsList from '../../component/goods/list.vue';
import CgoodsDetail from '../../component/goods/detail.vue';

// shopcart组件
import Cshopcart from '../../component/shopcart/list.vue';

// user组件
import Clogin from '../../component/user/login.vue';

// payment组件
import Corder from '../../component/payment/order.vue';

// 三、导出路由实例
export default new VueRouter({
    routes: [

    	// 首页
        { path: '/', redirect: '/index' },
        { path: '/index', component: vIndex },

        // 新闻
        { path: '/news/list', component: vNewsList, name: 'newL' },
        { path: '/news/detail/:id', component: vNewsDetail, name: 'newD' },

        // 图片
        { path: '/photo/list/:id', component: CphotoList, name: 'photoL' },
        { path: '/photo/detail/:id', component: CphotoDetail, name: 'photoD' },

        // 商品
        { path: '/goods/list/', component: CgoodsList, name: 'goodsL' },
        { path: '/goods/detail/:id', component: CgoodsDetail, name: 'goodsD' },

        // 购物车
        { path: '/shopcart/', component: Cshopcart, name: 'shopC' }, // 购物车列表

        // 用户
        { path: '/login/', component: Clogin, name: 'login' },  // 登陆

        // 结账
        { path: '/order/', component: Corder, name: 'order' } // 订单
    ]
});
