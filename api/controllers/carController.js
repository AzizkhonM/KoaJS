import * as v4 from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_all_cars = async (ctx, next) => {
    try {
        let cars = read_file("cars.json")
        ctx.body = cars;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const create_a_car = async (ctx, next) => {
    try {
        let new_car = ctx.request.body;
        let cars = read_file("cars.json");
        console.log(cars);

        cars.push({
            id: cars.length + 1,
            ...new_car
        })
        write_file("cars.json", cars )
        ctx.body = { msg: "Added new car!" }  
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const read_a_car = async (ctx, next) => {
    try {
        let car =read_file('cars.json').find(s => s.id == ctx.params.id);
        if(!car){
          return ctx.body = { msg: "Car not found!" }
        }
        ctx.body = car;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const update_a_car = async (ctx, next) => {
    try {
        let { title, brand, price } = ctx.request.body;
        let cars = read_file("cars.json");
        let foundedCar = cars.find(s => s.id == ctx.params.id )

        if(!foundedCar){
            return ctx.body = { msg: "Car not found!" }
        }

        cars.forEach((s, idx) => {
            if(s.id == foundedCar.id){
                s.title = title ? title : s.title
                s.brand = brand ? brand : s.brand
                s.price = price ? price : s.price
            }
        })

        write_file("cars.json", cars)
        ctx.body = { msg: "Car updated!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const delete_a_car = async (ctx, next) => {
    try {
        let cars = read_file("cars.json");
        let foundedCar = cars.find(s => s.id == ctx.params.id )

        if(!foundedCar){
            return ctx.body = { msg: "Car not found!" }
        } 
        cars.forEach((s, idx) => {
            if(s.id == foundedCar.id){
               cars.splice(idx, 1)
            }
        })
        write_file("cars.json", cars);
        console.log(await next());

        ctx.body = { msg: "Car deleted!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

export {
    list_all_cars,
    create_a_car, 
    delete_a_car,
    update_a_car,
    read_a_car
}