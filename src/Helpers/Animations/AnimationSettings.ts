import gsap from 'gsap'

export const detailMoveFromAside = (imageElement: HTMLElement | null) => {
  const tl = gsap.timeline({
    defaults: {
      duration: 3, ease: 'none'
    }
  })
  tl.from(imageElement, {
    x: 500, rotate: 180, ease: 'ease'
  }).to(
    imageElement,
    {
      rotate: '-=60',
      duration: 7
    }
  )
}

export const detailRotating = (imageElement: HTMLElement | null) => {
  gsap.to(imageElement, {
    rotate: '-=60', ease: 'none', duration: 10
  })
}
