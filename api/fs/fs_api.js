import fs from "fs";

const read_file = (file_name) =>{
    return JSON.parse(fs.readFileSync(`./api/models/${file_name}`, 'utf8'))
}


const write_file = (file_name, data) => {
    return fs.writeFile(`./api/models/${file_name}`, JSON.stringify(data, null, 4), (err) => {
        if(err) throw err;
        console.log('Created!');
    })
} 


export {
    read_file,
    write_file
}