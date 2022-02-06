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
                <div>
                    <form>
                        <div class="form-group row">
                            <div class="col-xs-1">
                                <input
                                    type="number"
                                    class="form-control form-control-sm shadow-none py-1"
                                    id="quantity"
                                    aria-describedby="quantity"
                                    autocomplete="off"
                                    v-model.trim="quantity"
                                />
                            </div>
                            <Button
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
        };
    },
    methods: {
        async loadProduct(e) {
            e.preventDefault();
            try {
                setTimeout(async () => {
                    let id = this.$route.params.id;
                    let result = await fetch(
                        `http://localhost:3100/api/products/${id}`
                    );
                    if (!result.ok) alert('An error occured');
                    let response = await result.json();
                    let data = response.data.product;
                    this.product = data;
                }, 1000);
            } catch (err) {
                alert(err.message);
            }
        },
    },
    mounted() {
        this.loadProduct();
    },
};
</script>

<style></style>
