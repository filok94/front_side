<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import oneNavSmallCircle from './oneNavSmallCircle.vue'
import { useNavigation } from '../../composables/useNavigation'
import { CircleGridArea, HTMLRef, Tab } from '../../types/testsTypes.interface'
import { storeToRefs } from 'pinia'
import { useAvatarStore } from '../../stores/avatar_store'
import { IResponseGetMyAvatar } from '../../api/avatarController/avatar.api.interfaces'
import { getMyAvatar } from '../../api/avatarController/avatar.api'
import { useDraggableNavCircle } from '../../composables/useDraggableNavCircle'
import { useRoute } from 'vue-router'

const props = defineProps<{
  tabs: Tab[]
}>()

const route = useRoute()

const circleGridAreas: CircleGridArea[] = ['cb', 'lb',
                                           'lc', 'lt',
                                           'ct', 'rt',
                                           'rc', 'rb']

const emit = defineEmits<{(ev: 'tabChecked', tab: Tab | null): void,
                          (ev: 'logoutTabChecked'): void}>()
const tabUnderHover = computed(() => {
  if (hoveredZone.value != null) {
    return props.tabs[circleGridAreas.indexOf(hoveredZone.value as CircleGridArea)]
  }
  return null
})

const { avatarLink } = storeToRefs(useAvatarStore())
const avatarStore = useAvatarStore()

const { borders, isNavcircleActive } = useNavigation()

const wrapperForCircle: HTMLRef = ref(null)
const navCircle: HTMLRef = ref(null)

const { style, isDragging, hoveredZone } = useDraggableNavCircle(wrapperForCircle, navCircle, {
  onTabChecked: () => emit('tabChecked', tabUnderHover.value),
  onLoguoutTabChecked: () => emit('logoutTabChecked')
})

onMounted(async () => {
  const avatar = (await getMyAvatar()) as IResponseGetMyAvatar
  avatarStore.setAvatarLink(avatar.ref_link)
})
</script>

<template>
  <div
    ref="wrapperForCircle"
    class="nav-circle_wrapper"
  >
    <div
      ref="navCircle"
      class="nav-circle"
      style="touch-action: none;"
      :is-dragging="isDragging"
      :nav-circle-ative="isNavcircleActive"
      :style="style"
    >
      <img
        :src="avatarLink ?? ''"
        alt="navigation circle"
      >
      Navigate
    </div>
    <one-nav-small-circle
      v-for="(tab, i) in props.tabs"
      :key="tab.routeName"
      :is-hovered="circleGridAreas[i] === hoveredZone"
      :circle-style="'default'"
      :grid-area="circleGridAreas[i]"
      :is-active-page="route.name === tab.routeName"
    >
      {{ tab.name }}
    </one-nav-small-circle>
    <one-nav-small-circle
      :circle-style="'loguout'"
      :is-hovered="'rb' === hoveredZone"
      :grid-area="'rb'"
    >
      Logout
    </one-nav-small-circle>
  </div>
</template>
<style lang="postcss" scoped>
.nav-circle_wrapper {
  z-index: 5;
  position: fixed;

  bottom: 15vh;
  right: 10vw;

  display: grid;
  grid-template-areas:
    "lt ct rt"
    "lc cc rc"
    "lb cb rb";
  /* gap: .8rem; */
  grid-template-columns: repeat(3, 5rem);
  grid-template-rows: repeat(3, 5rem);
  justify-items: center;
  align-items: center;
}

.nav-circle {
  grid-area: cc;

  border-radius: v-bind("borders");
  cursor: pointer;
  z-index: 1;

  width: 5rem;
  height: 5rem;

  background: var(--color-violet-1);
  box-shadow: 0 10px 30px rgba(85, 39, 160, 0.486), 0 26px 26px rgba(0, 0, 0, 0.23);

  font-size: 0.5rem;
  color: var(--color-grey);
}

img {
  max-width: 80%;
  max-height: 80%;
}

.nav-circle[nav-circle-ative='true'] {
  /* transform: scale(110%); */
  background: var(--color-violet-3);
}
.nav-circle[is-dragging='true'] {
  position: fixed;
}
</style>
