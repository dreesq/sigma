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
      return currentKey
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

export const toValue = value => {
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
 * @param from
 * @param css
 * @param to
 */

export const toMedia = (from, css, to) => `
    @media screen ${typeof from !== 'undefined' ? `and (min-width: ${from}px)` : ''} ${typeof to !== 'undefined' ? `and (max-width: ${to}px)` : ''} {
        ${css}
    }
`;

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

  let keys = Object.keys(bps);
  let css = [];

  if (typeof value === 'object' && !Array.isArray(value)) {
    for (const bp in value) {
      let from = bps[bp];
      let to = bps[keys[keys.indexOf(bp) + 1]] || undefined;

      if (!bps.hasOwnProperty(bp) && bp.indexOf('Down') === -1 && bp.indexOf('Up') === -1) {
        continue
      }

      if (bp.indexOf('Down') > -1) {
        let base = bp.replace('Down', '');
        to = bps[base];
        from = undefined;
      }

      if (bp.indexOf('Up') > -1) {
        let base = bp.replace('Up', '');
        from = bps[base];
        to = undefined;
      }

      css += toMedia(from, `${key}: ${toValue(value[bp])};`, to);
    }

    if (value.any) {
      css += `${key}: ${toValue(value.any)};`
    }
  } else {
    css = `${key}: ${toValue(value)};`
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
};

/**
 * Given a hex color, generates its rgba
 * @param hex
 * @param opacity
 * @returns {string}
 */

export const hexToOpacity = (hex, opacity) => {
  hex = hex.replace('#','');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
