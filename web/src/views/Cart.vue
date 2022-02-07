<template>
    <div class="container-fluid">
        <div class="row mb-5">
            <div class="col-sm-12 col-md-8">
                <div v-if="carts.length > 0">
                    <div class="card shadow-sm" style="width: 100%">
                        <table class="table">
                            <tbody>
                                <tr v-for="cart in carts" :key="cart._id">
                                    <td>
                                        <img
                                            :src="cart.product.image"
                                            :alt="`${cart.product.name} Image`"
                                            style="width: 30%"
                                        />
                                    </td>
                                    <td>{{ cart.product.name }}</td>
                                    <!-- <td>{{ cart.product.description }}</td> -->
                                    <td>{{ cart.product.category }}</td>
                                    <td
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        {{ cart.quantity }}
                                    </td>
                                    <td>
                                        {{
                                            cart.product.price.toLocaleString(
                                                'en-US',
                                                {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }
                                            )
                                        }}
                                    </td>
                                    <td>
                                        {{
                                            cart.totalPrice.toLocaleString(
                                                'en-US',
                                                {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                }
                                            )
                                        }}
                                    </td>
                                    <td>
                                        <Button class="btn-danger"
                                            >&times;</Button
                                        >
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        class="d-flex justify-content-end font-weight-bold mt-4"
                    >
                        <router-link to="/" class="btn btn-sm btn-dark shadow"
                            >Continue shopping</router-link
                        >
                    </div>
                </div>
                <div v-else>
                    <p class="text-muted text-center card shadow-sm p-4">
                        No items in your bag
                    </p>
                </div>
            </div>
            <div class="col-sm-12 col-md-4">
                <div class="card shadow-sm" style="width: 100%">
                    <div class="card-body card-content">
                        <h5 class="card-title font-weight-bold">TOTAL</h5>
                        <hr />
                        <div
                            class="d-flex justify-content-between font-weight-bold"
                        >
                            <p class="card-text">Sub-total</p>
                            <p class="card-text text-muted">
                                {{
                                    subTotal.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })
                                }}
                            </p>
                        </div>
                        <div
                            class="d-flex justify-content-between font-weight-bold"
                        >
                            <p class="card-text">Delivery</p>
                            <p class="card-text text-muted">None</p>
                        </div>
                        <Button class="btn-block btn-success font-weight-bold"
                            >CHECKOUT</Button
                        >
                        <h6 class="card-title font-weight-bold mt-3">
                            WE ACCEPT
                        </h6>
                        <div
                            class="payment-icons d-flex justify-content-between mt-4"
                        >
                            <p>Icon 1</p>
                            <p>Icon 2</p>
                            <p>Icon 3</p>
                            <p>Icon 4</p>
                        </div>
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
            carts: [],
            isLoading: false,
            subTotal: 0,
        };
    },

    methods: {
        async loadCarts() {
            try {
                let result = await fetch(`http://localhost:3100/api/carts`);
                if (!result.ok) {
                    return this.$notify(
                        {
                            group: 'error',
                            title: 'Error',
                            text: 'An error occured! Please retry',
                        },
                        5000
                    );
                } else {
                    let response = await result.json();
                    let data = response.data.carts;
                    this.carts = data;
                    if (this.carts.length > 0) {
                        this.subTotal = this.carts
                            .map(el => {
                                return el.totalPrice;
                            })
                            .reduce((sum, other) => {
                                return sum + other;
                            });
                    } else {
                        console.log('cart is currently empty');
                    }
                }
            } catch (err) {
                return this.$notify(
                    {
                        group: 'error',
                        title: 'Error',
                        text: err.message,
                    },
                    5000
                );
            }
        },
    },

    mounted() {
        this.loadCarts();
    },
};
</script>

<style></style>
