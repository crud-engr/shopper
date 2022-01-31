<template>
    <div>
        <Navigation />
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    components: {},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');
#app {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 10px 25px;
}
</style>
