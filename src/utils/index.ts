//判断文件是图片
export function fileTypeIsImage(fileName: string) {
  // 后缀获取
  let suffix = ''
  // 获取类型结果
  let result: any
  try {
    const flieArr = fileName.split('.')
    suffix = flieArr[flieArr.length - 1]
  } catch (err) {
    suffix = ''
  }
  // fileName无后缀返回 false
  if (!suffix) {
    return false
  }
  suffix = suffix.toLocaleLowerCase()
  // 图片格式
  const imglist = [
    'png',
    'jpg',
    'jpeg',
    'bmp',
    'gif',
    'webp',
    'psd',
    'svg',
    'tiff'
  ]
  // 进行图片匹配
  result = imglist.find((item) => item === suffix)
  if (result) {
    return 'image'
  }
  // 匹配txt
  const txtlist = ['txt']
  result = txtlist.find((item) => item === suffix)
  if (result) {
    return 'txt'
  }
  // 匹配 excel
  const excelist = ['xls', 'xlsx']
  result = excelist.find((item) => item === suffix)
  if (result) {
    return 'excel'
  }
  // 匹配 word
  const wordlist = ['doc', 'docx']
  result = wordlist.find((item) => item === suffix)
  if (result) {
    return 'word'
  }
  // 匹配 pdf
  const pdflist = ['pdf']
  result = pdflist.find((item) => item === suffix)
  if (result) {
    return 'pdf'
  }
  // 匹配 ppt
  const pptlist = ['ppt', 'pptx']
  result = pptlist.find((item) => item === suffix)
  if (result) {
    return 'ppt'
  }
  // 匹配 视频
  const videolist = [
    'mp4',
    'm2v',
    'mkv',
    'rmvb',
    'wmv',
    'avi',
    'flv',
    'mov',
    'm4v'
  ]
  result = videolist.find((item) => item === suffix)
  if (result) {
    return 'video'
  }
  // 匹配 音频
  const radiolist = ['mp3', 'wav', 'wmv']
  result = radiolist.find((item) => item === suffix)
  if (result) {
    return 'radio'
  }
  // 目前如果没有找到文件类型。默认返回图片类型
  return 'other'
}

/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
export function createUniqueString(): string {
  const timestamp = +new Date() + ''
  const randomNum = (1 + Math.random()) * 65536 + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * 数字存储大小格式化
 * @param {number} num 存储大小 单位：Byte
 * @param {number} digits 保留几位小数，默认2
 * @return {string} 2MB
 */
export function formatStorage(num: number, digits?: number) {
  digits = digits || 2
  if (num < 1024) {
    return num + 'B'
  }
  num = (num * 1000) / 1024
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
        si[i].symbol +
        'B'
      )
    }
  }
}

// 节流函数
type CallBack = (...args: any) => void

export function _debounce(cb: CallBack, delay = 100, immediate = false) {
  let timer: any = null
  let isInvoke = false
  const _ = function (this: any, ...args: any) {
    if (timer) clearTimeout(timer)
    if (immediate && !isInvoke) {
      cb.apply(this, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        cb.apply(this, args)
        isInvoke = false
      }, delay)
    }
  }
  return _
}
