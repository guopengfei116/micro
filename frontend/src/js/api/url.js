const domain = 'http://139.199.192.48:8888';
const imgDomain = 'http://ofv795nmp.bkt.clouddn.com/';

// 导出配置
export default {

  // 域名
  imgDomain,
  domain,

  // 轮播图
  lunbos: domain + '/api/getlunbo', // 轮播图列表

  // 新闻
  newsList: domain + '/api/getnewslist', // 新闻列表
  newsDetail: domain + '/api/getnew/', // 新闻详情

  // 评论
  commentPut: domain + '/api/postcomment/', // 发表评论
  commentList: domain + '/api/getcomments/', // 评论列表

  // 图片
  photoCategoryList: domain + '/api/getimgcategory', // 图片分类
  photoList: domain + '/api/getimages/', // 图片列表
  photoHums: domain + '/api/getthumimages/', // 图片缩略图
  photoInfo: domain + '/api/getimageInfo/', // 图片文字描述

  // 商品
  goodsList: domain + '/api/getgoods/', // 商品列表
  goodsPrice: domain + '/api/goods/getinfo/', // 商品价格
  goodsInfo: domain + '/api/goods/getdesc/', // 商品详情

  // 购物车
  shopcartList: domain + '/api/goods/getshopcarlist/', // 购物车列表
};
