import gsap from 'gsap'

export const cardScrolling = (
  toOpacity: number,
  fromOpacity: number,
  fromX: number,
  element: HTMLElement | null
) => {
  const tl = gsap.timeline({
    defaults: {
      duration: 0.2, ease: 'ease'
    }
  })
  tl.to(element, {
    opacity: toOpacity
  })
  tl.from(element, {
    x: fromX, opacity: fromOpacity
  })
}

export const cardFadingWithText = (el: HTMLElement | null) => {
  const tl = gsap.timeline({
    defaults: {
      ease: 'ease', duration: 0.4
    }
  })
  tl.to(el, {
    color: 'transparent',
    zIndex: -2,
    opacity: 0,
    y: -50,
    ease: 'ease'
  }).set(el, {
    y: 0
  })
}

export const cardGoLeft = (el: HTMLElement | null, isFinal: boolean) => {
  const tl = gsap.timeline({
    defaults: {
      ease: 'ease', duration: 0.4
    }
  })
  tl.to(el, {
    x: 50, opacity: 0, zIndex: -1
  }).set(el, {
    x: -100, opacity: 0
  })
  if (!isFinal) {
    tl.to(el, {
      x: 0, opacity: 1
    }).set(el, {
      x: 0, opacity: 1, zIndex: 2
    })
  }
}
