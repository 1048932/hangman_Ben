
let sub = document.querySelector("#submit");
let r = document.querySelector("#reset");

var letter = document.querySelector("input");
var f = document.querySelector("span");
var failed = f.textContent;
var inp = letter.value;
var spaces = document.querySelector("#spaces");
var v = document.querySelector("#v");

var lives = 0;

var head = document.querySelector("header");
var lArm = document.querySelector("#lArm");
var b = document.querySelector("#b");
var rArm = document.querySelector("#rArm");
var lLeg = document.querySelector("#lLeg");
var rLeg = document.querySelector("#rLeg");

const ARRAY = ["EXCELLENT", "BREAKING", "ASCENSION", "DESCENSION", "QUERULOUS", "NOODLING", "HELLBENT", "MYSTERIOUS", "INFERNAL",
                "CELESTIAL", "MALICIOUS", "BENEVOLENT", "MAJESTIC", "ETHEREAL", "BILLBOARD", "MAYONAISE", "FIREBALL", "NINCOMPOOP",
                "RIGOROUS", "ADVENTURE", "BROCCOLI", "MOUNTAIN", "INGREDIENT", "CASTAWAY", "DINOSAUR", "ERSTWHILE", "EMPATHETIC",
                "FLAMINGO", "FRIENDLY", "GIGANTIC", "HYSTERICAL", "HALFLING", "HORRIFIC", "INTENTION", "JUGGLING", "JELLYFISH",
                "KNOWLEDGE", "KNUCKLED", "LAMENTABLE", "LAVENDER", "LISTLESS", "MONSTROUS", "MOMENTUM", "NEVERMORE", "NOSTALGIA",
                "NEIGHBOR", "ORIGINAL", "ORNAMENT", "PINEAPPLE", "PERCEPTIVE", "PERSISTENT", "PHANTASM", "QUESTION", "QUANTIFY",
                "RHYTHMIC", "RUMINATE", "RUMBLING", "RENDEZVOUS", "STRAWBERRY", "SENSIBLE", "SALUTATION", "STRAIGHT", "SUNDERING",
                "TELEPATHY", "TROPICAL", "TANGERINE", "TANTALIZE", "TABLETOP", "THOUGHTFUL", "UNDERDOG", "UNDULATE", "UNDERWORLD",
                "VALORANT", "VASCILLATE", "VEGETARIAN", "VOLATILE", "WATERFALL", "WEREWOLF", "WHIPLASH", "XYLOPHONE", "XENOPHOBE",
                "YOUTHFUL", "YELLOWED", "ZOMBIFIED", "ZEPHYROUS", "ZUCCHINI"];

var n = 42;
var ans = "";
var guessed = ["_"];
guessed.length = 10
var s = ["", ""]
var got = " ";
var n_got = 0;

let audio_right = new Audio("click.mp3");
let audio_wrong = new Audio("surprise.mp3");

reset();

sub.addEventListener("click", submit_click);
r.addEventListener("click", reset);

function submit_click() {
    inp = letter.value;
    inp = inp.toUpperCase();

    if (check_letters(ans) === true && check_letters(got) === false) {
        audio_right.play();
        for (let i = 0; i < ans.length; i++) {
            if (ans[i] === inp) {
                guessed[i] = ans[i];
            }
        }
        got += inp;
        update();
    } else {
        if (check_letters(got) === false && check_letters(failed) === false && n_got < ans.length) {
            audio_wrong.play();
            f.textContent = inp + " " + failed;
            failed = f.textContent;
            lives += 1;
        }
    }

    if (lives >= 1) {
        head.style.visibility = "visible";
    } else {
        head.style.visibility = "hidden";
    }
    if (lives >= 2) {
        b.style.visibility = "visible";
    } else {
        b.style.visibility = "hidden";
    }
    if (lives >= 3) {
        lArm.style.visibility = "visible";
    } else {
        lArm.style.visibility = "hidden";
    }
    if (lives >= 4) {
        rArm.style.visibility = "visible";
    } else {
        rArm.style.visibility = "hidden";
    }
    if (lives >= 5) {
        lLeg.style.visibility = "visible";
    } else {
        lLeg.style.visibility = "hidden";
    }
    if (lives >= 6) {
        rLeg.style.visibility = "visible";
        v.textContent = "You lost! Keep guessing to see what the word was, or try again.";
    } else {
        rLeg.style.visibility = "hidden";
    }

    if (n_got >= ans.length && lives < 6) {
        v.textContent = "You won! Care to play again?";
    }

    letter.value = "";
}

function reset() {
    lives = 0;
    head.style.visibility = "hidden";
    b.style.visibility = "hidden";
    lArm.style.visibility = "hidden";
    rArm.style.visibility = "hidden";
    lLeg.style.visibility = "hidden";
    rLeg.style.visibility = "hidden";
    spaces.innerHTML = "";
    v.textContent = "";

    f.textContent = " ";
    failed = " ";
    got = " ";

    n = Math.floor(Math.random() * (ARRAY.length));
    ans = ARRAY[n];
    //alert(ans);
    guessed.length = ans.length;
    for (let i = 0; i < ans.length; i++) {
        guessed[i] = "_";
    }

    s.length = 1;
    s[0] = "";
    update();

}

function check_letters(word) {
    for (let i = 0; i < word.length; i++) {
        if (word[i] === inp) {
            return true;
        }
    }
    return false;
}

function update() {
    n_got = 0;
    spaces.innerHTML = "";
    for (let i = 0; i < ans.length; i++) {
        s[i] = "<div class=\"letter\"><label>" + guessed[i] + "</label></div>";
        spaces.innerHTML += s[i];
        if (ans[i] === guessed[i]) {
            n_got += 1;
        }
    }
}
