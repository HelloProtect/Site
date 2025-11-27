document.getElementById('hackButton').addEventListener('click', function() {
    // Paramètres de la fenêtre pop-up
    const windowWidth = 600;
    const windowHeight = 400;

    // 1. Ouvre la nouvelle fenêtre
    const hackWindow = window.open("", "Hello404Window", `width=${windowWidth},height=${windowHeight},status=no,toolbar=no,menubar=no,location=no`);

    if (hackWindow) {
        // --- Contenu de la fenêtre (identique à avant, pour afficher "Hello404") ---
        const content = `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <title>Hacked!</title>
                <style>
                    body { margin: 0; overflow: hidden; background-color: black; color: green; display: flex; justify-content: center; align-items: center; font-size: 50px; font-family: monospace; }
                </style>
            </head>
            <body>
                Hello404
            </body>
            </html>
        `;
        hackWindow.document.write(content);
        hackWindow.document.close();
        // --------------------------------------------------------------------------

        // 2. Fonction pour faire bouger la fenêtre
        function moveWindow() {
            // Calcule une position X et Y aléatoire
            const screenW = window.screen.availWidth - windowWidth;
            const screenH = window.screen.availHeight - windowHeight;
            
            const newX = Math.floor(Math.random() * screenW);
            const newY = Math.floor(Math.random() * screenH);

            // Déplace la fenêtre vers cette nouvelle position
            try {
                hackWindow.moveTo(newX, newY);
            } catch (e) {
                // Ignore l'erreur si le navigateur empêche le déplacement
                console.log("Le navigateur bloque la fonction moveTo.");
            }
        }

        // 3. Déclenche le mouvement toutes les 100 millisecondes
        const intervalId = setInterval(moveWindow, 100);

        // Optionnel: Arrête le mouvement après 5 secondes (pour ne pas être trop intrusif)
        setTimeout(() => {
            clearInterval(intervalId);
        }, 5000);

    } else {
        alert("Pop-up bloqué ! Débloquez les pop-ups pour voir l'effet 'hack'.");
    }
});
