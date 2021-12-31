const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger_chat");
const botImage = "bot.png";
const personImg = "user.png";
const botName = "Bot david";
const personName = "human";
const prompts = [
    ["hi", "hey", "hello", "goodafternoon", "goodmorning", "howdy"],
    ["how are you", "how's it going", "how is life", "how are things"],
    ["how old are you", "what's your hobby", "do you know love"],
    ["who are you", "are you human", "are you a bot", "are you a bot or human"],
    ["who created you", "who made you"]
    [
        "your name plese",
        "your name",
        "may i know your name",
        "what is your name",
        "what do you call yourself"
    ],
    ["i love you"],
    ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
    ["bad", "bored", "tired"],
    ["help me", "tell me a story", "tell me a joke"],
    ["ahh", "yes", "okay", "nice"],
    ["bye", "goodbye", "good bye", "see you later"],
    ["what should i eat today"],
    ["bro"],
    ["what", "why", "how", "where", "when"],
    ["no", "not sure", "maybe", "no thanks"],
    [""],
    ["hahaha", "ha", "lol", "hehe", "funny", "joke"]
];

const replies = [
    ["hello", "hi", "hey", "hi there", "howdyy to"],
    [
        "fine... how are you?",
        "pretty well, how are you?",
        "fantastic. how are you"
    ],
    [
        "nothing much",
        "about to go to sleep",
        "can you guess?",
        "i dont know actually"
    ],
    ["i am infinite"],
    ["im just a bot, a dumb one", "i am a bot, what are you?"],
    ["i am nameless", "i dont have a name"],
    ["i dont know love", "wish i understood love"],
    ["have you ever felt bad?", "glad to hear it", "wish i knew happiness"],
    ["why?", "why?, you shouldnt", "try watching tv"],
    ["what about", "once upon a time... the end"],
    ["tell me a story", "tell me a joke", "tell m about yourself"],
    ["bye", "gooodbye", "see you later"],
    ["sushi", "pizza", "useless human bots dont need to eat"],
    ["brooo", "who is your bro"],
    ["great question, now how do you expect me to answer"],
    ["thats okay", "i understand", "what do you want to talk about?"],
    ["please say something to confirm you have sense", "lol foolish human doesnt kmow how to type"],
    ["hahaha", "good one", "was that a joke"]
];

const alternative = [
    "same",
    "go on...",
    "try again",
    "im listenning",
    "i dont understand",
    "omoshirohie"
];

const robot = ["how are you, i persume your a human", "how do you do fellow human", "im not just a bot, i have feelings and a name"];

msgerForm.addEventListener("submit", action => {
    action.preventDefault();
    const msgtext = msgerInput.value;
    if (!msgtext) return;
    msgerInput.value = "";
    addchat(personName, personImg, "right", msgtext);
    output(msgtext);
});

function output(input) {
    let product;
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
        .replace(/ a /g, " ")
        .replace(/ i feel /g, " ")
        .replace(/ what's /g, "whats")
        .replace(/ please /g, " ")
        .replace(/ r u /g, "are you");

    if (compare(prompts, replies, text)) {
        product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
        product = "your welcome";
    } else if (text.match(/robot|bot|robo/gi)) {
        product = robot[Math.floor(Math.random() * robot.length)];
    } else {
        product = alternative[Math.floor(Math.random() * alternative.length)];
    }
    const delay = input.split(" ").length * 100;
    setTimeout(() => {
        addchat(botName, botImage, "left", product);
    }, delay);
}

function compare(promptsarray, repliesarray, string) {
    let reply;
    let replyfound = false;

    for (let x = 0; x < promptsarray.length; x++) {
        for (let y = 0; y < x.length; y++) {
            if (promptsarray[x][y] === string) {
                let replies = repliesarray[x];
                reply = replies[Math.floor(Math.round() * replies.length)];
                replyfound = true;
                break;
            }
            if (replyfound) {
                break;
            }
        }
    }
    return reply;
}

function addchat(name, img, side, text) {
    const msgHTML = `
<div class="msg ${side}-msg">
    <div class="msg-img" style="background-image: url(${img});"></div>
    <div class="msg-bubble">
        <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${FormatDate(new Date())}</div>
        </div>
        <div class="msg-text">
            ${text}</div>
    </div>
</div>`;
    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    msgerChat.scrollTop += 500;
}

function get(selector, root = document) {
    return root.querySelector(selector);
}

function FormatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}