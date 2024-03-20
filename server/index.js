import express from "express";
import { sql } from "./db.js";
import { register } from "./controllers/register.js";
import { auth } from "./controllers/auth.js";
import { roleMiddleware } from "./middlewares/roleMiddleware.js";
import cors from 'cors'
import { addDesck, addTask, addUserToTeam, complitTask, createUserTeam, getComandDesksTasks, getComandsAndTasks, getUser, getUserTeams, getUsersToTeam, taskEdit, userChangeName } from "./controllers/teams.js";

//порт на котором будет работать сервер
const PORT = 3000

//сама переменная сервера
const app = express()

//чтобы сервер понимал json
app.use(express.json())
app.use(cors())

/* app.get('/', roleMiddleware(["ADMIN"]), async (req, res) => {
    const data = await sql`select * from Users`
    res.send(data)
})
*/

//ветка регистрации
app.post('/reg', register)
//ветка логина
app.post('/auth', auth) 
// получение команд пользователя
app.get('/teams', async (req, res) => {
    
})
app.get('/user_teams/:id', getUserTeams)
app.post('/team_add', createUserTeam)
app.get('/users_to_team/:id', getUsersToTeam)
app.post('/add_user_to_team', addUserToTeam)
app.get('/comands_and_tasks/:id', getComandsAndTasks)
app.get('/comand_descks_tasks/:id', getComandDesksTasks)
app.post('/addDesck', addDesck)
app.post('/addTask', addTask)
app.post('/complitTask', complitTask)
app.post('/taskEdit', taskEdit)
app.get('/getuser/:id', getUser)
app.post('/userchangename', userChangeName)



//функция старта приложения
const start = async () => {

    //создаем таблицы
    await sql`create table if not exists Users(
        id SERIAL PRIMARY KEY NOT NULL,
        nickname varchar(100) NOT NULL,
        password varchar(100) NOT NULL
    )`
    await sql`create table if not exists Teams(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        owner_id INT NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES Users(id)
    )`
    await sql`create table if not exists Descks(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        team_id INT NOT NULL, 
        FOREIGN KEY (team_id) REFERENCES Teams(id)
    )`
    await sql`create table if not exists Tasks(
        id SERIAL PRIMARY KEY NOT NULL,
        name varchar(100) NOT NULL,
        description varchar(100) NOT NULL,
        date DATE NOT NULL DEFAULT CURRENT_DATE,
        complited BOOLEAN NOT NULL DEFAULT '0',
        desck_id INT NOT NULL,
        FOREIGN KEY (desck_id) REFERENCES Descks(id)
    )`
    await sql`create table if not exists team_user(
        id SERIAL PRIMARY KEY NOT NULL,
        user_id INT NOT NULL,
        team_id INT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id),
        FOREIGN KEY (team_id) REFERENCES Teams(id)
    )`

    //запустить в первый раз и больше не запускать
    //чтобы добавить роли в таблицу ролей

    // await sql`insert into Roles(role) values('USER')`
    // await sql`insert into Roles(role) values('ADMIN')`

    //запустить сервак
    //(прослушивать порт на запросы)
    //вторым аргументом функция которая запустится при успешном запуске сервака
    app.listen(PORT, () => {
        console.log(`СЕРВАК ФУРЫЧИТ ТУТ http://localhost:${PORT}`);
    })
}

start()