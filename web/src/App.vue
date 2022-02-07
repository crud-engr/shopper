<template>
    <div>
        <Navigation />
        <NotificationGroup group="success">
            <div
                class="d-flex justify-content-end align-items-start px-4 py-6 fixed-top mt-5"
            >
                <div class="w-7">
                    <Notification v-slot="{ notifications }">
                        <div
                            class="d-flex mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-sm"
                            v-for="notification in notifications"
                            :key="notification.id"
                        >
                            <div
                                class="p-2 d-flex align-items-center justify-content-center w-12 bg-success"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="text-white bi bi-check-circle"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                    />
                                    <path
                                        d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
                                    />
                                </svg>
                            </div>

                            <div class="px-4 py-2 mx-3">
                                <div class="mx-3">
                                    <span
                                        class="font-weight-bold text-success"
                                        >{{ notification.title }}</span
                                    >
                                    <p class="text-secondary">
                                        {{ notification.text }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Notification>
                </div>
            </div>
        </NotificationGroup>

        <NotificationGroup group="error">
            <div
                class="d-flex justify-content-end align-items-start px-4 py-6 fixed-bottom"
            >
                <div class="w-7">
                    <Notification v-slot="{ notifications }">
                        <div
                            class="d-flex mx-auto overflow-hidden bg-white rounded-lg shadow-sm"
                            v-for="notification in notifications"
                            :key="notification.id"
                        >
                            <div
                                class="p-2 d-flex align-items-center justify-content-center w-12 bg-danger"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="text-white bi bi-lightning-charge"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z"
                                    />
                                </svg>
                            </div>

                            <div class="px-4 py-2 mx-3">
                                <div class="mx-3">
                                    <span
                                        class="font-weight-bold text-danger"
                                        >{{ notification.title }}</span
                                    >
                                    <p class="text-secondary">
                                        {{ notification.text }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Notification>
                </div>
            </div>
        </NotificationGroup>
        <div>
            <router-view></router-view>
        </div>
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
    font-size: 15px;
}
</style>
