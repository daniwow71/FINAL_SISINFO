import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken"; // Importar jsonwebtoken
import UserDAO from "./dao/UserDAO.js";
import JuegoDAO from "./dao/JuegoDAO.js";
import KeyDAO from "./dao/KeyDAO.js";
import TransaccionDAO from "./dao/TransaccionDAO.js";
import UserVO from "./vo/UserVO.js";
import TransaccionVO from "./vo/TransaccionVO.js";
import ValoracionVO from "./vo/ValoracionVO.js";
import ValoracionDAO from "./dao/ValoracionDAO.js";
import pool from "./databaseConfig.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.set("port", 4000);

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../")));
app.use(express.static(path.join(__dirname, '/pages')));
app.use(express.static(path.join(__dirname, "../valoraciones")));
app.use(express.static(path.join(__dirname, "../cesta")));


app.use(bodyParser.json());

const userDAO = new UserDAO();
const juegoDAO = new JuegoDAO();
const keyDAO = new KeyDAO();
const transaccionDAO = new TransaccionDAO();
const valoracionDAO = new ValoracionDAO();

const SECRET_KEY = "your_secret_key"; // Define una clave secreta para firmar el token

// Middleware para verificar el token de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/register', async (req, res) => {
  const { username, email, password, birthDate } = req.body;

  console.log('Received data:', { username, email, birthDate }); // Agregar log para verificar los valores recibidos

  try {
    const existingUser = await userDAO.getUserByEmailOrUsername(email, username);
    if (existingUser) {
      return res.status(409).json({ error: 'El email o el nombre de usuario ya existen' });
    }

    const newUser = new UserVO(username, email, password, birthDate);
    console.log('New User:', newUser); // Agregar log para verificar el objeto UserVO
    const addedUser = await userDAO.addUser(newUser);
    res.status(201).json(addedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userDAO.getUserByEmailAndPassword(email, password);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado o contraseña incorrecta' });
    }

    // Generar un token de autenticación con el userName
    const token = jwt.sign({ userName: user.user_name }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token, redirectUrl: '/casoEstudio1' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/add-valoracion', authenticateToken, async (req, res) => {
  const { gameName, valoracion, positiva } = req.body;
  const userName = req.user.userName;
  const fecha = new Date().toISOString().split('T')[0]; // Generar la fecha actual en formato YYYY-MM-DD

  try {
    const newValoracion = new ValoracionVO(null, userName, gameName, valoracion, fecha, positiva);
    const addedValoracion = await valoracionDAO.addValoracion(newValoracion);
    res.status(201).json(addedValoracion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/user-valoraciones', authenticateToken, async (req, res) => {
  const userName = req.user.userName;

  try {
    const valoraciones = await valoracionDAO.getValoracionesByUserName(userName);
    res.status(200).json(valoraciones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/game-valoraciones', async (req, res) => {
  const { gameName } = req.query;

  try {
    const valoraciones = await valoracionDAO.getValoracionesByGameName(gameName);
    res.status(200).json(valoraciones);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/api/account-info', authenticateToken, async (req, res) => {
  try {
    const user = await userDAO.getUserByUsername(req.user.userName);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    // Formatear la fecha de nacimiento para que solo muestre la fecha
    user.birth_date = user.birth_date.toISOString().split('T')[0];
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/update-account', authenticateToken, async (req, res) => {
  try {
    const { user_name, user_mail, birth_date } = req.body;
    const user = await userDAO.getUserByUsername(req.user.userName);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    user.user_name = user_name;
    user.user_mail = user_mail;
    user.birth_date = birth_date;
    const updatedUser = await userDAO.updateUser(user);
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/casoEstudio1/data', async (req, res) => {
  try {
    const juegos = await juegoDAO.getAllJuegos();
    res.status(200).json(juegos);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/casoEstudio1', (req, res) => {
  res.sendFile(path.join(__dirname, "../casoEstudio1.html"));
});

// Función para generar una clave aleatoria de 10 dígitos
function generateGameKey() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Ruta para obtener la información del juego
app.get('/api/game-info', async (req, res) => {
  const { gameName } = req.query;
  try {
    const game = await juegoDAO.getGameByName(gameName);
    if (!game) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    res.status(200).json(game);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Ruta para proceder al pago y generar claves
app.post('/proceed-to-payment', authenticateToken, async (req, res) => {
  const { gameName } = req.body;
  const keyOwner = req.user.userName;
  const fecha = new Date().toISOString().split('T')[0]; // Generar la fecha actual en formato YYYY-MM-DD

  try {
    // Generar una clave aleatoria
    const gameKey = generateGameKey();

    // Crear una nueva transacción
    const newTransaccion = new TransaccionVO(null, keyOwner, gameName, fecha);
    await transaccionDAO.addTransaccion(newTransaccion);

    // Añadir la clave del juego
    await keyDAO.addKey(gameKey, gameName, keyOwner);

    res.status(201).json({ gameKey });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Ruta para obtener el historial de transacciones de un usuario
app.get('/api/transaction-history', authenticateToken, async (req, res) => {
  const userName = req.user.userName;
  try {
    const transactions = await transaccionDAO.getTransaccionesByUserName(userName);
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Ruta para obtener los juegos en posesión de un usuario
app.get('/api/owned-games', authenticateToken, async (req, res) => {
  const userName = req.user.userName;
  try {
    const keys = await keyDAO.getKeysByOwner(userName);
    const gameDetails = await Promise.all(keys.map(async key => {
      const game = await juegoDAO.getGameByName(key.game_name);
      return { ...game, game_key: key.game_key };
    }));
    res.status(200).json(gameDetails);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.delete('/api/return-transaction', authenticateToken, async (req, res) => {
  const { transactionId } = req.body;
  try {
    // Eliminar la transacción
    await transaccionDAO.deleteTransaccion(transactionId);

    // Eliminar la clave del juego
    await keyDAO.deleteKeyByGameNameAndOwner(req.body.gameName, req.user.userName);

    res.status(200).send('Transacción devuelta con éxito');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./pages/login.html")));
app.get("/register", (req, res) => res.sendFile(path.join(__dirname, "./pages/register.html")));
app.get(/style.css/, (req, res) => res.sendFile(path.join(__dirname, "./public/style.css")));
app.get/'/valoracion.html', (req, res) => res.sendFile(path.join(__dirname, ".,/valoraciones/valoracion.html"));

app.listen(app.get("port"), () => {
  console.log(`Server corriendo en puerto ${app.get("port")}`);
});

export default pool;