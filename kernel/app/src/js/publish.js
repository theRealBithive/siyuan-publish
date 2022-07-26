(() => {
    const url = new URL(window.location.href);
    const REG = {
        url: /^siyuan:\/\/blocks\/(\d{14}\-[0-9a-z]{7})/,
    };
    const POPOVER_TRIGGER = "popover-trigger"; // 可悬浮预览元素的类名
    const POPOVER_TIMEOUT = 1000; // 悬浮预览元素的触发延时
    const TYPE_ICON_MAP = {
        NodeAudio: "#iconRecord",
        NodeBlockQueryEmbed: "#iconSQL",
        NodeBlockquote: "#iconQuote",
        NodeCodeBlock: "#iconCode",
        NodeDocument: "#iconFile",
        NodeHTMLBlock: "#iconHTML5",
        NodeHeading: {
            h1: "#iconH1",
            h2: "#iconH2",
            h3: "#iconH3",
            h4: "#iconH4",
            h5: "#iconH5",
            h6: "#iconH6",
        },
        NodeIFrame: "#iconLanguage",
        NodeList: {
            o: "#iconList",
            u: "#iconOrderedList",
            t: "#iconCheck",
        },
        NodeListItem: "#iconListItem",
        NodeMathBlock: "#iconMath",
        NodeParagraph: "#iconParagraph",
        NodeSuperBlock: "#iconSuper",
        NodeTable: "#iconTable",
        NodeThematicBreak: "#iconLine",
        NodeVideo: "#iconVideo",
        NodeWidget: "#iconBoth",
    }

    /* 定位到指定的块并高亮 */
    const id = url.searchParams.get("id");
    if (id) {
        const block = document.querySelector(`[data-node-id="${id}"]`);
        if (block) {
            block.classList.add("protyle-wysiwyg--select"); // 高亮指定的块
            block.scrollIntoView(true); // 滚动到指定的块
        }
    }

    /* 将块引用转化为超链接 */
    const publish_url = new URL(url);
    publish_url.pathname = "/block";
    document.querySelectorAll(`#preview span[data-type="block-ref"][data-id]`).forEach(item => {
        const id = item.dataset.id;
        const a = document.createElement("a");
        a.classList.add(POPOVER_TRIGGER);
        publish_url.searchParams.set("id", id);
        a.href = publish_url.href;
        // a.target = "_blank";
        item.parentElement.replaceChild(a, item);
        a.appendChild(item);
    });

    /* 将链接转化为超链接 */
    document.querySelectorAll(`#preview span[data-type="a"][data-href]`).forEach(item => {
        const a = document.createElement("a");
        a.classList.add(POPOVER_TRIGGER)
        let href = item.dataset.href;
        if (REG.url.test(href)) { // 思源块超链接转化为站点超链接
            const id = REG.url.exec(href)[1];
            publish_url.searchParams.set("id", id);
            href = publish_url.href;
        }
        a.href = href;
        // a.target = "_blank";
        item.parentElement.replaceChild(a, item);
        a.appendChild(item);
    });

    /* 为所有块添加悬浮复制超链接 */
    document.querySelectorAll(`#preview [data-node-id]`).forEach(item => {
        publish_url.searchParams.set("id", item.dataset.nodeId);
        const icon = typeof TYPE_ICON_MAP[item.dataset.type] === 'string'
            ? TYPE_ICON_MAP[item.dataset.type]
            : TYPE_ICON_MAP[item.dataset.type][item.dataset.subtype];
        const a = document.createElement("a");
        a.classList.add("copy-link");
        a.href = publish_url.href;
        a.title = publish_url.href;
        a.innerHTML = `<svg style="height: 1rem; width: 1rem"><use xlink:href="${icon}"></use></svg>`
        item.appendChild(a);
        // item.parentElement.insertBefore(a, item);
    });

    /* 超链接鼠标悬浮预览 */
    if (window.top === window) { // 只在顶层窗口执行
        /* 注册多窗口共用的属性与方法 */
        window.publish.popover = {
            timeout: null, // 定时器
            mouse_position: { x: 0, y: 0 }, // 鼠标位置
            z_index: 0, // 当前最高层级
            handler: (element) => { // 鼠标悬浮事件处理
                const doc = window.top.document; // 顶层窗口的 document
                const TIMEOUT = {
                    SHOW_MIN: 125, // 悬浮预览元素的显示最小时间
                    CLOSE: 0, // 悬浮预览元素的关闭延时
                }
                // console.log(element);
                const block__popover = doc.createElement("div"); // 悬浮预览显示元素
                const popover_size = { // 悬浮预览显示元素的尺寸
                    width: doc.documentElement.clientWidth / 2,
                    height: doc.documentElement.clientHeight / 2,
                };
                block__popover.classList.add("block__popover", "block__popover--move", "block__popover--open");
                block__popover.style.zIndex = window.top.publish.popover.z_index++;
                block__popover.style.width = `${popover_size.width}px`;
                block__popover.style.height = `${popover_size.height}px`;
                const midline = { // 窗口中线
                    x: doc.documentElement.clientWidth / 2,
                    y: doc.documentElement.clientHeight / 2,
                };
                // console.log(window.top.publish.popover.mouse_position, midline);
                switch (true) { // 判断当前鼠标在屏幕哪个象限中
                    case window.top.publish.popover.mouse_position.x <= midline.x
                        && window.top.publish.popover.mouse_position.y <= midline.y:
                        // 左上象限
                        block__popover.style.left = `${window.top.publish.popover.mouse_position.x}px`;
                        block__popover.style.top = `${window.top.publish.popover.mouse_position.y}px`;
                        break;
                    case window.top.publish.popover.mouse_position.x > midline.x
                        && window.top.publish.popover.mouse_position.y < midline.y:
                        // 右上象限
                        block__popover.style.left = `${window.top.publish.popover.mouse_position.x - popover_size.width}px`;
                        block__popover.style.top = `${window.top.publish.popover.mouse_position.y}px`;
                        break;
                    case window.top.publish.popover.mouse_position.x < midline.x
                        && window.top.publish.popover.mouse_position.y > midline.y:
                        // 左下象限
                        block__popover.style.left = `${window.top.publish.popover.mouse_position.x}px`;
                        block__popover.style.top = `${window.top.publish.popover.mouse_position.y - popover_size.height}px`;
                        break;
                    case window.top.publish.popover.mouse_position.x >= midline.x
                        && window.top.publish.popover.mouse_position.y >= midline.y:
                        // 右下象限
                        block__popover.style.left = `${window.top.publish.popover.mouse_position.x - popover_size.width}px`;
                        block__popover.style.top = `${window.top.publish.popover.mouse_position.y - popover_size.height}px`;
                        break;
                }
                block__popover.innerHTML = `
            <div class="block__icons block__icons--border">
                <span class="fn__space fn__flex-1"></span>
                <span data-type="pin" class="block__icon b3-tooltips b3-tooltips__sw" title="钉住">
                    <svg>
                        <use xlink:href="#iconPin"></use>
                    </svg>
                </span>
                <span class="fn__space"></span>
                <span data-type="close" class="block__icon b3-tooltips b3-tooltips__sw" title="关闭">
                    <svg style="width: 10px">
                        <use xlink:href="#iconClose"></use>
                    </svg>
                </span>
            </div>
            <div class="block__content">
                <iframe src="${element.href}" data-src="" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="fn__flex-1"></iframe>
            </div>
            <div class="block__nwse"></div>
            <div class="block__ew"></div>
            <div class="block__ns"></div>`;
                /* 标题栏可以拖动 */
                // REF [JS拖动浮动DIV - boystar - 博客园](https://www.cnblogs.com/boystar/p/5231697.html)
                const border = block__popover.querySelector(".block__icons--border");
                border.addEventListener("mousedown", e => {
                    disX = e.clientX - block__popover.offsetLeft; // 鼠标相对于预览左上角的横向偏移量(鼠标横坐标 - popover 的 左侧偏移量)
                    disY = e.clientY - block__popover.offsetTop; // 鼠标相对于预览左上角的纵向偏移量(鼠标纵坐标 - popover 的 上侧偏移量)

                    // 鼠标移动时
                    doc.onmousemove = function (e) {
                        let x = e.clientX - disX;
                        let y = e.clientY - disY;
                        let window_width = doc.documentElement.clientWidth - block__popover.offsetWidth;
                        let window_height = doc.documentElement.clientHeight - block__popover.offsetHeight;

                        x = (x < 0) ? 0 : x;                          // 当div1到窗口最左边时
                        x = (x > window_width) ? window_width : x;    // 当div1到窗口最右边时
                        y = (y < 0) ? 0 : y;                          // 当div1到窗口最上边时
                        y = (y > window_height) ? window_height : y;  // 当div1到窗口最下边时

                        block__popover.style.left = `${x}px`;
                        block__popover.style.top = `${y}px`;
                    };

                    // 鼠标抬起时
                    doc.onmouseup = function () {
                        doc.onmousemove = null;
                        doc.onmouseup = null;
                    };
                });
                /* 鼠标移出预览时关闭预览 */
                const icon_pin = block__popover.querySelector('[data-type="pin"]');
                function close(_) {
                    if (!icon_pin.classList.contains("block__icon--active")) {
                        // 如果钉住按钮未被激活，则关闭
                        setTimeout(() => block__popover.remove(), TIMEOUT.CLOSE);
                    }
                }
                /* 预览钉住/取消钉住 */
                function pin(e) {
                    if (icon_pin.classList.contains("block__icon--active")) {
                        // 如果钉住按钮被激活
                        icon_pin.classList.remove("block__icon--active");
                        block__popover.addEventListener("mouseleave", close);
                    } else {
                        icon_pin.classList.add("block__icon--active");
                        block__popover.removeEventListener('mouseleave', close);
                    }
                }
                icon_pin.addEventListener("click", pin); // 钉住按钮
                border.addEventListener("dblclick", pin); // 标题栏双击

                /* 单击标题栏时置顶 */
                border.addEventListener("click", () => { block__popover.style.zIndex = window.top.publish.popover.z_index++ }, true);

                /* 关闭按钮单击 */
                block__popover.querySelector('[data-type="close"]').addEventListener("click", _ => block__popover.remove());
                /* 鼠标移出元素后自动关闭 */
                setTimeout(() => block__popover.addEventListener("mouseleave", close), TIMEOUT.SHOW_MIN);
                // TODO 子窗口支持拖动边缘调整大小
                doc.body.append(block__popover);
            }
        }
        /* 获得鼠标位置 */
        document.addEventListener("mousemove", e => {
            window.top.publish.popover.mouse_position.x = e.pageX;
            window.top.publish.popover.mouse_position.y = e.pageY;
        });
    }
    /* 鼠标悬浮在某个元素内一段时间后触发 */
    // REF [javascript - Iterating over result of getElementsByClassName using Array.forEach - Stack Overflow](https://stackoverflow.com/questions/3871547/iterating-over-result-of-getelementsbyclassname-using-array-foreach)
    Array.from(document.getElementsByClassName(POPOVER_TRIGGER)).forEach(item => {
        item.addEventListener("mouseenter", function () {
            if (window.top.publish.popover.timeout) {
                clearTimeout(window.top.publish.popover.timeout);
            }
            window.top.publish.popover.timeout = setTimeout(() => window.top.publish.popover.handler(item), POPOVER_TIMEOUT);
        });
        item.addEventListener("mouseleave", function () {
            if (window.top.publish.popover.timeout) {
                clearTimeout(window.top.publish.popover.timeout);
            }
        });
    });
})();
