<template>
  <div>
    <HeaderComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
import FooterComponent from "@/components/Footer";
import Api from "@/api/Api";
import { useRouter } from "vue-router";
export default {
  name: "AppComponent",

  components: {
    HeaderComponent,
    FooterComponent,
  },

  setup() {
    const router = useRouter();
    const access_token = localStorage.getItem("access_token");

    Api.defaults.headers.common["Authorization"] = "Bearer " + access_token;
    //get dat cart
    Api.get("/cart")
      .then((response) => {
        console.log(response + "testing");
        //commit mutation GET_CART
      })
      .catch((error) => {
        if (error.response.data.message === "Unauthenticated.") {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          if (access_token === null) {
            return router.push({ name: "login" });
          }
        } else {
          console.log(error.response.data.message);
        }
      });

    // Api.get("/user")
    //   .then((response) => {
    //     console.log(response + "testing");
    //     //commit mutation GET_CART
    //   })
    //   .catch((error) => {
    //     if (error.response.data.message === "Unauthenticated.") {
    //       localStorage.removeItem("token");
    //       localStorage.removeItem("user");
    //       if (access_token === null) {
    //         return router.push({ name: "login" });
    //       }
    //     } else {
    //       console.log(error.response.data.message);
    //     }
    //   });
  },
};
</script>