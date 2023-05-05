const hero1 = document.querySelector('#hero-text-1')
const hero2 = document.querySelector('#hero-text-2')
const hero3 = document.querySelector('#hero-text-3')

function onScroll() {
    var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    if (vw > 1920) vw = 1920
    var sx, sy, d = document,
        r = d.documentElement,
        b = d.body;
    sx = r.scrollLeft || b.scrollLeft || 0
    sy = r.scrollTop || b.scrollTop || 0
    
    // page 1
    var opacity = (Math.round(vh/2)-sy-230) / (Math.round(vh/2)-230)
    var hero2YOffset = Math.round(((vh/2)-sy-80) / 2)
    var hero2XOffset = Math.round( vh-sy * 2) + 100
    var hero2X = hero2XOffset > vw/2 ? vw/2 : hero2XOffset < 230 ? 230 : hero2XOffset
    var hero2Y = hero2YOffset < (-7) ? vh/2 + sy-vh/2 + 65 : vh/2
    var scale = 2-opacity
    
    hero1.style.opacity = opacity
    hero1.style.transform = "translateX(calc(50vw - 50%)) translateY(calc(50vh - 50% - 80px)) scale("+scale+")"
    
    hero2.style.fontSize = (hero2YOffset > 100 ? 100 : hero2YOffset < 42 ? 42 : hero2YOffset) + 'px'
    hero2.style.transform  = "translateX(calc(" + hero2X + "px - 50% )) translateY(calc( "+hero2Y+"px - 50%))"

    var hero3YOffset = Math.round(((vh/2)-sy-80) / 2)
    var hero3XOffset = Math.round( vh-sy * 2 + 400)
    var hero3X = hero3XOffset > vw/2 ? vw/2 : hero3XOffset < 400 ? 400 : hero3XOffset
    var hero3Y = hero3YOffset < (-47) ? vh/2 + sy-vh/2 -14 : vh/2
    
    hero3.style.fontSize = (hero3YOffset > 150 ? 150 : hero3YOffset < 42 ? 42 : hero3YOffset) + 'px'
    hero3.style.transform  = "translateX(calc(" + hero3X + "px - 50% )) translateY(calc( "+hero3Y+"px - 50% + 80px))"
    
    // page 2
    const wid1 = document.querySelector('#what-i-do-1')
    const wid2 = document.querySelector('#what-i-do-2')
    const wid3 = document.querySelector('#what-i-do-3')

    var hidHeight = Math.round(((vh)-sy) / 2)
    hidHeight = hidHeight>100?100:hidHeight<0?0:hidHeight

    wid1.style.transform = "translateX("+ hidHeight +"%)"
    wid2.style.transform = "translateX(0%)"
    wid3.style.transform = "translateX(-"+ hidHeight +"%)"

    // console.log(hidHeight)
}