import { isRef } from 'vue'
import gsap from 'gsap'
import { HTMLRef } from '../../types/testsTypes.interface'

type EASE = 'ease' | 'elastic' | 'bounce' | 'back' | 'power4';
type DESTINATIONS_FROM =
  | 'fromTop'
  | 'fromBottom'
  | 'fromLeft'
  | 'fromRight'
  | 'fromTopRight'
  | 'fromTopLeft'
  | 'fromBottomLeft'
  | 'fromBottomRight';

type DESTINATIONS_TO =
  | 'toTop'
  | 'toBottom'
  | 'toLeft'
  | 'toRight'
  | 'toTopRight'
  | 'toTopLeft'
  | 'toBottomLeft'
  | 'toBottomRight';

export const ANIMATIONS_RANGE = {
  LOWEST: 10,
  VERY_LOW: 70,
  LOW: 100,
  MEDIUM: 150,
  UPPER_MEDIUM: 200,
  UPPER: 250,
  HIGH: 300
} as const
// eslint-disable-next-line no-redeclare
export type ANIMATIONS_RANGE =
  typeof ANIMATIONS_RANGE[keyof typeof ANIMATIONS_RANGE];

export function useAnimation () {
  const destinationAndRange = (
    destination: DESTINATIONS_FROM | DESTINATIONS_TO,
    range: ANIMATIONS_RANGE
  ) => {
    let [x, y] = [0, 0]

    switch (destination) {
      case 'fromBottom' || 'toBottom': {
        y = range
        break
      }
      case 'fromLeft' || 'toLeft': {
        x = -range
        break
      }
      case 'fromRight' || 'toRight': {
        x = range
        break
      }
      case 'fromTop' || 'toTop': {
        y = -range
        break
      }
      case 'fromTopRight' || 'toTopRight': {
        x = range
        y = -range
        break
      }
      case 'fromTopLeft' || 'toTopLeft': {
        x = -range
        y = -range
        break
      }
    }
    return {
      x, y
    }
  }

  const animateFrom = (
    element: HTMLRef | HTMLElement,
    destination: DESTINATIONS_FROM,
    range: ANIMATIONS_RANGE
  ) => {
    const { x, y } = destinationAndRange(destination, range)
    const el = isRef(element) ? element.value : element
    gsap.set(el, {
      y: 0, x: 0, opacity: 1
    })
    gsap.from(el, {
      opacity: 0, y, x, ease: 'ease'
    })
  }

  const animateTo = (
    element: HTMLRef | HTMLElement,
    destination: DESTINATIONS_TO,
    range: ANIMATIONS_RANGE
  ) => {
    const { x, y } = destinationAndRange(destination, range)
    const el = isRef(element) ? element.value : element
    gsap.to(el, {
      opacity: 0, y, x, ease: 'ease'
    })
    gsap.set(el, {
      y: 0, x: 0
    })
  }
  return {
    animateFrom,
    animateTo
  }
}
export class Animations {
  static setScaleToDefault = (element: HTMLElement | HTMLRef) => {
    const el = isRef(element) ? element.value : element
    gsap.set(el, {
      scale: 1
    })
  }

  static changeBorderAndScale = (
    border: string,
    scale: number,
    element: HTMLElement | HTMLRef,
    ease: EASE
  ) => {
    const el = isRef(element) ? element.value : element
    gsap.to(el, {
      borderRadius: border, scale, ease
    })
  }
}

export const GOING_ASIDE = {
  left: 'left',
  right: 'right'
} as const

// eslint-disable-next-line no-redeclare
export type GOING_ASIDE = typeof GOING_ASIDE[keyof typeof GOING_ASIDE];

export const AnimationCardGoingAside = async (
  side: GOING_ASIDE,
  duration: number,
  element: HTMLElement | HTMLRef
) => {
  const el = isRef(element) ? element.value : element
  const dividedDuration = duration / 1000
  switch (side) {
    case GOING_ASIDE.right: {
      const tlRight = gsap.timeline({
        defaults: {
          duration: dividedDuration, ease: 'power2.inOut'
        }
      })
      tlRight
        .to(el, {
          x: 30, y: 5, opacity: 0
        })
        .to(el, {
          x: -30, y: 5, opacity: 0
        })
        .to(el, {
          opacity: 1, x: 0, y: 0
        })
        .set(el, {
          opacity: 1, x: 0, y: 0
        })
      break
    }
    case GOING_ASIDE.left: {
      const tlLeft = gsap.timeline({
        defaults: {
          duration: dividedDuration, ease: 'power2.inOut'
        }
      })
      tlLeft
        .to(el, {
          x: -30, y: 5, opacity: 0
        })
        .to(el, {
          x: 30, y: 5, opacity: 0
        })
        .to(el, {
          opacity: 1, x: 0, y: 0
        })
        .set(el, {
          opacity: 1, x: 0, y: 0
        })
      break
    }
  }
}

export const AnimationShakingElement = (element: HTMLElement | HTMLRef) => {
  const el = isRef(element) ? element.value : element
  const shakingTimeLine = gsap.timeline({
    defaults: {
      duration: 0.1
    }
  })
  shakingTimeLine
    .to(el, {
      x: 5
    })
    .to(el, {
      x: -5
    })
    .to(el, {
      x: 5
    })
    .to(el, {
      x: -5
    })
    .to(el, {
      x: 5
    })
    .to(el, {
      x: -5
    })
    .set(el, {
      x: 0
    })
}

export const circlesMovement = (
  circle: number,
  arrayOfCircles: never[] | HTMLElement[]
) => {
  const timeline = gsap.timeline({
    repeat: -1,
    delay: circle / 5,
    defaults: {
      duration: 0.3, ease: 'circ'
    }
  })
  timeline
    .to(arrayOfCircles[circle], {
      x: -50, background: '#005ef1'
    })
    .to(arrayOfCircles[circle], {
      y: 50, background: '#6025c3'
    })
    .to(arrayOfCircles[circle], {
      x: 0, background: '#005ef1'
    })
    .to(arrayOfCircles[circle], {
      y: 0, background: '#6025c3'
    })
}

export const hoverEffectOnText = (element: HTMLRef, color: string) => {
  gsap.to(element.value, {
    color, ease: 'back'
  })
}

export const hoverTransformScale = (
  element: HTMLRef,
  scalePercentage: number
) => {
  gsap.to(element.value, {
    scale: scalePercentage / 100, ease: 'back'
  })
}
