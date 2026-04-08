// document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search)
    const user = params.get('q')
    if(!user) window.location.href = '../'
    // console.log(params);
    // console.log(params.get);
    // // get user details from params
    // const user = window.prompt('Please enter a username: ')
    // console.log(user);
    const avatarImg = document.getElementById('avatar-img')
    const fullname = document.getElementById('fullname')
    const username = document.getElementById('username')
    const bio = document.getElementById('bio')

    const email = document.getElementById('email')
    const repoCount = document.getElementById('repo-count')
    const website = document.getElementById('website')
    const address = document.getElementById('location')
    const profileBtn = document.getElementById('profile-btn')
    const emailLI = document.getElementById('email-li')



    async function fetchUserDetails() {
        const data = (await axios.get(`https://api.github.com/users/${user}`)).data
        console.log(data);
        avatarImg.src = data.avatar_url
        fullname.textContent = data.name
        username.textContent = data.login
        bio.textContent = data.bio
        if (!data.email) emailLI.remove()
        else email.textContent = data.email
        repoCount.textContent = data.public_repos + ' repositories'
        address.textContent = data.location
        website.textContent = 'Portfolio'
        website.href = data.blog
        profileBtn.addEventListener('click', () => {
            console.log('something');
            window.location.href = data.html_url
        })
    }

    fetchUserDetails()
// })