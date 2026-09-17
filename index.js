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
            align-items: center;
            padding-top: 100px;
            position: relative;
        }
        .top-nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            padding: 20px 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, 0.9);
            border-bottom: 1px solid #1a1a1a;
            z-index: 10;
        }
        .status-pill {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(20, 20, 25, 0.8);
            border: 1px solid #222233;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85rem;
            color: #aaa;
            font-family: monospace;
        }
        .dot {
            width: 8px;
            height: 8px;
            background-color: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 8px #22c55e;
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
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
        .nav-btn:hover { background: #222222; border-color: #555555; }
        
        .hero { text-align: center; margin-bottom: 40px; }
        h1 { font-size: 3rem; letter-spacing: 3px; color: #ff5555; margin-bottom: 10px; }
        p { color: #888888; font-size: 1.1rem; }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 20px;
            width: 90%;
            max-width: 900px;
            margin-bottom: 50px;
        }
        .feature-card {
            background: #0d0d12;
            border: 1px solid #222233;
            border-radius: 12px;
            padding: 25px 20px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s, border-color 0.2s, background 0.2s;
        }
        .feature-card:hover {
            transform: translateY(-5px);
            border-color: #ff5555;
            background: #13131c;
        }
        .feature-card h3 { color: #fff; font-size: 1.2rem; margin-bottom: 8px; }
        .feature-card span { color: #ff5555; font-family: monospace; font-size: 0.9rem; }
        
        /* Modal detali mechanik */
        .info-overlay {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85);
            display: none; justify-content: center; align-items: center; z-index: 100;
        }
        .info-box {
            background: #111115; border: 2px solid #2a2a35; border-radius: 16px;
            padding: 30px; width: 90%; max-width: 450px; text-align: center;
        }
        .info-box h2 { color: #ff5555; margin-bottom: 15px; }
        .info-box p { color: #ccc; margin-bottom: 25px; line-height: 1.6; }
        .cmd-code {
            background: #000; border: 1px dashed #444; padding: 8px 14px;
            border-radius: 6px; font-family: monospace; color: #55ff55; display: inline-block; margin-bottom: 20px;
        }
        .modal-close {
            background: transparent; color: #fff; border: 1px solid #444;
            padding: 10px 25px; border-radius: 8px; cursor: pointer;
        }

        /* Modal Discord */
        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.85); display: none; justify-content: center; align-items: center; z-index: 100;
        }
        .modal {
            background: #111115; border: 2px solid #2a2a35; border-radius: 16px;
            padding: 35px; width: 90%; max-width: 420px; text-align: center;
        }
        .modal h2 { font-size: 1.8rem; margin-bottom: 15px; color: #ffffff; }
        .modal p { color: #cccccc; margin-bottom: 25px; line-height: 1.5; }
        .discord-cta {
            display: inline-block; background: #5865F2; color: #ffffff; text-decoration: none;
            padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 1rem; margin-right: 10px;
        }
        .close-btn {
            background: transparent; color: #888888; border: 1.5px solid #333333;
            padding: 12px 20px; border-radius: 8px; cursor: pointer; font-size: 1rem;
        }
    </style>
</head>
<body>
    <div class="top-nav">
        <div class="status-pill">
            <div class="dot"></div>
            <span>ONLINE • 1.21.x</span>
        </div>
        <button class="nav-btn" id="openDiscord">Discord</button>
    </div>

    <div class="hero">
        <h1>NIESTABILNEMC</h1>
        <p>Wybierz moduł serwera, aby poznać szczegóły:</p>
    </div>

    <div class="features-grid">
        <div class="feature-card" data-title="FFA PvP" data-cmd="/ffa" data-desc="Arenowa rzeź z szybkim respawnem, losowym kitz i dynamicznym rankingiem killów.">
            <h3>⚔️ FFA PvP</h3>
            <span>/ffa</span>
        </div>
        <div class="feature-card" data-title="Meteoryt" data-cmd="/meteoryt" data-desc="Kataklizm w losowym miejscu na mapie z rzadkimi surowcami i dropami dla szybkiego zbieracza.">
            <h3>☄️ Meteoryt</h3>
            <span>/meteoryt</span>
        </div>
        <div class="feature-card" data-title="Karty Bitwy" data-cmd="/kartybitwa" data-desc="Taktyczny system modyfikatorów i zagrywek bojowych w trakcie potyczek z innymi graczami.">
            <h3>🃏 Karty Bitwy</h3>
            <span>/kartybitwa</span>
        </div>
        <div class="feature-card" data-title="Osiągnięcia" data-cmd="/osiągnięcia" data-desc="GUI pełne wyzwań, unikalnych tytułów i nagród za postępy na edycji.">
            <h3>🏆 Osiągnięcia</h3>
            <span>/osiągnięcia</span>
        </div>
    </div>

    <!-- Modal szczegółów modułu -->
    <div class="info-overlay" id="infoOverlay">
        <div class="info-box">
            <h2 id="infoTitle">Tytuł</h2>
            <div class="cmd-code" id="infoCmd">/komenda</div>
            <p id="infoDesc">Opis</p>
            <button class="modal-close" id="closeInfo">Zamknij</button>
        </div>
    </div>

    <!-- Modal Discord -->
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
        // Discord modal
        const openDiscord = document.getElementById('openDiscord');
        const closeDiscord = document.getElementById('closeDiscord');
        const discordModal = document.getElementById('discordModal');
        openDiscord.addEventListener('click', () => discordModal.style.display = 'flex');
        closeDiscord.addEventListener('click', () => discordModal.style.display = 'none');
        discordModal.addEventListener('click', (e) => { if(e.target === discordModal) discordModal.style.display = 'none'; });

        // Feature info modal
        const infoOverlay = document.getElementById('infoOverlay');
        const infoTitle = document.getElementById('infoTitle');
        const infoCmd = document.getElementById('infoCmd');
        const infoDesc = document.getElementById('infoDesc');
        const closeInfo = document.getElementById('closeInfo');

        document.querySelectorAll('.feature-card').data = {};
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', () => {
                infoTitle.textContent = card.dataset.title;
                infoCmd.textContent = card.dataset.cmd;
                infoDesc.textContent = card.dataset.desc;
                infoOverlay.style.display = 'flex';
            });
        });
        closeInfo.addEventListener('click', () => infoOverlay.style.display = 'none');
        infoOverlay.addEventListener('click', (e) => { if(e.target === infoOverlay) infoOverlay.style.display = 'none'; });
    </script>
</body>
</html>`);
});

app.listen(port, () => console.log(`Server on ${port}`));