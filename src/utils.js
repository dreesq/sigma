import theme from './theme'
import deepmerge from 'deepmerge'

/**
 * Get value by dot notation
 * @param key
 * @param value
 * @returns {*|Array|string[]}
 */

export const get = (key, value = {}) => {
  let current = value
  key = key.split('.')

  while (key.length) {
    let currentKey = key.shift()

    if (!current.hasOwnProperty(currentKey)) {
      return key
    }

    current = current[currentKey]
  }

  return current
}

/**
 * Given props and key returns value
 * @param key
 * @param props
 */

export const getValue = (key, props = {}) => {
  let current = deepmerge(theme, props.theme || {})
  current = get(key, current)
  return typeof current !== 'undefined' ? current : key
}

/**
 * Given a hex color and a percent, returns a new color
 * @param color
 * @param percent
 */

export const shadeColor = (color, percent) => {
  if (color[0] === '#') {
    color = color.slice(1)
  }

  let num = parseInt(color, 16)

  let r = (num >> 16) + percent

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00FF) + percent

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000FF) + percent

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return `#${(g | (b << 8) | (r << 16)).toString(16)}`
}

/**
 * Given a value, converts it to css value string
 * @param value
 * @returns {string|*}
 */

export const toString = value => {
  if (Array.isArray(value)) {
    return value.map(value => typeof value === 'number' ? `${value}${value === 0 ? '' : 'px'}` : value).join(' ')
  }

  if (typeof value === 'number') {
    return `${value}${value === 0 ? '' : 'px'}`
  }

  return value
}

/**
 * Given a size and css, generates a media query
 * @param size
 * @param css
 */

export const toMedia = (size, css) => `
    @media screen and (min-width: ${size}px) {
        ${css}
    }
`

/**
 * Given css returns the css code
 * @param css
 * @returns {string}
 */

export const toHover = css => `
    &:hover {
        ${css}
    }
`

/**
 * Given a property and a value,
 * generates the css representation
 * @param key
 * @param value
 * @param bps
 * @returns {string}
 */

export const toCss = (key, value, bps) => {
  if (typeof value === 'undefined') {
    return
  }

  let css = ``

  if (typeof value === 'object' && !Array.isArray(value)) {
    for (const bp in value) {
      if (!bps.hasOwnProperty(bp)) {
        continue
      }

      css += toMedia(bps[bp], `${key}: ${toString(value[bp])};`)
    }

    if (value.any) {
      css += `${key}: ${toString(value.any)};`
    }
  } else {
    css = `${key}: ${toString(value)};`
  }

  return css
}

/**
 * Given a camelCase string, returns a kebab-case string
 * @param str
 * @returns {void | string | never}
 */

export const toDashed = str => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)

/**
 * Generates all breakpoints media queries
 * @param css
 * @param bps
 * @returns {string}
 */

export const toAllBreakpoints = (css, bps) => {
  let result = ''

  for (const bp in bps) {
    const size = bps[bp]
    const compiled = css(size)

    if (!compiled) {
      continue
    }

    result += toMedia(size, compiled)
  }

  return result
}
