import express from 'express'
import { UserRoute } from '../modules/users/user.route'
import { acadamicSemesterRoute } from '../modules/acadamicSemester/acadamicSemester.route'

const router = express.Router()

const moduleRoutes=[
    {
        path:'/users',
        route:UserRoute.router
    },
    {
        path:'/acadamic-semester',
        route:acadamicSemesterRoute.router
    }
]

moduleRoutes.map((routers)=>router.use(routers.path,routers.route))

// router.use('/users/', UserRoute.router)
// router.use('/acadamic-semester',acadamicSemesterRoute.router)


export default router