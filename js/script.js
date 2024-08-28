const diccionarioEncriptado = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

function procesarTexto(accion) {
    const inputTexto = document.querySelector('#inputTexto').value.toLowerCase();
    const outputTexto = document.querySelector('#outputTexto');
    const copiarTexto = document.querySelector('#copiarTexto');
    
    if (!inputTexto) {
        outputTexto.innerHTML = `
            <img src="./assets/no-message-image.png" alt="Sin texto ingresado" />
            <p class="contenedor__output__info">Ningún mensaje fue encontrado</p>
            <p class="contenedor__output__infomin">Ingresa el texto que desees encriptar o desencriptar.</p>
        `;
        copiarTexto.style.display = 'none';
        return;
    }

    let resultado = '';
    if (accion === 'encriptar') {
        resultado = encriptarTexto(inputTexto);
    } else {
        resultado = desencriptarTexto(inputTexto);
    }

    outputTexto.innerHTML = `<p>${resultado}</p>`;
    copiarTexto.style.display = 'block';
}

function encriptarTexto(texto) {
    return texto.split('').map(char => diccionarioEncriptado[char] || char).join('');
}

function desencriptarTexto(texto) {
    let resultado = texto;
    Object.entries(diccionarioEncriptado).forEach(([key, value]) => {
        resultado = resultado.split(value).join(key);
    });
    return resultado;
}

function copiarTexto() {
    const outputText = document.querySelector('#outputTexto').textContent;
    navigator.clipboard.writeText(outputText).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}