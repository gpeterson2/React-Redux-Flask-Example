=====
Setup
=====

Run this to setup the temp db::

    sqlite3 todo.db < sql/create.sql

"todo.db" should be in the main backend directory. I could setup migrations
etc., but for this simple example it's not worth the effort.

Run this to setup the requirements::

    pip install -r requirements.txt

============
Run the Site
============

Run::

    python app.py
