/**
 *  Smart Reference for Lodash/FP methods
 *
 *        - Convert some necessary variadic iteratee methods [1]
 *        - Even if this vendor breaks cherry picking, please continue to do so
 *          eg. "import { transform } from '~/assets/fp'" (so it will be "tree-
 *          shaking ready")
 *        - Dissociate Lodash/FP `isEmpty` and real `isEmpty` one [2]
 *        - Add extra methods
 *
 *        (?) has discovered a non listed issue with `curry()` where `this`
 *            injection is broken (multiple arguments method will be called
 *            with `this` as `Global`, even if with a "JS-safe-code") → do not
 *            use `curry()` for instance propert methods
 *
 *  (+) Add additional methods
 *      - `isEmpty`
 *      - `typeOf`
 *      - `toString`
 *      - `fromJSON`
 *      - `generateUUID`
 *
 *  @link https://github.com/lodash/lodash/wiki/FP-Guide#user-content-convert [1]
 *  @link https://github.com/lodash/lodash/issues/496 [2]
 *  @link https://github.com/jfmengels/lodash-fp-docs
 */
import {
  transform as _transform,
  toString as _toString,
  forOwn as _forOwn,
  forIn as _forIn,
} from 'lodash/fp'

export const transform = _transform.convert({ cap: false })
export const forOwn = _forOwn.convert({ cap: false })
export const forIn = _forIn.convert({ cap: false })

export { isEmpty as isCollectionEmpty } from 'lodash/fp'

/**
 *  Is Empty
 *  @param {*} mixedVar
 *  @return {boolean}
 */
export function isEmpty(mixedVar) {
  const emptyValues = [undefined, null, false, 0, '', '0']

  for (let i = 0; i < emptyValues.length; i ++)
    if (mixedVar === emptyValues[i])
      return true

  if (typeof mixedVar === 'object') {
    for (let key in mixedVar) {
      if (mixedVar.hasOwnProperty(key)) {
        return false
      }
    }
    return true
  }

  return false
}
/**
 *  Type Of
 *  @param {*} mixedVar
 *  @return {string}
 */
export function typeOf(mixedVar) {
  var s = Object.prototype.toString.call(mixedVar);
  return s.slice(8, s.length - 1).toLowerCase();
}
/**
 *  To String
 *  @param {*} mixedVar
 *  @return {string}
 */
export function toString(mixedVar) {
  if (typeOf(mixedVar) === 'error' && mixedVar.hasOwnProperty('message'))
    return mixedVar.message
  return _toString(mixedVar)
}
/**
 *  From JSON
 *        - leave value as is if not an object nor an array
 *        - eg.
 *              <string> "{}"   → <object> {}
 *              <string> "[]"   → <array> []
 *              <string> "foo"  → <string> "foo"
 *              <string> "3"    → <number> 3
 *              <string> "true" → <boolean> true
 *  @public
 *  @param {*} mixedVar
 *  @return {*}
 */
export function fromJSON(mixedVar) {
  try {
    return JSON.parse(mixedVar)
  } catch (e) {
    return mixedVar
  }
}
/**
 *  Generate UUID
 *  @return {String}
 */
export function generateUUID() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export * from 'lodash/fp'
