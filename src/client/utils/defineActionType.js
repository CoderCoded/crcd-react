export default function defineActionType (moduleName, actionName) {
  let appName = global.APP_NAME ? `${global.APP_NAME}/` : ''
  return `${appName}${moduleName}/${actionName}`
}
