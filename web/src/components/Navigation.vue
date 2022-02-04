<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-white mb-3">
        <router-link to="/" class="navbar-brand">
            <img
                src="http://dessign.net/shopper-woocommerce-theme/wp-content/uploads/2015/03/logo1.png"
                width="150"
                alt="logo"
            />
        </router-link>
        <Button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </Button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <router-link class="nav-link" to="/"
                        >Home <span class="sr-only">(current)</span></router-link
                    >
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="add-product">Product</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/cart">Cart</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/listings">Listings</router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <input
                    class="form-control form-control-sm mr-sm-0 shadow-none"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style="width: 80%"
                />

                <Button class="btn-dark">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                        />
                    </svg>
                </Button>
            </form>
        </div>
    </nav>
</template>

<script>
export default {

};
</script>

<style scoped></style>
