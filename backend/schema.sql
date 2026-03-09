CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'approver', 'employee'))
);

CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  uploaded_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, role)
VALUES
  ('Admin User', 'admin@example.com', 'admin'),
  ('Approver User', 'approver@example.com', 'approver'),
  ('Employee User', 'employee@example.com', 'employee')
ON CONFLICT (email) DO NOTHING;
