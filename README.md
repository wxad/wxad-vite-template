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
