'''
    Why have mixins? Everything here is database interaction, but I felt that
    it would be simpler as a mixin rather than creating explicit models.

    If this were more complicated I would have used sqlalchemy, but for the
    purposes of the overall example that wasn't necessary.
'''

import sqlite3


class TodoMixin(object):
    ''' Mixin to handle database interaction.

        A todo item is a dictionary containing:
        - todo_id - The id of the todo item.
        - todo - The text of the todo item.
        - complete - Whether the item is complete or not.

    '''

    # TODO - this should be set in a flask context.
    def __init__(self, *args, **kwargs):
        super(TodoMixin, self).__init__(*args, **kwargs)
        self.conn = sqlite3.connect('todo.db')
        self.cursor = self.conn.cursor()

    def get_todos(self):
        ''' Get a list of todo items.

            :return: A list of todo dictionaries.
            :rtype: list
        '''

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
        ''' Get a single todo item.

            :param todo_id: The id to look up.
            :return: A single todo item.
            :rtype: dict
        '''

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
        ''' Create a new todo item.

            :param dict todo: The todo to create.
            :return: The new todo id.
            :rtype: int
        '''

        query = ''' INSERT INTO todos(todo, complete) VALUES (?, 0) '''

        self.cursor.execute(query, (todo,))
        todo_id = self.cursor.lastrowid
        self.conn.commit()

        return todo_id

    def update_todo(self, todo_id, todo, complete):
        ''' Update an existing todo item.

            :param int todo_id: The todo to update.
            :param str todo: The updated text.
            :param bool complete: Whether the item is complete or not.
            :return: True on success.
            :rtype: bool
        '''

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
        ''' Delete a todo item.

            :param int todo_id: The id of the item to remove.
            :return: True on success.
            :rtype: bool
        '''

        query = '''
            UPDATE todos
            SET complete = 0
            WHERE id = ?'''
        self.cursor.execute(query, (todo_id, ))
        self.conn.commit()

        return True
