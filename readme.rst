======================
React Redux Flaks Todo
======================

This is for example purposes only. It is a complemtary example to the slides
found here: http://slides.com/gpeterson/deck#/

This has nothing to do with http://todomvc.com/ I haven't made any attempt to
copy the css and specifically wanted to handle ajax interaction. If anything
that might make this code more complicated than it probably should be.

It is somewhat inspired by this: http://redux.js.org/docs/basics/ExampleTodoList.html

Check the backend and frontened directories for setup instructions for each
section.

===
FAQ
===

**Why do you have both a TodoCreateForm and a TodoEditFrom? Can't you combine
those somehow?**

Yes, you can. The main explanation is that things were simpler to setup this
way. I wanted to have a "create" form at the top of the main todo list, but
then also have the edit form as it's own "page". For a more complicated form
you could look into merging these files, or factor out the form element to
limit code duplication.

**Why does each form element have a "show" variable?**

There are two main reason 1) The initial presentation this example was created
for was to people with lots of jQuery experience, and so I wanted to show how
in React it's often easier to just not render an element as apposed to using
classes to show/hide it. 2) I wanted to have an example of components
interacting via redux. It is perhaps not the best example usage, but it worked
for the overall example project.

**OK, why don't you use a routing library to do that?**

It might not have added much complexity to project, but it was beyond the
scope of the concepts I wanted to show off.

**Why not use es6 classes?**

When assigning handlers you can't just do::

    onClick={this.handler}

Instead you have to do something like this::

    onClick={() => {this.handler()} }

Which I feel complicates the example.

**Why don't you ever assign "propTypes"?**

Again, I felt it complicated the example. FYI Those checks are disabled
when not in development mode.

**Why are you using the sqlite3 library directory in the backend code?**

I made this project as an example of ajax usage with React Redux, if I
were trying to make a project that was used in production I would have used
sqlalchemy and migrations to setup the database.
