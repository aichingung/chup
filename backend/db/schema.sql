
psqlstart="sudo service postgresql start"
psqlstop="sudo service postgresql stop"
psqlstatus="sudo service postgresql status"
psql="sudo -u postgres psql"

CREATE DATABASE chup;

\c chup

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT,
    email TEXT,
    phone_num TEXT,
    password TEXT,
    profile_pic TEXT,
    credits TEXT
);

CREATE TABLE chuppers(
    id SERIAL PRIMARY KEY,
    username TEXT,
    ic TEXT,
    email TEXT,
    phone_num TEXT,
    password TEXT,
    profile_pic TEXT
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    name TEXT,
    lat TEXT,
    lng TEXT,
    address TEXT,
    date TEXT,
    time TEXT,
    remark TEXT,
    status TEXT,
    price TEXT,
    duration TEXT
);

INSERT INTO users(username, email, phone_num, password, profile_pic, credits)
VALUES('heri','chup@gmail.com','012-3456789','pudding','https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg', '1000');

INSERT INTO users(username, email, phone_num, password, profile_pic, credits)
VALUES('aiman','chupOne@gmail.com','012-3456789','pudding','https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg', '1000');

INSERT INTO chuppers(username, ic, email, phone_num, password, profile_pic)
VALUES('aiching', '981212-14-0112','chupper@gmail.com','012-3456789','pudding','https://preppykitchen.com/wp-content/uploads/2019/06/Chocolate-cake-recipe-1200a.jpg');

INSERT INTO tasks(lat, lng, address, date, time, remark, status)
VALUES('3.140853', '101.693207','Kuala Lumpur','12/7/2022','10:50am','new task', 'completed');

INSERT INTO tasks(lat, lng, address, date, time, remark, status)
VALUES('3.140853', '101.693207','Kuala Lumpur','12/7/2022','10:50am','new task', 'pending');

INSERT INTO tasks(lat, lng, address, date, time, remark, status)
VALUES('3.140853', '101.693207','Kuala Lumpur','12/7/2022','10:50am','new task', 'ongoing');

select * from tasks where status='completed';


update tasks set status = 'pending' where id = 1;

UPDATE dishes set name= 'chips' WHERE id =2;

drop table tasks;