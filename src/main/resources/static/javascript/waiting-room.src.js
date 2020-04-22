import {cookie} from 'integration-web-core--socle/js/assets/commons/_cookie'

// const getNextValueCounter = (counterValue) => {
    
// }

// const rotateDigit = (rank, deg, value) => {

//     document.querySelector(`.digit${rank}`).style.transform = `rotateX(${deg}deg)`;
//     document.querySelector(`.digit${rank}-verso`).style.transform = `rotateX(${180-deg}deg)`;
// }

const mocCookie = () => {
    let exp = (new Date()).getTime() + 62*1000;
    cookie.set('waiting_room', `dec=allow&exp=${exp}&uid=31.39.107.143&kid=key1&sig=0x5df3df56aa044e40b505c9f39234f6fbdc80668feb2dd1dd2c3dc051dd0c5b644bd32c79b3213ce4ea669237f7d075ef199a52c3289f3073799b4286e0a1d663`)
}

const getDuration = () => {
    let cookieWaiting = cookie.get('waiting_room');
    let tabCookie;
    let tabExp;
    
    if(typeof cookieWaiting !== undefined) {
        tabCookie = cookieWaiting.split('&');

        for(let i = 0 ; i < tabCookie.length ; i++) {
            if(tabCookie[i].indexOf('exp') > -1) {
                tabExp = tabCookie[i].split('=');
    
                if(tabExp[1]) {
                    return tabExp[1];
                }
                
            }
        }
    }

    return (new Date()).getTime() + 30*1000; 
}

const setDurationOnCounter = () => {
    let duration = String((getDuration() - new Date().getTime()) / 1000);
    if(duration.length > 1) {
        document.querySelector('.digit2').textContent = duration[1];
    }

    if(duration.length > 0) {
        document.querySelector('.digit1').textContent = duration[0];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let objCounter = document.querySelector('.js-counter');
    let counter;
    let origin;
    let tabCounter;
    let digit1;
    let digit2;
    let initAngle = 180;
    // let recto1 = true;
    // let recto2 = true;

    mocCookie();
    setDurationOnCounter();

    if(objCounter) {
        origin = parseInt(objCounter.querySelector('.digit1').textContent + objCounter.querySelector('.digit2').textContent, 10);
        counter = origin;
        if(!isNaN(counter)) {
            let intervalCounter = setInterval(function() {
                // tabPrevCounter = String(counter);
                counter--;
                tabCounter = String(counter); 

                // rotateDigit(1,initAngle);

                if(tabCounter.length == 2) {
                    digit1 = String(counter)[0];
                    digit2 = String(counter)[1];

                } else {
                    digit1 = 0;
                    digit2 = String(counter)[0];
                }

                if(counter > 0) {
                    objCounter.querySelector('.digit1').textContent = digit1;
                    objCounter.querySelector('.digit2').textContent = digit2;
                } else {
                    window.location.reload();
                }

                initAngle += 180;

            }, 1000);
        }
    }
})