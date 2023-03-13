const app = document.getElementById('app');

const HEX_COLOR_RE = /^[a-fA-F0-9]{6}$/;

const test = (v) => v.match(HEX_COLOR_RE) !== null;

const input = document.getElementById('hex');

const hex2rgb = (hex) => [hex.substring(0, 2), hex.substring(2, 4), hex.substring(4, 6)].map((v) => parseInt(v, 16));

async function addColor(value) {
    const bright = Math.max(...hex2rgb(value)) / 255 > 0.5;

    const container = document.getElementById('colors');

    const div = document.createElement('div');
    div.style.backgroundColor = `#${value}`;
    div.classList.add(bright ? 'light' : 'dark');

    const response = await (await fetch('/get_color_name', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            value
        })
    })).json();


    div.innerHTML = `<div class="name">${response.name}</div><div class="value">${value}</div>`;

    console.log(response);

    container.append(div);
}

input.addEventListener('change', (e) => {
    const value = e.target.value;

    if (test(value)) {
        addColor(value);
    }
});

input.focus();
