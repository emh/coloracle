const app = document.getElementById('app');

const HEX_COLOR_RE = /^[a-fA-F0-9]{6}$/;

const test = (v) => v.match(HEX_COLOR_RE) !== null;

const input = document.getElementById('hex');

function addColor(value) {
    const container = document.getElementById('colors');

    const div = document.createElement('div');
    div.style.backgroundColor = `#${value}`;

    div.innerHTML = value;

    container.append(div);
}

input.addEventListener('change', (e) => {
    const value = e.target.value;

    if (test(value)) {
        addColor(value);
    }
});

input.focus();
