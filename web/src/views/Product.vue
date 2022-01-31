<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12 col-md-6 text-center mb-4">
                    <img
                        src="https://www.mashvisor.com/blog/wp-content/uploads/2018/10/bigstock-Pair-Of-Translucent-Red-Dice-W-4684788.jpg"
                        alt="Image"
                        width="300"
                    />
                </div>

                <div class="col-sm-12 col-md-6 mb-4">
                    <h4 class="font-weight-bold">Add Product</h4>
                    <form @submit.prevent="addProduct">
                        <div
                            class="form-group"
                            :class="{ invalid: nameValidity === 'invalid' }"
                        >
                            <label for="name">Name</label>
                            <input
                                type="text"
                                class="form-control form-control-sm shadow-none"
                                id="name"
                                aria-describedby="name"
                                autocomplete="off"
                                placeholder="e.g Pipe"
                                v-model.trim="name"
                                @blur="validateNameInput"
                            />
                            <p
                                v-if="nameValidity === 'invalid'"
                                class="validation-text"
                            >
                                Required field!
                            </p>
                        </div>
                        <div
                            class="form-group"
                            :class="{
                                invalid: descriptionValidity === 'invalid',
                            }"
                        >
                            <label for="description">Description</label>
                            <textarea
                                type="text"
                                class="form-control form-control-sm shadow-none"
                                id="description"
                                aria-describedby="description"
                                autocomplete="off"
                                placeholder="Describe your product here"
                                style="resize: none"
                                v-model.trim="description"
                                @blur="validateDescriptionInput"
                            />
                            <p
                                v-if="descriptionValidity === 'invalid'"
                                class="validation-text"
                            >
                                Required field!
                            </p>
                        </div>
                        <div
                            class="form-group"
                            :class="{ invalid: priceValidity === 'invalid' }"
                        >
                            <label for="price">Price</label>
                            <input
                                type="number"
                                class="form-control form-control-sm shadow-none"
                                id="price"
                                aria-describedby="price"
                                autocomplete="off"
                                placeholder="3500"
                                v-model.trim="price"
                                @blur="validatePriceInput"
                            />
                            <p
                                v-if="priceValidity === 'invalid'"
                                class="validation-text"
                            >
                                Required field!
                            </p>
                        </div>
                        <div
                            class="form-group"
                            :class="{ invalid: categoryValidity === 'invalid' }"
                        >
                            <label for="category">Category</label>
                            <input
                                type="text"
                                class="form-control form-control-sm shadow-none"
                                id="category"
                                aria-describedby="category"
                                autocomplete="off"
                                placeholder="e.g building"
                                v-model.trim="category"
                                @blur="validateCategoryInput"
                            />
                            <p
                                v-if="categoryValidity === 'invalid'"
                                class="validation-text"
                            >
                                Required field!
                            </p>
                        </div>
                        <div
                            class="form-group"
                            :class="{ invalid: quantityValidity === 'invalid' }"
                        >
                            <label for="quantity">Quantity</label>
                            <input
                                type="number"
                                class="form-control form-control-sm shadow-none"
                                id="quantity"
                                aria-describedby="quantity"
                                autocomplete="off"
                                placeholder="22"
                                v-model.trim="quantity"
                                @blur="validateQuantityInput"
                            />
                            <p
                                v-if="quantityValidity === 'invalid'"
                                class="validation-text"
                            >
                                Required field!
                            </p>
                        </div>
                        <div
                            class="form-group"
                            :class="{ invalid: imageUrlValidity === 'invalid' }"
                        >
                            <label for="imageUrl"
                                >Image (Please provide image url)</label
                            >
                            <input
                                type="url"
                                class="form-control form-control-sm shadow-none"
                                id="imageUrl"
                                aria-describedby="imageUrl"
                                autocomplete="off"
                                placeholder="https://domain.com/pipe.png"
                                v-model.trim="imageUrl"
                                @blur="validateImageUrlInput"
                            />
                            <p
                                v-if="imageUrlValidity === 'invalid'"
                                class="validation-text"
                            >
                                Required field!
                            </p>
                        </div>
                        <div
                            class="form-group"
                            :class="{ invalid: expdateValidity === 'invalid' }"
                        >
                            <label for="expdate">Expiry Date</label>
                            <input
                                type="datetime-local"
                                class="form-control form-control-sm shadow-none"
                                id="expdate"
                                aria-describedby="expdate"
                                autocomplete="off"
                                placeholder="date"
                                v-model.trim="expdate"
                                @blur="validateExpdateInput"
                            />
                            <p
                                v-if="expdateValidity === 'invalid'"
                                class="validation-text"
                            >
                                Required field!
                            </p>
                        </div>

                        <Button :class="{ 'blur-loader': isLoading === true }">
                            <div v-if="isLoading">
                                <span class="mr-1">
                                    <ButtonSpinner />
                                </span>
                                Adding product
                            </div>
                            <div v-else>Submit</div>
                        </Button>
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
            name: '',
            description: '',
            price: null,
            category: '',
            quantity: null,
            imageUrl: '',
            expdate: '',
            nameValidity: '',
            descriptionValidity: '',
            priceValidity: '',
            categoryValidity: '',
            quantityValidity: '',
            imageUrlValidity: '',
            expdateValidity: '',
            isLoading: false,
        };
    },

    methods: {
        async addProduct() {
            this.isLoading = true;
            let payload = {
                name: this.name,
                description: this.description,
                price: this.price,
                category: this.category,
                quantity_in_stock: this.quantity,
                image: this.imageUrl,
                expiry_date: this.expdate,
            };
            try {
                setTimeout(async () => {
                    const result = await fetch(
                        'http://localhost:3100/api/products/',
                        {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        }
                    );
                    if (!result.ok) alert('An error occured');
                    let response = await result.json();
                    let message = response.message;
                    alert(message);
                    this.isLoading = false;
                }, 1000);
                this.$router.push('/');
            } catch (err) {
                console.error(err.message);
            }

            this.resetForm();
        },

        validateNameInput() {
            if (this.name === '') {
                this.nameValidity = 'invalid';
            } else {
                this.nameValidity = 'valid';
            }
        },

        validateDescriptionInput() {
            if (this.description === '') {
                this.descriptionValidity = 'invalid';
            } else {
                this.descriptionValidity = 'valid';
            }
        },

        validatePriceInput() {
            if (this.price === null) {
                this.priceValidity = 'invalid';
            } else {
                this.priceValidity = 'valid';
            }
        },

        validateCategoryInput() {
            if (this.category === '') {
                this.categoryValidity = 'invalid';
            } else {
                this.categoryValidity = 'valid';
            }
        },

        validateQuantityInput() {
            if (this.quantity === null) {
                this.quantityValidity = 'invalid';
            } else {
                this.quantityValidity = 'valid';
            }
        },

        validateImageUrlInput() {
            if (this.imageUrl === '') {
                this.imageUrlValidity = 'invalid';
            } else {
                this.imageUrlValidity = 'valid';
            }
        },

        validateExpdateInput() {
            if (this.expdate === '') {
                this.expdateValidity = 'invalid';
            } else {
                this.expdateValidity = 'valid';
            }
        },

        resetForm() {
            this.name = '';
            this.description = '';
            this.price = null;
            this.category = '';
            this.quantity = null;
            this.imageUrl = '';
            this.expdate = '';
        },
    },
};
</script>

<style scoped>
.form-group.invalid input {
    border-color: rgba(255, 0, 0, 0.651);
}
.form-group.invalid label {
    color: rgba(255, 0, 0, 0.651);
}
.form-group.invalid label {
    color: rgba(255, 0, 0, 0.651);
}
.validation-text {
    color: rgba(255, 0, 0, 0.651);
}
.blur-loader {
    background-color: rgb(110, 110, 110);
    border-color: rgb(110, 110, 110);
}
</style>
