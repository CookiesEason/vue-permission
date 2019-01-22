# vue-permission

> A Vue.js project for Permission。
**配合后台springboot框架实现了的权限管理系统，包含了权限,权限拦截(重点),角色,用户，部门添加更新等等基础功能。**
拦截：对于前端的路由拦截暂时没有去实现，只进行了后台访问接口的拦截。

**> 界面**
<img src="https://zone-1253231183.cos.ap-shanghai.myqcloud.com/github-permission/permission/%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2.png?q-sign-algorithm=sha1&q-ak=AKIDv51RYcfI3rFH6xlX5jeyu4Fp0zaKMOVC&q-sign-time=1548143490;1548145290&q-key-time=1548143490;1548145290&q-header-list=&q-url-param-list=&q-signature=504bec86cc9227fb6e0518fb202fbd8ce22732c4&x-cos-security-token=fcbb7ecf85cd560daf8f5731048abbec587edbe210001"/>
<img src="https://zone-1253231183.cos.ap-shanghai.myqcloud.com/github-permission/permission/%E9%83%A8%E9%97%A8%E5%92%8C%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E7%95%8C%E9%9D%A2.png?q-sign-algorithm=sha1&q-ak=AKIDNz8PPZ95BuGtviVEqsF9Pgng9adPtre1&q-sign-time=1548143612;1548145412&q-key-time=1548143612;1548145412&q-header-list=&q-url-param-list=&q-signature=16633c5867ef30778dca926acaa7b5043316d354&x-cos-security-token=e89460359a041994c89ab283dd436b45b49338e010001"/>
<img src="https://zone-1253231183.cos.ap-shanghai.myqcloud.com/github-permission/permission/%E8%A7%92%E8%89%B2%E4%B8%8E%E7%94%A8%E6%88%B7.png?q-sign-algorithm=sha1&q-ak=AKIDQ1H3HYD4AoqGXu95rW1KWCyASOukEqfn&q-sign-time=1548143634;1548145434&q-key-time=1548143634;1548145434&q-header-list=&q-url-param-list=&q-signature=cb9bcf2102f5d0313eedc611dd7683b3e4476775&x-cos-security-token=4a1d985b3f88459e091a2938b7492f4bde7c008f10001"/>
<img src="https://zone-1253231183.cos.ap-shanghai.myqcloud.com/github-permission/permission/%E8%A7%92%E8%89%B2%E4%B8%8E%E6%9D%83%E9%99%90.png?q-sign-algorithm=sha1&q-ak=AKID0vqsXsj9At1TXLdCFdTrBmj0yCc6zyq5&q-sign-time=1548143762;1548145562&q-key-time=1548143762;1548145562&q-header-list=&q-url-param-list=&q-signature=616c4d4bcbd0ac4dda99db17365b78307a7b0767&x-cos-security-token=007e0b1239ef623fa438662bd1ea50d53b59dc1b10001"/>
<img src="https://zone-1253231183.cos.ap-shanghai.myqcloud.com/github-permission/permission/%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86.png?q-sign-algorithm=sha1&q-ak=AKIDQ4ZHYZntXF3lgJQE984EV1PJfMLI5cuO&q-sign-time=1548143678;1548145478&q-key-time=1548143678;1548145478&q-header-list=&q-url-param-list=&q-signature=1664c9e978012bc664396fad232128fde146ffef&x-cos-security-token=06618105b1c6391e27f467a742e469f7e744948210001"/>
<img src="https://zone-1253231183.cos.ap-shanghai.myqcloud.com/github-permission/permission/%E6%9D%83%E9%99%90%E6%9B%B4%E6%96%B0%E8%AE%B0%E5%BD%95.png?q-sign-algorithm=sha1&q-ak=AKIDamV7ZaYpHlZ39prs3P2FyCV6v1MxJW3i&q-sign-time=1548143317;1548145117&q-key-time=1548143317;1548145117&q-header-list=&q-url-param-list=&q-signature=8474c2e024568b86ae7e5a970cecf659ab170a03&x-cos-security-token=d3d6c1adad45afd3e2627cf319f46b7145a82b2310001"/>
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

