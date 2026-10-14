# EOE AI实战工具包

《AI实战工作坊｜动动嘴，让AI把活干了！》的随身实践网站。面向普通职场人，手机优先、完整中文、不强制登录，无第三方运行依赖。

## 内容与交互

- 新手入门、进阶提效、高阶创造三条路线。
- 11个国内／国际AI工具：用途、官方入口、搜索线索、费用核实状态和首个练习。
- 国际工具指南附蜂鸟云、FreeSocks两项网络服务参考，支持官网跳转、链接复制和全站搜索；价格、地区与未实测内容分别注明。
- 8个完整Prompt模板：活动、周报、纪要、学习、销售培训、内容、旅行与个人开发。
- 12篇实践指南，搜索／分类、模板复制与收藏、5分钟任务进度、需求整理。
- 主办人的微信公众号学习推荐、好奇心与行动力寄语、家庭与亲子小任务。
- [扫码与分享](https://timye9527.github.io/ai-workshop-toolkit/#share)：直接指向公开首页的二维码、PNG／SVG下载、链接复制及PPT用说明。

真实案例和模拟教学资料分别标注；工具的动态权益、地区条件与未确认内容明确说明。

## 公开访问

[打开AI实战工具包](https://timye9527.github.io/ai-workshop-toolkit/)：无需登录即可浏览、搜索和复制模板。

[GitHub源码仓库](https://github.com/timye9527/ai-workshop-toolkit)已公开。网站由GitHub Pages托管；中国内地网络与微信真机访问效果尚待实测，国内托管路线后续再评估。

## 运行

需要Node.js 20+，无需安装第三方依赖。

```sh
cd ai-workshop-toolkit
npm test
npm run build
npm run dev
```

默认本地地址为 `http://127.0.0.1:4178/`。服务仅绑定本机，停止时按Ctrl+C。

## 更新GitHub Pages

```sh
npm test
npm run build:pages
git add src scripts tests package.json README.md docs .gitignore
git commit -m '更新工具包内容'
git push
```

GitHub Pages已采用 `codex/ai-workshop-toolkit` 分支的 `/docs` 文件夹作为发布源。推送该分支后，平台自动更新公开网站。`docs/`由构建自动生成；修改内容请编辑`src/content.json`，页面与样式在`src/app.js`、`src/styles.css`。内部采用Hash路由，支持静态子目录与刷新。

2026年10月14日，主办人明确授权本项目公开。发布仅使用本项目的静态文件。

## 隐私与核实

搜索与需求整理在浏览器执行，不调用AI模型；收藏和练习进度只保存在当前浏览器，可清除。GitHub Pages负责提供静态网页，托管服务的访问记录适用GitHub政策；外部链接适用对应平台的政策。操作AI工具前，请核对资料授权、事实与官方条件。

`npm test`验证内容结构、工具来源、案例标记、入口类型及可复制搜索线索。开发时的本地交付记录、浏览器截图与日志不上传到本仓库。

二维码图片已随网站提供，正常构建无需额外依赖。若公开网址改变，可用`python3 scripts/generate-share-qr.py`离线重新生成（生成脚本需要ReportLab和Pillow），随后正常构建和推送。
