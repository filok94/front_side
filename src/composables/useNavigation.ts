import { ref } from 'vue'

const isNavcircleActive = ref(false)

export function useNavigation () {
  const changingBorders = () => {
    const arrayHelper = []

    for (let i = 0; i < 4; i++) {
      arrayHelper.push((Math.random() * (199 - 100) + 100).toFixed())
    }
    borders.value = arrayHelper.join('px ') + 'px'
  }

  const borders = ref(`
    ${(Math.random() * (199 - 100) + 100).toFixed()}px
    ${(Math.random() * (199 - 100) + 100).toFixed()}px
    ${(Math.random() * (199 - 100) + 100).toFixed()}px
    ${(Math.random() * (199 - 100) + 100).toFixed()}px
  `)

  const changeCircleActiveStatus = () => {
    changingBorders()
    isNavcircleActive.value = !isNavcircleActive.value
  }

  return {
    borders,
    isNavcircleActive,
    changeCircleActiveStatus
  }
}
