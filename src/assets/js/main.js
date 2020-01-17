// Global Declarations
const lowerNav = document.querySelector('.lower-nav nav');
const mainNavItems = document.querySelector('.main-nav-items');

AOS.init({
    easing: 'ease-in-out-quad',
    duration: 700
});

window.scrollTo({
    left: 0
});

// Search Handler
(function() {
    const mainNavItems = document.querySelector('.main-items');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', e => {
        console.log('its working');
        e.preventDefault();
        mainNavItems.style.animation = 'comeOutToLeft .6s ease-in-out forwards';
        lowerNav.insertAdjacentHTML('afterbegin', '<div class="back-drop"></div>');
        setTimeout(() => {
            lowerNav.classList.add('search-active');
        }, 800);
        setTimeout(() => {
            mainNavItems.style.display = 'none';
            mainNavItems.style.animation = 'none';
            let html = `
            <div class="search-box">
                <form action="">
                    <input type="text">
                </form>
            </div>
        `;
            lowerNav.insertAdjacentHTML('afterbegin', html);
            lowerNav.querySelector('input').focus();

            const backDrop = lowerNav.querySelector('.back-drop');
            const searchBox = lowerNav.querySelector('.search-box');
            backDrop.addEventListener('click', e => {
                lowerNav.classList.remove('search-active');
                searchBox.style.animation = 'comeOutToLeft .6s ease-in-out forwards';
                setTimeout(() => {
                    searchBox.remove();
                    mainNavItems.style.display = 'flex';
                    mainNavItems.style.animation = 'comeInFromLeft .6s ease-in-out forwards';
                    setTimeout(() => {
                        mainNavItems.style.animation = 'none';
                    }, 600);
                    backDrop.remove();
                }, 420);
            });

        }, 420);
    });
})();

// Drop Down Handler
(function() {
    if(window.innerWidth > 992) {
        const dropDownBtns = lowerNav.querySelectorAll('.drop-down-link');
        lowerNav.addEventListener('mouseenter', e => {
            console.log('its entered');
            dropDownBtns.forEach(dropDown => {
                dropDown.addEventListener('mouseover', async function (e) {
                    let thatEl = document.querySelector('.thatEl');
                    if (!thatEl) {
                        const html = `
                        <div class="thatEl">
                            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" width="256.855" height="268.351" viewBox="0 0 256.855 268.351">
                                <defs>
                                    <filter id="Path_1" x="0" y="0" width="264.082" height="277.728" filterUnits="userSpaceOnUse">
                                    <feOffset dy="3" input="SourceAlpha"/>
                                    <feGaussianBlur stdDeviation="2" result="blur"/>
                                    <feFlood flood-opacity="0.271"/>
                                    <feComposite operator="in" in2="blur"/>
                                    <feComposite in="SourceGraphic"/>
                                    </filter>
                                </defs>
                                <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_1)">
                                    <path id="Path_1" data-name="Path 1" d="M2549.14,988.406c-3.917,4.352,0,126.6,0,126.6s-6.99,108.017,0,114.08,131.528,0,131.528,0,108.3,6.11,113.942,0,0-123.437,0-123.437,4.807-112.438,0-117.245-114.708,0-114.708,0-62.431,6.093-80.71-20.891C2583.523,994.064,2556.539,981.878,2549.14,988.406Z" transform="translate(-2543.183 -966.581)" fill="none" stroke-width="1"/>
                                </g>
                            </svg>
                        </div>
                    `;
                        await lowerNav.insertAdjacentHTML('beforeend', html);
                        thatEl = document.querySelector('.thatEl')
                    }
                    if (thatEl) {
                        const dropdownEl = dropDown.lastElementChild;
                        const coords = getCoords(dropdownEl);
                        thatEl.style.top = coords.top + 'px';
                        thatEl.style.left = coords.left + 'px';
                        thatEl.style.width = coords.width + 'px';
                        thatEl.style.height = coords.height + 'px';
                    }
                })
            });
        });

        const closeDropDown = lowerNav.querySelector('.close-drop-down');

        closeDropDown.addEventListener('mouseenter', removeDropDown);
        lowerNav.addEventListener('mouseleave', removeDropDown);

        function removeDropDown() {
            const thatEl = lowerNav.querySelector('.thatEl');
            if (thatEl) {
                thatEl.style.animation = 'rotateXOut .15s ease-in-out forwards';
                setTimeout(() => {
                    thatEl.remove();
                }, 170);
            }
        }

        function getCoords(el) {
            const elCoords = el.getBoundingClientRect(),
                top = elCoords.top,
                left = elCoords.left,
                width = elCoords.width,
                height = elCoords.height;
            return {top, left, width, height};
        }
    }
})();

// Scroll Navigation Handler
(function () {
    if(window.innerWidth > 992) {
        const navigation = document.querySelector('.navigation');
        window.addEventListener('scroll', e => {
            if(window.pageYOffset > 148) {
                navigation.classList.add('minified-version');
            } else {
                navigation.classList.remove('minified-version');
            }
        })
    }
})();

// Main Hero Section Left Info Handler
(function() {

    // const closeBtn = document.querySelector('.close-btn');
    // closeBtn.addEventListener('click', function(e) {
    //     const modalToClose = this.closest('.modal');
    //     modalToClose.classList.add('close');
    // });

    const dropSelect = document.querySelectorAll('.drop-select');
    dropSelect.forEach(cur => {
        cur.addEventListener('change', function(e) {
            cur.previousElementSibling.innerHTML = '';
        });
    })

})();

// Video Section Handler
(function() {
    const videoContent = document.querySelector('.video-content');
    const videoWrapper = document.querySelector('#video > .wrapper');

    // Hero Section Open Video
    let openVideo = document.querySelectorAll('.openVideo');
    const videoTopLeft = document.querySelector(`.video.topLeft`);
    openVideo.forEach(cur => {
        cur.addEventListener('click', (e) => {
            e.preventDefault();
            openVideoHandler('<iframe src="https://www.youtube.com/embed/zGM562fadb8?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            , videoTopLeft);
        })
    });


    function clippingVideo(el, html) {
        // DOM Elements
        const videoTopLeft = document.querySelector(`.video.${el}`);

        videoTopLeft.addEventListener('click', () => {
            openVideoHandler(html, videoTopLeft)
        });
    }

    function openVideoHandler(html, videoTopLeft) {
        videoContent.innerHTML = html;
        const videoContentMarginTop = 90;
        const bugFixInXDirection = 70;

        // Coordinates
        const videoWrapperCoords = getCoordinates(videoWrapper);
        const coords = getCoordinates(videoTopLeft);

        const finalCoords = {
            top: coords.top - videoWrapperCoords.top + coords.width / 2 - videoContentMarginTop,
            left: coords.left - videoWrapperCoords.left + coords.width / 2 - bugFixInXDirection
        };
        videoContent.style.opacity = `0`;

        videoContent.style.clipPath = `circle(100px at ${finalCoords.left}px ${finalCoords.top}px)`;
        videoContent.style.display = `block`;

        // window.scrollTo({
        //     top: document.getElementById('hero').scrollHeight + document.getElementById('about').scrollHeight - 30,
        //     left: 0,
        //     behavior: "smooth"
        // });

        console.log(document.getElementById('hero').scrollHeight + document.getElementById('about').scrollHeight);

        setTimeout(() => {
            videoContent.style.opacity = `1`;
            document.querySelector('body').insertAdjacentHTML('afterbegin', '<div class="back-drop"></div>');
            videoContent.style.clipPath = `circle(72% at 50% 50%)`;

            const backDrop = document.querySelector('.back-drop');

            backDrop.addEventListener('click', function (e) {
                videoContent.style.clipPath = `circle(100px at ${finalCoords.left}px ${finalCoords.top}px)`;
                videoContent.style.opacity = `0.4`;
                backDrop.classList.add('remove');

                setTimeout(() => {
                    videoContent.innerHTML = '';
                    videoContent.style.opacity = `0`;
                    videoContent.style.display = `none`;
                    backDrop.remove();
                }, 300);
            })
        }, 200);
    }

    clippingVideo('topLeft',
        '<iframe src="https://www.youtube.com/embed/zGM562fadb8?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    clippingVideo('bottomRight',
        '<iframe width="900" height="506" src="https://www.youtube.com/embed/BzLWIZI_7yg?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');



    function getCoordinates(el) {
        const elCoords = el.getBoundingClientRect(),
            top = elCoords.top,
            left = elCoords.left,
            width = elCoords.width,
            height = elCoords.height;
        return {top, left, width, height};
    }
})();

// Button to Top Handler
(function() {
    const btnToTop = document.querySelector('.btn-to-top');
    btnToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    });
})();

// Mobile Dropdown handler
(function() {
    const defaultLiHeight = 40;

    if(window.innerWidth <= 992) {
        // Menu Toggle to drop the dropDown
        const menuToggle = document.querySelector('.menu-toggle');
        menuToggle.addEventListener('click', function(e) {
            const length = mainNavItems.querySelectorAll('.drop-item').length;
            let isOpened = mainNavItems.dataset.opened;
            if(isOpened === 'false') {
                lowerNav.closest('.navigation').style.background = 'rgb(0, 15, 33)';
                mainNavItems.parentElement.style.transform = 'scaleY(1)';
                mainNavItems.style.transform = 'scaleY(1)';
                setTimeout(() => {
                    mainNavItems.parentElement.style.opacity = '1';
                    mainNavItems.style.opacity = '1';
                }, 40);
                mainNavItems.setAttribute('data-opened', 'true');
                addBackdropHandler('body', closeDropDown);
            } else {
                const backDrop = document.querySelector('.back-drop');
                backDrop.remove();
                closeDropDown();
            }

            function closeDropDown() {
                lowerNav.closest('.navigation').style.background = '#00204647';
                mainNavItems.style.opacity = '0';
                mainNavItems.parentElement.style.opacity = '0';
                setTimeout(() => {
                    mainNavItems.style.transform = 'scaleY(0)';
                    mainNavItems.parentElement.style.transform = 'scaleY(0)';
                }, 400);
                mainNavItems.setAttribute('data-opened', 'false');
            }
        });

        // Inside DropDown Handler
        doThis('.drop-down-link', '.dropdown');
        doThis('.dropdown-item', '.sub-dropdown');

        function doThis(el, subEl) {
            const dropMobLinks = lowerNav.querySelectorAll(`${el}.drop-mob-link > a`);
            dropMobLinks.forEach(dropMobLink => {
                dropMobLink.closest('.drop-mob-link').style.overflow = 'hidden';

                dropMobLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    const dropDownItems = this.parentElement.querySelectorAll(`${subEl}.drop-mob > .dropdown-item`);
                    const dropDownContainer = this.parentElement.querySelector(`${subEl}.drop-mob`);
                    let isOpened = this.parentElement.dataset.opened;
                    if(isOpened === 'false' || isOpened === undefined) {
                        console.log(isOpened);
                        this.parentElement.style.height = `${(dropDownItems.length + 1) * defaultLiHeight}px`;
                        dropDownContainer.style.top = `${defaultLiHeight}px`;
                        if(subEl === '.sub-dropdown') {
                            const mainDropDown = dropDownContainer.closest('.drop-down-link');
                            console.log(mainDropDown);
                            mainDropDown.style.height = `${parseInt(mainDropDown.style.height.slice(0, -2)) + (dropDownItems.length * defaultLiHeight)}px`;
                        }
                        this.parentElement.setAttribute('data-opened', 'true');
                    } else {
                        this.parentElement.style.height = `${defaultLiHeight}px`;
                        const allItems = this.parentElement.querySelectorAll('.dropdown > .dropdown-item');
                        allItems.forEach(allItem => {
                            allItem.style.height = `${defaultLiHeight}px`;
                            allItem.setAttribute('data-opened', 'false');
                        });
                        if(subEl === '.sub-dropdown') {
                            const mainDropDown = dropDownContainer.closest('.drop-down-link');
                            mainDropDown.style.height = `${parseInt(mainDropDown.style.height.slice(0, -2)) - (dropDownItems.length * defaultLiHeight)}px`;
                        }
                        this.parentElement.setAttribute('data-opened', 'false');
                    }
                });
            });
        }
    }
})();

// Animating SVG on hero Section
(function() {
    function animMorph(morphEl, type, path) {
        let morphing1 = anime({
            targets: morphEl,
            // delay: 500,
            d: [
                {value: path},
            ],
            easing: 'easeInOutQuint',
            duration: 400,
            loop: false,
            autoplay: false,
        });
        morphing1[type]();
    }
    let svgBtn = document.querySelectorAll('.btn');
    svgBtn.forEach(cur => {
        let morphsEl = cur.querySelectorAll('.morph');
        morphsEl.forEach(morphEl => {
            morphEl.setAttribute('d', 'M1272.975,364.729c-5.135,7.151-5.161,105.485,0,108.465,2.642,1.526,101.422-4.04,194.926-3.759,89.228.268,173.391,6.488,175.762,3.759,4.86-5.593,5.777-102.78,0-108.465-2.975-2.928-81.56-4.311-175.762-4.4C1379.657,360.244,1275.466,361.26,1272.975,364.729Z');
        });
        cur.addEventListener('mouseover', function(e) {
            let morphEl = this.querySelector('.morph');
            let destPath = 'M1272.97,364.729c-5.135,7.151,10.485-2.37,0,108.465,2.642,1.526,101.422-6.661,194.926-6.38,89.228.268,173.391,9.109,175.762,6.38,4.86-5.593-12.689,19.734,0-108.465-2.975-2.928-81.56.089-175.762,0C1379.66,364.644,1275.47,361.26,1272.97,364.729Z';
            setTimeout(() => {
                morphEl.setAttribute('d', destPath);
            }, 400);
            animMorph(morphEl, 'play', destPath);
        });
    });
    svgBtn.forEach(cur => {
        cur.addEventListener('mouseleave', function(e) {
            let morphEl = this.querySelector('.morph');
            let destPath = 'M1272.975,364.729c-5.135,7.151-5.161,105.485,0,108.465,2.642,1.526,101.422-4.04,194.926-3.759,89.228.268,173.391,6.488,175.762,3.759,4.86-5.593,5.777-102.78,0-108.465-2.975-2.928-81.56-4.311-175.762-4.4C1379.657,360.244,1275.466,361.26,1272.975,364.729Z';
            setTimeout(() => {
                morphEl.setAttribute('d', destPath);
            }, 400);
            animMorph(morphEl, 'play', destPath);
        });
    });
})();

// Calculating Scroll position
(function() {
    // const body = document.querySelector('body');
    // window.addEventListener('scroll', () => {
    //     if(window.scrollY < 100) {
    //         // console.log((window.scrollY / body.scrollHeight) * 100 + '%');
    //     } else {
    //         // console.log(((window.scrollY + window.innerHeight) / body.scrollHeight) * 100 + '%');
    //     }
    // })
})();

// Add Backdrop
function addBackdropHandler(el, cb) {
    document.querySelector(el).insertAdjacentHTML('afterbegin', '<div class="back-drop"></div>');
    setTimeout(() => {
        const backDrop = document.querySelector('.back-drop');

        backDrop.addEventListener('click', e => {
            setTimeout(() => {
                backDrop.remove();
            }, 420);
            cb();
        });

    }, 420);
}