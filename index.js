const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Niestabilnemc</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            min-height: 100vh;
            background-color: #000000;
            color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        .top-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px 40px;
            display: flex;
            justify-content: flex-start;
            gap: 15px;
            background: rgba(0, 0, 0, 0.9);
            border-bottom: 1px solid #1a1a1a;
            z-index: 10;
        }
        .nav-btn {
            background: #111111;
            color: #fff;
            border: 1px solid #333333;
            padding: 10px 22px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: background 0.2s, border-color 0.2s;
        }
        .nav-btn:hover {
            background: #222222;
            border-color: #555555;
        }
        .main-content {
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            letter-spacing: 3px;
            color: #ff5555;
            margin-bottom: 10px;
        }
        p {
            color: #888888;
            font-size: 1.1rem;
        }
        /* Modal */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 100;
        }
        .modal {
            background: #111115;
            border: 2px solid #2a2a35;
            border-radius: 16px;
            padding: 35px;
            width: 90%;
            max-width: 420px;
            text-align: center;
            box-shadow: 0 15px 35px rgba(0,0,0,0.9);
        }
        .modal h2 {
            font-size: 1.8rem;
            margin-bottom: 15px;
            color: #ffffff;
        }
        .modal p {
            color: #cccccc;
            margin-bottom: 25px;
            line-height: 1.5;
        }
        .discord-cta {
            display: inline-block;
            background: #5865F2;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 1rem;
            transition: background 0.2s, transform 0.1s;
            margin-right: 10px;
        }
        .discord-cta:hover {
            background: #4752C4;
            transform: scale(1.02);
        }
        .close-btn {
            background: transparent;
            color: #888888;
            border: 1.5px solid #333333;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: color 0.2s, border-color 0.2s;
        }
        .close-btn:hover {
            color: #ffffff;
            border-color: #666666;
        }
    </style>
</head>
<body>
    <div class="top-nav">
        <button class="nav-btn" id="openDiscord">Discord</button>
    </div>

    <div class="main-content">
        <h1>NIESTABILNEMC</h1>
        <p>Strefa serwera</p>
    </div>

    <div class="modal-overlay" id="discordModal">
        <div class="modal">
            <h2>Discord</h2>
            <p>Dołącz do naszej społeczności, aby być na bieżąco.</p>
            <div>
                <a href="https://discord.gg/niestabilne" target="_blank" class="discord-cta">Przejdź do Discorda</a>
                <button class="close-btn" id="closeDiscord">Zamknij</button>
            </div>
        </div>
    </div>

    <script>
        const openBtn = document.getElementById('openDiscord');
        const closeBtn = document.getElementById('closeDiscord');
        const modal = document.getElementById('discordModal');

        openBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    </script>
</body>
</html>`);
});

app.listen(port, () => console.log(`Server on ${port}`));