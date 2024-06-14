import DailyRotateFile from 'winston-daily-rotate-file'
import { createLogger, format } from 'winston'

/**
 * https://github.com/winstonjs/winston#logging
 * { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 * const level = process.env.LOG_LEVEL || 'debug';
 */
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss.SSS'
const procIndex = process.env.NODE_APP_INSTANCE || '0'

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: TIME_FORMAT }),
  format.align(),
  format.printf(formatParams)
)

/**
 * Logging format expression
 *
 * @param   {Object} info
 * @returns {String}
 */
function formatParams(info: any) {
  const {
    // eslint-disable-next-line no-shadow
    timestamp,
    level,
    message,
    ...args
  } = info
  // const ts = timestamp.slice(0, 19).replace('T', ' ');

  const padding = level.length <= 7 ? 7 : 17 // padding differently if it has colour.
  return `${timestamp} - [${level.padEnd(padding, ' ')}] (${procIndex.padEnd(2, ' ')}) 
    ${message.substr(1)} ${Object.keys(args).length
      // ? JSON.stringify(args, '', '')
      ? JSON.stringify(args)
      : ''
    }`
}

// Create default logging rotate file
const transport = new DailyRotateFile({
  filename: './log/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '90d',
  auditFile: './log/.audit.json',
  json: false
})

// Create error logging rotate file
const transportError = new DailyRotateFile({
  filename: './log/application-%DATE%.error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '100m',
  maxFiles: '90d',
  level: 'error',
  auditFile: './log/.error.audit.json',
  json: false
})

// Create logger instance with format, transport
const logger = createLogger({
  level: 'debug',
  format: developmentFormat,
  transports: [transport, transportError]
})

export default logger;