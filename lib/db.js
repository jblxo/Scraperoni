import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export default function getDB() {
  const adapter = new FileSync('db.json');
  const db = low(adapter);
  db.defaults({ posts: [], user: {}, count: 0 }).write();
  return db;
}
