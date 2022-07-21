package server

import (
	"net/http"

	"publish/client"
	"publish/config"
	"publish/server/status"

	"github.com/gin-gonic/gin"
)

func block(c *gin.Context) {
	root_id := c.Param("id")
	r, err := client.GetBlockDomByID(client.C.R(), root_id, 0)
	r = client.Response(c, r, err)
	if r == nil {
		status.S.StatusSiyuanServerError(c)
		return
	}
	blocks := r.Data.(map[string]interface{})["blocks"].([]interface{})
	switch {
	case len(blocks) == 0:
		status.S.StatusBlockNotFound(c)
		return
	default:
		block := blocks[0].(map[string]interface{})
		c.HTML(http.StatusOK, "block.html", gin.H{
			"Title":   block["hPath"],
			"Content": block["content"],
			"Render":  config.C.Render,
		})
	}
}
