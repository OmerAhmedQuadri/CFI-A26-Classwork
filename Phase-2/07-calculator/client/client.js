import rs from 'readline-sync'
import axios from 'axios'
const BASE_URL = 'http://localhost:3000/'

const fetchData = async (operation) => {
    try {
        const num1 = rs.question('Enter a number: ')
        const num2 = rs.question('Enter another number: ')
        const API_URL = BASE_URL + operation + '/' + num1 + '/' + num2
        const response = await axios.get(API_URL)

        console.log('Message: ' + response.data.message);
        console.log('Answer: ' + response.data.data);

    } catch (error) {
        console.log('Error: ',error);

    }
}


const cli = async () => {
    const OPTIONS = {
        1: 'add',
        2: 'sub',
        3: 'mul',
        4: 'div',
        5: 'mod',
    }
    while (true) {
        console.log('\n===CALCULATOR CLI===');
        console.log('1. Add');
        console.log('2. Sub');
        console.log('3. Mul');
        console.log('4. Div');
        console.log('5. Mod');
        console.log('0. Exit');
        const choice = rs.questionInt('Enter your choice: ')

        if (!choice) {
            console.log('Exiting...');
            return
        }
        if (!OPTIONS[choice]) {
            console.log('Invalid choice!');
            continue
        }
        await fetchData(OPTIONS[choice])

    }
}

cli()