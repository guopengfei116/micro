import Vue from 'vue';
import { Indicator, Toast } from 'mint-ui';

export default [

  // 统一loading
  function(req, next) {

    // 请求前添加loading
    Indicator.open('加载中...');

    // 请求后取消loading
    next(function(rep) {
      Indicator.close();
    });
  },

  // 统一错误处理
  function(req, next) {

    next(function(rep) {

      // 请求本身错误，给出提示
      if(!rep.ok) {
        Toast('请求失败，请稍候再试');
      }

      // 服务器错误，给出提示，并阻止成功回调的执行
      else if(rep.body.status != 0) {
        rep.ok = false;
        Toast('服务器错误，请联系客服人员');
      }
    });
  }

];
