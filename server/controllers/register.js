import { sql } from "../db.js";
import bcrypt from 'bcryptjs'

//контроллер регистрации
export const register = async (req, res) => {
    //вытаскиваем json и сразу вытаскиваем из нее переменные
    const {username, password} = req.body;
    
    //кандидат это переменная в которую попытаемся найти и записать пользователя с таким никнеймом
    const candidate = await sql`select * from Users where nickname = ${username} limit 1`[0]
    //если мы нашли пользователя с таким ником, то отправляем пользователю обратно ошибку что пользователь уже существует
    if (candidate) {
        res.status(400).send("Пользователь уже сущетсвует")
    }
    //хешируем пароль
    console.log(req.body);
    const hashPassword = bcrypt.hashSync(password, 7)
    //создаем нового пользователя
    await sql`insert into Users(nickname, password) values(${username}, ${hashPassword})`
    //отправляем пользователю 200 статус код (это значит что всё успешно)
    return res.send({message: "Пользователь успешно зарегистрирован"})
}