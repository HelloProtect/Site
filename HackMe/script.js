document.getElementById('hackButton').addEventListener('click', function() {
    // 1. Ouvre une nouvelle fenêtre de petite taille
    const newWindow = window.open("", "Hello404Window", "width=600,height=400,status=no,toolbar=no,menubar=no,location=no");

    // Vérifie si l'ouverture a réussi (parfois bloquée par les navigateurs)
    if (newWindow) {
        // 2. Définit le contenu de la nouvelle fenêtre
        const content = `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <title>Hacked!</title>
                <style>
                    /* Reprend le CSS d'animation du fichier style.css */
                    body { margin: 0; overflow: hidden; background-color: black; }
                    .moving-text {
                        position: absolute;
                        font-size: 50px;
                        font-family: monospace;
                        color: green;
                        text-shadow: 0 0 5px green;
                        animation: moveRandomly 3s infinite alternate;
                    }
                    @keyframes moveRandomly {
                        0% { top: 10%; left: 10%; transform: rotate(0deg); }
                        100% { top: 80%; left: 80%; transform: rotate(360deg); }
                    }
                </style>
            </head>
            <body>
                <div class="moving-text">Hello404</div>
            </body>
            </html>
        `;

        // Écrit le contenu dans la nouvelle fenêtre
        newWindow.document.write(content);
        newWindow.document.close();
    } else {
        alert("Pop-up bloqué ! Débloquez les pop-ups pour voir l'effet 'hack'.");
    }
});
