console.log("animate pack js unreleased");

const laptops = [];
const balloons = [];
const baseTrigger = 0;
const baseStop = 400;
let ticking = false; 

function addLaptop(el, customTrigger = baseTrigger, customStop = baseStop) {
    laptops.push({ el, trigger: customTrigger, stop: customStop, animatedVal: 0, targetVal: 0 });
}

function addBalloon(el, customTrigger = baseTrigger, customStop = baseStop) {
    balloons.push({ el, trigger: customTrigger, stop: customStop, animatedVal: 0, targetVal: 0 });
}

function onScroll() {
    if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
            const wHeight = window.innerHeight; 
            
            laptops.forEach((item) => {
                const { el, trigger, stop } = item;
                const rect = el.getBoundingClientRect();
                const elHeight = rect.y - wHeight;
                const leftOffset = rect.x;
                const adjustedTrigger = trigger + leftOffset * 0.1;
                const adjustedStop = stop + leftOffset * 0.1;
                let targetValue = 0;

                if (elHeight + adjustedTrigger < 0 && elHeight + adjustedStop > 0) {
                    targetValue = Math.round(100 * (-elHeight - adjustedTrigger) / (adjustedStop - adjustedTrigger));
                } else if (elHeight + adjustedStop < 0) {
                    targetValue = 100;
                }

                item.targetVal = targetValue;
            });

            balloons.forEach((item) => {
                const { el, trigger, stop } = item;
                const rect = el.getBoundingClientRect();
                const elHeight = rect.y - wHeight;
                let targetValue = 0;

                if (elHeight + trigger < 0 && elHeight + stop > 0) {
                    targetValue = Math.round(100 * (-elHeight - trigger) / (stop - trigger));
                } else if (elHeight + stop < 0) {
                    targetValue = 100;
                }

                item.targetVal = targetValue;
            });

            ticking = false;
        });
    }
}

document.addEventListener("scroll", onScroll);

function easeAnimation() {
    laptops.forEach((item) => {
        item.animatedVal += (item.targetVal - item.animatedVal) * 0.15;
        animateLaptop(item.el, item.animatedVal);
    });

    balloons.forEach((item) => {
        item.animatedVal += (item.targetVal - item.animatedVal) * 0.15;
        animateBalloon(item.el, item.animatedVal);
    });

    requestAnimationFrame(easeAnimation);
}

requestAnimationFrame(easeAnimation);

function animateLaptop(el, val) {
    el.style.transformStyle = "preserve-3d";
    const maxRotate = 70;
    const rotateVal = Math.min(100 - val, maxRotate);
    el.style.transform = `rotateX(${rotateVal}deg)`;
}

function animateBalloon(el, val) {
    const startTranslateY = 300;
    const progress = val / 100;
    const translateY = startTranslateY * (1 - progress);
    const blur = (1 - progress) * 5;
    const opacity = 0.5 + (progress * 0.5);

    el.style.transform = `translateY(${translateY}px)`;
    el.style.filter = `blur(${blur}px)`;
    el.style.opacity = opacity;
    el.style.zIndex = val < 100 ? 3 : "auto";
}

requestAnimationFrame(onScroll);
setTimeout(() => {
    requestAnimationFrame(onScroll);
}, 500);