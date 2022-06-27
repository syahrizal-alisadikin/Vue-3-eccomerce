<template>
  <div class="card border-0 shadow rounded">
    <div class="card-body">
      <h5 class="font-weight-bold">
        <i class="fa fa-shopping-bag"></i> KATEGORI
      </h5>
      <hr />

      <ul class="list-group" v-if="categories.length > 0">
        <router-link
          :to="{ name: 'detail_category', params: { slug: category.slug } }"
          v-for="category in categories"
          :key="category.id"
          class="
            list-group-item
            shadow-sm
            font-weight-bold
            text-decoration-none text-dark
          "
          :class="{ active: category.slug === $route.params.slug }"
        >
          <img :src="category.image" style="width: 35px" /> {{ category.name }}
        </router-link>

        <router-link
          :to="{ name: 'categories' }"
          class="
            list-group-item
            text-center
            active
            shadow-sm
            font-weight-bold
            text-decoration-none
          "
          >LIHAT KATEGORI LAINNYA <i class="fa fa-long-arrow-alt-right"></i
        ></router-link>
      </ul>
      <ul class="list-group" v-else>
        <router-link
          :to="{ name: 'categories' }"
          v-for="loader in categories_loader"
          :key="loader"
          class="
            list-group-item
            shadow-sm
            font-weight-bold
            text-decoration-none text-dark
          "
        >
          <ContentLoader />
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
//import content loader
import { ContentLoader } from "vue-content-loader";
import { computed, onMounted, watch, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router"; // vue router

export default {
  name: "CategoryComponent",

  components: {
    ContentLoader,
  },

  setup() {
    //store vuex
    const store = useStore();
    const route = useRoute();

    //onMounted akan menjalankan action getCategories di module category, sebelum computed di atas dijalankan
    onMounted(() => {
      store.dispatch("category/getCategories");
    });

    //computed properti digunakan untuk get data categories dari state di module category
    const categories = computed(() => {
      return store.state.category.categories;
    });

    //define state
    const categories_loader = ref(3);

    watch(
      () => route.params.slug,
      () => {
        route.params.slug;
      }
    );
    return {
      store,
      categories,
      categories_loader,
    };
  },
};
</script>