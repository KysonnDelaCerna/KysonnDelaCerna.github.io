const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');

const titleText = `<Kysonn\xa0Dela\xa0Cerna/>\xa0`;
const subtitleText = `Computer\xa0Scientist\xa0`;

async function type () {
    for (let i = 0; i < titleText.length; i++) {
        title.innerText += titleText[i];
        await new Promise(r => setTimeout(r, 50 + Math.floor(Math.random() * 50)));
    }

    await new Promise(r => setTimeout(r, 500 + Math.floor(Math.random() * 200)));

    for (let i = 0; i < subtitleText.length; i++) {
        subtitle.innerText += subtitleText[i];
        await new Promise(r => setTimeout(r, 50 + Math.floor(Math.random() * 50)));
    }
}

type();