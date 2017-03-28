import pino from 'pino'

const log = pino({
  name: 'crcd-react',
  level: __DEVELOPMENT__ ? 'debug' : 'info'
})

export default log
