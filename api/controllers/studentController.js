import * as v4 from 'uuid';
import { read_file, write_file } from '../fs/fs_api';

const list_all_students = async (ctx, next) => {
    try {
        let students = read_file("students.json")
        ctx.body = students;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const create_a_student = async (ctx, next) => {
    try {
        let new_student = ctx.request.body;
        let students = read_file("students.json");
        console.log(students);

        students.push({
            id: students.length + 1,
            ...new_student
        })
        write_file("students.json", students )
        ctx.body = new_student;   
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const read_a_student = async (ctx, next) => {
    try {
        let student =read_file('students.json').find(s => s.id == ctx.params.studentId);
        if(!student){
          return ctx.body = { msg: "Student not found!" }
        }
        ctx.body = student;
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const update_a_student = async (ctx, next) => {
    try {
        let { name, surname, scholarship } = ctx.request.body;
        let students = read_file("students.json");
        let foundedStudent = students.find(s => s.id == ctx.params.studentId )

        if(!foundedStudent){
            return ctx.body = { msg: "Student not found!" }
        }

        students.forEach((s, idx) => {
            if(s.id == foundedStudent.id){
                s.name = name ? name : s.name
                s.surname = surname ? surname : s.surname
                s.scholarship = scholarship ? scholarship : s.scholarship
            }
        })

        write_file("students.json", students)
        ctx.body = { msg: "Student updated!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

const delete_a_student = async (ctx, next) => {
    try {
        let students = read_file("students.json");
        let foundedStudent = students.find(s => s.id == ctx.params.studentId )

        if(!foundedStudent){
            return ctx.body = { msg: "Student not found!" }
        } 
        students.forEach((s, idx) => {
            if(s.id == foundedStudent.id){
               students.splice(idx, 1)
            }
        })
        write_file("students.json", students);
        console.log(await next());

        ctx.body = { msg: "Student deleted!" };
    } catch (error) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
};

export {
    list_all_students,
    create_a_student, 
    delete_a_student,
    update_a_student,
    read_a_student
}