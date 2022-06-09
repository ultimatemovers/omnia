(function () {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let TOGGLE_MENU = false;
  let activeTabFood = 0
  let activeTabDrink = 0

  function init() {
    // new SmoothScroll(target,speed,smooth)
    new SmoothScroll(document, 40, 16)
  }

  function SmoothScroll(target, speed, smooth) {
    if (target === document)
      target = (document.scrollingElement ||
        document.documentElement ||
        document.body.parentNode ||
        document.body)

    let moving = false
    let pos = target.scrollTop
    let frame = target === document.body &&
      document.documentElement ?
      document.documentElement :
      target

    target.addEventListener('mousewheel', scrolled, {
      passive: false
    })
    target.addEventListener('DOMMouseScroll', scrolled, {
      passive: false
    })

    function scrolled(e) {
      e.preventDefault();
      let delta = normalizeWheelDelta(e)

      pos += -delta * speed
      pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight))

      if (!moving) update()
    }

    function normalizeWheelDelta(e) {
      if (e.detail) {
        if (e.wheelDelta)
          return e.wheelDelta / e.detail / 40 * (e.detail > 0 ? 1 : -1) // Opera
        else
          return -e.detail / 3 // Firefox
      } else
        return e.wheelDelta / 120 // IE,Safari,Chrome
    }

    function update() {
      moving = true
      let delta = (pos - target.scrollTop) / smooth

      target.scrollTop += delta

      if (Math.abs(delta) > 0.5)
        requestFrame(update)
      else
        moving = false
    }

    let requestFrame = function () { // requestAnimationFrame cross browser
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (func) {
          window.setTimeout(func, 1000 / 50);
        }
      );
    }()
  }

  const menuBurger = document.querySelector('#burger-menu')
  menuBurger.addEventListener('click', () => {
    const navigationPage = document.querySelector('#navigation-page')
    const header = document.querySelector('.site-header')
    const logo = document.querySelector('.logo')
    const navLogo = document.querySelector('.nav-logo')

    // opens menu
    if (!TOGGLE_MENU) {

      if(window.innerWidth > 450) {
        navLogo.classList.remove('hidden')
        logo.classList.add('hidden')
      }
      else {
        document.body.style = "height: 100vh;"
      }
      header.classList.remove('open-burger')
      navigationPage.classList.remove('hidden')
    }

    if (TOGGLE_MENU) {
      document.body.style = ""
      navigationPage.classList.add('close')
      navLogo.classList.add('hidden')
      logo.classList.remove('hidden')
      header.classList.add('open-burger')
      setTimeout(()=> {
        navigationPage.classList.add('hidden')
        navigationPage.classList.remove('close')
      }, 500)
    }

    TOGGLE_MENU = !TOGGLE_MENU
  })


  if(document.body.id === 'food') {
    const foodItems = document.querySelectorAll('#food-menu .menu-category-title')
    const foodItemsProducts = document.querySelectorAll('#food-products .category-products')
    const drinkItems = document.querySelectorAll('#drink-menu .menu-category-title')
    const drinkItemsProducts = document.querySelectorAll('#drink-products .category-products')


    foodItems.forEach( ( fi, idx ) => {
      fi.addEventListener('click', () => {
        activeTabFood = idx
        fi.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
      })
        filterProducts(foodItems, foodItemsProducts, activeTabFood)
      })
    })
    drinkItems.forEach( ( di, idx ) => {
      di.addEventListener('click', () => {
        activeTabDrink = idx
        di.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
      })
        filterProducts(drinkItems, drinkItemsProducts, activeTabDrink)
      })
    })

    filterProducts(foodItems, foodItemsProducts, activeTabFood)
    filterProducts(drinkItems, drinkItemsProducts, activeTabDrink)

  }


  function filterProducts(items, products, activeTab){
    items.forEach( ( item, idx ) => {
      if(idx === activeTab)
        item.classList.add('active')
      else
        item.classList.remove('active')
    })
    products.forEach( ( product, idx ) => {
      if(idx === activeTab)
        product.classList.remove('hidden')
      else
        product.classList.add('hidden')
    })
  }


  /* partners - farms */

  if(document.body.id === 'about'){
    (function () {
      let partnerSection = document.querySelector(".partners");
  
      partnerSection.addEventListener("click", function (event) {
        let target = event.target;
        target.classList.add('accordion-opened')
        console.log('open' )
        if (target.classList.contains("partner-title")) {
          let hiddenInfo = target.nextElementSibling;
          if (hiddenInfo.style.display === "block") {
            hiddenInfo.style.display = "none";
            target.classList.remove('accordion-opened')
          } else {
            hiddenInfo.style.display = "block";
          }
        }
      });
    })();
  }



  // ------------------------------ //
  //       O L D   S E T U P        //
  // ------------------------------ //
  

  // if(document.querySelector('.reveal'))
  //   ScrollReveal().reveal('.reveal', { distance: '150px', duration: 700, origin: 'bottom', easing: 'cubic-bezier(0.25,1.05,1,1)' });
  // if(document.querySelector('.reveal-left'))
  //   ScrollReveal().reveal('.reveal-left', { distance: '30px', duration: 700, origin: 'left', easing: 'cubic-bezier(0.3,.62,1,1)' });
  // if(document.querySelector('.reveal-right'))
  //   ScrollReveal().reveal('.reveal-right', { distance: '30px', duration: 700, origin: 'right', easing: 'cubic-bezier(0.3,.62,1,1)' });
  // if(document.querySelector('.reveal-top'))
  //   ScrollReveal().reveal('.reveal-top', { delay: 300, distance: '30px', duration: 1000, origin: 'bottom', easing: 'cubic-bezier(0.3,.62,1,1)' });
  // if(document.querySelector('.reveal-top-fast'))
  //   ScrollReveal().reveal('.reveal-top-fast', { delay: 200, distance: '50px', duration: 800, origin: 'bottom', easing: 'cubic-bezier(0.3,.62,1,1)' });
  // if(document.querySelector('.reveal-top-delay'))
  //   ScrollReveal().reveal('.reveal-top-delay', { delay: 300, distance: '30px', duration: 700, origin: 'bottom', easing: 'cubic-bezier(0.3,.62,1,1)' });


  if(document.querySelector('.reveal')) {
    ScrollReveal().reveal('.reveal', { distance: '150px', duration: 1300, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
  }
  if(document.querySelector('.reveal-delay-200')) {
    ScrollReveal().reveal('.reveal-delay-200', { delay: 200, distance: '120px', duration: 1300, origin: 'bottom', easing: 'ease-in-out' });
  }
  if(document.querySelector('.reveal-delay-300')) {
    ScrollReveal().reveal('.reveal-delay-300', { delay: 300, distance: '120px', duration: 1300, origin: 'bottom', easing: 'ease-in-out' });
  }
  if(document.querySelector('.reveal-delay-400')) {
    ScrollReveal().reveal('.reveal-delay-400', { delay: 400, distance: '120px', duration: 1300, origin: 'bottom', easing: 'ease-in-out' });
  }
  if(document.querySelector('.reveal-delay-500')) {
    ScrollReveal().reveal('.reveal-delay-500', { delay: 500, distance: '120px', duration: 1300, origin: 'bottom', easing: 'ease-in-out' });
  }
  if(document.querySelector('.reveal-delay-600')) {
    ScrollReveal().reveal('.reveal-delay-600', { delay: 600, distance: '120px', duration: 1300, origin: 'bottom', easing: 'ease-in-out' });
  }
  if(document.querySelector('.reveal-delay-700')) {
    ScrollReveal().reveal('.reveal-delay-700', { delay: 700, distance: '120px', duration: 1300, origin: 'bottom', easing: 'ease-in-out' });
  }
  if(document.querySelector('.reveal-left')) {
    ScrollReveal().reveal('.reveal-left', { distance: '150px', origin: 'left', opacity: 0, delay: 150, duration: 1100, easing: 'ease-in-out'})
  }
  if(document.querySelector('.reveal-right')) {
    ScrollReveal().reveal('.reveal-right', { distance: '150px', origin: 'right', opacity: 0, delay: 150, duration: 1100, easing: 'ease-in-out'})
  }

  if(window.innerWidth < 450){
    if(document.querySelector('.reveal')) {
      ScrollReveal().reveal('.reveal', { distance: '80px', duration: 1100, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
    }
    if(document.querySelector('.reveal-delay-200')) {
      ScrollReveal().reveal('.reveal-delay-200', { delay: 130, distance: '120px', duration: 1100, origin: 'bottom', easing: 'cubic-bezier(0.3,1.05,1,1)' });
    }
    if(document.querySelector('.reveal-delay-300')) {
      ScrollReveal().reveal('.reveal-delay-300', { delay: 200, distance: '80px', duration: 1200, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
    }
    if(document.querySelector('.reveal-delay-400')) {
      ScrollReveal().reveal('.reveal-delay-400', { delay: 230, distance: '120px', duration: 1100, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
    }
    if(document.querySelector('.reveal-delay-500')) {
      ScrollReveal().reveal('.reveal-delay-500', { delay: 360, distance: '80px', duration: 1100, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
    }
    if(document.querySelector('.reveal-delay-600')) {
      ScrollReveal().reveal('.reveal-delay-600', { delay: 400, distance: '80px', duration: 1200, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
    }
    if(document.querySelector('.reveal-delay-700')) {
      ScrollReveal().reveal('.reveal-delay-700', { delay: 430, distance: '80px', duration: 1200, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
    }
    if(document.querySelector('.reveal-delay-4000')) {
      ScrollReveal().reveal('.reveal-delay-4000', { delay: 130, distance: '80px', duration: 1200, origin: 'bottom', easing: 'cubic-bezier(.17,1.05,.88,1)' });
    }
    if(document.querySelector('.reveal-left')) {
      ScrollReveal().reveal('.reveal-left', { distance: '80px', origin: 'bottom', opacity: 0,  duration: 1100, easing: 'ease-in-out'})
    }
    if(document.querySelector('.reveal-right')) {
      ScrollReveal().reveal('.reveal-right', { distance: '80px', origin: 'bottom', opacity: 0, duration: 1100, easing: 'ease-in-out'})
    }
  }


  document.body.addEventListener('onload', init())

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  }

})()
