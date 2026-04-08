const submitBtn = document.getElementById('submit-btn')
const searchBox = document.getElementById('username')

submitBtn.addEventListener('click', () => {
    const username = searchBox.value.trim()
    if(!username) return
    console.log(username);
    window.location.href = `./users/?q=${username}`
})

searchBox.addEventListener('keydown', (event) => {
    if(event.key == 'Enter'){
        console.log(event);
        event.preventDefault()
        const username = searchBox.value.trim()
        if(!username) return
        console.log(username);
        // window.location.href = `./users/?q=${username}`
    }

})