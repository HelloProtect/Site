document.getElementById('hackButton').addEventListener('click', function() {
    
    let intervalId;
    let keepOpen = true; // Variable de contrôle principale
    
    // Fonction pour ouvrir et initialiser la fenêtre "hack"
    function openHackWindow() {
        if (!keepOpen) return; // Si l'utilisateur a arrêté le processus, ne rien faire

        const windowWidth = 200;
        const windowHeight = 150;
        
        // Ouvre la nouvelle fenêtre (nommée "Hello404Window")
        const hackWindow = window.open("", "Hello404Window", `width=${windowWidth},height=${windowHeight},status=no,toolbar=no,menubar=no,location=no`);

        if (hackWindow) {
            // Contenu de la fenêtre : Hello404 ET un bouton pour l'arrêter
            const content = `
                <!DOCTYPE html>
                <html lang="fr">
                <head>
                    <title>WTF Hacked!</title>
                    <style>
                        /* Centrer le texte Hello404 et le bouton d'arrêt */
                        body { 
                            margin: 0; 
                            overflow: hidden; 
                            background-color: black; 
                            color: limegreen; 
                            display: flex; 
                            flex-direction: column;
                            justify-content: center; 
                            align-items: center; 
                            font-family: monospace; 
                            font-weight: bold;
                        }
                        .message {
                            font-size: 30px;
                            margin-bottom: 10px;
                        }
                        #stopButton {
                            padding: 5px 15px;
                            background-color: red;
                            color: white;
                            border: 1px solid white;
                            cursor: pointer;
                        }
                    </style>
                </head>
                <body>
                    <div class="message">Hello404</div>
                    <button id="stopButton" onclick="window.opener.stopHack()">CLIQUER POUR ARRÊTER</button>
                </body>
                </html>
            `;
            hackWindow.document.write(content);
            hackWindow.document.close();
            
            // Fonction pour faire bouger et redimensionner (le même effet "WTF")
            function moveAndResizeWindow() {
                const screenW = window.screen.availWidth;
                const screenH = window.screen.availHeight;
                const newX = Math.floor(Math.random() * (screenW - 100));
                const newY = Math.floor(Math.random() * (screenH - 100));
                const newW = Math.floor(Math.random() * 300) + 100;
                const newH = Math.floor(Math.random() * 300) + 100;

                try {
                    hackWindow.moveTo(newX, newY);
                    hackWindow.resizeTo(newW, newH);
                } catch (e) {
                    // Ignore les erreurs de navigateur
                }
            }

            // Démarrage du mouvement
            intervalId = setInterval(moveAndResizeWindow, 50);
            
            // Mise en place de l'écouteur de fermeture
            const checkClosedInterval = setInterval(() => {
                // Si la fenêtre est fermée par l'utilisateur...
                if (hackWindow.closed) {
                    clearInterval(intervalId);       // Arrête le mouvement
                    clearInterval(checkClosedInterval); // Arrête cette vérification
                    if (keepOpen) {
                         // ...on la rouvre immédiatement !
                        openHackWindow();
                    }
                }
            }, 500); // Vérifie toutes les 0.5 secondes

        } else {
            alert("Pop-up bloqué ! Le script ne peut pas démarrer.");
            keepOpen = false; // Arrête la tentative de boucle
        }
    }
    
    // Fonction qui DOIT être accessible depuis la fenêtre pop-up pour arrêter le processus
    window.stopHack = function() {
        keepOpen = false;
        if (intervalId) {
            clearInterval(intervalId);
        }
        // Ferme la fenêtre pop-up définitivement
        const currentWindow = window.open("", "Hello404Window");
        if (currentWindow) currentWindow.close();
    };

    // Lancement initial du cycle
    openHackWindow();
});
