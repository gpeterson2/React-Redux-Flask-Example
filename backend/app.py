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
    return render_template('todo.html')


@app.route('/todo')
class TodoApi(MethodView, TodoMixin):

    def get(self, todo_id):
        if todo_id is None:
            # return a list of todos

            todos = self.get_todos()
            return jsonify(todos=todos)
        else:
            # expose a single todo

            todo = self.get_todo(todo_id)
            return jsonify(todo=todo)

    def post(self):
        # create a new todo

        values = request.json
        todo = values['todo']

        todo_id = self.create_todo(todo)

        todo = self.get_todo(todo_id)

        return jsonify(todo=todo)

    def put(self, todo_id):
        # update a single todo

        values = request.json
        todo = values['todo']
        todo_text = todo['todo']
        complete = todo['complete']

        self.update_todo(todo_id, todo_text, complete)

        todo = self.get_todo(todo_id)
        return jsonify(todo=todo)

    def delete(self, todo_id):
        # delete a single todo

        self.delete_todo(todo_id)

        return jsonify(success=True)

user_view = TodoApi.as_view('todo_api')
app.add_url_rule('/todos/', defaults={'todo_id': None},
                 view_func=user_view, methods=['GET'])
app.add_url_rule('/todos/', view_func=user_view, methods=['POST'])
app.add_url_rule('/todos/<int:todo_id>', view_func=user_view,
                 methods=['GET', 'PUT', 'DELETE'])

if __name__ == '__main__':
    app.run(debug=True,
            port=7000,
            host='0.0.0.0')
