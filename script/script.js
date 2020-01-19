let video = document.querySelector('video');
video.addEventListener('click', function () {
    video.play();
}, false);


let formDefault = document.querySelector("form button");

formDefault.onclick = (e) => {
    e.preventDefault();
}

let imagesSlider = document.querySelectorAll(".slider img");
let sliderBtnLeft = document.querySelector(".left");
let sliderBtnRight = document.querySelector(".right");
let descSlideOne = document.querySelector(".description-img-slide-one");
let descSlideTwo = document.querySelector(".description-img-slide-two");
let descSlideThree = document.querySelector(".description-img-slide-three");
let currentSlide = 0;

function slider() {
    for (let i = 0; i < imagesSlider.length; i++) {
        imagesSlider[i].classList.add("sliderOp");
    }
    imagesSlider[currentSlide].classList.remove("sliderOp");
    if (currentSlide == 0) {
        descSlideOne.style.display = "block";
        descSlideTwo.style.display = "none";
        descSlideThree.style.display = "none";
    }
    if (currentSlide == 1) {
        descSlideOne.style.display = "none";
        descSlideTwo.style.display = "block";
        descSlideThree.style.display = "none";
    }
    if (currentSlide == 2) {
        descSlideOne.style.display = "none";
        descSlideTwo.style.display = "none";
        descSlideThree.style.display = "block";
    }
}

slider();

sliderBtnLeft.onclick = () => {
    if (currentSlide - 1 == -1) {
        currentSlide = imagesSlider.length - 1;
    } else {
        currentSlide--;
    }
    slider();

}

sliderBtnRight.onclick = () => {
    if (currentSlide + 1 == imagesSlider.length) {
        currentSlide = 0;
    } else {
        currentSlide++;
    }
    slider();
}


//Всплывающая подсказка для input

let inputPhone = document.querySelector("#input-number");
let inputText = document.querySelector("#input-text");
let inputForm = document.querySelector("form");
let divToolTips = document.createElement("div");
let inputPhonePOsition = inputPhone.offsetTop;


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    inputPhone.onfocus = function () {
        setTimeout(function () {
            divToolTips.classList.add("div-tool-tips");
            divToolTips.innerHTML = "Only digit!";
            divToolTips.style.top = inputPhone.offsetTop - (inputPhone.getBoundingClientRect().height / 1.4) + "px";
            divToolTips.style.left = inputPhone.offsetLeft + "px";
            document.body.appendChild(divToolTips);
        }, 300);
    }

    inputPhone.onblur = function () {
        divToolTips.remove();
    }

    inputText.onfocus = function () {
        setTimeout(function () {
            divToolTips.classList.add("div-tool-tips");
            divToolTips.innerHTML = "Example : Michael Kozlov!";
            divToolTips.style.top = inputText.offsetTop + inputText.getBoundingClientRect().height + "px";
            divToolTips.style.left = inputText.offsetLeft + "px";
            document.body.appendChild(divToolTips);
        }, 300);
    }

    inputText.onblur = function () {
        divToolTips.remove();
    }
} else {
    inputPhone.onfocus = function () {
        divToolTips.classList.add("div-tool-tips");
        divToolTips.innerHTML = "Only digit!";
        divToolTips.style.top = inputPhone.offsetTop - (inputPhone.getBoundingClientRect().height / 1.4) + "px";
        divToolTips.style.left = inputPhone.offsetLeft + "px";
        document.body.appendChild(divToolTips);
    }

    inputPhone.onblur = function () {
        divToolTips.remove();
    }

    inputText.onfocus = function () {
        divToolTips.classList.add("div-tool-tips");
        divToolTips.innerHTML = "Example : Michael Kozlov!";
        divToolTips.style.top = inputText.offsetTop + inputText.getBoundingClientRect().height + "px";
        divToolTips.style.left = inputText.offsetLeft + "px";
        document.body.appendChild(divToolTips);
    }

    inputText.onblur = function () {
        divToolTips.remove();
    }
}

//Таймер

function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let daysSpan = clock.querySelector('.days');
    let hoursSpan = clock.querySelector('.hours');
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        let t = getTimeRemaining(endtime);

        daysSpan.innerHTML = t.days;
        hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
            clearInterval(timeinterval);
        }
    }

    updateClock();
    let timeinterval = setInterval(updateClock, 1000);
}

let deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('countdown', deadline);



