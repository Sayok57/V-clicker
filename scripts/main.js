document.addEventListener('DOMContentLoaded', () => {
    let power = 5;
    let rating = 0;
    let rankValue = 1000;
    let rankMultiplier = 2;
    const barMaxLength = 360;
    
    let player = document.querySelector('.agent-sprite-container');
    let ratingScore = document.querySelector('#rrID');
    let progressBar = document.querySelector('.progress-active-bar');
    let barWidthValue = 0;
    
    let passiveEarning = 2;
    let credits = 500;
    let creditPower = 10;
    let creditsScore = document.querySelector('#creditsID');
    
    let game = document.querySelector('.game-screen');
    let lobby = document.querySelector('.lobby-screen');
    let exitBtn = document.querySelector('#leave-btn');
    let playBtn = document.querySelector('#play-btn');
    let isGameActive = false;
    
    let buy = new Audio('assets/audio/buy.mp3');
    let bgOst = new Audio('assets/audio/bg music.mp3');
    let hover = new Audio('assets/audio/hover.mp3');
    let newAgentSound = new Audio('assets/audio/newAgent.mp3');
    let v1 = new Audio('assets/audio/v1.mp3');
    let v2 = new Audio('assets/audio/v2.mp3');
    let v3 = new Audio('assets/audio/v3.mp3');
    
    game.style.display = 'none';
    lobby.style.display = 'flex';
    
    playBtn.addEventListener('click', () => {
        isGameActive = true;
        bgOst.volume = 0.2;
        bgOst.play();
        bgOst.loop = true;
        lobby.style.display = 'none';
        game.style.display = 'inherit';
    });
    
    playBtn.addEventListener('mouseenter', () => {
        hover.volume = 0.5;
        hover.play();
    });
    
    exitBtn.addEventListener('mouseenter', () => {
        hover.volume = 0.5;
        hover.play();
    });
    
    exitBtn.addEventListener('click', () => {
        isGameActive = false;
        game.style.display = 'none';
        lobby.style.display = 'flex';
        bgOst.pause();
    });
    
    let buyClassicBtn = document.querySelector('#buyClassicBtn');
    let classicPrice = document.querySelector('#classicPriceID');
    let classicPriceValue = 100;
    let classicPriceCoeff = 150;
    const classicPowerBuff = 2;
    const classicCreditsBuff = 3;
    
    let buySheriffBtn = document.querySelector('#buySheriffBtn');
    let sheriffPrice = document.querySelector('#sheriffPriceID');
    let sheriffPriceValue = 300;
    let sheriffPriceCoeff = 400;
    const sheriffPowerBuff = 5;
    const sheriffCreditsBuff = 6;
    
    let buySpectreBtn = document.querySelector('#buySpectreBtn');
    let spectrePrice = document.querySelector('#spectrePriceID');
    let spectrePriceValue = 800;
    let spectrePriceCoeff = 1000;
    const spectrePowerBuff = 12;
    const spectreCreditsBuff = 12;
    
    let buyMarshalBtn = document.querySelector('#buyMarshalBtn');
    let marshalPrice = document.querySelector('#marshalPriceID');
    let marshalPriceValue = 2000;
    let marshalPriceCoeff = 2500;
    const marshalPowerBuff = 25;
    const marshalCreditsBuff = 20;
    
    let buyVandalBtn = document.querySelector('#buyVandalBtn');
    let vandalPrice = document.querySelector('#vandalPriceID');
    let vandalPriceValue = 5000;
    let vandalPriceCoeff = 6000;
    const vandalPowerBuff = 50;
    const vandalCreditsBuff = 35;
    
    let buyOperatorBtn = document.querySelector('#buyOperatorBtn');
    let operatorPrice = document.querySelector('#operatorPriceID');
    let operatorPriceValue = 12000;
    let operatorPriceCoeff = 15000;
    const operatorPowerBuff = 100;
    const operatorCreditsBuff = 60;
    
    let buyKnifeBtn = document.querySelector('#buyKnifeBtn');
    let knifePrice = document.querySelector('#knifePriceID');
    let knifePriceValue = 25000;
    let knifePriceCoeff = 30000;
    const knifePowerBuff = 200;
    const knifeCreditsBuff = 100;
    
    let rankIcon = document.querySelector('#rankIconID');
    let rankUpCounter = 0;
    const rankIcons = ["iron3rank", "bronzeIcon", "silverIcon", "goldIcon", "platinumIcon", "diamondIcon", "ascendentIcon", "immortalIcon", "radiantIcon"];
    
    function updateProgressBar() {
        barWidthValue = (rating * barMaxLength) / rankValue;
        if (barWidthValue > barMaxLength) barWidthValue = barMaxLength;
        progressBar.style.width = `${barWidthValue}px`;
    }
    
    function rankUpChecker() {
        if (rating >= rankValue) {
            rating = 0;
            rankValue *= rankMultiplier;
            rankUpCounter++;
            if (rankUpCounter < rankIcons.length) {
                rankIcon.innerHTML = `<img src="assets/images/${rankIcons[rankUpCounter]}.png">`;
            }
            updateProgressBar();
            ratingScore.textContent = rating;
        }
    }
    
    function updateButtonsAvailability() {
        buyClassicBtn.style.opacity = credits >= classicPriceValue ? 1 : 0.5;
        buySheriffBtn.style.opacity = credits >= sheriffPriceValue ? 1 : 0.5;
        buySpectreBtn.style.opacity = credits >= spectrePriceValue ? 1 : 0.5;
        buyMarshalBtn.style.opacity = credits >= marshalPriceValue ? 1 : 0.5;
        buyVandalBtn.style.opacity = credits >= vandalPriceValue ? 1 : 0.5;
        buyOperatorBtn.style.opacity = credits >= operatorPriceValue ? 1 : 0.5;
        buyKnifeBtn.style.opacity = credits >= knifePriceValue ? 1 : 0.5;
    }
    
    setInterval(updateButtonsAvailability, 100);
    
    player.addEventListener('click', () => {
        if (!isGameActive) return;
        
        v1.currentTime = 0;
        rating += power;
        credits += creditPower;
        
        ratingScore.textContent = Math.floor(rating);
        creditsScore.textContent = Math.floor(credits);
        
        rankUpChecker();
        updateProgressBar();
        v1.play();
    });
    
    let buyBtns = document.querySelectorAll('.upgrade-buy-btn');
    buyBtns.forEach(el => el.addEventListener('mouseenter', () => {
        hover.volume = 0.5;
        hover.play();
    }));
    
    function handleBuy(item, priceValue, priceCoeff, powerBuff, creditsBuff, priceElement) {
        if (credits >= priceValue) {
            buy.currentTime = 0;
            credits -= priceValue;
            power += powerBuff;
            creditPower += creditsBuff;
            
            if (item === 'classic') classicPriceValue += priceCoeff;
            if (item === 'sheriff') sheriffPriceValue += priceCoeff;
            if (item === 'spectre') spectrePriceValue += priceCoeff;
            if (item === 'marshal') marshalPriceValue += priceCoeff;
            if (item === 'vandal') vandalPriceValue += priceCoeff;
            if (item === 'operator') operatorPriceValue += priceCoeff;
            if (item === 'knife') knifePriceValue += priceCoeff;
            
            priceElement.textContent = 
                item === 'classic' ? classicPriceValue :
                item === 'sheriff' ? sheriffPriceValue :
                item === 'spectre' ? spectrePriceValue :
                item === 'marshal' ? marshalPriceValue :
                item === 'vandal' ? vandalPriceValue :
                item === 'operator' ? operatorPriceValue : knifePriceValue;
            
            creditsScore.textContent = Math.floor(credits);
            buy.play();
        }
    }
    
    buyClassicBtn.addEventListener('click', () => handleBuy('classic', classicPriceValue, classicPriceCoeff, classicPowerBuff, classicCreditsBuff, classicPrice));
    buySheriffBtn.addEventListener('click', () => handleBuy('sheriff', sheriffPriceValue, sheriffPriceCoeff, sheriffPowerBuff, sheriffCreditsBuff, sheriffPrice));
    buySpectreBtn.addEventListener('click', () => handleBuy('spectre', spectrePriceValue, spectrePriceCoeff, spectrePowerBuff, spectreCreditsBuff, spectrePrice));
    buyMarshalBtn.addEventListener('click', () => handleBuy('marshal', marshalPriceValue, marshalPriceCoeff, marshalPowerBuff, marshalCreditsBuff, marshalPrice));
    buyVandalBtn.addEventListener('click', () => handleBuy('vandal', vandalPriceValue, vandalPriceCoeff, vandalPowerBuff, vandalCreditsBuff, vandalPrice));
    buyOperatorBtn.addEventListener('click', () => handleBuy('operator', operatorPriceValue, operatorPriceCoeff, operatorPowerBuff, operatorCreditsBuff, operatorPrice));
    buyKnifeBtn.addEventListener('click', () => handleBuy('knife', knifePriceValue, knifePriceCoeff, knifePowerBuff, knifeCreditsBuff, knifePrice));
    
    const agents = ["sage", "brimstone", "killjoy", "omen", "jett", "kayo", "neon", "chamber", "reyna", "cypher", "yoru", "viper"];
    const agentsNames = ["Сейдж", "Бримстоун", "Киллджой", "Омен", "Джетт", "Кайо", "Неон", "Чамбер", "Рейна", "Сайфер", "Йору", "Вайпер"];
    const agentsColors = ["#00FFE1", "#ac5c00", "#f6ff00", "#25075c", "#bbfff7", "#002fff", "#006aff", "#ffae00", "#cc00ff", "#ececec", "#2866b8", "#00ff26"];
    
    let agentProfile = document.querySelector('.agent-profile-box');
    let agentCounter = 0;
    let transformPoints = 800;
    const passiveEarningMultiplier = 1.6;
    
    function agentTransformationChecker() {
        if (rating >= transformPoints && agentCounter < agents.length - 1) {
            agentCounter++;
            
            passiveEarning = Math.floor(passiveEarning * passiveEarningMultiplier);
            transformPoints = Math.floor(transformPoints * 2.2);
            
            let currentAgentSprite = `<img src="assets/images/${agents[agentCounter]}Game.png">`;
            let currentAgentProfile = `<img src="assets/images/${agents[agentCounter]}Profile.png">`;
            
            player.innerHTML = currentAgentSprite;
            agentProfile.innerHTML = `${currentAgentProfile} <h2>Агент: <span style="color: ${agentsColors[agentCounter]}">${agentsNames[agentCounter]}</span></h2>`;
            
            newAgentSound.play();
        }
    }
    
    function passiveEarningFunc() {
        setInterval(() => {
            if (!isGameActive) return;
            
            rating += passiveEarning;
            credits += Math.floor(passiveEarning / 2);
            
            ratingScore.textContent = Math.floor(rating);
            creditsScore.textContent = Math.floor(credits);
            
            agentTransformationChecker();
            rankUpChecker();
            updateProgressBar();
        }, 1000);
    }
    
    passiveEarningFunc();
    
    let tooltipBtn = document.querySelector('#tooltipID');
    let agentTooltip = document.querySelector('.agent-tooltip');
    let tooltip = document.createElement('div');
    
    setInterval(() => {
        tooltipBtn.addEventListener('mouseenter', () => {
            tooltip.style.display = 'flex';
            tooltip.className = 'tooltip';
            tooltip.innerHTML = `
                <p>Пассивный доход: ${passiveEarning}/сек</p>
                <p>Сила клика: ${power}</p>
                <p>Кредиты за клик: ${creditPower}</p>
            `;
            agentTooltip.appendChild(tooltip);
            hover.play();
        });
        
        tooltipBtn.addEventListener('mouseleave', () => {
            tooltip.style.display = 'none';
        });
    }, 20);
});