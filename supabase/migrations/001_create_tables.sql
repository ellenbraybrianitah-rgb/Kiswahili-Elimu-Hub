-- SQL script to create tables with RLS policies and indexes for the Kiswahili-Elimu-Hub project

-- Create students table
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create lessons table
CREATE TABLE lessons (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create progress table
CREATE TABLE progress (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    lesson_id INT REFERENCES lessons(id),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create interactions table
CREATE TABLE interactions (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    lesson_id INT REFERENCES lessons(id),
    interaction_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_student_email ON students(email);
CREATE INDEX idx_progress_student ON progress(student_id);
CREATE INDEX idx_interactions_student ON interactions(student_id);

-- Enable Row Level Security (RLS)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE interactions ENABLE ROW LEVEL SECURITY;

-- RLS policies can be defined here, e.g.:
-- CREATE POLICY select_policy ON students FOR SELECT TO public;
