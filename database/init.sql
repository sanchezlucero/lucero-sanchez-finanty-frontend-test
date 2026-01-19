CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    external_id INTEGER UNIQUE NOT NULL, -- ID original de la API
    name VARCHAR(255) NOT NULL,
    image_url TEXT,
    type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);