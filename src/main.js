import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Datatables
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
const app = createApp(App)
//import router
import router from './router'
//import store vuex
import storeVuex from './storeVuex'
//gunakan router di vue js dengan plugin "use"
app.use(router)

//gunakan store di vue js dengan plugin "use"
app.use(storeVuex)

app.use(VueSweetalert2);
app.use(Vue3EasyDataTable);
//gunakan router di vue js dengan plugin "use"
// app.use(Swal);

//define mixins for global function
app.mixin({

    methods: {

        //money thousands
        moneyFormat(number) {
            let reverse = number.toString().split('').reverse().join(''),
            thousands   = reverse.match(/\d{1,3}/g)
            thousands   = thousands.join('.').split('').reverse().join('')
            return thousands
        },

        //calculate discount
        calculateDiscount(product) {
            return product.price - (product.price *(product.discount)/100)
        }

    }
})

app.mount('#app')
