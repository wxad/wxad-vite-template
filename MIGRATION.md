# Tailwind CSS v4 迁移说明

这个模板给微信 / XWeb WebView 用。Tailwind v4 把样式放进 `@layer`，而 **Chrome &lt; 99、Safari / iOS &lt; 15.4 会直接丢掉整个 `@layer` 块**，页面等于没样式。所以这里升到 v4，但生产 CSS 在构建期就把 `@layer` 展平。

官方浏览器基线仍是 Chrome 111、Safari 16.4、Firefox 128（见 [Tailwind 兼容性](https://tailwindcss.com/docs/compatibility)）。低于这条线时，polyfill 只保证「样式还在」，不保证和现代浏览器像素一致。

## 构建链路

`postcss.config.js` 的顺序是：

1. `@tailwindcss/postcss`（Tailwind v4。前缀和嵌套由它自带的 Lightning CSS 处理，**不再使用 autoprefixer**）
2. `@csstools/postcss-cascade-layers`（在 PostCSS `OnceExit` 里把 `@layer` 换成 `:not(#\#)` 特异度阶梯）

不要再加 `postcss-preset-env` 的 `cascade-layers`。preset-env 用的是同一个插件，跑两遍会把阶梯乘两次，utilities 和 reset 的覆盖关系会乱。

不要改用 `@tailwindcss/vite`。那个插件不走这份 PostCSS 顺序，产物会重新带上 `@layer`。

样式入口是 `src/styles/index.css`（由 `src/main.tsx` 引入）。Sass 已去掉：Tailwind v4 不支持 Sass，而且 `@import "tailwindcss"` 和 Sass 的处理顺序会互相抢。原来的 `//` 注释和 `&` 嵌套已写成普通 CSS，避免旧 WebView 还要再解析原生嵌套。

`@layer` 插件要求看到**完整的一份 CSS**。现在只有这一个样式入口。如果以后拆成多个 CSS 文件或 CSS Modules，每份文件会各自计算特异度，层序会错。那种情况要先把 CSS 打成一个包，再跑这个插件。

## 配置怎么迁的

| v3 `tailwind.config.ts` | v4 |
| --- | --- |
| `content: ./src/**/*` | `@import ".../utilities.css" source(none)` 加上 `@source ".."`，不扫描 `docs/`、`dist/` |
| `darkMode: "class"` | `@custom-variant dark (&:where(.dark, .dark *));` |
| `corePlugins.preflight: false` | 不引入 `tailwindcss/preflight.css` |
| `@tailwind base/components/utilities` | `@import "tailwindcss/theme.css"` 与 `utilities.css` |

`components.json` 的 `tailwind.css` 指向 `src/styles/index.css`，`config` 留空。

## 全局 reset 放在 `@layer base`

原先 `* { margin/padding/border/outline }`、`body`、`img, svg { flex: none }` 写在所有 `@layer` 外面。按 CSS 层叠规则，**未分层声明压过任何 `@layer`**，所以在支持 `@layer` 的 WebView 里，`.px-6`、`.border-solid` 会输给 `*`。

`postcss-cascade-layers` 不用这个规则，它按层序加特异度。展平之后如果 reset 仍留在层外，低特异度的 `*` 会反过来输给 `.px-6`。两种写法都不可靠，所以 reset 放进 **`@layer base`**（低于 `utilities`）。

当前生产 CSS 里大致是：

- base 的通用 reset：`:not(#\#):not(#\#)`，特异度 (2, 0, 0)
- utilities（例如 `.px-6`）：四个 `:not(#\#)` 再加一个类，特异度 (4, 1, 0)

因此 **工具类盖得过 reset**，同一层内部原来的相对特异度还在（`:root` 仍高于 `*`）。`@font-face` 留在层外，插件不会改它。

滚动条类 `.scrollbar-custom` 挂在 `index.html` 的 `<body>` 上。v4 的 `@apply` 不能引用这种自定义类，所以不再写 `body { @apply scrollbar-custom }`。

## 支持矩阵

| 环境 | `@layer` | 这份模板的预期 |
| --- | --- | --- |
| Chrome &lt; 99，Safari / iOS &lt; 15.4 | 不支持。整段 `@layer` 被丢弃 | polyfill 去掉 `@layer` 后样式还在。这是「整页空白」的那一档 |
| iOS 15.4–16.3 | 支持 `@layer`，不支持或只部分支持 `@property` | Tailwind v4.1+ 用 `@supports` 写了 `--tw-*` 初始值。阴影、变换、渐变可能和现代浏览器不一致，布局类一般还在 |
| Chrome 99–110，以及基于同代 Chromium 的旧 XWeb | 支持 `@layer`，**不支持 `oklch()`** | 间距、flex、字号还在。`neutral-*` 等主题色是 `oklch(97% …)`，没有再写一份 hex，这些颜色会失效。`#fff` 这种已经是 sRGB 的值不受影响 |
| Chrome ≥ 111 且 Safari / iOS ≥ 16.4 | v4 设计目标 | 正常 |

v4.1 起的兼容手段（本仓库是 v4.3）包括：`oklch()` 第一分量改成百分比（照顾 Safari 15）、`@property` 的 `@supports` 回退、带透明度的颜色在用到时内联 sRGB。当前模板没有 `bg-black/50` 这类透明度修饰，所以看不到 `color-mix` 回退。**这些回退补不上 Chrome &lt; 111 的 `oklch()`。**

`XWEB/` 后面的数字不是 Chrome 主版本，探针只原样上报，不在这里编一张对照表。

## 什么时候可以删掉 polyfill

同时满足再删：

- 最低 WebView 已经是 Chrome ≥ 99 且 iOS / Safari ≥ 15.4
- 探针里 `risk: "unsupported-layer"` 的量可以忽略

删法：从 `postcss.config.js` 去掉 `@csstools/postcss-cascade-layers`，并卸掉这个依赖。**reset 继续留在 `@layer base`**。回到原生 `@layer` 之后，`utilities` 仍然高于 `base`；如果把 reset 搬回层外，工具类会再次全部失效。

删掉之后产物里会重新出现 `@layer`，这是预期。

## 视觉回归要看的地方

和「未分层 reset 压过一切工具类」相比，现在工具类会赢。请在真机上看：

- **间距**：`px-6`、`p-5`、`mt-8` 应能盖过 `* { margin: 0; padding: 0 }`
- **边框**：`border-x` / `border-b` + `border-solid` + `border-neutral-200`。reset 是 `border: 0`（style 为 none）。以前在支持 `@layer` 的浏览器上，这条未分层 reset 可能把边框吃掉
- **outline**：`* { outline: none }` 仍是默认。只有再写 outline 工具类才会盖过它
- **图片 / SVG**：默认 `flex: none`（不参与 flex 缩放）。元素上如果写了 `flex-1` 这类工具类，现在会盖过这个默认值
- **暗色**：`dark:` 只在祖先有 `.dark` 时生效，不再跟系统 `prefers-color-scheme`。模板里还没有 `dark:` 类
- **颜色**：旧 Chromium 上 `bg-neutral-100` / `border-neutral-200` / `text-neutral-800` 可能丢失，背景会露出浏览器默认底色
- **滚动条**：`body` 需要带着 `scrollbar-custom`

## 兼容探针

探针写在 `index.html` 第一个内联脚本里，页面一解析就跑，不发任何请求。

上报字段在 `window.__WXAD_CSS_COMPAT__`（类型见 `typings/custom.d.ts`）：

| 字段 | 含义 |
| --- | --- |
| `supportsLayerApi` | `CSS.supports("@layer", "")` 的原始返回值。这是属性查询，不是 at-rule 查询。当前 Chrome 即使支持 `@layer` 也返回 `false`，不能单独当结论 |
| `supportsLayer` | 往文档里插一条 `@layer` 规则后，自定义属性是否生效。`null` 表示探针抛错 |
| `risk` | `unsupported-layer`（Chrome &lt; 99、iOS &lt; 15.4，或 DOM 探针失败）、`cosmetic`（iOS 15.4–16.3，或 Chrome 99–110）、`ok` |
| `xweb` | UA 里 `XWEB/` 后面的原始数字 |
| `chrome` | `Chrome/` 主版本。iOS 微信经常没有这段 |
| `os` | `ios` / `android` / `other` 和 major.minor.patch |
| `ua` | 完整 UA |

风险档是给看板用的粗分类，不是样式开关。

### 接到 beacon

默认的 `window.__wxadReportCssCompat` 是空函数。三选一即可：

1. 在这段脚本**之前**赋值（会盖过空函数）：

```html
<script>
  window.__wxadReportCssCompat = function (payload) {
    // 换成你们自己的 beacon。不要在模板里写死后端。
  }
</script>
```

2. 直接改 `index.html` 里那个空函数的函数体。

3. 更早的脚本里监听，或在 beacon 初始化时读已经挂上的对象：

```js
document.addEventListener("wxad-css-compat", function (event) {
  var payload = event.detail
})

// 若监听来不及，之后任意时刻：
var payload = window.__WXAD_CSS_COMPAT__
```

事件在探针脚本执行时就发出。写在它后面的模块脚本里才 `addEventListener` 会错过，这时改读 `window.__WXAD_CSS_COMPAT__`。

`console.info("[wxad-css-compat]", payload)` 始终会打，方便本地看。`<html data-wxad-css-risk="ok|cosmetic|unsupported-layer">` 上也能看到同一档风险。hook 抛错只 `console.warn`，不打断页面。

`index.html` 里 react-scan 的 `<script>` 必须写成成对的闭合标签。HTML 不承认 `<script ... />`，后面的探针脚本会被吃进那个标签里，不会执行。

## TypeScript 7 和 ESLint

`tsc` 仍然是 TypeScript 7（`@typescript/native`，`pnpm exec tsc -v` 为 7.x）。`typescript-eslint` 8.71 还不能加载 TypeScript 7 的编译器 API，所以 `typescript` 这个包名指向 `@typescript/typescript6`，只给 ESLint 用。这是 TypeScript 7 公告里的 side-by-side 写法。不要把 `typescript` 改回 `typescript@7`，否则 `pnpm lint` 会直接退出。

TypeScript 7 去掉了 `baseUrl`，`tsconfig*.json` 里只保留 `paths`。
