import { sql } from "../db.js"

export const getUserTeams = async (req ,res) => {
    const user_id  = req.params.id

    const user_team = await sql`select * from Teams where owner_id = ${user_id}`

    return res.json({
        user_team
    })
}

export const createUserTeam = async (req, res) =>{
    console.log(req.body)
    const {user_id, teamName} = req.body
    try{
        const newTeam = await sql`insert into Teams(owner_id, name) values(${user_id}, ${teamName})`
        console.log(newTeam)
    }catch(error) {
        console.log(error)
        res.send(error)
    }
}

export const getUsersToTeam = async (req, res) => {
    const team_id  = req.params.id
    let list_users = []
    const list_team_user = await sql`select * from team_user where team_id = ${team_id}`

    await Promise.all(list_team_user.map(async (elem)=>{
        console.log(elem?.user_id)
        const user = await funkUsersToTeam(elem?.user_id)
        list_users.push(user[0])
    }))
    console.log(list_users[0])
    return res.json({
        list_users
    })
}

const funkUsersToTeam = async(id) =>{
    return await sql`select nickname from Users where id = ${id}`
}

export const addUserToTeam = async (req, res) => {
    const {user_name, team_id} = req.body

    const currentUser = await sql`select * from Users where nickname = ${user_name}`
    if (!currentUser[0]) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` })
    }
    try{
        const newUser = await sql`insert into team_user(user_id, team_id) values(${currentUser[0].id}, ${team_id})`
        console.log(newUser)
    }catch (e){
        console.log(e)
        return res.status(400).json({ message: `Ошибка: ${e}` })
    }

}

export const getComandDesksTasks = async (req, res) => {
    const team_id  = req.params.id
    let descks_arr = []

    const descks = await sql`select * from Descks where team_id = ${team_id}`
    await Promise.all(descks.map(async (elem)=>{
            
        console.log(elem?.id)
        const tasks = await funkTaskToDesck(elem?.id)
        descks_arr.push({'desck': elem, 'tasks': tasks})
    }))
    console.log(descks_arr)
    return res.json({
        descks_arr
    })
}   

export const getComandsAndTasks = async (req, res) => {
    const user_id  = req.params.id
    let all_list = []

    const user_teams = await sql`select * from team_user where user_id = ${user_id}`
    let comand_list = []
    await Promise.all(user_teams.map(async (elem)=>{
        console.log(elem?.team_id)
        const team = await funkTeamToUser(elem?.team_id)
        const descks = await sql`select * from Descks where team_id = ${team[0].id}`

        let tasks_arr = []
        await Promise.all(descks.map(async (elem)=>{
            
            console.log(elem?.id)
            const tasks = await funkTaskToDesck(elem?.id)
            await Promise.all(tasks.map(async (elem)=>{
                tasks_arr.push(elem)
            }))
            
        }))
        comand_list.push({'team': team[0], 'tasks': tasks_arr})
    }))
    console.log(comand_list)
    return res.json({
        comand_list
    })
}

const funkTeamToUser = async(id) =>{
    return await sql`select * from Teams where id = ${id}`
}
const funkTaskToDesck = async(id) =>{
    return await sql`select * from Tasks where desck_id = ${id}`
}
export const addDesck = async (req, res) => {
    const {desck_name, team_id} = req.body
    
    try{
        const newDesk = await sql`insert into Descks(name, team_id) values(${desck_name}, ${team_id})`
        console.log(newDesk)
    }catch (e){
        console.log(e)
        return res.status(400).json({ message: `Ошибка: ${e}` })
    }
}
export const addTask = async (req, res) => {
    const {desck_id, task_name} = req.body

    try{
        const newTask = await sql`insert into Tasks(name, desck_id) values(${task_name}, ${desck_id})`
        console.log(newTask)
    }catch (e){
        console.log(e)
        return res.status(400).json({ message: `Ошибка: ${e}` })
    }
}
export const complitTask = async (req, res) => {
    const {task_id} = req.body

    try{
        const newTask = await sql`UPDATE Tasks SET complited = 't' WHERE id = ${task_id} `
        console.log(newTask)
    }catch (e){
        console.log(e)
        return res.status(400).json({ message: `Ошибка: ${e}` })
    }
}
export const taskEdit = async  (req, res) => {
    const {description, task_name, date, task_id} = req.body
    console.log(description, task_name, date, task_id)
    try{
        const newTask = await sql`UPDATE Tasks SET name = ${task_name}, description = ${description}, date =${date} WHERE id = ${task_id} `
        console.log(newTask)
    }catch (e){
        console.log(e)
        return res.status(400).json({ message: `Ошибка: ${e}` })
    }
}
export const getUser = async  (req, res) => {
    const user_id  = req.params.id
    const user = await sql`select * from Users where id = ${user_id}`
    return res.json({
        user
    })
}
export const userChangeName = async  (req, res) => {
    const {user_id, user_name} = req.body
    try{
        const user = await sql`UPDATE Users SET nickname = ${user_name} WHERE id = ${user_id} `
        console.log(user)
    }catch (e){
        console.log(e)
        return res.status(400).json({ message: `Ошибка: ${e}` })
    }
}