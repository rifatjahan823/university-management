
import express, { Response, Request, urlencoded, Application } from 'express';
import cors from 'cors';
import router from './app/modules/users/user.route';
import { createUser } from './app/modules/users/user.service'


const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

//application route

app.use('/api/v1/users',router)



//testing
app.get('/', async(req: Request, res: Response) => {
  createUser({id:'999',role:"student",password:'123'})
  res.send('Hello World!')
})

export default app
