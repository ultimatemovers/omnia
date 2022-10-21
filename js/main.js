(function () {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let TOGGLE_MENU = false;
  let activeTabFood = 0
  let activeTabCocktails = 0
  let activeTabNonAlchoholic = 0
  let activeTabWines = 0
  let showPopup = false


  let downButton = document.getElementById('Chevrons')
  let mainContent = document.querySelector('.main-content')

  function scrollDownScreen() {
    mainContent.scrollIntoView({
      behavior: 'smooth'
    })
  }

  let siteHeader = document.querySelector('.site-header')

  window.addEventListener('scroll', function() {
    let scroll = window.scrollY;
    if (scroll > 30 ) {
       if (document.URL.includes("food") ){
        siteHeader.classList.add('yellow')
      }
      else  if (document.URL.includes("bookings") || document.URL.includes("events") ){
        siteHeader.classList.add('white')
      }
      else {
        siteHeader.classList.add('green')
      }
      } else {
      siteHeader.classList.remove('yellow')
      siteHeader.classList.remove('white')
      siteHeader.classList.remove('green')
    }
});


  if(downButton){
    downButton.addEventListener('click', scrollDownScreen)
  }

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
    navigationPage.style.height = window.innerHeight + 'px'

    // opens menu
    if (!TOGGLE_MENU) {
      siteHeader.classList.add('transparent') //for navigation page on mobile
      if (window.innerWidth > 450) {
        navLogo.classList.remove('hidden')
        logo.classList.add('hidden')
      } else {
        document.body.style = "height: 100vh;"
      }
      header.classList.remove('open-burger')
      navigationPage.classList.remove('hidden')
    }

    if (TOGGLE_MENU) {
      siteHeader.classList.remove('transparent') //for navigation page on mobile
      document.body.style = ""
      navigationPage.classList.add('close')
      navLogo.classList.add('hidden')
      logo.classList.remove('hidden')
      header.classList.add('open-burger')
      setTimeout(() => {
        navigationPage.classList.add('hidden')
        navigationPage.classList.remove('close')
      }, 500)
    }

    TOGGLE_MENU = !TOGGLE_MENU
  })

  document.querySelector('#closePopup').addEventListener('click', () => {
    togglePopup(false)
  })

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' || e.keyCode === 27)
      togglePopup(false)
  })

  document.querySelector('#newsletterPopupBck').addEventListener('click', (e) => {
    if (e.target.id == document.querySelector('#newsletterPopupBck').id)
      togglePopup(false)
  })

  document.querySelectorAll('.openPopup').forEach(el => {
    el.addEventListener('click', () => {
      togglePopup(true)
    })
  })

  function togglePopup(condition) {
    showPopup = condition;

    if (showPopup) {
      document.getElementById('newsletterPopup').classList.remove('hidden')
    } else {
      document.getElementById('newsletterPopup').classList.add('hidden')
    }
  }


  if (document.body.id === 'food') {
    const foodItems = document.querySelectorAll('#food-menu .menu-category-title')
    const foodItemsProducts = document.querySelectorAll('#food-products .category-products')
    // const drinkItems = document.querySelectorAll('#drink-menu .menu-category-title')
    // const drinkItemsProducts = document.querySelectorAll('#drink-products .category-products')
    const cocktailsItems = document.querySelectorAll('#cocktails-menu .menu-category-title')
    const cocktailsItemsProducts = document.querySelectorAll('#cocktails-products .category-products')
    const nonAlchoholicItems = document.querySelectorAll('#non-alchoholic-menu .menu-category-title')
    const nonAlchoholicItemsProducts = document.querySelectorAll('#non-alchoholic-products .category-products')
    const winesItems = document.querySelectorAll('#wines-menu .menu-category-title')
    const winesItemsProducts = document.querySelectorAll('#wines-products .category-products')


    foodItems.forEach((fi, idx) => {
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
    cocktailsItems.forEach((di, idx) => {
      di.addEventListener('click', () => {
        activeTabCocktails = idx
        di.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
        filterProducts(cocktailsItems, cocktailsItemsProducts, activeTabCocktails)
      })
    })
    nonAlchoholicItems.forEach((di, idx) => {
      di.addEventListener('click', () => {
        activeTabNonAlchoholic = idx
        di.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
        filterProducts(nonAlchoholicItems, nonAlchoholicItemsProducts, activeTabNonAlchoholic)
      })
    })
    winesItems.forEach((di, idx) => {
      di.addEventListener('click', () => {
        activeTabDrink = idx
        di.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
        filterProducts(winesItems, winesItemsProducts, activeTabWines)
      })
    })

    filterProducts(foodItems, foodItemsProducts, activeTabFood)
    filterProducts(cocktailsItems, cocktailsItemsProducts, activeTabCocktails)
    filterProducts(nonAlchoholicItems, nonAlchoholicItemsProducts, activeTabNonAlchoholic)
    filterProducts(winesItems, winesItemsProducts, activeTabWines)
  }


  function filterProducts(items, products, activeTab) {
    items.forEach((item, idx) => {
      if (idx === activeTab)
        item.classList.add('active')
      else
        item.classList.remove('active')
    })
    products.forEach((product, idx) => {
      if (idx === activeTab)
        product.classList.remove('hidden')
      else
        product.classList.add('hidden')
    })
  }

  /* partners - farms */

  if (document.body.id === 'about') {
    const accordions = document.querySelectorAll('.accordion')
    accordions.forEach((a) => {
      a.addEventListener('click', () => {
        if (a.classList.contains('accordion-opened')) {
          a.classList.remove('accordion-opened')
          return
        } else {
          a.classList.add('accordion-opened')
        }
      })
    })
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


  if (document.querySelector('.reveal')) {
    ScrollReveal().reveal('.reveal', {
      distance: '150px',
      duration: 1300,
      origin: 'bottom',
      easing: 'cubic-bezier(.17,1.05,.88,1)'
    });
  }
  if (document.querySelector('.reveal-delay-200')) {
    ScrollReveal().reveal('.reveal-delay-200', {
      delay: 200,
      distance: '120px',
      duration: 1300,
      origin: 'bottom',
      easing: 'ease-in-out'
    });
  }
  if (document.querySelector('.reveal-delay-300')) {
    ScrollReveal().reveal('.reveal-delay-300', {
      delay: 300,
      distance: '120px',
      duration: 1300,
      origin: 'bottom',
      easing: 'ease-in-out'
    });
  }
  if (document.querySelector('.reveal-delay-400')) {
    ScrollReveal().reveal('.reveal-delay-400', {
      delay: 400,
      distance: '120px',
      duration: 1300,
      origin: 'bottom',
      easing: 'ease-in-out'
    });
  }
  if (document.querySelector('.reveal-delay-500')) {
    ScrollReveal().reveal('.reveal-delay-500', {
      delay: 500,
      distance: '120px',
      duration: 1300,
      origin: 'bottom',
      easing: 'ease-in-out'
    });
  }
  if (document.querySelector('.reveal-delay-600')) {
    ScrollReveal().reveal('.reveal-delay-600', {
      delay: 600,
      distance: '120px',
      duration: 1300,
      origin: 'bottom',
      easing: 'ease-in-out'
    });
  }
  if (document.querySelector('.reveal-delay-700')) {
    ScrollReveal().reveal('.reveal-delay-700', {
      delay: 700,
      distance: '120px',
      duration: 1300,
      origin: 'bottom',
      easing: 'ease-in-out'
    });
  }
  if (document.querySelector('.reveal-left')) {
    ScrollReveal().reveal('.reveal-left', {
      distance: '150px',
      origin: 'left',
      opacity: 0,
      delay: 150,
      duration: 1100,
      easing: 'ease-in-out'
    })
  }
  if (document.querySelector('.reveal-right')) {
    ScrollReveal().reveal('.reveal-right', {
      distance: '150px',
      origin: 'right',
      opacity: 0,
      delay: 150,
      duration: 1100,
      easing: 'ease-in-out'
    })
  }

  if (window.innerWidth < 450) {
    if (document.querySelector('.reveal')) {
      ScrollReveal().reveal('.reveal', {
        distance: '80px',
        duration: 1100,
        origin: 'bottom',
        easing: 'cubic-bezier(.17,1.05,.88,1)'
      });
    }
    if (document.querySelector('.reveal-delay-200')) {
      ScrollReveal().reveal('.reveal-delay-200', {
        delay: 130,
        distance: '120px',
        duration: 1100,
        origin: 'bottom',
        easing: 'cubic-bezier(0.3,1.05,1,1)'
      });
    }
    if (document.querySelector('.reveal-delay-300')) {
      ScrollReveal().reveal('.reveal-delay-300', {
        delay: 200,
        distance: '80px',
        duration: 1200,
        origin: 'bottom',
        easing: 'cubic-bezier(.17,1.05,.88,1)'
      });
    }
    if (document.querySelector('.reveal-delay-400')) {
      ScrollReveal().reveal('.reveal-delay-400', {
        delay: 230,
        distance: '120px',
        duration: 1100,
        origin: 'bottom',
        easing: 'cubic-bezier(.17,1.05,.88,1)'
      });
    }
    if (document.querySelector('.reveal-delay-500')) {
      ScrollReveal().reveal('.reveal-delay-500', {
        delay: 360,
        distance: '80px',
        duration: 1100,
        origin: 'bottom',
        easing: 'cubic-bezier(.17,1.05,.88,1)'
      });
    }
    if (document.querySelector('.reveal-delay-600')) {
      ScrollReveal().reveal('.reveal-delay-600', {
        delay: 400,
        distance: '80px',
        duration: 1200,
        origin: 'bottom',
        easing: 'cubic-bezier(.17,1.05,.88,1)'
      });
    }
    if (document.querySelector('.reveal-delay-700')) {
      ScrollReveal().reveal('.reveal-delay-700', {
        delay: 430,
        distance: '80px',
        duration: 1200,
        origin: 'bottom',
        easing: 'cubic-bezier(.17,1.05,.88,1)'
      });
    }
    if (document.querySelector('.reveal-delay-4000')) {
      ScrollReveal().reveal('.reveal-delay-4000', {
        delay: 130,
        distance: '80px',
        duration: 1200,
        origin: 'bottom',
        easing: 'cubic-bezier(.17,1.05,.88,1)'
      });
    }
    if (document.querySelector('.reveal-left')) {
      ScrollReveal().reveal('.reveal-left', {
        distance: '80px',
        origin: 'bottom',
        opacity: 0,
        duration: 1100,
        easing: 'ease-in-out'
      })
    }
    if (document.querySelector('.reveal-right')) {
      ScrollReveal().reveal('.reveal-right', {
        distance: '80px',
        origin: 'bottom',
        opacity: 0,
        duration: 1100,
        easing: 'ease-in-out'
      })
    }
  }


  //document.body.addEventListener('onload', init())

  // window.onbeforeunload = () => {
  //   window.scrollTo(0, 0);
  // }

})()