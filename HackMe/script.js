document.getElementById('hackButton').addEventListener('click', function() {
    // Largeur et hauteur initiales de la fenêtre
    const windowWidth = 200;
    const windowHeight = 150;
    
    // 1. Ouvre la nouvelle fenêtre
    // Note: Utiliser des dimensions initiales plus petites rend l'effet de redimensionnement plus visible.
    const hackWindow = window.open("", "Hello404Window", `width=${windowWidth},height=${windowHeight},status=no,toolbar=no,menubar=no,location=no`);

    if (hackWindow) {
        // --- Contenu de la fenêtre ---
        const content = `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <title>WTF Hacked!</title>
                <style>
                    /* Centrer le texte Hello404, fond noir, texte vert */
                    body { 
                        margin: 0; 
                        overflow: hidden; 
                        background-color: black; 
                        color: limegreen; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        font-size: 30px; 
                        font-family: monospace; 
                        font-weight: bold;
                    }
                </style>
            </head>
            <body>
                Hello404
            </body>
            </html>
        `;
        hackWindow.document.write(content);
        hackWindow.document.close();
        // -----------------------------

        // 2. Fonction pour faire bouger et redimensionner la fenêtre
        function moveAndResizeWindow() {
            // Calcul de la position aléatoire (doit être dans les limites de l'écran)
            const screenW = window.screen.availWidth;
            const screenH = window.screen.availHeight;

            const newX = Math.floor(Math.random() * (screenW - 100)); // Laisser de l'espace à droite
            const newY = Math.floor(Math.random() * (screenH - 100)); // Laisser de l'espace en bas

            // Calcul de la taille aléatoire (entre 100x100 et 400x400)
            const newW = Math.floor(Math.random() * 300) + 100;
            const newH = Math.floor(Math.random() * 300) + 100;

            try {
                // Déplacement
                hackWindow.moveTo(newX, newY);
                // Redimensionnement
                hackWindow.resizeTo(newW, newH);
            } catch (e) {
                // Ignore l'erreur si le navigateur empêche le déplacement/redimensionnement
                console.log("Le navigateur bloque les fonctions moveTo ou resizeTo.");
            }
        }

        // 3. Déclenche l'effet ultra-rapide (50 millisecondes)
        const intervalId = setInterval(moveAndResizeWindow, 50);

        // 4. Arrête l'effet après 5 secondes
        setTimeout(() => {
            clearInterval(intervalId);
            // Ferme la fenêtre pour finir le "hack" proprement
            try {
                hackWindow.close();
            } catch (e) {
                console.log("Impossible de fermer la fenêtre.");
            }
        }, 5000);

    } else {
        alert("Pop-up bloqué ! Débloquez les pop-ups pour l'effet maximum.");
    }
});
