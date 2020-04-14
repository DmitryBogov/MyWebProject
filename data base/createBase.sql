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





