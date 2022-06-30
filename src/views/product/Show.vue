<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-md-4">
        <div class="card border-0 rounded shadow">
          <div class="card-body p-2">
            <img :src="product.image" class="w-100 border" />
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px">
              {{ product.title }}
            </label>
            <hr />
            <div
              class="price-product"
              id="price-product"
              style="font-size: 1.35rem"
            >
              <span class="font-weight-bold mr-4" style="color: green"
                >Rp. {{ calculateDiscount(product) }}</span
              >
              <s class="font-weight-bold" style="text-decoration-color: red"
                >Rp. {{ product.price }}</s
              >
            </div>
            <table class="table table-borderless mt-3">
              <tbody>
                <tr>
                  <td class="font-weight-bold">DISKON</td>
                  <td>:</td>
                  <td>
                    <button
                      class="btn btn-sm"
                      style="color: #ff2f00; border-color: #ff2f00"
                    >
                      DISKON {{ product.discount }} %
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="font-weight-bold">BERAT</td>
                  <td>:</td>
                  <td>
                    <span
                      class="badge badge-pill badge-success"
                      style="
                        font-size: 14px;
                        border-radius: 0.3rem;
                        padding: 0.25em 0.5em 0.2em;
                      "
                    >
                      {{ product.weight }} gram</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              @click.prevent="
                addToCart(
                  product.id,
                  calculateDiscount(product),
                  product.weight
                )
              "
              class="btn btn-primary btn-lg btn-block"
            >
              <i class="fa fa-shopping-cart"></i> TAMBAH KE KERANJANG
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px"
              >KETERANGAN</label
            >
            <hr />
            <div v-html="product.content"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <label class="font-weight-bold" style="font-size: 20px"
              >Product Lainnya</label
            >
            <hr />

            <div class="row">
              <div
                v-for="product in productAll"
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
                      :to="{
                        name: 'detail_product',
                        params: { slug: product.slug },
                      }"
                      class="card-title font-weight-bold"
                      style="font-size: 20px"
                    >
                      {{
                        product.title.length > 15
                          ? product.title.substring(0, 15) + "..."
                          : product.title
                      }}
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
                      :to="{
                        name: 'detail_product',
                        params: { slug: product.slug },
                      }"
                      class="btn btn-primary btn-md mt-3 btn-block shadow-md"
                      >LIHAT PRODUK</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from "vue"; // computed dan onMounted
import { useStore } from "vuex"; // store Vuex
import { useRoute, useRouter } from "vue-router"; // vue router

import Swal from "sweetalert2";
export default {
  name: "ProductShowComponent",

  setup() {
    //vue route
    const route = useRoute();

    //vue router
    const router = useRouter();

    //store vuex
    const store = useStore();

    //onMounted akan menjalankan action "getDetailProduct" di module "product" Vuex
    onMounted(() => {
      store.dispatch("product/getDetailProduct", route.params.slug);
      store.dispatch("product/getProducts");
    });

    //computed properti digunakan untuk mendapatkan data detail product dari state "product" di module "product" Vuex
    const product = computed(() => {
      return store.state.product.product;
    });

    const productAll = computed(() => {
      return store.state.product.products;
    });

    /**
     * function addToCart
     */
    function addToCart(product_id, price, weight) {
      //check token terlebih dahulu
      const token = store.state.auth.token;

      if (!token) {
        return router.push({ name: "login" });
      }

      //panggil action addToCart di module cart
      store.dispatch("cart/addToCart", {
        product_id: product_id,
        price: price,
        weight: weight,
        quantity: 1,
      });
      router.push({ name: "cart" });
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        icon: "success",
        title: "Success",
        text: "Data Berhasil keranjang!",
      });
    }

    watch(
      () => route.params.slug,
      () => {
        store.dispatch("product/getDetailProduct", route.params.slug);
      }
    );

    return {
      route,
      router,
      store,
      product,
      productAll,
      addToCart,
    };
  },
};
</script>