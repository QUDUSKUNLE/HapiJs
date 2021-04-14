psql "dbname=koa options=--search_path=koaschema"

CREATE TABLE IF NOT EXISTS koaschema.users(
  id serial PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email TEXT NOT NULL UNIQUE,
  phone_number VARCHAR(11) NOT NULL,
  is_Admin BOOLEAN,
  pass TEXT,
  created_at timestamp with timezone DEFAULT now() NOT NULL,
  updated_at timestamp with timezone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS koaschema.parties(
  id serial PRIMARY KEY,
  user_id int references koaschema.users id,
  party_name TEXT NOT NULL UNIQUE,
  hq_address TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS koaschema.offices(
  id serial PRIMARY KEY,
  user_id int references koaschema.users id,
  office_name TEXT NOT NULL,
  office_type TEXT NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp DEFAULT now() NOT NULL
)
