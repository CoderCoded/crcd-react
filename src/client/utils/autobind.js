const REACT_EXCLUDE_METHODS = {
  getChildContext: true,
  render: true,
  componentWillMount: true,
  componentDidMount: true,
  componentWillReceiveProps: true,
  shouldComponentUpdate: true,
  componentWillUpdate: true,
  componentDidUpdate: true,
  componentWillUnmount: true
}

function isExcluded (methodName, excluded) {
  return (REACT_EXCLUDE_METHODS[methodName] === true || excluded[methodName] === true)
}

function isFunction (item) {
  return (typeof item === 'function')
}

export default function autobind (instance, excluded = {}) {
  let proto = Object.getPrototypeOf(instance)
  let propertyNames = Object.getOwnPropertyNames(proto)
  for (let name of propertyNames) {
    let value = proto[name]
    if (isFunction(value) && !isExcluded(name, excluded)) {
      // instance[name] = instance[name].bind(instance)
      instance[name] = function (...args) {
        return value.call(instance, ...args)
      }
    }
  }
}
