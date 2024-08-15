import _ from 'lodash'
class CacheData {
  set(key, value) {
    if (_.isUndefined(key) ||_.isEmpty(key) || _.isObject(key) || _.isUndefined(value) ||_.isEmpty(value)) {
      sessionStorage.removeItem(key)
      return false
    } else {
      sessionStorage.setItem(key, JSON.stringify(value))
      return true
    }
  }
  has(key) {
    const str = sessionStorage.getItem(key)
    return !!str
  }
  get(key) {
    const str = sessionStorage.getItem(key)
    return str ? JSON.parse(str) : null
  }
  delete(key) {
    if (_.isUndefined(key) || _.isEmpty(key) || _.isObject(key)) return false
    sessionStorage.removeItem(key)
    return true
  }
  clear() {
    sessionStorage.clear()
  }
  updateTo(key, value) {
    if (_.isEmpty(value) || _.isUndefined(value) || !_.isObject(value)) return
    const getVal = sessionStorage.getItem(key)
    const setVal = _.assign(JSON.parse(getVal), value)
    sessionStorage.setItem(key, JSON.stringify(setVal))
    return setVal
  }
}
const _cache = new CacheData()
export { _cache }