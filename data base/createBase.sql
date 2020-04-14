CREATE TABLE db_accounts
(
    Id SERIAL PRIMARY KEY,
    Name CHARACTER VARYING(30) UNIQUE,
	  Password VARCHAR(30)
);

CREATE TABLE db_chars
(
    Id SERIAL PRIMARY KEY,
    Name CHARACTER VARYING(30) UNIQUE,
    account_name INTEGER,
	  foreign key (account_name) references db_accounts
);




INSERT INTO db_accounts (Name, Password) VALUES ('ADMIN', 'ADMIN');
INSERT INTO db_chars (Name, account_name) VALUES ('ADMIN', 'ADMIN');



INSERT INTO db_chars (Name, account_name) VALUES ('Lucian4', "НАЙТИ АЙДИ"  );
"ИЩЕМ АЙДИ"
select id from  db_accounts where Name = 'us1'
