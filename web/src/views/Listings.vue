<template>
    <div class="container-fluid">
        <div class="d-flex justify-content-center" v-if="isLoading">
            <PageSpinner />
        </div>
        <div class="row" v-if="!isLoading">
            <table class="table table-striped">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">s/n</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Date Added</th>
                        <th scope="col">Expiry Date</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity Left</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody v-for="(product, index) in products" :key="product.name">
                    <tr>
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ product.name.toUpperCase() }}</td>
                        <td>
                            {{
                                new Date(`${product.createdAt}`).toLocaleString(
                                    'en-US',
                                    {
                                        timeZone: 'UTC',
                                    }
                                )
                            }}
                        </td>
                        <td>{{ product.expiry_date }}</td>
                        <td>
                            {{
                                product.price.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                })
                            }}
                        </td>
                        <td>
                            {{
                                product.quantity_in_stock.toLocaleString(
                                    'en-US'
                                )
                            }}
                        </td>
                        <td>
                            <div class="d-inline-block">
                                <span class="p-1">
                                    <router-link
                                        :to="`/products/${product._id}`"
                                        class="btn btn-sm btn-primary shadow-sm"
                                    >
                                        view</router-link
                                    >
                                </span>
                                <span class="p-1"
                                    ><router-link
                                        :to="`/products/edit-product/${product._id}`"
                                        class="btn btn-sm btn-warning shadow-sm"
                                    >
                                        edit</router-link
                                    ></span
                                >
                                <span class="p-1"
                                    ><Button
                                        @click="deleteProduct"
                                        class="btn-danger shadow-sm"
                                    >
                                        delete</Button
                                    ></span
                                >
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isLoading: false,
            products: [],
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
                }, 200);
            } catch (err) {
                alert(err.message);
            }
        },

        async deleteProduct() {},
    },

    mounted() {
        this.loadProducts();
    },
};
</script>

<style></style>
