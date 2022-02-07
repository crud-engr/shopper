<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center" v-if="isLoading">
            <PageSpinner />
        </div>

        <div class="row">
            <div
                class="col-sm-12 col-md-3 mb-4"
                v-for="product in products"
                :key="product.name"
            >
                <div class="card shadow-sm" style="width: 18rem">
                    <router-link :to="`/product/${product._id}`">
                        <img
                            :src="product.image"
                            class="card-img-top"
                            :alt="`${product.name} Image`"
                            width="300"
                            height="300"
                        />
                    </router-link>
                    <div class="card-body card-content">
                        <router-link
                            :to="`/product/${product._id}`"
                            class="nav-link product-name"
                        >
                            <p class="card-text">
                                {{ product.name.toUpperCase() }}
                            </p></router-link
                        >
                    </div>
                    <div class="card-body card-content">
                        <p class="card-text">
                            {{
                                product.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })
                            }}
                            ({{ product.quantity_in_stock }}
                            in stock)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            products: [],
            isLoading: false,
        };
    },

    methods: {
        async loadProducts() {
            this.isLoading = true;
            try {
                setTimeout(async () => {
                    let result = await fetch(
                        'http://localhost:3100/api/products/'
                    );
                    if (!result.ok) alert('An error occured');
                    let response = await result.json();
                    let data = response.data.product;
                    this.products = data;
                    this.isLoading = false;
                }, 1000);
            } catch (err) {
                alert(err.message);
            }
        },
    },

    mounted() {
        this.loadProducts();
    },
};
</script>

<style scoped>
.card-content {
    padding: 7px;
    text-align: center;
    font-size: 14px;
}

.product-name {
    color: #2c3e50;
}
</style>
