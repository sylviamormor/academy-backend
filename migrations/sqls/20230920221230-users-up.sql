/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    password VARCHAR NOT NULL,
    dob DATE DEFAULT '1/18/2002',
    address VARCHAR(100) DEFAULT 'area',
    university VARCHAR(100) DEFAULT 'school',
    course VARCHAR(100) DEFAULT 'program',
    cgpa NUMERIC DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
)