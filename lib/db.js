import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ posts: [], user: {}, count: 0 }).write();
db.get('posts')
  .push({ id: 1, title: 'lowdb is awesome' })
  .write();
export default db;
