import { TimeLine, Animation } from '../lib/animation.js'
import { easeIn } from '../lib/timingFunction.js'
let tl = new TimeLine()
tl.start()
const el = document.querySelector('#el')
tl.add(new Animation(el.style, 'transform', 0, 500, 2000, 0, easeIn, v => `translateX(${v}px)`))

document
  .querySelector('#pause-btn')
  .addEventListener('click', (e) => {
    tl.pause()
  })

document
  .querySelector('#resume-btn')
  .addEventListener('click', (e) => {
    tl.resume()
  })