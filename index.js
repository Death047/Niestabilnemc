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
            top: 0; left: 0; width: 100%;
            padding: 20px 40px;
            display: flex; justify-content: space-between; align-items: center;
            background: rgba(0, 0, 0, 0.9);
            border-bottom: 1px solid #1a1a1a;
            z-index: 10;
        }
        .status-pill {
            display: flex; align-items: center; gap: 8px;
            background: rgba(20, 20, 25, 0.8); border: 1px solid #222233;
            padding: 8px 16px; border-radius: 20px; font-size: 0.85rem; color: #aaa; font-family: monospace;
        }
        .dot {
            width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%;
            box-shadow: 0 0 8px #22c55e; animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1); }
        }
        .nav-btn {
            background: #111111; color: #fff; border: 1px solid #333333;
            padding: 10px 22px; border-radius: 8px; cursor: pointer; font-size: 1rem;
            transition: background 0.2s, border-color 0.2s;
        }
        .nav-btn:hover { background: #222222; border-color: #555555; }
        
        .hero { text-align: center; margin-bottom: 40px; }
        h1 { font-size: 3rem; letter-spacing: 3px; color: #ff5555; margin-bottom: 10px; }
        p { color: #888888; font-size: 1.1rem; }
        
        .modes-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
            width: 90%;
            max-width: 900px;
            margin-bottom: 50px;
        }
        .mode-card {
            background: #0d0d12;
            border: 1px solid #222233;
            border-radius: 12px;
            padding: 30px 20px;
            text-align: center;
            cursor: pointer;
            transition: transform 0.2s, border-color 0.2s, background 0.2s;
        }
        .mode-card:hover {
            transform: translateY(-5px);
            border-color: #ff5555;
            background: #13131c;
        }
        .mode-card h3 { color: #fff; font-size: 1.4rem; margin-bottom: 10px; }
        .mode-card p { color: #888; font-size: 0.95rem; }
        .mode-card.mystery h3 { color: #a855f7; }
        
        /* Modal detali trybu */
        .info-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); display: none; justify-content: center; align-items: center; z-index: 100;
        }
        .info-box {
            background: #111115; border: 2px solid #2a2a35; border-radius: 16px;
            padding: 35px; width: 90%; max-width: 480px; text-align: center;
        }
        .info-box h2 { color: #ff5555; margin-bottom: 15px; font-size: 1.8rem; }
        .info-box p { color: #ccc; margin-bottom: 25px; line-height: 1.6; text-align: left; white-space: pre-line; }
        .ip-box-modal {
            background: #000; border: 1px dashed #55ff55; color: #55ff55;
            padding: 10px 15px; border-radius: 8px; font-family: monospace;
            font-size: 1rem; margin-bottom: 20px; cursor: pointer; text-align: center;
            transition: background 0.2s;
        }
        .ip-box-modal:hover { background: #0a1f0a; }
        .modal-close {
            background: transparent; color: #fff; border: 1px solid #444;
            padding: 10px 25px; border-radius: 8px; cursor: pointer; transition: 0.2s;
        }
        .modal-close:hover { background: #222; border-color: #666; }

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
        .discord-cta:hover { background: #4752C4; }
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
        <p>Wybierz tryb rozgrywki:</p>
    </div>

    <div class="modes-grid">
        <div class="mode-card" data-mode="ffa">
            <h3>Niestabilne FFA</h3>
            <p>Kliknij po szczegóły</p>
        </div>
        <div class="mode-card" data-mode="smp">
            <h3>Niestabilne SMP</h3>
            <p>Kliknij po szczegóły</p>
        </div>
        <div class="mode-card mystery" data-mode="mystery">
            <h3>???</h3>
            <p>Nieznane przeznaczenie</p>
        </div>
    </div>

    <!-- Modal detali trybu -->
    <div class="info-overlay" id="infoOverlay">
        <div class="info-box">
            <h2 id="infoTitle">Tytuł</h2>
            <div id="ipContainer">
                <div class="ip-box-modal" id="infoIp">niestabilneffa.6mc.pl (kliknij, aby skopiować)</div>
            </div>
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
        document.addEventListener('DOMContentLoaded', () => {
            const openDiscord = document.getElementById('openDiscord');
            const closeDiscord = document.getElementById('closeDiscord');
            const discordModal = document.getElementById('discordModal');
            
            if (openDiscord && discordModal) {
                openDiscord.addEventListener('click', () => discordModal.style.display = 'flex');
                closeDiscord.addEventListener('click', () => discordModal.style.display = 'none');
                discordModal.addEventListener('click', (e) => { if(e.target === discordModal) discordModal.style.display = 'none'; });
            }

            const modeData = {
                ffa: {
                    title: 'Niestabilne FFA',
                    ip: 'niestabilneffa.6mc.pl',
                    desc: '• Odbierasz kit i idziesz na arenę walczyć\n• Kity premium\n• Losowe areny\n• Event karty\n• Minieventy: meteoryt, happyhours, Mace off'
                },
                smp: {
                    title: 'Niestabilne SMP',
                    ip: 'niestabilneffa.6mc.pl',
                    desc: '• Tryb, w którym nagrywane są filmy z historii niestabilnego gracza ogon_.'
                },
                mystery: {
                    title: '???',
                    showIp: false,
                    desc: 'Jeszcze niedostępne.'
                }
            };

            const infoOverlay = document.getElementById('infoOverlay');
            const infoTitle = document.getElementById('infoTitle');
            const ipContainer = document.getElementById('ipContainer');
            const infoIp = document.getElementById('infoIp');
            const infoDesc = document.getElementById('infoDesc');
            const closeInfo = document.getElementById('closeInfo');

            if (infoIp) {
                infoIp.addEventListener('click', () => {
                    navigator.clipboard.writeText('niestabilneffa.6mc.pl');
                    alert('Skopiowano IP: niestabilneffa.6mc.pl');
                });
            }

            document.querySelectorAll('.mode-card').forEach(card => {
                card.addEventListener('click', () => {
                    const mode = card.dataset.mode;
                    const data = modeData[mode];
                    if (!data) return;
                    infoTitle.textContent = data.title;
                    infoDesc.textContent = data.desc;
                    if (data.showIp === false) {
                        ipContainer.style.display = 'none';
                    } else {
                        ipContainer.style.display = 'block';
                        infoIp.textContent = (data.ip || 'niestabilneffa.6mc.pl') + ' (kliknij, aby skopiować)';
                    }
                    infoOverlay.style.display = 'flex';
                });
            });

            if (closeInfo && infoOverlay) {
                closeInfo.addEventListener('click', () => infoOverlay.style.display = 'none');
                infoOverlay.addEventListener('click', (e) => { if(e.target === infoOverlay) infoOverlay.style.display = 'none'; });
            }
        });
    </script>
</body>
</html>`);
});

app.listen(port, () => console.log(`Server on ${port}`));