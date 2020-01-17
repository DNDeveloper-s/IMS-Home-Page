const addAnimClass = (roomContainer) => {
    let animClasses = document.querySelectorAll(`.anim`);
    if(roomContainer) {
        animClasses = roomContainer.querySelectorAll(`.anim`);
    }
    animClasses.forEach((animClass, ind1) => {
        const animDetails = {
            applyToChildNodes: animClass.dataset.animtochilds || true,
            animDirection: animClass.dataset.animdirection || 'leftToRight',
            animDelay: animClass.dataset.animdelay || '0.2',
            animChildDelays: (1 - animClass.dataset.animchilddelays) || 0.88,
            startOffset: animClass.dataset.startoffset || 20,
            animDuration: animClass.dataset.animduration || 400,
            removeAnim: animClass.dataset.removeanim || true
        };

        if(animDetails.applyToChildNodes === true) {
            Object.values(animClass.children).forEach((item, ind) => {
                actualAnimation(item, animDetails, ind);
                const animChildrenCount = animClass.childElementCount - 1;
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.animation = `none`;
                    item.style.transform = `none`;
                    item.style.transition = 'all 0.25s ease-in-out';
                }, parseInt(animDetails.animDelay) + (animChildrenCount * (1 - parseInt(animDetails.animChildDelays))) + (parseInt(animDetails.animDuration) / (animChildrenCount * 100)) * 1000);
            });
            return true;
        }
        actualAnimation(animClass, animDetails, false);
    })
};

const actualAnimation = (elToApply, animDetails, ind) => {
    elToApply.style.transition = '0s';
    elToApply.style.opacity = '0';
    elToApply.style.transform = `translate${animDetails.animDirection === 'topToBottom' ? 'Y' : 'X'}(-${animDetails.startOffset}px)`;
    elToApply.style.animation = `${animDetails.animDirection} ${animDetails.animDuration}ms ease-in-out forwards`;
    elToApply.style.animationDelay = `${(ind + +animDetails.animDelay) - (ind * animDetails.animChildDelays)}s`;
    // elToApply.style.animationDelay = ``;
    // console.log(elToApply, elToApply.style.animationDelay);

    if(animDetails.removeAnim === true) {
        if(!animDetails.applyToChildNodes) {
            setTimeout(() => {
                removeAnim(elToApply);
            }, (((ind + 1)) * animDetails.animDuration ));
            return true;
        }

        // setTimeout(() => {
        //     console.log(animDetails.applyToChildNodes, 'removing', (ind + +animDetails.animDelay) + (ind * (1 - animDetails.animChildDelays)) * 15000);
        //     // removeAnim(elToApply);
        // }, (ind + +animDetails.animDelay) - (ind * (1 - animDetails.animChildDelays)) * 25000);
    }
    // console.log((ind + +animDetails.animDelay) - (ind * animDetails.animChildDelays));
};

const removeAnim = (elToApply) => {
    elToApply.style.opacity = '1';
    elToApply.style.animation = `none`;
    elToApply.style.transform = `none`;
    elToApply.style.transition = 'all 0.25s ease-in-out';
};

addAnimClass();

// // Background animation
// const bgAnim = () => {
//     const imageItemsEl = document.querySelectorAll('.images');
//     imageItemsEl.forEach((imageItem, ind) => {
//         setTimeout(() => {
//             imageItem.lastElementChild.style.animation = `heroSliderAnim 10s ease-in-out forwards`;
//             setTimeout(() => {
//                 imageItem.lastElementChild.style.animation = `comeOut 2s ease-in-out forwards`;
//             }, 10000);
//             setTimeout(() => {
//                 if(ind === imageItemsEl.length - 1) {
//                     bgAnim();
//                 }
//             }, 10000);
//         }, ind * 10000);
//     });
// };
//

(function() {
    let config;
    if(window.innerWidth <= 992) {
        config = {
            duration: 20
        };
    } else {
        config = {
            duration: 7
        };
    }

    const sliderImages = document.querySelectorAll('.slider-img');

    const buildKeyframes = (arr, cb) => {
        // let insertHere;
        const buildArr = [];

        for(let i = 0; i < arr.length; i++) {
            let html = `
        ${arr[i].breakPoint}% {
            background-image: url('./assets/images/slider/${arr[i].src}');
            background-position-x: ${arr[i].pos};
        }
    `;
            buildArr.push(html);
        }

        const keyframesHtml = `
    @keyframes heroSliderAnim {
        ${buildArr.join(' ')}
    }
`;
        cb(keyframesHtml);
    };

    const bgAnim = () => {

        let getByPart = parseInt(100 / sliderImages.length);
        const keyframesBreakPoints = [];
        for(let i = 0; i <= 100; i = i + getByPart) {
            keyframesBreakPoints.push(i);
            keyframesBreakPoints.push(i+5);
        }
        keyframesBreakPoints.shift();
        keyframesBreakPoints.pop();

        let j = 0;
        let arr = [];
        for(let i = 0; i < keyframesBreakPoints.length; i++) {
            let dataObj = {};
            dataObj.breakPoint = keyframesBreakPoints[i];
            if(i % 2 === 0) {
                const imageData = sliderImages[j];
                const imageSrc = imageData.src.split('/')[imageData.src.split('/').length - 1];
                dataObj.src = imageSrc;
                dataObj.pos = 'left';
                j++;
            } else {
                dataObj.src = arr[i-1].src;
                dataObj.pos = 'right';
            }
            arr.push(dataObj);
        }
        buildKeyframes(arr, injectIt);
    };
    bgAnim();

    function injectIt(keyframes) {
        console.log(keyframes);
        const style = document.createElement('style');
        style.innerHTML = keyframes;
        document.getElementsByTagName('head')[0].appendChild(style);

        const slider = document.querySelector('.slider');
        slider.style.animation = `heroSliderAnim ${sliderImages.length * config.duration}s linear forwards infinite`;
    }
})();
