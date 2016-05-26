'''
    Simple Flask application for handling a JSON REST backend.

    I used the MethodView mostly to try it out, but also becasue it seemed
    to more easily map to the general REST structure. Using function based
    views would probably have required more code.
'''

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
)
from flask.views import MethodView
from mixins import TodoMixin

app = Flask(__name__)


@app.route('/')
def index():
    ''' Renders the main page. '''

    return render_template('todo.html')


@app.route('/todo')
class TodoApi(MethodView, TodoMixin):
    ''' JSON REST Api. '''

    def get(self, todo_id):
        ''' Returns todo items.

            If todo_id is supplied only that item will be returned. If it
            is not supplied then all items will be returned.
        '''

        if todo_id is None:
            # return a list of todos

            todos = self.get_todos()
            return jsonify(todos=todos)
        else:
            # expose a single todo

            todo = self.get_todo(todo_id)
            return jsonify(todo=todo)

    def post(self):
        ''' Submits a new todo item.

            Assumes that data will be supplied as a JSON payload.
        '''

        values = request.json
        todo = values['todo']

        todo_id = self.create_todo(todo)

        todo = self.get_todo(todo_id)

        return jsonify(todo=todo)

    def put(self, todo_id):
        ''' Updates an existing todo item.

            Assumes that data will be supplied as a JSON payload.
        '''

        values = request.json
        todo = values['todo']
        todo_text = todo['todo']
        complete = todo['complete']

        self.update_todo(todo_id, todo_text, complete)

        todo = self.get_todo(todo_id)
        return jsonify(todo=todo)

    def delete(self, todo_id):
        ''' Deletes an existing todo item.

            *Note* In a production app todo_id should not be supplied
            as a URL parameter.
        '''

        self.delete_todo(todo_id)

        return jsonify(success=True)

user_view = TodoApi.as_view('todo_api')
app.add_url_rule('/todos/', defaults={'todo_id': None},
                 view_func=user_view, methods=['GET'])
app.add_url_rule('/todos/', view_func=user_view, methods=['POST'])
app.add_url_rule('/todos/<int:todo_id>', view_func=user_view,
                 methods=['GET', 'PUT', 'DELETE'])


@app.route('/<path:wildcard>')
def wildcard(wildcard):
    ''' Renders the main page for frontend routes. '''

    return render_template('todo.html')


if __name__ == '__main__':
    app.run(debug=True,
            port=7000,
            host='0.0.0.0')
