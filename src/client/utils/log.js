import pino from 'pino'

const log = pino({
  name: 'crcd-html5',
  level: __DEVELOPMENT__ ? 'debug' : 'info'
})

export default log
