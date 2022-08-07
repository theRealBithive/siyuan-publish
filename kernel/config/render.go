package config

type Render struct {
	Appearance Appearance `json:"appearance"`
	Editor     Editor     `json:"editor"`
	Popover    Popover    `json:"popover"`
	Path       Path       `json:"path"`
	File       File       `json:"file"`
}

type Appearance struct {
	Mode                int    `json:"mode"`
	CodeBlockThemeLight string `json:"codeBlockThemeLight"`
	CodeBlockThemeDark  string `json:"codeBlockThemeDark"`
}

type Editor struct {
	FontSize                   int      `json:"fontSize"`
	FontFamily                 []string `json:"fontFamily"`
	CodeLineWrap               bool     `json:"codeLineWrap"`
	CodeLigatures              bool     `json:"codeLigatures"`
	CodeSyntaxHighlightLineNum bool     `json:"codeSyntaxHighlightLineNum"`
	PlantUMLServePath          string   `json:"plantUMLServePath"`

	Contenteditable bool `json:"contenteditable"` // 文档内容是否可编辑
	Spellcheck      bool `json:"spellcheck"`      // 文档内容是否开启拼写检查
}

type Popover struct {
	Timeout int    `json:"timeout"`
	Width   string `json:"width"`
	Height  string `json:"height"`
}

type File struct {
	Style  Style  `json:"style"`
	Script Script `json:"script"`
}

type Style struct {
	Base    string `json:"base"`
	Publish string `json:"publish"`
	Light   Theme  `json:"light"`
	Dark    Theme  `json:"dark"`
}

type Theme struct {
	Default string `json:"default"`
	Theme   string `json:"theme"`
	Custom  string `json:"custom"`
}

type Script struct {
	Icon    string `json:"icon"`
	Emoji   string `json:"emoji"`
	Lute    string `json:"lute"`
	HTML    string `json:"html"`
	Protyle string `json:"protyle"`
	Config  string `json:"config"`
	Publish string `json:"publish"`
}

type Path struct {
	Protyle string `json:"protyle"`
}
