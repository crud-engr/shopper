<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                <img
                    :src="product.image"
                    class="card-img-top"
                    :alt="`${product.name} Image`"
                    width="300"
                    height="500"
                />
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="py-2">
                    {{ product.description }}
                </div>
                <form class="form-inline my-2 my-lg-0">
                    <div class="form-group">
                        <input
                            type="number"
                            class="form-control form-control-sm shadow-none py-1"
                            id="quantity"
                            aria-describedby="quantity"
                            autocomplete="off"
                            v-model.trim="quantity"
                            style="width: 20%"
                            min="1"
                        />
                        <Button
                            @click="addToCart"
                            class="btn-dark"
                            :class="{ 'blur-loader': isLoading === true }"
                        >
                            <div v-if="isLoading">
                                <span class="mr-1">
                                    <ButtonSpinner />
                                </span>
                                Adding to cart
                            </div>
                            <div v-else>Add to cart</div>
                        </Button>
                    </div>
                </form>
                <div class="analysis mt-2">
                    x{{ quantity }} = <b>N{{ product.price * quantity }}</b>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            product: [],
            isLoading: false,
            quantity: 1,
        };
    },

    methods: {
        async loadProduct(e) {
            try {
                setTimeout(async () => {
                    let id = this.$route.params.id;
                    let result = await fetch(
                        `http://localhost:3100/api/products/${id}`
                    );
                    if (!result.ok) {
                        this.$notify(
                            {
                                group: 'error',
                                title: 'Error',
                                text: 'An error occured! Please retry.',
                            },
                            5000
                        );
                    } else {
                        let response = await result.json();
                        let data = response.data.product;
                        this.product = data;
                    }
                }, 1000);
            } catch (err) {
                this.isLoading = false;
                this.$notify(
                    {
                        group: 'error',
                        title: 'Error',
                        text: err.message,
                    },
                    5000
                );
            }
        },

        async addToCart(e) {
            e.preventDefault();
            this.isLoading = true;
            let id = this.$route.params.id;
            let payload = {
                quantity: this.quantity,
            };

            try {
                setTimeout(async () => {
                    let result = await fetch(
                        `http://localhost:3100/api/products/${id}/add-to-cart`,
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        }
                    );
                    this.isLoading = false;
                    console.log(result);
                    if (!result.ok) {
                        this.$notify(
                            {
                                group: 'error',
                                title: 'Error',
                                text: 'An error occured! Please retry.',
                            },
                            5000
                        );
                    } else {
                        let response = await result.json();
                        // console.log(response);
                        // let data = response.data.cart;
                        // this.product = data;
                        this.isLoading = false;
                        this.$notify(
                            {
                                group: 'success',
                                title: 'Success',
                                text: response.message,
                            },
                            2500
                        );
                    }
                }, 1000);
            } catch (err) {
                this.isLoading = false;
                this.$notify(
                    {
                        group: 'error',
                        title: 'Error',
                        text: err.message,
                    },
                    5000
                );
            }

            this.quantity = 1;
        },

        loadQuantity() {
            this.quantity = 1;
        },
    },

    mounted() {
        this.loadProduct();
        this.loadQuantity();
    },
};
</script>

<style scoped>
.blur-loader {
    background-color: rgb(110, 110, 110);
    border-color: rgb(110, 110, 110);
}
</style>
