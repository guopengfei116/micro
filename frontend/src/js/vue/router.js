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

// 三、导出路由实例
export default new VueRouter({
    routes: [

    	// 首页
        { path: '/', redirect: '/index' },
        { path: '/index', component: vIndex },

        // 新闻
        { path: '/news/list', component: vNewsList },
        { path: '/news/detail/:id', component: vNewsDetail },

        // 图片分享
        { path: '/photo/list/:id', component: CphotoList, name: 'ptLs' },
        { path: '/photo/detail/:id', component: CphotoDetail, name: 'ptDl' },
    ]
});
