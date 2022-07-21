package server

import (
	"html/template"
	"strings"

	"publish/auth"
	"publish/config"
	"publish/server/mode/cache"
	"publish/server/mode/dynamic"

	"github.com/gin-gonic/gin"
)

// REF [siyuan/serve.go at master · siyuan-note/siyuan](https://github.com/siyuan-note/siyuan/blob/master/kernel/server/serve.go)
func Server() (router *gin.Engine) {
	router = gin.Default()

	// REF [Gin框架Gin渲染 - RandySun - 博客园](https://www.cnblogs.com/randysun/p/15626537.html)
	router.SetFuncMap(template.FuncMap{
		"html": func(str string) template.HTML {
			return template.HTML(str)
		},
	})

	router.LoadHTMLGlob(config.C.Server.Templates) // 加载模板文件

	/* 主页 */
	for _, path := range config.C.Server.Index.Paths {
		router.GET(path, index)
	}

	/* 静态文件服务 */
	router.Static(config.C.Server.Static.JavaScript.Path, config.C.Server.Static.JavaScript.FilePath)
	router.Static(config.C.Server.Static.CSS.Path, config.C.Server.Static.CSS.FilePath)

	/* 资源文件加载模式 */
	switch config.C.Server.Mode.File {
	case "dynamic": // 动态加载
		router.GET(config.C.Server.Static.Appearance.Path+"/*path", dynamic.File)
		router.GET(config.C.Server.Static.Assets.Path+"/*path", dynamic.File)
		router.GET(config.C.Server.Static.Emojis.Path+"/*path", dynamic.File)
		router.GET(config.C.Server.Static.Widgets.Path+"/*path", dynamic.File)
		router.GET(config.C.Server.Static.Export.Path+"/*path", dynamic.File)
		router.GET(config.C.Server.Static.Stage.Path+"/*path", dynamic.File)
	case "cache": // 动态缓存
		router.GET(config.C.Server.Static.Appearance.Path+"/*path", cache.File)
		router.GET(config.C.Server.Static.Assets.Path+"/*path", cache.File)
		router.GET(config.C.Server.Static.Emojis.Path+"/*path", cache.File)
		router.GET(config.C.Server.Static.Widgets.Path+"/*path", cache.File)
		router.GET(config.C.Server.Static.Export.Path+"/*path", cache.File)
		router.GET(config.C.Server.Static.Stage.Path+"/*path", cache.File)
	case "static": // 静态加载
		fallthrough
	default:
		router.Static(config.C.Server.Static.Appearance.Path, config.C.Server.Static.Appearance.FilePath)
		router.Static(config.C.Server.Static.Assets.Path, config.C.Server.Static.Assets.FilePath)
		router.Static(config.C.Server.Static.Emojis.Path, config.C.Server.Static.Emojis.FilePath)
		router.Static(config.C.Server.Static.Widgets.Path, config.C.Server.Static.Widgets.FilePath)
		router.Static(config.C.Server.Static.Export.Path, config.C.Server.Static.Export.FilePath)
		router.Static(config.C.Server.Static.Stage.Path, config.C.Server.Static.Stage.FilePath)
	}

	router_block := router.Group("/block")
	{
		/* 请求重定向 */
		redirect := func(c *gin.Context) {
			// REF [重定向 | Gin Web Framework](https://gin-gonic.com/zh-cn/docs/examples/redirects/)
			c.Request.URL.Path = strings.Replace(c.Request.URL.Path, "/block", "", 1)
			router.HandleContext(c)
		}

		/* 资源文件请求重定向 */
		router_block.GET("/appearance/*path", redirect)
		router_block.GET("/assets/*path", redirect)
		router_block.GET("/emojis/*path", redirect)
		router_block.GET("/widgets/*path", redirect)
		router_block.GET("/export/*path", redirect)
		router_block.GET("/stage/*path", redirect)

		/* 文档页面加载方式 */
		switch config.C.Server.Mode.Page {
		case "dynamic": // 动态加载
			// 使用 URL 参数 id 跳转到指定的块
			// REF [Query 和 post form | Gin Web Framework](https://gin-gonic.com/zh-cn/docs/examples/query-and-post-form/)
			router_block.GET("/", auth.Access, dynamic.P.ID)

			// 请求指定的文档
			// REF [绑定 Uri | Gin Web Framework](https://gin-gonic.com/zh-cn/docs/examples/bind-uri/)
			router_block.GET("/:id", auth.Access, dynamic.P.Block)
		case "cache": // 动态缓存
			// TODO
		case "static": // 静态加载
			fallthrough
		default:
			// TODO
		}
	}
	return
}
