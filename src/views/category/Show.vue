<template>
  <div class="container-fluid mb-5 mt-4">
    <div class="row">
      <div class="col-md-3 mb-4">
        <Category />
        <!-- component Category -->
      </div>
      <div
        v-for="product in products"
        :key="product.id"
        class="col-md-3 col-12 mb-3"
      >
        <div class="card h-100 border-0 shadow rounded-md">
          <div class="card-img">
            <img
              :src="product.image"
              class="w-100"
              style="
                height: 15em;
                object-fit: cover;
                border-top-left-radius: 0.25rem;
                border-top-right-radius: 0.25rem;
              "
            />
          </div>
          <div class="card-body">
            <router-link
              :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="card-title font-weight-bold"
              style="font-size: 20px"
            >
              {{ product.title }}
            </router-link>

            <div class="discount mt-2" style="color: #999">
              <s>Rp. {{ moneyFormat(product.price) }}</s>
              <span
                style="background-color: darkorange"
                class="badge badge-pill badge-success text-white"
                >DISKON {{ product.discount }} %</span
              >
            </div>

            <div
              class="price font-weight-bold mt-3"
              style="color: #47b04b; font-size: 20px"
            >
              Rp. {{ moneyFormat(calculateDiscount(product)) }}
            </div>
            <router-link
              :to="{ name: 'detail_product', params: { slug: product.slug } }"
              class="btn btn-primary btn-md mt-3 btn-block shadow-md"
              >LIHAT PRODUK</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Category from "@/components/Category"; // <-- component Category

import { computed, onMounted, watch } from "vue"; // computed dan onMounted
import { useStore } from "vuex"; // store Vuex
import { useRoute } from "vue-router"; // vue router

export default {
  name: "CategoryShowComponent",
  components: {
    Category, // <-- register component Category
  },

  setup() {
    //store vuex
    const store = useStore();

    //vue route
    const route = useRoute();

    //onMounted akan menjalankan action "getProductInCategory" di module "category" Vuex
    onMounted(() => {
      store.dispatch("category/getProductInCategory", route.params.slug);
    });

    //computed properti digunakan untuk mendapatkan data products dari state "productInCategory" di module "category"
    const products = computed(() => {
      return store.getters["category/currentProduct"];
    });

    const activeCategory = computed(() => {
      return route.params.slug;
    });

    //watch route
    watch(
      () => route.params.slug,
      () => {
        store.dispatch("category/getProductInCategory", route.params.slug);
      },
      activeCategory
    );

    return {
      store,
      route,
      products,
      activeCategory,
    };
  },
};
</script>