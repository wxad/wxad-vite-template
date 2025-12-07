import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react()],
    // 定义全局变量，类型在 typings/custom.d.ts 中
    define: {
      "import.meta.env.VERSION": JSON.stringify(env.npm_package_version),

      /**
       * 以下内容需人工配置
       */

      // 最终上线链接
      "import.meta.env.URL": JSON.stringify(
        "https://mp.weixin.qq.com/promotion/res/htmledition/best-moments-2023-demo/index.html"
      ),
      // 页面最大宽度
      "import.meta.env.WIDTH": JSON.stringify(500),
      // 页面标题
      "import.meta.env.TITLE": JSON.stringify("微信广告移动端模板"),
      // 朋友圈 & 会话分享标题
      "import.meta.env.SHARE_TITLE": JSON.stringify(
        "2024 Q2 用户最喜爱的朋友圈广告"
      ),
      // 会话分享描述
      "import.meta.env.SHARE_DESC": JSON.stringify("有你喜爱的吗？"),
      // 会话分享图片
      "import.meta.env.SHARE_IMG": JSON.stringify(
        "https://wxa.wxs.qq.com/wxad-design/yijie/bm-fengmian.png"
      ),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
})
