import{Pool} from "pg";


 const pool= new Pool({
    host: 'localhost',
    port: 5432,
    database: 'studentbase',
    user: 'fenohasina',
    password: '17Novembre2003'
})

export default pool;