import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import pkg from 'pg';

const { Pool } = pkg;

// Fix para __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuración del servidor
const app = express();
app.set("port", 4000);

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../")));

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());

// Configuración de la base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'P_SIS_INFOR_1',
  password: 'Pfev13C!',
  port: 3999,
});

// Ruta para manejar el registro de usuarios
app.post('/register', async (req, res) => {
  const { username, email, password, confirmDate } = req.body;

  try {
    // Verificar si el email o el nombre de usuario ya existen
    const userCheck = await pool.query(
      'SELECT * FROM "USER" WHERE user_mail = $1 OR user_name = $2',
      [email, username]
    );

    if (userCheck.rows.length > 0) {
      // Si el email o el nombre de usuario ya existen, responder con un error
      return res.status(409).json({ error: 'El email o el nombre de usuario ya existen' });
    }

    // Insertar el nuevo usuario en la base de datos
    const result = await pool.query(
      'INSERT INTO "USER" (user_name, user_mail, user_password, birth_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, password, confirmDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Ruta para manejar el inicio de sesión de usuarios
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM "USER" WHERE user_mail = $1 AND user_password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      // Si no se encuentra ningún usuario con el email y contraseña proporcionados
      return res.status(401).json({ error: 'Usuario no encontrado o contraseña incorrecta' });
    }

    // Si se encuentra el usuario, redirigir a la página principal
    res.status(200).json({ message: 'Inicio de sesión exitoso', redirectUrl: '/casoEstudio1' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Ruta de prueba para verificar la conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Database Connection Error');
  }
});

// Ruta para obtener los datos de los juegos en formato JSON
app.get('/casoEstudio1/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "JUEGO"');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Ruta para renderizar la página casoEstudio1.html
app.get('/casoEstudio1', (req, res) => {
  res.sendFile(path.join(__dirname, "../casoEstudio1.html"));
});

// Ruta para manejar la inserción en la tabla KEY
app.post('/proceed-to-payment', async (req, res) => {
  const { gameName, keyOwner } = req.body;

  // Generar un número aleatorio de 10 cifras
  const gameKey = Math.floor(1000000000 + Math.random() * 9000000000);

  try {
    const result = await pool.query(
      'INSERT INTO "KEY" (game_key, game_name, key_owner) VALUES ($1, $2, $3) RETURNING *',
      [gameKey, gameName, keyOwner]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Rutas
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "pages", "login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "pages", "register.html")));
app.get(/style.css/, (req, res) => res.sendFile(path.join(__dirname, "public", "style.css")));

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log("Server corriendo en puerto", app.get("port"));
});

export default pool;