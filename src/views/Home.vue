<template>
  <div class="home">
    <Auth />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Auth from "../components/Auth.vue";

@Component({
  components: {
    Auth,
  },
})
export default class Home extends Vue {}
</script>
