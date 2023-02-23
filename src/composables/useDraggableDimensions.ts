import { computed } from 'vue'
import { HTMLRef } from '../types/testsTypes.interface'

export function useDraggableDimensions (wrapperForCircle: HTMLRef, navCircle: HTMLRef) {
  // right-bottom
  const rbFromX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) + (Number(wrapperForCircle.value?.offsetWidth) * 2 / 3) -
        (Number(navCircle.value?.offsetWidth) / 2)
  })
  const rbToX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) + (Number(wrapperForCircle.value?.offsetWidth)) -
        (Number(navCircle.value?.offsetWidth))
  })
  const rbFromY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + (Number(wrapperForCircle.value?.offsetHeight) * 2 / 3) -
       (Number(navCircle.value?.offsetHeight) / 2)
  })
  const rbToY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + Number(wrapperForCircle.value?.offsetHeight) -
       Number(navCircle.value?.offsetHeight)
  })
  const rbZoneName = 'rb'

  // central-bottom
  const cbFromX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) + (Number(wrapperForCircle.value?.offsetWidth) / 3) -
       (Number(navCircle.value?.offsetWidth) / 2)
  })
  const cbToX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) + (Number(wrapperForCircle.value?.offsetWidth) * 2 / 3) -
       (Number(navCircle.value?.offsetWidth) / 2)
  })
  const cbFromY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + (Number(wrapperForCircle.value?.offsetHeight) * 2 / 3) -
       (Number(navCircle.value?.offsetHeight) / 2)
  })
  const cbToY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + Number(wrapperForCircle.value?.offsetHeight) -
       Number(navCircle.value?.offsetHeight)
  })
  const cbZoneName = 'cb'

  // left-bottom
  const lbFromX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) - (Number(navCircle.value?.offsetWidth))
  })
  const lbToX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) + (Number(wrapperForCircle.value?.offsetWidth) / 3) -
       (Number(navCircle.value?.offsetWidth) / 2)
  })
  const lbFromY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + (Number(wrapperForCircle.value?.offsetHeight) * 2 / 3) -
       (Number(navCircle.value?.offsetHeight) / 2)
  })
  const lbToY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + Number(wrapperForCircle.value?.offsetHeight) -
       Number(navCircle.value?.offsetHeight)
  })
  const lbZoneName = 'lb'

  // left-center
  const lcFromX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) - (Number(navCircle.value?.offsetWidth))
  })
  const lcToX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) + (Number(wrapperForCircle.value?.offsetWidth) / 3) -
       (Number(navCircle.value?.offsetWidth) / 2)
  })
  const lcFromY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + (Number(wrapperForCircle.value?.offsetHeight) / 3) -
       (Number(navCircle.value?.offsetHeight) / 2)
  })
  const lcToY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + (Number(wrapperForCircle.value?.offsetHeight) * 2 / 3)
  })
  const lcZoneName = 'lc'

  // left-top
  const ltFromX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) - (Number(navCircle.value?.offsetWidth))
  })
  const ltToX = computed(() => {
    return Number(wrapperForCircle.value?.offsetLeft) + (Number(wrapperForCircle.value?.offsetWidth) / 3) -
         (Number(navCircle.value?.offsetWidth) / 2)
  })
  const ltFromY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) - (Number(navCircle.value?.offsetHeight))
  })
  const ltToY = computed(() => {
    return Number(wrapperForCircle.value?.offsetTop) + (Number(wrapperForCircle.value?.offsetHeight) / 3)
  })
  const ltZoneName = 'lt'

  return {
    cbFromX,
    cbToX,
    cbFromY,
    cbToY,
    cbZoneName,
    lbFromX,
    lbToX,
    lbFromY,
    lbToY,
    lbZoneName,
    lcFromX,
    lcToX,
    lcFromY,
    lcToY,
    lcZoneName,
    ltFromX,
    ltToX,
    ltFromY,
    ltToY,
    ltZoneName,
    rbFromX,
    rbToX,
    rbFromY,
    rbToY,
    rbZoneName
  }
}
