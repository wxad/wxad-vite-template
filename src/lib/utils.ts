import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const ua = navigator.userAgent.toLowerCase()
/**
 * 是否是微信
 */
export let isWeChat = false
/**
 * 是否是小程序
 */
export let isMiniProgram = false
if (ua.includes("micromessenger")) {
  isWeChat = true
  try {
    window.wx.miniProgram.getEnv((res: IBaseObject) => {
      if (res.miniprogram) {
        isMiniProgram = true
      } else {
        isMiniProgram = false
      }
    })
  } catch (error) {
    console.log("[yijie]", error)
    isMiniProgram = false
  }
}

/**
 * 是否是移动端
 */
export const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    navigator.userAgent
  )

/**
 * 是否是安卓
 */
export const isAndroid = /Android/.test(navigator.userAgent)

/**
 * 是否是 iOS
 */
export const isIOS = ua.match(/(iphone)\sos\s([\d_]+)/i)

/**
 * 是否是低版本移动端
 */
export const isVersionLow =
  (isAndroid &&
    parseInt(ua.match(/(android)\s([\d.]+)/i)?.[2] || "", 10) < 8) ||
  (isIOS && parseInt(isIOS[2], 10) < 11)

/**
 * event 是否支持 passive
 */
export let passiveSupported = false
try {
  const options = Object.defineProperty({}, "passive", {
    get() {
      passiveSupported = true
      return false
    },
  })
  // @ts-expect-error passive
  window.addEventListener("passive", null, options)
} catch (err) {
  console.warn(err, "阻止 body 滚动事件错误")
}

/**
 * 获取 url 参数
 */
export const getUrlParams = (): { [key: string]: string } => {
  const search = location.search.slice(1)
  const arr = search.split("&")
  const result = {} as IBaseObject
  let temp = [] as string[]

  for (let i = 0, l = arr.length; i < l; i++) {
    temp = arr[i].split("=")
    result[temp[0]] = decodeURIComponent(temp[1])
  }
  return result
}

/**
 * 微信 WeixinJSBridge 白名单调用，函数内会判断是否在微信环境，因此调用方无需判断
 * @param name 接口名称 string
 * @param options 接口选项 IBaseObject
 * @param cb 接口回调函数
 */
export const invokeWeChat = (
  name: string,
  options?: IBaseObject,
  cb?: (res?: IBaseObject) => void
): void => {
  if (isWeChat && window.WeixinJSBridge) {
    window.WeixinJSBridge.invoke(name, options, cb)
  }
}
/**
 * 微信 WeixinJSBridge 添加监听
 * @param name 接口名称 string
 * @param cb 接口回调函数
 */
export const onWeChat = (
  name: string,
  cb?: (res?: IBaseObject) => void
): void => {
  if (isWeChat && window.WeixinJSBridge) {
    window.WeixinJSBridge.on(name, cb)
  }
}

/**
 * 打开链接
 * @param url string
 */
export const openLink = (url: string) => {
  if (!url) {
    return
  }

  if (isWeChat) {
    try {
      invokeWeChat("openUrlWithExtraWebview", {
        url,
        scene: 88,
      })
    } catch (error) {
      console.log("[yijie]", error)
      window.location.href = url
    }
  } else {
    window.location.href = url
  }
}

/**
 * 打开原生预览
 *
 *  canvasId （page_id）: 标识要下载打开哪个原生页
 *  preLoad: 0为打开xml文件，1为预加载但不打开xml文件
 *  noStore: 0为使用缓存，1为不使用缓存
 *  extraData: 广告相关参数打包，在13387协议中的extra字段上报
 *  fromOuterIndex: 外层多图打开
 *  adInfoXml: 广告预览下发一个 mock
 *  targetDistance: 滑动广告彩蛋页特有：阈值
 *  gesturePoints: 滑动广告彩蛋页特有：滑动的坐标
 *  samplePoints: 滑动广告彩蛋页特有：样本坐标
 *  eggCardExtInfo: 20231215 预览环境正常展示红包卡
 */
interface IOpenCanvas {
  canvasId?: number
  preLoad?: 0 | 1
  noStore?: 0 | 1
  openFirstSightVoice?: 0 | 1
  adInfoXml?: string
  twistCardId?: string | number
  fromOuterIndex?: number
  targetDistance?: number
  gesturePoints?: string
  samplePoints?: string
  eggCardExtInfo?: {
    cardType: "2" // 固定为 2
    subCardType: "1" | "2" | "3" | "4" // 1 单份领取，2单份赠送，3双份卡，4赠送后领取卡
    giveCardId: string // 留空 ""
    receiveUrl: string // 留空 ""
  }
  source?: number
  cb?: () => void
}
export const openCanvas = ({
  canvasId: id,
  twistCardId,
  fromOuterIndex,
  targetDistance = 0.8,
  gesturePoints,
  samplePoints,
  cb = () => { },
  source = 26,
}: IOpenCanvas): void => {
  /**
   * adqq 可能没有 id
   */
  if (!id || id === 800000000000) {
    alert("暂无原生页信息，请选择原生页或创建完成后预览")
    return
  }
  let retryTimes = 0
  const canvasId = id.toString().indexOf("80") === 0 ? id : 800000000000 + id
  const adInfoXml = `<ADInfo><viewid>wx0gar4wdhazsz2200</viewid><uxInfo>1888888887|wx0gar4wdhazsz2200</uxInfo></ADInfo>`
  const options: IOpenCanvas = {
    canvasId,
    preLoad: 0,
    noStore: 1,
    adInfoXml,
    openFirstSightVoice: 1,
    source,
  }
  if (twistCardId) {
    options.twistCardId =
      typeof twistCardId === "number" ? twistCardId : parseInt(twistCardId, 10)
    options.eggCardExtInfo = {
      cardType: "2",
      subCardType: "1",
      giveCardId: "",
      receiveUrl: "",
    }
  }
  if (fromOuterIndex) {
    options.fromOuterIndex = fromOuterIndex
  }
  if (targetDistance) {
    options.targetDistance = targetDistance
  }
  if (gesturePoints) {
    options.gesturePoints = gesturePoints
  }
  if (samplePoints) {
    options.samplePoints = samplePoints
  }
  const bindit = () => {
    try {
      window.WeixinJSBridge.invoke("openADCanvas", options, cb)
    } catch (e) {
      console.log("[yijie]", e)
      retryTimes = retryTimes + 1
      if (retryTimes < 5) {
        bindit()
      }
    }
  }
  if (!window.WeixinJSBridge) {
    document.addEventListener("WeixinJSBridgeReady", bindit)
  } else {
    bindit()
  }
}

/**
 * 通用视频播放
 */
export const playVideo = (video?: HTMLVideoElement | null, cb?: () => void) => {
  if (video) {
    const timeupdate = () => {
      if (video.currentTime) {
        video.removeEventListener("timeupdate", timeupdate)
        if (cb) {
          cb()
        }
      }
    }
    video.addEventListener("timeupdate", timeupdate)
    const playInWechat = () => {
      invokeWeChat("getNetworkType", {}, () => {
        video.play()
      })
    }
    if (isWeChat) {
      if (window.WeixinJSBridge) {
        playInWechat()
      } else {
        window.addEventListener("WeixinJSBridgeReady", playInWechat)
      }
    } else {
      if (video) {
        video.play()
      }
    }
  }
}