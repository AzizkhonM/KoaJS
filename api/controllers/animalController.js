import * as v4 from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_all_animals = async (ctx, next) => {
    try {
        let animals = read_file("animals.json")
        ctx.body = animals;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const create_an_animal = async (ctx, next) => {
    try {
        let new_animal = ctx.request.body;
        let animals = read_file("animals.json");
        console.log(animals);

        animals.push({
            id: animals.length + 1,
            ...new_animal
        })
        write_file("animals.json", animals )
        ctx.body = { msg: "Added new animal!" }  
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const read_an_animal = async (ctx, next) => {
    try {
        let animal =read_file('animals.json').find(s => s.id == ctx.params.id);
        if(!animal){
          return ctx.body = { msg: "Animal not found!" }
        }
        ctx.body = animal;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const update_an_animal = async (ctx, next) => {
    try {
        let { name, species, likes } = ctx.request.body;
        let animals = read_file("animals.json");
        let foundedAnimal = animals.find(s => s.id == ctx.params.id )

        if(!foundedAnimal){
            return ctx.body = { msg: "Animal not found!" }
        }

        animals.forEach((s, idx) => {
            if(s.id == foundedAnimal.id){
                s.name = name ? name : s.name
                s.species = species ? species : s.species
                s.likes = likes ? likes : s.likes
            }
        })

        write_file("animals.json", animals)
        ctx.body = { msg: "Animal updated!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const delete_an_animal = async (ctx, next) => {
    try {
        let animals = read_file("animals.json");
        let foundedAnimal = animals.find(s => s.id == ctx.params.id )

        if(!foundedAnimal){
            return ctx.body = { msg: "Animal not found!" }
        } 
        animals.forEach((s, idx) => {
            if(s.id == foundedAnimal.id){
               animals.splice(idx, 1)
            }
        })
        write_file("animals.json", animals);
        console.log(await next());

        ctx.body = { msg: "Animal deleted!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

export {
    list_all_animals,
    create_an_animal, 
    delete_an_animal,
    update_an_animal,
    read_an_animal
}