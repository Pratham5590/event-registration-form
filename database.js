import Database from 'better-sqlite3';
const db = new Database("registration.db");

db.exec(`CREATE TABLE IF NOT EXISTS registrations (
id INTEGER PRIMARY KEY
name TEXT NOT NULL
class INTEGER NOT NULL
school TEXT NOT NULL
email TEXT NOT NULL
status TEXT DEFAULT 'pending')`);

export function register(student) {
  let statement = db.prepare(`INSERT INTO registrations (id, name, class, school, email)
VALUES (?, ?, ?, ?, ?)`);
  let studentID = findID();
  statement.run(
    studentID,
    student.name,
    student.regClass,
    student.school,
    student.email
  );
  return true;
}

function findID() {
  let result = db.prepare(`SELECT MAX(id) FROM tasks`);
  result = result.get();
  return result["MAX(id)"] + 1;
}