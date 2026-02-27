document.addEventListener('DOMContentLoaded', () => {
    let power = 10;
    let rating = 0;
    let rankValue = 500;
    let rankBonus = 5;
    const barMaxLength = 360;
    let player = document.querySelector('.agent-sprite-container');
    let ratingScore = document.querySelector('#rrID');
    let progressBar = document.querySelector('.progress-active-bar');
    let barWidthValue = 0;
    let passiveEarning = 5;
    let credits = 1000;
    let creditPower = 50;
    let creditsScore = document.querySelector('#creditsID');
    let game = document.querySelector('.game-screen');
    let lobby = document.querySelector('.lobby-screen');
    let exitBtn = document.querySelector('#leave-btn');
    let playBtn = document.querySelector('#play-btn')
    game.style.display = `none`;
    lobby.style.display = `flex`;
    playBtn.addEventListener('click', () => {
        bgOst.volume = 0.2;
        bgOst.play();
        bgOst.loop = true;
        lobby.style.display = `none`;
        game.style.display = `inherit`;
    })
    playBtn.addEventListener('mouseenter', () => {
        hover.volume = 0.5;
        hover.play();
    })
    exitBtn.addEventListener('mouseenter', () => {
        hover.volume = 0.5;
        hover.play();
    })
    exitBtn.addEventListener('click', () => {
        game.style.display = `none`;
        lobby.style.display = `flex`;
        bgOst.pause();
    })
    let buy = new Audio('assets/audio/buy.mp3');
    let bgOst = new Audio('assets/audio/bg music.mp3');
    let hover = new Audio('assets/audio/hover.mp3');
    let newAgent = new Audio('assets/audio/newAgent.mp3');
    let v1 = new Audio('assets/audio/v1.mp3');
    let v2 = new Audio('assets/audio/v2.mp3');
    let v3 = new Audio('assets/audio/v3.mp3');
    let buyClassicBtn = document.querySelector('#buyClassicBtn');
    let buySheriffBtn = document.querySelector('#buySheriffBtn');
    let buySpectreBtn = document.querySelector('#buySpectreBtn');
    let buyMarshalBtn = document.querySelector('#buyMarshalBtn');
    let buyVandalBtn = document.querySelector('#buyVandalBtn');
    let buyOperatorBtn = document.querySelector('#buyOperatorBtn');
    let buyKnifeBtn = document.querySelector('#buyKnifeBtn');
    let classicPrice = document.querySelector('#classicPriceID');
    let classicPriceCoeff = 100;
    let classicPriceValue = 50;
    const classicPowerBuff = 5;
    const classicCreditsBuff = 10;
    let sheriffPrice = document.querySelector('#sheriffPriceID');
    let sheriffPriceCoeff = 500;
    let sheriffPriceValue = 200;
    const sheriffPowerBuff = 25;
    const sheriffCreditsBuff = 30;
    let spectrePrice = document.querySelector('#spectrePriceID');
    let spectrePriceCoeff = 2000;
    let spectrePriceValue = 1000;
    const spectrePowerBuff = 100;
    const spectreCreditsBuff = 100;
    let marshalPrice = document.querySelector('#marshalPriceID');
    let marshalPriceCoeff = 5000;
    let marshalPriceValue = 3000;
    const marshalPowerBuff = 250;
    const marshalCreditsBuff = 200;
    let vandalPrice = document.querySelector('#vandalPriceID');
    let vandalPriceCoeff = 10000;
    let vandalPriceValue = 8000;
    const vandalPowerBuff = 500;
    const vandalCreditsBuff = 400;
    let operatorPrice = document.querySelector('#operatorPriceID');
    let operatorPriceCoeff = 20000;
    let operatorPriceValue = 15000;
    const operatorPowerBuff = 1000;
    const operatorCreditsBuff = 800;
    let knifePrice = document.querySelector('#knifePriceID');
    let knifePriceCoeff = 50000;
    let knifePriceValue = 30000;
    const knifePowerBuff = 2000;
    const knifeCreditsBuff = 1500;
    let rankIcon = document.querySelector('#rankIconID');
    let rankUpCounter = 0;
    const rankIcons = ["iron3rank", "bronzeIcon", "silverIcon", "goldIcon", "platinumIcon", "diamondIcon", "ascendentIcon", "immortalIcon", "radiantIcon"];
    function progressBarRank() {
        progressBar.style.width = `${barWidthValue}px`;
    }
    function rankUpChecker() {
        setInterval(() => {
            if (rating >= rankValue) {
                progressBar.style.width = `${0}px`
                rating = 0;
                rankValue *= rankBonus;
                rankUpCounter++;
            }
        }, 20)
    }
    function currentRank() {
        if (rankUpCounter > 0) {
            rankIcon.innerHTML = `<img src = "assets/images/${rankIcons[rankUpCounter]}.png">`;
        }
    }
    function isClassicAvailableChecker(itemPriceValue) {
        if (credits < itemPriceValue) {
            buyClassicBtn.style.opacity = 0.5;
        }
        else {
            buyClassicBtn.style.opacity = 1;
        }
    }
    function isSheriffAvailableChecker(itemPriceValue) {
        if (credits < itemPriceValue) {
            buySheriffBtn.style.opacity = 0.5;
        }
        else {
            buySheriffBtn.style.opacity = 1;
        }
    }
    function isSpectreAvailableChecker(itemPriceValue) {
        if (credits < itemPriceValue) {
            buySpectreBtn.style.opacity = 0.5;
        }
        else {
            buySpectreBtn.style.opacity = 1;
        }
    }

    function isMarshalAvailableChecker(itemPriceValue) {
        if (credits < itemPriceValue) {
            buyMarshalBtn.style.opacity = 0.5;
        }
        else {
            buyMarshalBtn.style.opacity = 1;
        }
    }

    function isVandalAvailableChecker(itemPriceValue) {
        if (credits < itemPriceValue) {
            buyVandalBtn.style.opacity = 0.5;
        }
        else {
            buyVandalBtn.style.opacity = 1;
        }
    }

    function isOperatorAvailableChecker(itemPriceValue) {
        if (credits < itemPriceValue) {
            buyOperatorBtn.style.opacity = 0.5;
        }
        else {
            buyOperatorBtn.style.opacity = 1;
        }
    }

    function isKnifeAvailableChecker(itemPriceValue) {
        if (credits < itemPriceValue) {
            buyKnifeBtn.style.opacity = 0.5;
        }
        else {
            buyKnifeBtn.style.opacity = 1;
        }
    }
    setInterval(() => {
        isClassicAvailableChecker(classicPriceValue);
        isSheriffAvailableChecker(sheriffPriceValue);
        isSpectreAvailableChecker(spectrePriceValue);
        isMarshalAvailableChecker(marshalPriceValue);
        isVandalAvailableChecker(vandalPriceValue);
        isOperatorAvailableChecker(operatorPriceValue);
        isKnifeAvailableChecker(knifePriceValue);

    }, 20)
    currentRank();
    rankUpChecker();
    player.addEventListener('click', () => {
        barWidthValue = (rating * barMaxLength) / rankValue;
        v1.currentTime = 0;
        rating += power;
        credits += creditPower;
        ratingScore.textContent = rating;
        creditsScore.textContent = credits;
        progressBarRank();
        currentRank();
        agentTransformationChecker();
        agentTransformation();
        v1.play();
    })
    passiveEarningFunc();
    let buyBtns = document.querySelectorAll('.upgrade-buy-btn');
    buyBtns.forEach(el => el.addEventListener('mouseenter', () => {
        hover.volume = 0.5;
        hover.play();
    }))
    buyClassicBtn.addEventListener('click', () => {
        if (credits >= classicPriceValue) {
            buy.currentTime = 0;
            credits -= classicPriceValue;
            creditsScore.textContent = credits;
            power += classicPowerBuff;
            creditPower += classicCreditsBuff;
            classicPriceValue += classicPriceCoeff;
            classicPrice.textContent = classicPriceValue;
            buy.play();
        }
    })
    buySheriffBtn.addEventListener('click', () => {
        if (credits >= sheriffPriceValue) {
            buy.currentTime = 0;
            credits -= sheriffPriceValue;
            creditsScore.textContent = credits;
            power += sheriffPowerBuff;
            creditPower += sheriffCreditsBuff;
            sheriffPriceValue += sheriffPriceCoeff;
            sheriffPrice.textContent = sheriffPriceValue;
            buy.play();
        }
    })
    buySpectreBtn.addEventListener('click', () => {
        if (credits >= spectrePriceValue) {
            buy.currentTime = 0;
            credits -= spectrePriceValue;
            creditsScore.textContent = credits;
            power += spectrePowerBuff;
            creditPower += spectreCreditsBuff;
            spectrePriceValue += spectrePriceCoeff;
            spectrePrice.textContent = spectrePriceValue;
            buy.play();
        }
    })

    buyMarshalBtn.addEventListener('click', () => {
        if (credits >= marshalPriceValue) {
            buy.currentTime = 0;
            credits -= marshalPriceValue;
            creditsScore.textContent = credits;
            power += marshalPowerBuff;
            creditPower += marshalCreditsBuff;
            marshalPriceValue += marshalPriceCoeff;
            marshalPrice.textContent = marshalPriceValue;
            buy.play();
        }
    })

    buyVandalBtn.addEventListener('click', () => {
        if (credits >= vandalPriceValue) {
            buy.currentTime = 0;
            credits -= vandalPriceValue;
            creditsScore.textContent = credits;
            power += vandalPowerBuff;
            creditPower += vandalCreditsBuff;
            vandalPriceValue += vandalPriceCoeff;
            vandalPrice.textContent = vandalPriceValue;
            buy.play();
        }
    })

    buyOperatorBtn.addEventListener('click', () => {
        if (credits >= operatorPriceValue) {
            buy.currentTime = 0;
            credits -= operatorPriceValue;
            creditsScore.textContent = credits;
            power += operatorPowerBuff;
            creditPower += operatorCreditsBuff;
            operatorPriceValue += operatorPriceCoeff;
            operatorPrice.textContent = operatorPriceValue;
            buy.play();
        }
    })

    buyKnifeBtn.addEventListener('click', () => {
        if (credits >= knifePriceValue) {
            buy.currentTime = 0;
            credits -= knifePriceValue;
            creditsScore.textContent = credits;
            power += knifePowerBuff;
            creditPower += knifeCreditsBuff;
            knifePriceValue += knifePriceCoeff;
            knifePrice.textContent = knifePriceValue;
            buy.play();
        }
    })
    const agents = ["sage",
        "brimstone",
        "killjoy",
        "omen",
        "jett",
        "kayo",
        "neon",
        "chamber",
        "reyna",
        "cypher",
        "yoru",
        "viper"];
    const agentsNames = ["Сейдж", "Бримстоун", "Киллджой", "Омен", "Джетт", "Кайо", "Неон", "Чамбер", "Рейна", "Сайфер", "Йору", "Вайпер"];
    const agentsColors = ["#00FFE1", "#ac5c00", "#f6ff00", "#25075c", "#bbfff7", "#002fff", "#006aff", "#ffae00", "#cc00ff", "#ececec", "#2866b8", "#00ff26"]
    let agentProfile = document.querySelector('.agent-profile-box')
    let transformPoints = 500;
    let agentCounter = 0;
    let currentAgentSprite;
    let currentAgentProfile;
    let passiveEarningBuff = 3;
    function passiveEarningFunc() {
        setInterval(() => {
            barWidthValue = (rating * barMaxLength) / rankValue;
            rating += passiveEarning;
            ratingScore.textContent = rating;
            progressBarRank();
            agentTransformationChecker();
            agentTransformation();
            rankUpChecker();
            currentRank();
        }, 1000)
    }
    function agentTransformationChecker() {
        setInterval(() => {
            if (rating >= transformPoints) {
                agentCounter++;
                passiveEarning *= passiveEarningBuff
                currentAgentSprite = `<img src = "assets/images/${agents[agentCounter]}Game.png">`;
                currentAgentProfile = `<img src = "assets/images/${agents[agentCounter]}Profile.png">`;
                transformPoints *= 3;
                newAgentSound.play();
            }
        }, 20)
    }
    let newAgentSound = new Audio('assets/audio/newAgent.mp3');
    function agentTransformation() {
        if (agentCounter > 0 && agentCounter < 12) {
            player.innerHTML = currentAgentSprite;
            agentProfile.innerHTML = `${currentAgentProfile} <h2>Агент: <span style="color: ${agentsColors[agentCounter]}">${agentsNames[agentCounter]}</span></h2>`
        }
    }
    let tooltipBtn = document.querySelector('#tooltipID');
    let agentTooltip = document.querySelector('.agent-tooltip');
    let tooltip = document.createElement('div');
    setInterval(() => {
        tooltipBtn.addEventListener('mouseenter', () => {
            tooltip.style.display = `flex`;
            tooltip.className = "tooltip";
            tooltip.innerHTML = `<p>Пассивный доход: ${passiveEarning}</p>`;
            agentTooltip.appendChild(tooltip);
            hover.play();
        })
        tooltipBtn.addEventListener('mouseleave', () => {
            tooltip.style.display = `none`;
        })
    }, 20)
})