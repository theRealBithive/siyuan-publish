# 更改日志 | CHANGE LOG

- 更新 CI/CD 配置文件 | Update CI/CD configuration file.

## v0.1.5 / 2022-03-15

- [v0.1.4 ... v0.1.5](https:///github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.4...v0.1.5)
- 修复错误页面可能导致调试信息泄露问题 | Fix error pages that could cause debugging information disclosure.
- 优化拖拽功能 | Optimized drag-and-drop function.
- 添加静态文件目录 `snippets` | Add static file directory `snippets`.
- 更新 go module | Update go module.
- 添加自动获取基本样式文件功能 | Adds the function to automatically get basic style file.
- 调整超链接格式 | Adjust hyperlink format.
- 添加开发用脚本 | Add development scripts.
- 修复页面可编辑时无法访问正文超链接问题 | Fixed the issue where the main body hyperlink could not be accessed when the page was editable.
- 修复悬浮预览窗口 | Fixed the popover preview window.
- 调整 `protyle` 元素 ID | Adjust the `protyle` element ID.
- 默认配置更改为使用系统 Emoji 图标 | Default configuration changed to use system Emoji icon.
- 更新 goreleaser 配置文件 | Update goreleaser configuration file.

## v0.1.4 / 2022-10-18

- [v0.1.3 ... v0.1.4](https:///github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.3...v0.1.4)
- 更新 `publish-link` 渲染插件 | Updated the `publish-link` rendering plugin.
- 支持繁体中文 `zh-Hant` | Support Chinese Traditional `zh-Hant`.
- 修复代码块无法应用亮色配色问题 | Fixed an issue where code blocks could not apply light color theme.
- 修复代码块行号在 chromium 浏览器中高度异常问题 | Fixed an issue where code block line numbers were highly unusual in the chromium browser.
- 设置主题样式未加载完成时的默认背景颜色与文字颜色 | Sets the default background color and text color when the theme style is not finished loading.
- 拖拽浮窗时取消划选效果 | Cancels the swipe effect when dragging the floating window.
- 重构浮窗拖拽功能 | Refactored floating window dragging function.
- 修复无法划选文本问题 | Fixed an issue where text could not be sized.
- 修复静态资源请求错误时创建空文件问题 | Fixed an issue where an empty file was created when a static resource request was wrong.
- 鼠标移出窗口时结束拖拽 | End dragging when the mouse moves out of the window.
- 优化鼠标移出窗口时结束拖拽 | Optimized to end dragging when the mouse moves out of the window.

## v0.1.3 / 2022-09-15

- [v0.1.2 ... v0.1.3](https:///github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.2...v0.1.3)
- 为面包屑添加主页项 | Add the home page item to the breadcrumbs.
- 移除浮窗预览其他文档时的背景图片与背景颜色 | Remove the background image and background color of popover preview window.
- 插件化字体设置 | Plugin font settings.
- 将配置项添加到插件上下文 | Add the configuration items to the plugin context.
- 渲染插件支持配置依赖项 | Render plugins support to configure dependencies.
- 插件化渲染后处理方法 | Plugin rendering post-processing method.
- 将插件对象添加至插件上下文 | Add the plugin object to the plugin context.
- 新增命令行参数 `--workspace` 设置工作空间目录 | Add the command line argument `--workspace` to set the workspace directory.
- 新增命令行参数 `-v` 查看版本号 | Add the command line argument `-v` to view the version number.
- 国际化命令行输出 | Internationalized command output.
- 国际化 Web 页面 | Internationalized Web pages.
- 新增 `Render.Editor.FullWidth` 与 `Render.Editor.KatexMacros` 配置项 | Added `Render.Editor.FullWidth` and `Render.Editor.KatexMacros` configuration item.
  - `Render.Editor.FullWidth`: 是否开启自适应宽度 | Whether to turn on Adaptive Width.
  - `Render.Editor.KatexMacros`: Katex 宏(JSON 字符串) | Katex Macros (JSON string).
- 新增 `Server.Base` 与 `Server.Pathname` 配置项 | Added `Server.Base` and `Server.Pathname` configuration item.
  - `Server.Base`: HTML `<base>` 标签的 `href` 字段值(URL 相对路径默认目录) | The `href` field value of the HTML `<base>` tag (URL-relative path default directory).
  - `Server.Pathname`: 发布页面的 URL 路径名 | The URL path name of the publishing page.

## v0.1.2 / 2022-08-08

- [v0.1.1 ... v0.1.2](https:///github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.1...v0.1.2)
- 配置文件 [kernel/default.config.toml](https://github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.1...v0.1.2#diff-a2009bcf0ab7d03e622ce6e64f71a7cf631de7f47db071364f2f41a93544c098) 有变更 | There are changes to the configuration file [kernel/default.config.toml](https://github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.1...v0.1.2#diff-a2009bcf0ab7d03e622ce6e64f71a7cf631de7f47db071364f2f41a93544c098).
- 提高块跳转超链接与子窗口的 `z-index` 层级 | Raise the 'z-index' level of block jump hyperlinks and popover windows.
- 将子窗口预览功能默认触发时间调整为 `1000ms` | Adjust the time of the default trigger time of the popover preview window to `1000ms`.
- 使用 `getDoc` API 查询文档的 DOM | Use the `getDoc` API to query the DOM of the document.
- 为文档添加面包屑 | Add a breadcrumb for the document.
- 鼠标悬浮块超链接时高亮对应的块 | Highlight the block when the mouse is hovering over the block hyperlink.
- 修复跨域超链接预览功能 | Fix the cross-domain hyperlink preview function.
- 支持在配置文件中设置文档页面是否可编辑 & 是否开启拼写检查 | Support setting whether the document page is editable and whether to enable the spelling check in the configuration file.
- 面包屑采用粘性定位 | Breadcrumb uses sticky positioning.
- 调整容器块超连接标志位置 | Adjust the position of the container block hyperlink flag.
- 调整列表项内子标题块超链接标志位置 | Adjust the position of the sub-title block hyperlink flag in the list item.

## v0.1.1 / 2022-07-28

- [v0.1.0 ... v0.1.1](https:///github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.0...v0.1.1)
- 配置文件 [kernel/default.config.toml](https://github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.0...v0.1.1#diff-a2009bcf0ab7d03e622ce6e64f71a7cf631de7f47db071364f2f41a93544c098) 有变更 | There are changes to the configuration file [kernel/default.config.toml](https://github.com/Zuoqiu-Yingyi/siyuan-publish/compare/v0.1.0...v0.1.1#diff-a2009bcf0ab7d03e622ce6e64f71a7cf631de7f47db071364f2f41a93544c098).
- 为每个块添加跳转超链接 | Add a link to each block to jump to it.
- 文档内超链接支持鼠标悬浮小窗预览 | Hyperlinks within the document support popover preview.
- 修复悬浮预览窗口拖拽失效问题 | Fixed the issue that dragging and dropping feature on the popover preview window failed.
- 抽象并封装拖动功能 | Abstract and encapsulate the dragfeature.
- 悬浮预览窗口支持使用鼠标拖动调整尺寸 | Popover preview window supports using the mouse to drag to adjust the size.
- 支持自定义预览超链接目标的小窗口样式 | Supports custom small window styles for previewing hyperlinks target.
- 支持设置默认文档访问权限 | Supports setting the default document access permission.

## v0.1.0 / 2022-07-25

- 初始化项目 | Initialize project.
- 添加主题基础配色文件路径配置选项 | Add theme base color file path configuration option.
- 支持使用 URL 参数 `theme` 指定主题模式 | Support use URL parameter `theme` to specify theme mode.
  - `theme=light`: 明亮主题模式 | Light theme mode.
  - `theme=dark`: 暗黑主题模式 | Dark theme mode.
  - `theme=auto`: 根据浏览器环境自动选择主题模式 | Auto select theme mode by browser environment.
- 支持使用文档块属性 `custom-publish-access` 设置访问权限 | Support use document block attribute `custom-publish-access` to set access permission.
  - `public`: 公开访问 | Public access.
  - `private`: 私有访问 | Private access.
  - `protected`: 受保护访问 | Protected access.
- 支持在配置文件 `*.config.toml` 中设置代码块渲染样式 | Support set code block render style in `*.config.toml` file.
- 支持在配置文件 `*.config.toml` 中设置字号 | Support set font size in `*.config.toml` file.
- 支持块引用超链接跳转时携带参数 | Support jump to block reference with parameters.
- 使用结构体整理异常状态响应 | Use structure to organize exception status response.
- 支持自定义首页路径列表与首页重定向的 URL | Support custom homepage path list and homepage redirect URL.
- 添加资源文件动态加载模式 | Add resource file dynamic loading mode.
- 解析文档内嵌入的链接 | Parse embedded links in document.
- 添加资源文件动态缓存加载模式 | Add resource file dynamic cache loading mode.
- 资源文件动态加载模式响应转发切换为 `DataFromReader` 方法 | Resource file dynamic loading mode response forwarding switch to `DataFromReader` method.
- 设计数据模型 | Design data model.
- 输出日志文件 | Output log file.
- 使用 MVC 框架重构项目结构 | Use MVC framework to rebuild project structure.
- 实现文档页面加载的动态缓存模式 | Implement document page loading dynamic cache mode.
- 实现文档页面加载的静态加载模式 | Implement document page loading static mode.
- 添加启动时重置静态资源目录配置选项 | Add reset static resource directory configuration option when booting.
- 添加文档标题 | Add document title.
- 移动目录 `/app/` 至 `/kernel/app/` | Move directory `/app/` to `/kernel/app/`.
- 添加文档图标, 文档标签与文档题头图 | Add document icon, document tags and document title image.
- 添加 CI/CD 工具配置 | Add CI/CD tool configuration.
- 文档页面静态加载模式初始化时同时加载受保护的文档 | Document page static loading mode initialization time loads protected document at the same time.
- 内核启动时创建日志目录 | Kernel booting time create log directory.
- 使用 `github.com/glebarez/sqlite` 作为 GROM 的 SQLite 驱动 | Use `github.com/glebarez/sqlite` as GROM SQLite driver.
- 添加字体列表配置选项 | Add font list configuration option.
- 添加 `favicon.ico` 文件 | Add `favicon.ico` file.
- 添加中文文档 | Add Chinese document.
- 解析文档内嵌入的思源链接(`siyuan://`) | Parse embedded siyuan links (`siyuan://`) in document.
