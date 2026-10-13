# EOE AI实战工具包

《AI实战工作坊｜动动嘴，让AI把活干了！》的随身实践网站。面向普通职场人，手机优先、完整中文、不强制登录，无第三方运行依赖。

## 内容与交互

- 新手入门、进阶提效、高阶创造三条路线。
- 11个国内／国际工具：用途、官方入口、搜索线索、费用核实状态和首个练习。
- 8个完整Prompt模板：活动、周报、纪要、学习、销售培训、内容、旅行与个人开发。
- 12篇实践指南，搜索／分类、模板复制与收藏、5分钟任务进度、需求整理。
- 主办人的微信公众号学习推荐、好奇心与行动力寄语、家庭与亲子小任务。

真实案例和模拟教学资料分别标注；工具的动态权益、地区条件与未确认内容明确说明。

## GitHub入口

[工具包源码仓库](https://github.com/timye9527/ai-workshop-toolkit)已建立，当前为私有仓库，访问需要权限。可运行网站与GitHub Pages静态目录均已保存。

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

GitHub Pages准备采用默认分支的 `/docs` 文件夹作为发布源，尚未启用公开发布。`docs/`由构建自动生成；修改内容请编辑`src/content.json`，页面与样式在`src/app.js`、`src/styles.css`。内部采用Hash路由，支持静态子目录与刷新。

公开GitHub仓库／Pages需要明确授权后启用；目前只保存私有源码入口。中国内地托管后续再评估。

## 隐私与核实

搜索与需求整理在浏览器执行，不调用AI模型；收藏和练习进度只保存在当前浏览器，可清除。外部链接适用对应平台的政策。操作AI工具前，请核对资料授权、事实与官方条件。

`npm test`验证内容结构、工具来源、案例标记、入口类型及可复制搜索线索。开发时的本地交付记录、浏览器截图与日志不上传到本仓库。
