const os = require('os')

export function platformInfo() {
  // 获取操作系统名称
  const platform = os?.platform()
  // 操作系统版本
  const release = os?.release()
  // 获取主机名
  const hostname = os?.hostname()
  // 获取总内存
  const totalmem = os?.totalmem()
  // 获取空闲内存
  const freemem = os?.freemem()
  // 获取CPU架构
  const arch = os?.arch()
  // 获取CPU信息
  const cpus = os?.cpus()
  // 获取网络接口信息
  const IPAndMAC = getIPAndMAC()
  const _platformInfo = {
    platform,
    release,
    hostname,
    totalmem,
    freemem,
    arch,
    cpus,
    ...IPAndMAC,
  }
  console.log(_platformInfo)
  return _platformInfo

  function getIPAndMAC() {
    const networkInterfaces =  os?.networkInterfaces()
    let ip: string = ''
    let _mac: string = ''
    for (const name of Object.keys(networkInterfaces)) {
      for (const iface of networkInterfaces[name]) {
        // 过滤掉内部IP地址（如虚拟机分配的地址）
        const { internal, address, mac, family } = iface || {}
        if (family === 'IPv4' && !internal) {
          ip = address
        }
        if (family === 'IPv4' && mac !== '00:00:00:00:00:00' && address !== '127.0.0.1') {
          _mac = mac
        }
      }
    }
    return {
      mac: _mac,
      ip
    }
  }
  
}
// 示例
// platformInfo()