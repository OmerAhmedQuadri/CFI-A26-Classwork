import fs from 'fs'

const data = 'This is a write operation using fs'
fs.writeFile('output.txt', data, (error)=>{
    if(error){
        console.log('Write file error: ', error);
        return
    }
    console.log('Write Success!');
})