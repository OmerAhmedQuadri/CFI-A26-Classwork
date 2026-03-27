
const HEADER = document.getElementById('header')
async function hello(){
    console.log('Hello');
    const response = (await axios.put('http://localhost:3000/api/auth/verify/email/69c4fec97594e9e7348ae73f/0el5bba1j78a')).data
    console.log(response);
    HEADER.textContent = response.message
    if(response.success){
        HEADER.style.color = 'green'
    }else{
        HEADER.style.color = 'red'
    }
}
hello() 