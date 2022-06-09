(function () {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  let TOGGLE_MENU = false;
  let activeTabFood = 0
  let activeTabDrink = 0

  function init() {
    // new SmoothScroll(target,speed,smooth)
    new SmoothScroll(document, 50, 16)
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




  /*document.body.addEventListener('onload', init())

  window.onbeforeunload = () => {
    window.scrollTo(0, 0);
  }*/

})()
