// const { Pool } = require('pg');

// const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'gdsc',
//     password: 'duchuy2712',
//     port: 5432,
// });

// const slideTitle = 'tensor flow';
// const slideUrl = 'google.com.vn';

// // pool.query('insert into slides (slide_title,slide_url) values ($1,$2)', [slideTitle, slideUrl], (error, results) => {
// //     if (error) {
// //         throw error;
// //     }
// //     console.log('inserted');
// // });
// pool.query('select * from slides', (error, results) => {
//     if (error) {
//         throw error;
//     }
//     console.log(results.rows);
// });

// const test =
