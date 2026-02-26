import fs from 'fs'
let usersDB = './github-users.json'
fetch(`https://api.github.com/users`)
    .then((response) => {
        console.log(response.status);
        if(!response.ok){
            return console.log('error');
        }
        // console.log(response);
        // console.log(response.json());
        return response.json()
    })
    .then(response => {
        // // console.log(response);
        // let userdata = response.map((usr) => {
        //     return {
        //         id: usr.id, 
        //         login: usr.login
        //     }
        // })
        let userdata = response.filter((usr)=> usr.id%2==0)
        fs.writeFile(usersDB, JSON.stringify(userdata, null, 4), (err)=>{
            if(err) return console.log('error writing file');
            console.log('saved successfully');
        })

    })
    .catch(err => {
        console.log(err);
    })