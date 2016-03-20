import sqlite3


class TodoMixin(object):
    # TODO - this should be set in a flask context.
    def __init__(self, *args, **kwargs):
        super(TodoMixin, self).__init__(*args, **kwargs)
        self.conn = sqlite3.connect('todo.db')
        self.cursor = self.conn.cursor()

    def get_todos(self):

        self.cursor.execute('SELECT * FROM todos')

        todos = [
            {
                'todo_id': todo_id,
                'todo': todo,
                'complete': complete,
            }
            for (todo_id, todo, complete)
            in self.cursor.fetchall()]

        return todos

    def get_todo(self, todo_id):

        query = 'SELECT id, todo, complete FROM todos WHERE id = ?'
        self.cursor.execute(query, (todo_id, ))
        (todo_id, todo, complete) = self.cursor.fetchone()

        todo = {
            'todo_id': todo_id,
            'todo': todo,
            'complete': complete,
        }

        return todo

    def create_todo(self, todo):

        query = ''' INSERT INTO todos(todo, complete) VALUES (?, 0) '''

        self.cursor.execute(query, (todo,))
        todo_id = self.cursor.lastrowid
        self.conn.commit()

        return todo_id

    def update_todo(self, todo_id, todo, complete):

        query = '''
            UPDATE todos
            SET
                todo = ?
                , complete = ?
            WHERE id = ?
        '''

        self.cursor.execute(query, (todo, complete, todo_id, ))
        self.conn.commit()

        return True

    def delete_todo(self, todo_id):

        query = '''
            UPDATE todos
            SET complete = 0
            WHERE id = ?'''
        self.cursor.execute(query, (todo_id, ))
        self.conn.commit()

        return True
