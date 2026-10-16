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

declare interface WxadCssCompatOs {
  name: "ios" | "android" | "other"
  major: number | null
  minor: number | null
  patch: number | null
}

declare interface WxadCssCompatReport {
  /** DOM 探针：当前文档是否真的应用了 @layer。null 表示探针抛错。 */
  supportsLayer: boolean | null
  /**
   * CSS.supports("@layer", "") 的原始返回值。
   * 这是属性查询，不是 at-rule 查询；当前 Chrome 即使支持 @layer 也会返回 false。
   */
  supportsLayerApi: boolean
  risk: "unsupported-layer" | "cosmetic" | "ok"
  /** XWEB/ 后面的原始版本号，不是 Chrome major。 */
  xweb: string | null
  chrome: number | null
  os: WxadCssCompatOs
  ua: string
}

declare interface Window {
  __WXAD_CSS_COMPAT__?: WxadCssCompatReport
  __wxadReportCssCompat?: (payload: WxadCssCompatReport) => void
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

  // 20250118 学到了
  __wxWebEnv: {
    getEnv: () => ({
      // iOS & Android，我的 iOS 1，Android 是 2
      fontLevel: number
      // iOS & Android，我调小了字体就会是 94，默认 100
      fontScale: number
      // iOS & Android，微信头高度，我的是 91
      normalTopInset: number
      // Android 独有
      immersiveMode: 0 | 1
      // Android 独有
      childView: boolean
      // Android 独有
      isPreload: boolean
      // Android 独有，视频号半屏页中有值，在做置底按钮时会用到
      maxHeight: number
      // Android 独有，视频号半屏页中有值，在做置底按钮时会用到
      peekHeight: number
      // Android 独有，视频号半屏页中有值，在做置底按钮时会用到
      currHeight: number
    })
  }
}
