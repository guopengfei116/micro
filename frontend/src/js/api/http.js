import Vue from 'vue';
import { Indicator, Toast } from 'mint-ui';

export default [

  // 1、添加请求loading和错误处理
  function(req, next) {

    // 请求前添加loading
    Indicator.open('加载中...');

    // 请求后取消loading
    next(rep => {
      Indicator.close();

      // 请求失败进行统一的错误处理
      if(!rep.ok || rep.body.status != 0) {
        Toast('请求失败，请稍候再试');
      }
    });
  }
];

