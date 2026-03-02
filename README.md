# Wxad Vite Template

## 建立新项目

```
npx degit https://github.com/wxad/wxad-vite-template my-wxad-vite-app
```

## 技术选型

## React 19

### [`ref` as a prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop)

```jsx
// Header.tsx
export interface IHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  ref: React.RefObject<HTMLDivElement | null>;
}
```

### [preload resources](https://react.dev/blog/2024/12/05/react-19#support-for-preloading-resources)

```jsx
// App.tsx
preload(
  "https://wxa.wxs.qq.com/wxad-design/fonts/gilroy-semibold-webfont.ttf",
  { as: "font" }
)
```

### [useOptimistic]

### 性能分析

- `react-scan`：`npx react-scan@latest http://localhost:3000`

## 环境变量

## CI/CD

### PR 预览链接

已支持在 PR（merge 前）自动生成预览链接：

1. 创建 / 更新 PR 后，GitHub Action 会自动构建并部署到 `gh-pages` 分支的 `previews/pr-<编号>` 目录。
2. 机器人会在 PR 评论区自动发布（并更新）预览地址。

预览链接格式：

```txt
https://<owner>.github.io/<repo>/previews/pr-<编号>/
```

> 如果你的仓库是 `owner.github.io` 这类用户主页仓库，则链接为：
> `https://<owner>.github.io/previews/pr-<编号>/`

首次使用前请在仓库设置中开启 GitHub Pages（Source 选 `Deploy from a branch`，分支选 `gh-pages`）。
