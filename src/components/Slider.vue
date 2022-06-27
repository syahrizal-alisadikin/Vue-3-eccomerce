<template>
  <div id="carousel" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div v-if="sliders.length > 0">
        <div
          class="carousel-item"
          v-for="(slider, id) in sliders"
          :class="{ active: id == 0 }"
          :key="slider.id"
        >
          <img :src="slider.image" class="d-block w-100 rounded-lg" />
        </div>
      </div>
      <div v-else>
        <div
          class="card border-0 shadow-sm rounded-lg mb-3"
          v-for="loader in sliders_loader"
          :key="loader"
        >
          <div class="card-body pt-4">
            <ContentLoader />
          </div>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carousel"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carousel"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { ContentLoader } from "vue-content-loader";

export default {
  name: "SliderComponent",
  component: {
    ContentLoader,
  },
  setup() {
    //store vuex
    const store = useStore();
    const sliders_loader = ref(3);
    //onMounted akan menjalankan action "getSliders" di module "slider"
    onMounted(() => {
      store.dispatch("slider/getSliders");
    });

    //computed properti digunakan untuk mendapatkan data dari state "sliders" di module "slider"
    const sliders = computed(() => {
      return store.state.slider.sliders;
    });

    return {
      store,
      sliders,
      sliders_loader,
    };
  },
};
</script>