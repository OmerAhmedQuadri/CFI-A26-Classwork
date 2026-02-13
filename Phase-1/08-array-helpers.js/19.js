const roles = ['admin', 'customer', 'manager']

const usrRole = 'editor'
const usrRole2 = 'admin'

if (roles.includes(usrRole)) {
    console.log('access granted')
}
else {
    console.log('failed to auth')
}