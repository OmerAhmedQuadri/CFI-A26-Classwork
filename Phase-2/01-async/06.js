setTimeout(() => {
    console.log('I am First');
}, 1000);
setTimeout(() => {
    console.log('I am Second');
}, 1500);
setTimeout(() => {
    console.log('I am Third');
}, 4000);
setTimeout(() => {
    console.log('I am just getting started with Adv. JS');
    setTimeout(() => {
        console.log('I am just getting started again.');
    }, 1500);
}, 2000);