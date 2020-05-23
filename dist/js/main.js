//init speech synthesis API

const synth = window.speechSynthesis;

//DOM elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body=document.querySelector('body');

//Init voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();

    //loop through voices and create an option for each one

    voices.forEach(voice => {
        const option = document.createElement('option')

        //Fill option with voice and language

        option.textContent = voice.name + '(' + voice.lang + ')';

        //set needed attributes
        option.setAttribute('data-lang', voice.lang)
        option.setAttribute('data-name', voice.name)

        //append with select
        voiceSelect.appendChild(option);
    })

}

getVoices();

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

//speak function
const speak = () => {

    //check if speaking
    if (synth.speaking) {
        console.error("Already speaking");
        return;
    }

    if (textInput.value !== '') {
        //get speak test
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        body.style.background='#141414 url(img/wave.gif)';
        body.style.backgroundRepeat='repeat-x';
        body.style.backgroundSize='100% 100%';

        //speak end
        speakText.onend = e => {
            console.log('Done speaking');
            body.style.background='#141414 url()';
        }

        //speak error
        speakText.onerror = e => {
            console.log('Something went wrong');
        }

        //selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        //loop throgh voices
        voices.forEach(voice => {
            if (voice.name == selectedVoice) {
                speakText.voice = voice;
            }
        });

        //set rate and pitch
        speakText.rate=rate.value;
        speakText.pitch=pitch.value;

        //speak
        synth.speak(speakText);

    }
};

//add event
textForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    speak();
})

//set rate and pitch
rate.addEventListener('change',(e)=>{
    rateValue.textContent=rate.value

})

pitch.addEventListener('change',e=>{
    pitchValue.textContent=pitch.value;
})

//voice select change
voiceSelect.addEventListener('change',e=>speak());