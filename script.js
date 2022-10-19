const cols = document.querySelectorAll('.col');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

document.addEventListener('keydown', (e) => {
    e.preventDefault()
    if (e.code.toLowerCase() === 'space') {
        setRandomColors()
    }
});

document.addEventListener('click', (e) => {
    const type = e.target.dataset.type;

    if (type === 'lock') {
        const lock = e.target.tagName.toLowerCase() === 'i' ? e.target : e.target.children[0];

        lock.classList.toggle('fa-lock-open');
        lock.classList.toggle('fa-lock');

    } else if (type === 'color') {
        header.style.transform = 'scaley(1)';
        setTimeout(() => {
            header.style.transform = 'scaley(0)';
        }, 2000);
        copy(e.target.textContent);
    }
});

function copy(text) {
    return navigator.clipboard.writeText(text);
};

function getRandomColor() {
    const alphabet = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    return color;
}

function setRandomColors() {
    cols.forEach((col) => {
        if (col.querySelector('i').classList.contains('fa-lock-open')) {
            const text = col.querySelector('h2');
            const button = col.querySelector('button');
            const color = getRandomColor()
            setTextColor(text, color);
            setTextColor(button, color);
            col.style.background = color;
            text.textContent = color;
        }
    })
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRandomColors();

setTimeout(() => {
    footer.style.transform = 'scaley(0)' 
}, 5000);