import * as v4 from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_all_users = async (ctx, next) => {
    try {
        let users = read_file("auth.json")
        ctx.body = users;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const register = async (ctx, next) => {
    try {
        let new_user = ctx.request.body;
        let users = read_file("auth.json");

        for(let i of users){
            if(i.email == new_user.email){
                return ctx.body = { msg: "Email is in use!" } 
            }
        }

        users.push({
            id: users.length + 1,
            ...new_user
        })
        write_file("auth.json", users )
        ctx.body = { msg: "You're registered!" }  
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const login = async (ctx, next) => {
    try{
        let { username, email, password } = ctx.request.body;
        let users = read_file("auth.json");
        let foundedUser = users.find(s => s.email == email )

        if(!foundedUser){
            return ctx.body = { msg: "There's no such user!" }
        }

        if(foundedUser.password == password){
            return ctx.body = { msg: "You're logged in" }
        } else{
            ctx.body = { msg: "Wrong password" }
        }
    }
    catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
}

export {
    list_all_users,
    login, 
    register
}