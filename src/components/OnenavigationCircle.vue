<script setup lang="ts">
import { ref, onMounted, watch, Ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useDraggable } from "@vueuse/core";

import { Animations,
	ANIMATIONS_RANGE,
	useAnimation } from "../Helpers/Animations/CommonAnimations";
import { useSignOut } from "../api/auth/useSignOut";
import { getMyAvatar } from "../api/avatarController/avatar.api";
import { useAvatarStore } from "../stores/avatar_store";
import { HTMLRef, Tab } from "../types/testsTypes.interface";
import { IResponseGetMyAvatar } from "../api/avatarController/avatar.api.interfaces";

let props = defineProps<{
	tabs: Tab[];
}>();

const allTabsToShow = computed(() => props.tabs.concat([ new Tab({
	id: 100, name: "Logout" 
}) ]));
//avatar in the circle
let avatarImage = computed(() =>
	avatarStore.avatarLink ? avatarStore.avatarLink : ""
);
//default borders
let stringifiedBordersOfMainCircle = ref("76px 53px 45px 92px");
let stringifiedBordersOfActiveTarget = ref("63px 78% 92% 45%");
//change borders
let changingBorders = (stringToChange: Ref<string>) => {
	let arrayHelper = [];
	for (let i = 0; i < 4; i++) {
		arrayHelper.push((Math.random() * (199 - 100) + 100).toFixed());
	}
	stringToChange.value = arrayHelper.join("px ") + "px";
};

//activate circle navigation and eventlisteners
const isCirclesActive = ref(false);
const circles = ref<HTMLElement[]>([]);
let navCircle: HTMLRef = ref(null);
let logoutTabRef: HTMLRef = ref(null);
let wrapperForCircle = ref(null);
const { style } = useDraggable(wrapperForCircle, {
	initialValue: {
		x: window.innerWidth / 1.5, y: window.innerHeight / 1.5 
	},
	preventDefault: true,
});

const { animateFrom } = useAnimation();

let activateNavCircle = () => {
	if (
		!isCirclesActive.value &&
		navCircle.value?.offsetHeight &&
		navCircle.value?.offsetWidth
	) {
		isCirclesActive.value = true;
		circles.value.forEach((e, index) => {
			if (e != null && navCircle.value) {
				index === 0 ? animateFrom(e, "fromTop", ANIMATIONS_RANGE.LOW) : null;
				index === 1
					? animateFrom(e, "fromTopRight", ANIMATIONS_RANGE.LOW)
					: null;
				index === 2 ? animateFrom(e, "fromRight", ANIMATIONS_RANGE.LOW) : null;
				index === 3
					? animateFrom(e, "fromBottomRight", ANIMATIONS_RANGE.LOW)
					: null;
				index === 4 ? animateFrom(e, "fromBottom", ANIMATIONS_RANGE.LOW) : null;
				index === 5
					? animateFrom(e, "fromBottomLeft", ANIMATIONS_RANGE.LOW)
					: null;
				index === 6 ? animateFrom(e, "fromLeft", ANIMATIONS_RANGE.LOW) : null;
			}
		});
		animateFrom(logoutTabRef, "fromTopLeft", ANIMATIONS_RANGE.LOW);
	}
	else {
		isCirclesActive.value = false;
	}
	changingBorders(stringifiedBordersOfMainCircle);
};

//controll opened tabs
// eslint-disable-next-line no-unused-vars
let emit = defineEmits<{ (e: "activation", target: number): void }>();
const activateByTab = (target: number) => {
	if (target === 100) {
		signOut();
	}
	activeTabIs.value = target;
	emit("activation", target);
};
const activeTabIs = ref(0);
let button = (event: Event) => {
	let indexOfElem = Array.from(
		document.querySelectorAll(".target-circle")
	).indexOf(event.target as HTMLElement);
	emit("activation", indexOfElem);
	activeTabIs.value = indexOfElem;
	changingBorders(stringifiedBordersOfActiveTarget);
	for (let i of circles.value) {
		Animations.setScaleToDefault(i);
	}
	Animations.changeBorderAndScale(
		stringifiedBordersOfActiveTarget.value,
		1.3,
		circles.value[activeTabIs.value],
		"back"
	);
};
let keyControls = (e: KeyboardEvent) => {
	if (e.code == "ArrowLeft") {
		if (activeTabIs.value == 0) {
			activeTabIs.value = props.tabs.length - 1;
		}
		else {
			activeTabIs.value--;
		}
	}
	else if (e.code == "ArrowRight") {
		if (activeTabIs.value == props.tabs.length - 1) {
			activeTabIs.value = 0;
		}
		else {
			activeTabIs.value++;
		}
	}
	changingBorders(stringifiedBordersOfActiveTarget);
	emit("activation", activeTabIs.value);
};

//signOut method
const { signOut } = useSignOut();
let signOutFromNavCircle = () => signOut();

//main-user-actions tabs
const logoutTab = {
	name: "Logout", action: () => signOutFromNavCircle() 
};

//deactivate circle navigation and watch the status
onClickOutside(wrapperForCircle, () => (isCirclesActive.value = false));

watch(
	() => isCirclesActive.value,
	(newValue) => {
		if (newValue) {
			document.addEventListener("keydown", keyControls);
		}
		else {
			document.removeEventListener("keydown", keyControls);
		}
	}
);

const avatarStore = useAvatarStore();

onMounted(async () => {
	const avatar = (await getMyAvatar()) as IResponseGetMyAvatar;
	avatarStore.setAvatarLink(avatar.ref_link);

	setInterval(() => changingBorders(stringifiedBordersOfMainCircle), 20000);
});
</script>

<template>
  <div class="navbar-screen">
    <div
      v-for="(tab, i) of allTabsToShow"
      :key="i"
      class="navbar-screen_item"
      :class="{'navbar-screen_item_active': i == activeTabIs,
               'navbar-screen_item_logout': tab.id === 100}"
      @click.prevent="activateByTab(tab.id)"
    >
      {{ tab.name }}
    </div>
  </div>
  <div
    ref="wrapperForCircle"
    class="wrapper-for-circle"
    style="position: fixed; touch-action: none"
    :style="style"
  >
    <div
      ref="navCircle"
      class="nav-circle"
      :class="{ 'nav-circle-is-active': isCirclesActive }"
      @click.prevent.stop="activateNavCircle"
    >
      <img
        :src="avatarImage"
        alt="navigation_circle"
      >
      <p>Navigate</p>
    </div>
    <div
      v-for="(tab, i) of props.tabs"
      v-show="isCirclesActive"
      :key="i"
      :ref="
        (el: Element | any) => {
          if (el) circles[i] = el;
        }
      "
      class="target-circle target-circle_action"
      :class="{ 'active-target': activeTabIs == i }"
      @click.self.stop.prevent="button($event)"
    >
      {{ tab.name }}
    </div>
    <div
      v-show="isCirclesActive"
      ref="logoutTabRef"
      class="logout-target-circle target-circle"
      @click.self.stop.prevent="logoutTab.action"
    >
      {{ logoutTab.name }}
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import '../assets/vars.css';

@media (--medium-screen) {
	.navbar-screen {
		display: none;
	}
}
@media (--upper-medium-screen) {
	
	.nav-circle {
		display: none;
	}
	.navbar-screen {
		display: flex;
		gap: 1rem;
		margin: 1rem;
	}
	.navbar-screen_item {
		background: var(--color-violet);
		border-radius: var(--border-prime);
		padding:1rem;
		transition: .3s ease;
		cursor: pointer;
		color: var(--color-grey);
		&_active {
			background: var(--color-violet-3);
			transform: scale(105%);
			color: white;
		}
		&:hover {
			opacity:.9;
		}
		&_logout {
			background: var(--gradient-red);
		}
	}
}
.wrapper-for-circle {
	z-index: 5;
	display: grid;
	grid-template-areas:
		"lt ct rt"
		"lc cc rc"
		"lb cb rb";
	position: relative;

	.target-circle_action {
		z-index: 0;
	
		&:nth-of-type(2) {
			grid-area: cb;
		}
		&:nth-of-type(3) {
			grid-area: lb;
		}
		&:nth-of-type(4) {
			grid-area: lc;
		}
		&:nth-of-type(5) {
			grid-area: lt;
		}
		&:nth-of-type(6) {
			grid-area: ct;
		}
		&:nth-of-type(7) {
			grid-area: rt;
		}
		&:nth-of-type(8) {
			grid-area: rc;
		}
	}
	grid-template-columns: 5rem;
	grid-gap: 1rem;
}

.nav-circle {
	border-radius: v-bind("stringifiedBordersOfMainCircle");
	width: 3rem;
	height: 3rem;
	padding: 1rem;
	background: var(--color-violet-1);
	box-shadow: 0 10px 30px rgba(85, 39, 160, 0.486),
		0 26px 26px rgba(0, 0, 0, 0.23);
	cursor: pointer;
	transition: 0.3s ease;
	grid-area: cc;
	z-index: 1;

	img {
		max-width: 80%;
		max-height: 80%;
	}

	p {
		font-size: 0.5rem;
		margin: 0;
		color: var(--color-grey);
	}

	&-is-active {
		transform: scale(110%);
		background: var(--color-violet-3);
	}
}

.target-circle {
	background: var(--color-violet);
	font-size: 0.8rem;
	line-height: 4rem;
	width: 4rem;
	height: 4rem;
	border-radius: 100%;
	color: var(--color-grey);
	cursor: pointer;
	box-shadow: var(--shadow-black);
}

.logout-target-circle {
	background: var(--gradient-red);
	grid-area: rb;
}	

.active-target {
	background: var(--color-violet-3) !important;
}
</style>
