const callbacks = new Map()
const reactivities = new Map()
let usedReactivties = []

function reactive (object) {
  if (reactivities.has(object)) return reactivities.get(object)
  const proxy = new Proxy(object, {
    set (obj, prop, val) {
      obj[prop] = val
      if (callbacks.get(obj)) {
        if (callbacks.get(obj).get(prop)) {
          for (const cb of callbacks.get(obj).get(prop)) {
            cb()
          }
        }
      }
      return obj[prop]
    },
    get (obj, prop) {
      usedReactivties.push([obj, prop])
      if (typeof obj[prop] === 'object') return reactive(obj[prop])
      return obj[prop]
    }
  })
  reactivities.set(object, proxy)
  return proxy
}

/**
 * collect dependencys in fn,
 * if any reactive property changed through "set" method of its own,
 * it will run again.
 * @param {fn} fn
 */
function effect (fn) {
  usedReactivties = []
  fn()

  for (const react of usedReactivties) {
    if (!callbacks.has(react[0])) callbacks.set(react[0], new Map())

    if (!callbacks.get(react[0]).has(react[1])) callbacks.get(react[0]).set(react[1], [])

    callbacks.get(react[0]).get(react[1]).push(fn)
  }
}

// test below
const obj = {
  a: { b: 4 },
  b: 2
}

const po = reactive(obj)

effect(() => {
  console.log('effect begin')
  console.log('deps with depth 1:', po.b)
  console.log('deps with depth 2:', po.a.b)
})
