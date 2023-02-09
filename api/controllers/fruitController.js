import * as v4 from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_all_fruits = async (ctx, next) => {
    try {
        let fruits = read_file("fruits.json")
        ctx.body = fruits;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const create_a_fruit = async (ctx, next) => {
    try {
        let new_fruit = ctx.request.body;
        let fruits = read_file("fruits.json");
        console.log(fruits);

        fruits.push({
            id: fruits.length + 1,
            ...new_fruit
        })
        write_file("fruits.json", fruits )
        ctx.body = { msg: "Added new fruit!" }  
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const read_a_fruit = async (ctx, next) => {
    try {
        let fruit =read_file('fruits.json').find(s => s.id == ctx.params.id);
        if(!fruit){
          return ctx.body = { msg: "Fruit not found!" }
        }
        ctx.body = fruit;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const update_a_fruit = async (ctx, next) => {
    try {
        let { title, country, price } = ctx.request.body;
        let fruits = read_file("fruits.json");
        let foundedFruit = fruits.find(s => s.id == ctx.params.id )

        if(!foundedFruit){
            return ctx.body = { msg: "Fruit not found!" }
        }

        fruits.forEach((s, idx) => {
            if(s.id == foundedFruit.id){
                s.title = title ? title : s.title
                s.country = country ? country : s.country
                s.price = price ? price : s.price
            }
        })

        write_file("fruits.json", fruits)
        ctx.body = { msg: "Fruit updated!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const delete_a_fruit = async (ctx, next) => {
    try {
        let fruits = read_file("fruits.json");
        let foundedFruit = fruits.find(s => s.id == ctx.params.id )

        if(!foundedFruit){
            return ctx.body = { msg: "Fruit not found!" }
        } 
        fruits.forEach((s, idx) => {
            if(s.id == foundedFruit.id){
               fruits.splice(idx, 1)
            }
        })
        write_file("fruits.json", fruits);
        console.log(await next());

        ctx.body = { msg: "Fruit deleted!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

export {
    list_all_fruits,
    create_a_fruit, 
    delete_a_fruit,
    update_a_fruit,
    read_a_fruit
}