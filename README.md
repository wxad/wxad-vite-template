# Wxad Vite Template

## 建立新项目

```
npx degit https://github.com/wxad/wxad-vite-template my-wxad-vite-app
```

## 技术选型

样式是 Tailwind CSS v4，构建期用 `@csstools/postcss-cascade-layers` 去掉产物里的 `@layer`，避免旧版微信 XWeb / Chrome &lt; 99 / Safari &lt; 15.4 整页丢样式。支持矩阵、polyfill 何时可以删、以及 `index.html` 里的兼容探针怎么接到 beacon，写在 [MIGRATION.md](./MIGRATION.md)。

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
  "https://wxa.wxs.qq.com/wxad-design/fonts/1773377484406-BerkeleyMono-Regular.ttf",
  { as: "font" }
)
```

### [useOptimistic]

### 性能分析

- `react-scan`：`npx react-scan@latest http://localhost:3000`

## 环境变量

## CI/CD
