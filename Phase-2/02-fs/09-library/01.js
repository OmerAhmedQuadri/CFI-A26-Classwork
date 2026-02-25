import fs from 'fs'
import rs from 'readline-sync'
import chalk from 'chalk'

const db = './db/books.json'

// const books = [
//     {
//         id: ,
//         title: ,
//         author: ,
//         price: ,
//     }
// ]

fs.readFile(db, 'utf-8', (err, data) => {
    if (err) return console.log(err);

    const books = data ? JSON.parse(data) : []
    // console.log(data);
    // console.log(JSON.parse(data));

    while (true) {
        let id = null
        let book = null
        let index = null
        console.log('\n===LIBRARY===');
        console.log(chalk.bgYellow('0. Save and Exit'));
        console.log(chalk.greenBright('1. Display books'));
        console.log(chalk.green('2. Add a book'));
        console.log(chalk.redBright('3. Delete a book'));
        console.log(chalk.blueBright('4. Update a book'));

        const choice = rs.questionInt('Enter you choice: ')

        switch (choice) {
            case 1:
                if (books.length == 0) console.log('Library is empty');
                else {
                    console.log('\nBooks:');
                    books.forEach(book => {
                        console.log(`Id: ${book.id}`);
                        console.log(`Title: ${book.title}`);
                        console.log(`Author: ${book.author}`);
                        console.log(`Price: ${book.price}`);
                        console.log('--------------------');
                    });
                }
                break;

            case 2:
                book = {
                    id: Date.now(),
                    title: rs.question('Enter the title for the book: '),
                    price: rs.questionInt('Enter the price: '),
                    author: rs.question('Enter the name of the author: '),
                }
                books.push(book)
                break

            case 3:
                id = rs.questionInt('Enter the book id: ')
                index = books.findIndex(book => book.id == id)
                if (index != -1) {
                    books.splice(index, 1)
                    console.log(chalk.red('Deleted successfully'));
                }
                else
                    console.log('Item not found');
                break
            case 4:
                id = rs.questionInt('Enter the book id: ')
                index = books.findIndex(book => book.id == id)
                if (index != -1) {
                    book =  {
                        title: rs.question('Enter the title for the book: '),
                        price: rs.questionInt('Enter the price: '),
                        author: rs.question('Enter the name of the author: ')
                    }
                    books[index] = {...books[index], ...book}
                }
                else
                    console.log('Item not found');
                break

            case 0:
                const data = JSON.stringify(books, null, 4)
                fs.writeFile(db, data, (err) => {
                    if (err) console.log(err)
                    else console.log('Data saved✅');
                })
                console.log('Exiting...');
                return

            default:
                break;
        }
    }

})