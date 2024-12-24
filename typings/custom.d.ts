declare module "*.js"

declare interface IBaseObject {
  [key: string]: any
}

// 扩充类型
// import.meta.env.VERSION
declare interface ImportMetaEnv {
  // 版本号
  VERSION: string
  // 页面标题
  TITLE: string
  // 页面最大宽度
  WIDTH: string
  // 朋友圈 & 会话分享标题
  SHARE_TITLE: string
  // 会话分享描述
  SHARE_DESC: string
  // 朋友圈 & 会话分享图片
  SHARE_IMG: string
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
  wx: IBaseObject
  // 登录态相关
  token: string
  machine_key: string
}
