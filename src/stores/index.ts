import { create } from "zustand"

interface Techs {
  [key: string]: {
    [key: string]: string[]
  }
}

interface State {
  techs: Techs
  setTechs: (techs: Techs) => void
}

const useStore = create<State>()((set) => ({
  techs: {
    'AI 辅助': {
      '流畅界面规范': ['.cursor/rules'],
    },
    技术选型: {
      项目基础: ["pnpm", "rolldown-vite", "react"],
      样式相关: ["SCSS", "clsx", "tailwind-merge", "tailwindcss@3 (兼容性考虑)"],
      状态管理: ["zustand"],
      交互动画: ["motion", "@use-gesture/react"],
      文档生成: ["@mdx-js/react"],
      无头组件: ["shadcn/ui"],
      性能分析: ["react-scan"]
    },
    环境变量: {
      最终上线链接: ["URL"],
      页面最大宽度: ["WIDTH"],
      页面标题: ["TITLE"],
      "朋友圈 & 会话分享标题": ["SHARE_TITLE"],
      会话分享描述: ["SHARE_DESC"],
      会话分享图片: ["SHARE_IMG"],
    },
    "开发流程": {
      数据统计: ["beacon"],
      流水线: ["BK-CI", "rainbow"],
    },
  },
  setTechs: (techs) => set({ techs }),
}))

export { useStore }
