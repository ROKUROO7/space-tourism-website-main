const bodyElement = document.body
const navMenuBtn = document.getElementById("nav-menu-btn")
const navMenu = document.getElementById("nav-menu")
const navOptions = Array.from(navMenu.children[0].children)

const navMenuClose = () => {
  navMenuBtn.setAttribute("aria-expanded", "false")
  navMenuBtn.children[0].src = "./assets/shared/icon-hamburger.svg"
  navMenu.dataset.animation = "slide-right-reverse"
  navMenu.dataset.hidden = "loading"
  bodyElement.dataset.overflow = "visible"
}

navMenuBtn.addEventListener("click", () => {
  if(navMenuBtn.getAttribute("aria-expanded") === "false") {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    navMenuBtn.setAttribute("aria-expanded","true")
    bodyElement.dataset.overflow = "hidden"
    navMenuBtn.children[0].src = "./assets/shared/icon-close.svg"
    navMenu.dataset.hidden = "false"
    navMenu.dataset.animation = "slide-right"
  }
  else {
    navMenuClose()
  }
})

navOptions.forEach(option => {
  option.addEventListener("click", () => {
    navOptions.forEach(btn => {
      btn.setAttribute("aria-expanded","false")
      btn.dataset.state = "none"
      btn.disabled = true
    })
    option.setAttribute("aria-expanded","true")
    option.dataset.state = "selected"
    
    if(window.matchMedia("(max-width: 48rem)").matches) {
      navMenuClose()
    }
  })
})

navMenu.addEventListener("animationend", () => {
  navMenu.dataset.animation = "none"
  
  if(navMenu.dataset.hidden === "loading") {
    navMenu.dataset.hidden = "true"
  }
})

const hiddenBg = document.getElementById("hidden-background")
const bg = document.getElementById("background")
const exploreBtns = [document.getElementById("destination-btn"), document.getElementById("explore")]
const destination = document.getElementById("destination")
const logoBtn = document.getElementById("logo-btn")
const homeBtn = document.getElementById("home-btn")
const home = document.getElementById("home")
const crewBtn = document.getElementById("crew-btn")
const crew = document.getElementById("crew")
const technologyBtn = document.getElementById("technology-btn")
const technology = document.getElementById("technology")

const destinationTab = document.getElementById("destination-tab")
const destinationTabBtns = Array.from(destinationTab.children)

const dstImg = document.getElementById("dst-img")
const dstHiddenImg = document.getElementById("dst-hidden-img")

const dstTitle = document.getElementById("dst-title")
const dstDescription = document.getElementById("dst-description")
const dstDistance = document.getElementById("dst-distance")
const dstTravel = document.getElementById("dst-travel")

const dstHiddenTitle = document.getElementById("dst-hidden-title")
const dstHiddenDescription = document.getElementById("dst-hidden-description")
const dstHiddenDistance = document.getElementById("dst-hidden-distance")
const dstHiddenTravel = document.getElementById("dst-hidden-travel")

const crewContainer = document.getElementById("crew-container")
const crewMain = document.getElementById("main-crew")
const crewTouch = new Hammer(crewContainer)

const crewRole = document.getElementById("crew-role")
const crewName = document.getElementById("crew-name")
const crewBio = document.getElementById("crew-bio")
const crewPageBtns = Array.from(document.getElementById("crew-page").children)
const crewImg = document.getElementById("crew-img")

const crewPrevious = document.getElementById("crew-previous")
const crewPrevRole = document.getElementById("crew-prev-role")
const crewPrevName = document.getElementById("crew-prev-name")
const crewPrevBio = document.getElementById("crew-prev-bio")

const crewNext = document.getElementById("crew-next")
const crewNextRole = document.getElementById("crew-next-role")
const crewNextName = document.getElementById("crew-next-name")
const crewNextBio = document.getElementById("crew-next-bio")

const technologyBtns = Array.from(document.getElementById("technology-nav").children)

const techMainText = document.getElementById("technology-main-text")
const techName = document.getElementById("technology-name")
const techDescription = document.getElementById("technology-description")

const techHiddenImg = document.getElementById("technology-hidden-img")
const techMainImg = document.getElementById("technology-main-img")

const techHiddenText = document.getElementById("technology-hidden-text")
const techHiddenName = document.getElementById("technology-hidden-name")
const techHiddenDesc = document.getElementById("technology-hidden-description")

logoBtn.addEventListener("click", () => {
  location.reload()
})


const populateDOM = async () => {
  const getJson = await fetch("./data.json")
  const data = await getJson.json()
  
  const preloadImage = (url) => {
    const img = new Image()
    img.src = url
  }
  
  let storeImgs
  let bgImg
  let navOptionsNo
  
  homeBtn.addEventListener("click", () => {
    navOptionsNo = 0
    crew.dataset.hidden = "true"
    technology.dataset.hidden = "true"
    destination.dataset.hidden = "true"
    
    home.dataset.hidden = "false"
    home.dataset.animation = "fade-in-up"
    
    bg.children[0].srcset = "./assets/home/background-home-desktop.jpg"
    bg.children[1].srcset = "./assets/home/background-home-tablet.jpg"
    bg.children[2].src = "./assets/home/background-home-mobile.jpg"
    
    hiddenBg.children[2].dataset.animation = "fade-out"
    
    bgImg = []
    bgImg.push(bg.children[0].srcset,bg.children[1].srcset,bg.children[2].src)
  })
  
  exploreBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      navOptionsNo = 1
      storeImgs = []
      for (let key in Object.keys(data["destinations"])) {
        storeImgs.push(data["destinations"][key].images.png)
      }
      storeImgs.forEach(img => preloadImage(img))
      
      home.dataset.hidden = "true"
      crew.dataset.hidden = "true"
      technology.dataset.hidden = "true"
      
      destination.dataset.hidden = "false"
      destination.dataset.animation = "fade-in-up"
      
      bg.children[0].srcset = "./assets/destination/background-destination-desktop.jpg"
      bg.children[1].srcset = "./assets/destination/background-destination-tablet.jpg"
      bg.children[2].src = "./assets/destination/background-destination-mobile.jpg"
      
      hiddenBg.children[2].dataset.animation = "fade-out"
      
      bgImg = []
      bgImg.push(bg.children[0].srcset, bg.children[1].srcset, bg.children[2].src)
      
      navOptions.forEach(btn => {
        btn.setAttribute("aria-expanded","false")
        btn.dataset.state = "none"
        btn.disabled = true
      })
      
      exploreBtns[0].setAttribute("aria-expanded","true")
      exploreBtns[0].dataset.state = "selected"
    })
  })
  
  crewBtn.addEventListener("click", () => {
    navOptionsNo = 2
    storeImgs = []
    for (let key in Object.keys(data["crew"])) {
      storeImgs.push(data["crew"][key].images.png)
    }
    storeImgs.forEach(img => preloadImage(img))
    
    home.dataset.hidden = "true"
    technology.dataset.hidden = "true"
    destination.dataset.hidden = "true"
    
    crew.dataset.hidden = "false"
    crew.dataset.animation = "fade-in-up"
    
    bg.children[0].srcset = "./assets/crew/background-crew-desktop.jpg"
    bg.children[1].srcset = "./assets/crew/background-crew-tablet.jpg"
    bg.children[2].src = "./assets/crew/background-crew-mobile.jpg"
    
    hiddenBg.children[2].dataset.animation = "fade-out"
    
    bgImg = []
    bgImg.push(bg.children[0].srcset, bg.children[1].srcset, bg.children[2].src)
  })
  
  technologyBtn.addEventListener("click", () => {
    navOptionsNo = 3
    storeImgs = []
    if (window.matchMedia("(max-width: 48rem)").matches) {
      for (let key in Object.keys(data["technology"])) {
        storeImgs.push(data["technology"][key].images.mobile)
      }
      storeImgs.forEach(img => preloadImage(img))
    }
    else if(window.matchMedia("(max-width: 65rem)").matches) {
      for (let key in Object.keys(data["technology"])) {
        storeImgs.push(data["technology"][key].images.tablet)
      }
      storeImgs.forEach(img => preloadImage(img))
    }
    else {
      for (let key in Object.keys(data["technology"])) {
        storeImgs.push(data["technology"][key].images.desktop)
      }
      storeImgs.forEach(img => preloadImage(img))
    }

    home.dataset.hidden = "true"
    destination.dataset.hidden = "true"
    crew.dataset.hidden = "true"
    
    technology.dataset.hidden = "false"
    technology.dataset.animation = "fade-in-up"
    
    bg.children[0].srcset = "./assets/technology/background-technology-desktop.jpg"
    bg.children[1].srcset = "./assets/technology/background-technology-tablet.jpg"
    bg.children[2].src = "./assets/technology/background-technology-mobile.jpg"
    
    hiddenBg.children[2].dataset.animation = "fade-out"
    
    bgImg = []
    bgImg.push(bg.children[0].srcset, bg.children[1].srcset, bg.children[2].src)
  })
  
  hiddenBg.addEventListener("animationend", () => {
    hiddenBg.children[2].dataset.animation = "none"
    
    home.dataset.animation = "none"
    destination.dataset.animation = "none"
    crew.dataset.animation = "none"
    technology.dataset.animation = "none"
    
    hiddenBg.children[0].srcset = bgImg[0]
    hiddenBg.children[1].srcset = bgImg[1]
    hiddenBg.children[2].src = bgImg[2]
    
    navOptions.forEach(option => option.disabled = false)
    navOptions[navOptionsNo].disabled = true
  })
  
  let no
  
  destinationTabBtns.forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
      no = parseInt(tabBtn.value)
      
      destinationTabBtns.forEach(btn => {
        btn.setAttribute("aria-expanded","false")
        btn.dataset.state = "none"
        btn.disabled = true
      })
      tabBtn.setAttribute("aria-expanded","true")
      tabBtn.dataset.state = "selected"
      
      dstImg.children[0].srcset = data["destinations"][no].images.webp
      dstImg.children[1].src = data["destinations"][no].images.png
      
      dstHiddenImg.children[1].dataset.animation = "fade-out"
      
      dstHiddenTitle.innerText = data["destinations"][no].name
      dstHiddenDescription.innerText = data["destinations"][no].description
      dstHiddenDistance.innerText = data["destinations"][no].distance
      dstHiddenTravel.innerText = data["destinations"][no].travel
      
      dstHiddenTitle.dataset.animation = "fade-in"
      dstHiddenDescription.dataset.animation = "fade-in"
      dstHiddenDistance.dataset.animation = "fade-in"
      dstHiddenTravel.dataset.animation = "fade-in"
      
      dstTitle.dataset.animation = "fade-out"
      dstDescription.dataset.animation = "fade-out"
      dstDistance.dataset.animation = "fade-out"
      dstTravel.dataset.animation = "fade-out"
    })
  })
  
  dstHiddenImg.children[1].addEventListener("animationend", () => {
    dstHiddenImg.children[1].dataset.animation = "none"
    dstHiddenTitle.dataset.animation = "none"
    dstHiddenDescription.dataset.animation = "none"
    dstHiddenDistance.dataset.animation = "none"
    dstHiddenTravel.dataset.animation = "none"
    
    dstTitle.dataset.animation = "none"
    dstDescription.dataset.animation = "none"
    dstDistance.dataset.animation = "none"
    dstTravel.dataset.animation = "none"
    
    dstTitle.innerText = data["destinations"][no].name
    dstDescription.innerText = data["destinations"][no].description
    dstDistance.innerText = data["destinations"][no].distance
    dstTravel.innerText = data["destinations"][no].travel
    
    dstHiddenImg.children[0].srcset = data["destinations"][no].images.webp
    dstHiddenImg.children[1].src = data["destinations"][no].images.png
    
    destinationTabBtns.forEach(btn => btn.disabled = false)
    destinationTabBtns[no].disabled = true
  })
  
  const crewLength = Object.keys(data["crew"]).length
  let pageNo = 0
  let arrowOrGesture
  
  const checkNo = (no,totalLength) => {
    if(no < 0) {
      return 0
    }
    else if( no >= totalLength) {
      return totalLength - 1
    }
    else {
      return no
    }
  }
  
  const crewBtnAnimate = (pageBtn) => {
    crewPageBtns.forEach(btn => {
      btn.dataset.state = "none"
      btn.disabled = "true"
      btn.setAttribute("aria-expanded", "false")
    })
    pageBtn.dataset.state = "selected"
    pageBtn.setAttribute("aria-expanded", "true")
  }
  
  const animate = (value, pageNo) => {
    if (value > pageNo) {
      crewNextRole.innerText = data["crew"][value].role
      crewNextName.innerText = data["crew"][value].name
      crewNextBio.innerText = data["crew"][value].bio
      
      crewMain.dataset.animation = "slide-next"
      crewNext.dataset.animation = "slide-next"
      
      crewImg.children[0].srcset = data["crew"][value].images.webp
      crewImg.children[1].src = data["crew"][value].images.png

      crewImg.children[1].dataset.animation = "fade-in-up"
    }
    else if (value < pageNo) {
      crewPrevRole.innerText = data["crew"][value].role
      crewPrevName.innerText = data["crew"][value].name
      crewPrevBio.innerText = data["crew"][value].bio
      
      crewMain.dataset.animation = "slide-prev"
      crewPrevious.dataset.animation = "slide-prev"
      
      crewImg.children[0].srcset = data["crew"][value].images.webp
      crewImg.children[1].src = data["crew"][value].images.png
      
      crewImg.children[1].dataset.animation = "fade-in-up"
    }
    
    else if(arrowOrGesture === "prev") {
      if(value === pageNo) {
        crewMain.dataset.animation = "slide-prev-invalide"
      }
    }
    
    else if (arrowOrGesture === "next") {
      if (value === pageNo) {
        crewMain.dataset.animation = "slide-next-invalide"
      }
    }
  }
  
  crewPageBtns.forEach(pageBtn => {
    pageBtn.addEventListener("click",() => {
      const value = parseInt(pageBtn.value)
      
      animate(value,pageNo)
      crewBtnAnimate(pageBtn)
      
      crewTouch.get("swipe").set({enable : false})
      
      pageNo = value
    })
  })
  
  const animatePrev = () => {
    arrowOrGesture = "prev"
    const prevValue = checkNo(pageNo - 1, crewLength)
    
    animate(prevValue, pageNo)
    crewBtnAnimate(crewPageBtns[prevValue])
    
    crewTouch.get("swipe").set({enable : false})
    
    arrowOrGesture = "none"
    pageNo = prevValue
  }
  
  const animateNext = () => {
    arrowOrGesture = "next"
    const nextValue = checkNo(pageNo + 1, crewLength)
    
    animate(nextValue, pageNo)
    crewBtnAnimate(crewPageBtns[nextValue])
    
    crewTouch.get("swipe").set({enable : false})
    
    arrowOrGesture = "none"
    pageNo = nextValue
  }

  crewContainer.addEventListener("ArrowLeft", animatePrev)
  crewTouch.on("swiperight", animatePrev)
  crewTouch.on("swipeleft", animateNext)
  crewContainer.addEventListener("ArrowRight", animateNext)
  
  crewMain.addEventListener("animationend",() => {
    crewMain.dataset.animation = "none"
    crewNext.dataset.animation = "none"
    crewPrevious.dataset.animation = "none"
    
    crewRole.innerText = data["crew"][pageNo].role
    crewName.innerText = data["crew"][pageNo].name
    crewBio.innerText = data["crew"][pageNo].bio
    
    crewImg.children[1].dataset.animation = "none"
    
    crewPageBtns.forEach(btn => btn.disabled = false)
    crewPageBtns[pageNo].disabled = true
    crewTouch.get("swipe").set({enable : true})
  })
  
  let techNo 
  
  technologyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      technologyBtns.forEach(btn =>  {
        btn.dataset.state = "none"
        btn.setAttribute("aria-expanded","false")
        btn.disabled = true
      })
      techNo = btn.value
      btn.dataset.state = "selected"
      btn.setAttribute("aria-expamded","true")
      
      techHiddenImg.children[0].srcset = data["technology"][techNo].images.desktop
      techHiddenImg.children[1].srcset = data["technology"][techNo].images.tablet
      techHiddenImg.children[2].src = data["technology"][techNo].images.mobile
      
      techHiddenName.innerText = data["technology"][techNo].name
      techHiddenDesc.innerText = data["technology"][techNo].description
      
      techHiddenImg.children[2].dataset.animation = "fade-in-shrink"
      techMainImg.children[2].dataset.animation = "fade-out-expand"
      
      techMainText.dataset.animation = "fade-out"
      techHiddenText.dataset.animation = "fade-in"
      
    })
  })
  
  techMainImg.addEventListener("animationend", () => {
    techMainImg.children[0].srcset = data["technology"][techNo].images.desktop
    techMainImg.children[1].srcset = data["technology"][techNo].images.tablet
    techMainImg.children[2].src = data["technology"][techNo].images.mobile
    
    techHiddenImg.children[2].dataset.animation = "none"
    techMainImg.children[2].dataset.animation = "none"
    
    technologyBtns.forEach(btn => btn.disabled = false)
    technologyBtns[techNo].disabled = true
  })
  
  techMainText.addEventListener("animationend", () => {
    techName.innerText = data["technology"][techNo].name
    techDescription.innerText = data["technology"][techNo].description
    
    techMainText.dataset.animation = "none"
    techHiddenText.dataset.animation = "none"
  })
}

populateDOM()