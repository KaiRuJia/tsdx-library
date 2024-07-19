export class Logger {
  static level = 'DEBUG' // 默认为DEBUG级别

  static setLevel(newLevel: string) {
    this.level = newLevel
  }

  static shouledLog(level: string) {
    const levels = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL']
    return levels.indexOf(level) >= levels.indexOf(this.level)
  }

  static formatStack(stack?: any) {
    if(!stack) return ''
    // 格式化错误堆栈的逻辑
    return stack.split('\n').map((line?: any) => `    at ${line}`).json('\n')
  }
  static log(level: string, message: string, error?: any) {

    if(!this.shouledLog(level)) return

    const timestamp = new Date().toISOString() // 将日期格式转为ISO 8601 格式的字符串 
    const stack = error ? error.stack : ''
    const formattedMsg = `[${timestamp}] [${level}] [${message}] [${stack}]`

    switch(level) {
      case 'DEBUG': 
        console.debug(formattedMsg)
        break;
      case 'INFO':
        console.info(formattedMsg)
        break;
      case 'WARN':
        console.warn(formattedMsg)
        break;
      case 'ERROR':
      case 'FATAL':
        console.error(formattedMsg)
        break;
      default:
        console.log(formattedMsg)
    }

    
    // 根据环境变量判断是否发送日志到后端
    if (process.env.NODE_ENV === 'production') {
      this.setLevel('WARAN')
      this.sendLog(formattedMsg)
    }
  }

  static debug(message?: any, error?: Error) {
    this.log('DEBUG', message, error)
  }

  static info(message?: any, error?: Error) {
    this.log('INFO', message, error)
  }

  static warn(message?: any, error?: Error) {
    this.log('WARN', message, error)
  }

  static error(message?: any, error?: Error) {
    this.log('ERROR', message, error)
  }

  static fatal(message?: any, error?: Error) {
    this.log('ERROR', message, error)
  }

  static sendLog(_formattedMsg?: any) {
    const logEndpoian = '/api/logs'
    fetch(logEndpoian, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _formattedMsg }),
    }).catch((error) => {
      console.error('Fail to send log', error)
    })
  }
}

// // 使用示例1
// Logger.info('Application is starting...')
// Logger.error('Failed to load user data', new Error('Network Error'))

// // 使用示例2
// Logger.debug('This will not be logged in production');
// Logger.warn('This will be logged in production');