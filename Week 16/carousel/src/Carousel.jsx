import { Component, STATE, ATTRIBUTE } from '../lib/framework.js'
import { enableGesture } from '../lib/gesture.js'
import { TimeLine, Animation } from '../lib/animation.js'
import { ease } from '../lib/timingFunction.js'
export { STATE, ATTRIBUTE } from '../lib/framework.js'

export class Carousel extends Component {
  constructor () {
    super()
  }

  render () {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')

    for (const record of this[ATTRIBUTE].src) {
      const child = document.createElement('div')
      child.style.backgroundImage = `url('${record.img}')`
      this.root.appendChild(child)
    }

    enableGesture(this.root)
    const timeline = new TimeLine()
    timeline.start()

    const children = this.root.children
    this[STATE].position = 0

    let t = 0
    let ax = 0

    let handler = null

    this.root.addEventListener('start', event => {
      timeline.pause()
      clearInterval(handler)

      if (Date.now() - t < 1500) {
        const progress = (Date.now() - t) / 1500
        ax = ease(progress) * 500 - 500
      } else {
        ax = 0
      }
    })

    this.root.addEventListener('tap', event => {
      this.triggerEvent('click', {
        data: this[ATTRIBUTE].src[this[STATE].position],
        position: this[STATE].position
      }
      )
    })

    this.root.addEventListener('pan', event => {
      const x = event.clientX - event.startX - ax
      const current = this[STATE].position - ((x - x % 500) / 500)

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length

        children[pos].style.transition = 'none'
        children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x}px)`
      }
    })

    this.root.addEventListener('end', event => {
      timeline.reset()
      timeline.start()
      handler = setInterval(nextPicture, 3000)

      const x = event.clientX - event.startX - 0
      const current = this[STATE].position - ((x - x % 500) / 500)
      let direction = Math.round((x % 500) / 500)

      if (event.isFlick) {
        if (event.clientX > event.startX) {
          direction = Math.ceil((x % 500) / 500)
        } else {
          direction = Math.floor((x % 500) / 500)
        }
      }

      for (const offset of [-1, 0, 1]) {
        let pos = current + offset
        pos = (pos % children.length + children.length) % children.length

        children[pos].style.transition = 'none'
        timeline.add(new Animation(children[pos].style, 'transform',
          -pos * 500 + offset * 500 + x % 500,
          -pos * 500 + offset * 500 + x % 500 + direction * 500,
          1500, 0, ease, v => `translateX(${v}px)`))
      }

      this[STATE].position = this[STATE].position - ((x - x % 500) / 500) - direction
      this[STATE].position = (this[STATE].position % children.length + children.length) % children.length
      this.triggerEvent('change', { position: this[STATE].position })
    })

    const nextPicture = () => {
      const children = this.root.children
      const nextIndex = (this[STATE].position + 1) % children.length

      const current = children[this[STATE].position]
      const next = children[nextIndex]

      t = Date.now()

      timeline.add(new Animation(current.style, 'transform',
        -this[STATE].position * 500, -500 - this[STATE].position * 500, 1500, 0, ease, v => `translateX(${v}px)`))
      timeline.add(new Animation(next.style, 'transform',
        500 - nextIndex * 500, -nextIndex * 500, 1500, 0, ease, v => `translateX(${v}px)`))

      this[STATE].position = nextIndex
      this.triggerEvent('change', { position: this[STATE].position })
    }

    handler = setInterval(nextPicture, 3000)

    // this.root.addEventListener('mousedown', (event) => {
    //   let startX = event.clientX;

    //   let move = (event) => {
    //     let x = event.clientX - startX;
    //     let current = position - ((x - x % 500) / 500);
    //     for (const offset of [-1, 0, 1]) {
    //       let pos = current + offset;
    //       pos = (pos + children.length) % children.length;
    //       children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
    //       children[pos].style.transition = 'none';
    //     }
    //   };

    //   let up = event => {
    //     let x = event.clientX - startX;
    //     position = position - Math.round(x / 500);
    //     for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
    //       let pos = position + offset;
    //       pos = (pos + children.length) % children.length;
    //       if (offset === 0) {
    //         position = pos;
    //       }
    //       children[pos].style.transform = `translateX(${-position * 500 + offset * 500}px)`;
    //       children[pos].style.transition = '';
    //     }
    //     document.removeEventListener('mousemove', move);
    //     document.removeEventListener('mouseup', up);
    //   };

    //   document.addEventListener('mousemove', move);
    //   document.addEventListener('mouseup', up);
    // });
    // let currentIndex = 0
    // setInterval(() => {
    //   let { children } = this.root
    //   let nextIndex = (currentIndex + 1) % children.length
    //   let current = children[currentIndex]
    //   let next = children[nextIndex]
    //   next.style.transition = 'none'
    //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`
    //   setTimeout(() => {
    //     next.style.transition = ''
    //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`
    //     next.style.transform = `translateX(${-nextIndex * 100}%)`
    //     currentIndex = nextIndex
    //   }, 16)
    // }, 3000)
    return this.root
  }
}
