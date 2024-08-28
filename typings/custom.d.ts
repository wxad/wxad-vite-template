declare module "*.js"

declare global {
  // 版本号
  var __VERSION__: string
  // 页面标题
  var __TITLE__: string
  // 页面最大宽度
  var __WIDTH__: string
  // 朋友圈 & 会话分享标题
  var __SHARE_TITLE__: string
  // 会话分享描述
  var __SHARE_DESC__: string
  // 朋友圈 & 会话分享图片
  var __SHARE_IMG__: string
}

declare interface IBaseObject {
  [key: string]: unknown
}

declare interface Window {
  // 微信 js bridge
  WeixinJSBridge: {
    on: (name: string, cb?: (res?: IBaseObject) => void) => void
    invoke: (
      name: string,
      options?: IBaseObject,
      cb?: (res?: IBaseObject) => void
    ) => void
  }
  // 登录态相关
  token: string
  machine_key: string
}

export {}
