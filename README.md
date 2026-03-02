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

预览链接格式（会自动匹配仓库当前 Pages 域名，包括自定义域名）：

```txt
<你的 Pages 站点地址>/previews/pr-<编号>/
```

### 从 `main /docs` 迁移到 `gh-pages`（不影响线上）

如果你当前 Pages Source 是 `main /docs`（线上正在使用），按下面步骤切换：

1. 合并本仓库的 workflow 改动到 `main`。
2. 等待 `Deploy Pages` 工作流在 `main` 跑完一次（它会把正式站点部署到 `gh-pages` 根目录）。
3. 到仓库 `Settings -> Pages`，把 Source 改为：
   - `Deploy from a branch`
   - Branch: `gh-pages`
   - Folder: `/(root)`
4. 保存后访问线上地址确认；之后 PR 预览链接即可生效。
