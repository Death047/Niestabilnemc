const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Udostępnianie plików statycznych z folderu 'public' (tło ląduje w /public/bg.jpg)
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niestabilnemc</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url('/bg.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: #ffffff;
            position: relative;
        }
        /* Ciemna warstwa overlay, żeby tekst był czytelny */
        body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 1;
        }
        .container {
            position: relative;
            z-index: 2;
            background: rgba(20, 20, 20, 0.85);
            padding: 40px;
            border-radius: 16px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
            text-align: center;
            max-width: 500px;
            width: 90%;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
            letter-spacing: 2px;
            color: #ff5555;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        p {
            color: #cccccc;
            margin-bottom: 25px;
            font-size: 1.1rem;
        }
        .ip-box {
            background: rgba(0, 0, 0, 0.5);
            border: 1px dashed rgba(255, 255, 255, 0.3);
            padding: 12px 20px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 1.1rem;
            color: #55ff55;
            cursor: pointer;
            transition: background 0.3s;
        }
        .ip-box:hover {
            background: rgba(0, 0, 0, 0.8);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>NIESTABILNEMC</h1>
        <p>Witaj na oficjalnej stronie serwera!</p>
        <div class="ip-box" onclick="navigator.clipboard.writeText('niestabilnemc.pl'); alert('Skopiowano IP serwera!');">
            niestabilnemc.pl (kliknij, aby skopiować)
        </div>
    </div>
</body>
</html>`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});