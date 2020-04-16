const market = [
    {
        path: '/market_add',
        name: 'add',
        component: () => import('../views/Market_tracking/Total_add.vue')
    },
    {
        path:'/market_edit',
        name:'market_edit',
        component:()=>import('../views/Market_tracking/Total_edit.vue')
    },
    {
        path:'/market_schedule',
        name:'market_schedule',
        component:()=>import('../views/Market_tracking/Schedule.vue')
    }
]
export default market