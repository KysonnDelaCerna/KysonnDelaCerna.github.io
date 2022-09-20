const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');

const titleText = `<Kysonn Dela Cerna/>`;
const subtitleText = `Computer Scientist`;

async function type () {
    for (let i = 0; i < titleText.length; i++) {
        title.innerText = titleText.slice(0, i + 1);
        await new Promise(r => setTimeout(r, 50 + Math.floor(Math.random() * 50)));
    }

    await new Promise(r => setTimeout(r, 500 + Math.floor(Math.random() * 200)));

    for (let i = 0; i < subtitleText.length; i++) {
        subtitle.innerText = subtitleText.slice(0, i + 1);
        await new Promise(r => setTimeout(r, 50 + Math.floor(Math.random() * 50)));
    }
}

type();