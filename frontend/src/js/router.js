// 一、导入第三方包
import VueRouter from 'vue-router';

// 二、导入自己写的组件

// 2.1 导入index组件
import Cindex from '../component/index/index.vue';

// 2.2 导入news组件
import CnewsList from '../component/news/list.vue';
import CnewsDetails from '../component/news/details.vue';

// 三、导出路由实例
export default new VueRouter({
    routes: [
    
    	// 3.1 首页配置
        { path: '/', redirect: '/index' },
        { path: '/index', component: Cindex },
        
        // 3.2 新闻配置
        { path: '/news/list', component: CnewsList },
        { path: '/news/details', component: CnewsDetails }
    ]
});
