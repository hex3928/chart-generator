import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Home",
        component: _ => { return import("../components/Home.vue") }
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    linkActiveClass: "active",
    watchQuery: true,
    routes,
})

export default router
