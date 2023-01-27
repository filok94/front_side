<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref, watch } from "vue";
import vImagesCollection from "../components/common/vImagesCollection.vue";
import vButton from "../components/common/vButton.vue";
import vBasePage from "./vBasePage.vue";
import { computed } from "vue";
import { ANIMATIONS_RANGE,
	useAnimation } from "../Helpers/Animations/CommonAnimations";
import { saveAvatar } from "../api/avatarController/avatar.api";
import { useRouter } from "vue-router";
import { ROUTER_NAMES } from "../router";
import { useAvatarStore } from "../stores/avatar_store";

const avatarStore = useAvatarStore();
const router = useRouter();
onMounted(async () => {
	await avatarStore.getAllAvatarsList();
});

const { allAvatarsList, options, activeAvatarLink } = storeToRefs(
	useAvatarStore()
);

const avatarOptionsId = ref<null | string>(null);
let isRequestActive = ref(false);
const clickImage = async (e: string) => {
	isRequestActive.value = true;
	avatarOptionsId.value = e;
	await avatarStore.getAvatarOptions({
		avatarId: e 
	});
	isRequestActive.value = false;
};

const propsQueryString = computed(() => {
	let allPropsString = "";
	if (options.value) {
		for (let prop of options.value) {
			const index = options.value.indexOf(prop);
			let propString = `${ prop.prop_name }=${
				prop.values[chosenOptions[index]]
			}&`;
			if (prop.probability) {
				propString += `${ prop.probability }=100&`;
			}
			allPropsString += propString;
		}
	}
	return allPropsString.slice(0, -1);
});
let chosenOptions = reactive<number[]>([]);

const nextVariant = (params: { index: number; up: boolean }) => {
	if (options.value) {
		if (params.up) {
			if (
				chosenOptions[params.index] ===
        options.value[params.index].values.length - 1
			) {
				chosenOptions[params.index] = 0;
			}
			else {
				chosenOptions[params.index]++;
			}
		}
		else {
			if (chosenOptions[params.index] === 0) {
				chosenOptions[params.index] =
          options.value[params.index].values.length - 1;
			}
			else {
				chosenOptions[params.index]--;
			}
		}
	}
};

const saveImageAndGoMainPage = async () => {
	if (avatarOptionsId.value) {
		await saveAvatar({
			avatar: avatarOptionsId.value,
			full_link: activeAvatarLink.value + propsQueryString.value,
		});
	}
	router.push({
		name: ROUTER_NAMES.main,
		params: {
			userId: window.localStorage.getItem("user") 
		},
	});
};

watch(options, (nV) => {
	chosenOptions.splice(0, chosenOptions.length);
	nV?.forEach(() => chosenOptions.push(0));
});

const { animateFrom } = useAnimation();
const imageDimension = ref(400);
const imageFromTopAnimation = (e: HTMLElement) =>
	animateFrom(e, "fromTop", ANIMATIONS_RANGE.HIGH);
const minimizeImage = () => {
	imageDimension.value != 100
		? (imageDimension.value = 100)
		: (imageDimension.value = 400);
};
</script>
<template>
  <vBasePage :title="'Avatars'">
    <section class="avatars avatars__contrainer">
      <vImagesCollection
        :src-array="allAvatarsList"
        @click-image="clickImage"
      />
    </section>
    <transition @enter="imageFromTopAnimation">
      <div
        v-if="avatarOptionsId"
        class="avatars_computed-image"
      >
        <div class="avatars_computed-image_top">
          <vButton
            v-if="imageDimension == 400"
            :purpose="'white'"
            :size="'small'"
            @click.prevent="saveImageAndGoMainPage"
          >
            Сохранить
          </vButton>
          <div
            class="image_close"
            @click="minimizeImage"
          >
            {{ imageDimension == 400 ? "—" : "+" }}
          </div>
        </div>
        <img
          :src="activeAvatarLink + propsQueryString"
          alt=""
          :width="imageDimension"
        >
      </div>
    </transition>
    <section
      v-if="activeAvatarLink"
      class="avatars avatars__options"
    >
      <div
        v-if="!isRequestActive"
        class="avatars__options_container"
      >
        <div
          v-for="(option, index) in options"
          :key="index"
          class="avatars__options__item"
        >
          <h2>
            {{ option.prop_name }}
          </h2>
          <div class="avatars__options__item_chooser">
            <button
              class="button_left"
              @click.prevent="nextVariant({ index: index, up: false })"
            >
              &lt;
            </button>
            <p>{{ chosenOptions[index] }}/{{ option.values.length - 1 }}</p>
            <button
              class="button_right"
              @click.prevent="nextVariant({ index: index, up: true })"
            >
              >
            </button>
          </div>
        </div>
      </div>
      <div
        v-else
        class="avatars__options_container"
      >
        <div
          v-for="_ in 10"
          :key="_"
          class="avatars__options__item avatars__options__item_skeleton"
        />
      </div>
    </section>
  </vBasePage>
</template>
<style lang="postcss">
.avatars {
  &_computed-image {
    &_top {
      content: " ";
      background: var(--color-grey);
      width: calc(100% - (1rem * 2));
      height: 3rem;
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      align-items: flex-start;
      font-size: 1.5rem;
      .image_close {
        cursor: pointer;
        &:hover {
          color: var(--color-dark-grey);
        }
        &:active {
          color: var(--color-black);
        }
      }
    }
    border: 0.3rem solid var(--color-grey);
    position: fixed;
    top: 0;
    right: 1rem;
    backdrop-filter: blur(3rem);
    border-radius: 0 0 var(--border-prime) var(--border-prime);
  }
  &__options {
    &_container {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin: 1rem 0;
      justify-content: space-evenly;
    }
    &__item {
      background: var(--gradient);
      border-radius: var(--border-prime);
      flex-basis: 12rem;
      flex-shrink: 2;
      display: flex;
      flex-direction: column;
      justify-content: start;
      font-family: var(--neon-font);
      box-shadow: var(--shadow-black);

      h2 {
        margin: 1rem;
        font-size: 1rem;
      }
      &_chooser {
        background: var(--color-violet);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        border-radius: 0 0 var(--border-prime) var(--border-prime);

        button {
          cursor: pointer;
          height: 100%;
          margin: 0;
          width: 20%;

          border: none;
          background: var(--color-violet-1);

          &:active {
            box-shadow: 0 0 7px 0.1px var(--color-black) inset;
            background: var(--color-violet);
          }
        }
        .button_right {
          border-radius: 0 0 var(--border-prime) 0;
        }
        .button_left {
          border-radius: 0 0 0 var(--border-prime);
        }
      }
      &_skeleton {
        height: 6rem;
        width: 12rem;
        background: var(--gradient-skeleton);
        animation: skeleton-movement 6s infinite linear;
      }
    }
  }
}
@keyframes skeleton-movement {
  0% {
    background-position: -100px;
  }

  40%,
  100% {
    background-position: 140px;
  }
}
</style>
