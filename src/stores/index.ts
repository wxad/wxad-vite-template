import { create } from "zustand"

interface Techs {
  [key: string]: {
    [key: string]: string[]
  }
}

interface ExampleState {
  techs: Techs
  setTechs: (techs: Techs) => void
}

const useExampleStore = create<ExampleState>()((set) => ({
  techs: {
    技术选型: {
      项目基础: ["pnpm", "vite", "react"],
      样式相关: ["sass", "clsx", "tailwindcss", "tailwind-merge"],
      状态管理: ["zustand"],
      交互动画: ["framer-motion", "@use-gesture/react"],
    },
    环境变量: {
      最终上线链接: ["__URL__"],
      页面最大宽度: ["__WIDTH__"],
      页面标题: ["__TITLE__"],
      "朋友圈 & 会话分享标题": ["__SHARE_TITLE__"],
      会话分享描述: ["__SHARE_DESC__"],
      会话分享图片: ["__SHARE_IMG__"],
    },
    "CI/CD": {
      待补充: ["待补充"],
    },
  },
  setTechs: (techs) => set({ techs }),
}))

export { useExampleStore }
