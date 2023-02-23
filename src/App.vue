<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ROUTER_NAMES } from './router'
import vGradient from './components/common/vGradientText.vue'
const router = useRouter()
const goHomeByLogo = () => {
  router.push({
    name: ROUTER_NAMES.main.gamesList,
    params: {
      userId: window.localStorage.getItem('user')
    }
  })
}
</script>

<template>
  <nav>
    <div id="logo">
      <p
        id="circled-logo"
        @click.prevent="goHomeByLogo"
      >
        S J
      </p>
      <v-gradient>
        <p
          id="text-logo"
          @click.prevent="goHomeByLogo"
        >
          Games
        </p>
      </v-gradient>
    </div>
  </nav>
  <main>
    <router-view />
  </main>
</template>

<style lang="postcss">
@import './assets/vars.css';

body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  background: var(--color-black);
  margin: 0;
}

main {
  margin-bottom: 4rem;
}

#app {
  font-family: var(--font);
  text-align: center;
  color: var(--color-white);
  max-width: 100vw;
}

nav {
  display: block;

  #logo {
    display: flex;
    margin: 0.3em auto;
    font-size: 1rem;
    font-weight: bold;
    margin: 1rem;
    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 10vw;
      width: 30rem;
      height: 30rem;
      background: var(--color-violet-3);
      border-radius: 30% 80% 40% 20% / 40% 50% 60% 50%;
      z-index: -100;
      filter: blur(13px) opacity(0.4);
    }
    ::after {
      content: "";
      position: absolute;
      bottom: 5vh;
      right: 1vw;
      width: 30rem;
      height: 30rem;
      background: var(--color-violet);
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      z-index: -100;
      filter: blur(13px) opacity(0.8);
    }

    #circled-logo {
      cursor: pointer;
      background: var(--gradient);
      border-radius: 100%;
      padding: 0.4rem 0.5rem;
      color: white;
      margin: 0;
      letter-spacing: -1px;
    }

    #text-logo {
      margin: 0;
      cursor: pointer;
    }
  }
}
</style>
