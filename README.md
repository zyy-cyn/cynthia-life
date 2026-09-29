# Cynthia Life — 个人网站

周媛媛 / Cynthia 的中英双语个人作品集。沿用 ciens.work 的页面结构、排版、导航和交互组件，在独立目录中替换内容和视觉资产。

网站已通过 GitHub Pages 发布：[cynthia-life.com](https://cynthia-life.com/)。GoDaddy DNS 已指向 GitHub Pages，并已启用强制 HTTPS。`ciens.work` 原项目与域名配置未修改。

## 打开

本机地址：http://127.0.0.1:4173

双击“打开网站预览.cmd”可启动已构建的版本。该入口会先验证端口上的页面属于本项目，再打开浏览器。

如果将源文件复制到新电脑，需先安装 Node.js 22.13+，在项目目录执行 npm ci、npm run build、npm start。

开发：npm run dev；类型检查：npm run typecheck；构建：npm run build。默认端口 4173，只监听本机。

## 页面

- / 首页：宇航员主图、工作视角、制作流程、成果、能力、项目、插画精选、经历、联系。
- /capabilities 能力；/results 成果；/methodology 方法；/illustrations 七幅插画；/contact 联系和生活照片。
- /results/personal-care、/results/steam-cleaner、/results/export-content、/results/visual-storytelling 四个项目。

## 内容维护位置

- content/zh.ts、content/en.ts：中英文案、经历、能力、案例和主要数字。
- content/page-visuals.ts：页面主图、导航、联系方式、简历路径。
- content/result-evidence.ts：8 份截图的分类、解释、来源口径及项目对应关系。
- content/illustrations.ts：7 幅插画的图名、路径、尺寸。
- public/images/cynthia/：本人照片、插画与数据截图，共 16 个文件。
- public/downloads/Cynthia_Resume_Portfolio_ZH.docx：用户提供的原始中文简历与作品集副本。
- components/：页面和共享交互组件；app/cynthia.css：Cynthia 的颜色、插画布局和适配。
- app/globals.css、app/refinements.css：保留并复用的原网站基础样式。

## 资料口径

页面的 61.3 万与 30.3 万分别来自单条 Reels 和清洁账号 28 天面板。34 个账号来自简历。不同平台、不同时间的截图不合并成一个累计数字，不将浏览量当作订单或收入。

宇航员两份相同素材已去重；7 幅插画在图库中保留完整构图，并支持放大。图名是便于浏览的描述名。简历提供 Word 下载，没有伪造 PDF。网站案例的流程叙述根据资料整理，需要本人最终核对。

尚可补充：作品的正式名称和创作信息、公开社媒链接、代表视频原文件或链接、截图账号及起止日期、奖项正式名称。原简历鹿优经历下存在一处重复日期，当前按公司条目采用 2026.03—2026.06，传媒公司采用 2022.05—2025.08。

公开网站包含提供的电话、邮箱及中文简历下载。部署仓库为 `zyy-cyn/cynthia-life`；`.github/workflows/pages.yml` 在推送到 `main` 后构建并发布静态页面。此项目未关联原网站仓库或部署账号。
