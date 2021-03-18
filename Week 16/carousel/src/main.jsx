import { Carousel } from './Carousel.jsx'
import { createElement, Component } from '../lib/framework.js'
import { TimeLine, Animation } from '../lib/animation.js'

const cats = [
  {
    img: 'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
    url: 'https://time.geekbang.org'
  },
  {
    img: 'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
    url: 'https://time.geekbang.org'
  },
  {
    img: 'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
    url: 'https://time.geekbang.org'
  },
  {
    img: 'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg',
    url: 'https://time.geekbang.org'
  }
]

const a = (
  <Carousel
    src={cats} class='carousel'
    onChange={event => console.log(event.detail.position)}
    onClick={event => { window.location.href = event.detail.data.url }}
  />
)
a.mountTo(document.body)
