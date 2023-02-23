import { useDraggable } from '@vueuse/core'
import { computed, ComputedRef } from 'vue'
import { HTMLRef, CircleZone } from '../types/testsTypes.interface'
import { useNavigation } from './useNavigation'
import { useDraggableDimensions } from './useDraggableDimensions'

const LOGUOT_TAB = 'rb'

export function useDraggableNavCircle (
  wrapperForCircle: HTMLRef,
  navCircle: HTMLRef,
  actions: {
    onTabChecked: () => void,
    onLoguoutTabChecked: ()=> void
  }
) {
  const {
    cbFromX, cbFromY, cbToX, cbToY, cbZoneName,
    lbFromX, lbFromY, lbToX, lbToY, lbZoneName,
    lcFromX, lcFromY, lcToX, lcToY, lcZoneName,
    ltFromX, ltFromY, ltToX, ltToY, ltZoneName,
    rbFromX, rbFromY, rbToX, rbToY, rbZoneName
  } = useDraggableDimensions(wrapperForCircle, navCircle)

  const hoveredZone: ComputedRef<string | null> = computed(() => {
    for (const zone of [new CircleZone(cbFromX, cbToX, cbFromY, cbToY, cbZoneName),
                        new CircleZone(lbFromX, lbToX, lbFromY, lbToY, lbZoneName),
                        new CircleZone(lcFromX, lcToX, lcFromY, lcToY, lcZoneName),
                        new CircleZone(ltFromX, ltToX, ltFromY, ltToY, ltZoneName),
                        new CircleZone(rbFromX, rbToX, rbFromY, rbToY, rbZoneName)]) {
      if (x.value > zone.fromX.value &&
          x.value <= zone.toX.value &&
          y.value > zone.fromY.value &&
          y.value <= zone.toY.value
      ) {
        return zone.zoneName
      }
    }
    return null
  })
  const { changeCircleActiveStatus } = useNavigation()
  const { style, x, y, isDragging } = useDraggable(navCircle, {
    preventDefault: true,
    onMove () {
      const rightEdge = Number(wrapperForCircle.value?.offsetLeft) +
                        Number(wrapperForCircle.value?.offsetWidth) -
                        Number(navCircle.value?.offsetWidth)

      const leftEdge = Number(wrapperForCircle.value?.offsetLeft)

      const topEdge = Number(wrapperForCircle.value?.offsetTop)

      const bottomEdge = Number(wrapperForCircle.value?.offsetTop) +
                         Number(wrapperForCircle.value?.offsetHeight) -
                         Number(navCircle.value?.offsetHeight)

      if (x.value < leftEdge) {
        x.value = leftEdge
      }

      if (x.value > rightEdge) {
        x.value = rightEdge
      }

      if (y.value > bottomEdge) {
        y.value = bottomEdge
      }

      if (y.value < topEdge) {
        y.value = topEdge
      }
    },

    onStart () {
      y.value = Number(wrapperForCircle.value?.offsetTop) +
       (Number(wrapperForCircle.value?.offsetHeight) / 2) -
        Number(navCircle.value?.offsetHeight) / 2

      x.value = Number(wrapperForCircle.value?.offsetLeft) +
       (Number(wrapperForCircle.value?.offsetWidth) / 2) -
        Number(navCircle.value?.offsetWidth) / 2

      changeCircleActiveStatus()
    },
    onEnd () {
      if (hoveredZone.value !== LOGUOT_TAB) {
        actions.onTabChecked()
      } else {
        actions.onLoguoutTabChecked()
      }
      changeCircleActiveStatus()
    }
  })

  return {
    style,
    isDragging,
    hoveredZone
  }
}
