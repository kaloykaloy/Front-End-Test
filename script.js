const gallery = document.getElementById("gallery");
const cards = Array.from(gallery.children);

let current = 0;

let scaleLevels = [1, 0.85, 0.7, 0.55];
let xOffsets = [0, 230, 400, 550];
const yOffsets = [0, 0, 0, 0];
const opacityLevels = [1, 0.85, 0.7, 0.55];

const cardImages = [
  ["assets/product1/image2.jpg", "assets/product1/image3.jpg", "assets/product1/image4.jpg", "assets/product1/image1.png"],
  ["assets/product2/image1.jpg", "assets/product2/image2.jpg", "assets/product2/image3.jpg", "assets/product2/image4.jpg"],
  ["assets/product3/image1.jpg", "assets/product3/image3.jpg", "assets/product3/image5.jpg"],
  ["assets/product4/image1.png", "assets/product4/image2.jpg", "assets/product4/image3.png"],
];

const productDetails = [
  {
    product: {
      title: "Apple iPad Pro – The Ultimate Powerhouse Tablet",
      description: `Experience unmatched performance and versatility with the latest Apple iPad Pro, featuring a stunning 12.9-inch Liquid Retina XDR display that delivers vivid colors, true-to-life detail, and incredible brightness.<br><br>
      Powered by the ultra-fast A14 Bionic chip with Neural Engine, it effortlessly handles professional-grade apps, graphic-intensive games, and multitasking with fluid responsiveness.<br><br>
      Designed for creatives and professionals alike, the iPad Pro supports the second-generation Apple Pencil for precise drawing and note-taking, as well as the Magic Keyboard with a trackpad for a laptop-like experience.<br><br>
      Whether you're editing 4K videos, designing graphics, or presenting your ideas, the iPad Pro redefines what a tablet can do.`,
    },
    specification: {
      title: "Comprehensive iPad Pro Specifications & Features",
      description: `Processor: Apple A14 Bionic chip with 6-core CPU and 4-core GPU, enhanced Neural Engine for machine learning<br>
      Display: 12.9-inch Liquid Retina XDR, ProMotion technology with adaptive refresh rate up to 120Hz<br>
      Storage Options: 128GB, 256GB, 512GB, 1TB configurations available<br>
      Cameras: Dual rear cameras (12MP Wide and 10MP Ultra Wide) with LiDAR scanner for AR applications<br>
      Front Camera: 12MP TrueDepth camera with Face ID and Portrait mode<br>
      Battery Life: Up to 10 hours of wireless web browsing or video playback on a single charge<br>
      Connectivity: Wi-Fi 6 (802.11ax), optional 5G cellular models for blazing fast internet anywhere<br>
      Operating System: iPadOS with extensive support for multitasking and Apple Pencil features`,
    }
  },
  {
    product: {
      title: "iPhone 16 – Revolutionizing Smartphone Technology",
      description: `Discover the sleek and powerful iPhone 16, engineered to push the boundaries of smartphone technology.<br><br>
      Equipped with the cutting-edge A16 Bionic chip, it ensures ultra-smooth performance for gaming, augmented reality, and everyday tasks.<br><br>
      The device boasts an advanced dual-camera system with computational photography features for stunning photos and cinematic video.<br><br>
      Enjoy a gorgeous 6.1-inch OLED Super Retina XDR display with vibrant colors and deep blacks for an immersive viewing experience.<br><br>
      Designed for durability and style, the iPhone 16 combines elegance with robust build quality.`,
    },
    specification: {
      title: "Detailed iPhone 16 Specifications & Capabilities",
      description: `Processor: Apple A16 Bionic chip with 6-core CPU and 5-core GPU for enhanced graphics performance<br>
      Display: 6.1-inch OLED Super Retina XDR display with HDR10 and Dolby Vision support<br>
      Storage Options: 128GB, 256GB, 512GB models available<br>
      Camera System: Dual 12MP rear cameras (Wide and Ultra Wide) with Night mode, Deep Fusion, and 4K Dolby Vision HDR recording<br>
      Front Camera: 12MP TrueDepth camera with Face ID and Portrait Lighting<br>
      Battery Life: Up to 19 hours video playback on a single charge<br>
      Connectivity: 5G capable, Wi-Fi 6 for high-speed wireless communication<br>
      Additional Features: Ceramic Shield front cover, IP68 water and dust resistance rating`,
    }
  },
  {
    product: {
      title: "Apple Watch Series – Your Ultimate Health & Connectivity Companion",
      description: `Stay connected, healthy, and motivated with the latest Apple Watch Series.<br><br>
      Equipped with a high-resolution Always-On Retina display, it delivers clear information at a glance.<br><br>
      Advanced sensors track your heart rate, ECG, blood oxygen levels, and sleep patterns to help you understand your wellness better.<br><br>
      With seamless iPhone integration, manage calls, messages, and music effortlessly from your wrist.<br><br>
      Its durable and swimproof design makes it perfect for workouts and outdoor adventures.`,
    },
    specification: {
      title: "Apple Watch Series Specifications & Health Features",
      description: `Display: Always-On Retina LTPO OLED display with Force Touch<br>
      Battery Life: Up to 18 hours with typical usage<br>
      Sensors: Electrical heart sensor (ECG), Optical heart sensor, Blood oxygen sensor, Accelerometer, Gyroscope<br>
      Connectivity: GPS, GPS + Cellular models available<br>
      Water Resistance: Rated swimproof up to 50 meters (WR50)<br>
      Operating System: watchOS with a wide range of health and fitness apps<br>
      Additional Features: Fall detection, Emergency SOS, Noise monitoring, Sleep tracking`,
    }
  },
  {
    product: {
      title: "AirPods 4 – Wireless Audio with Superior Sound & Comfort",
      description: `Experience crystal-clear sound and active noise cancellation with AirPods 4.<br><br>
      The ergonomic design offers a secure, comfortable fit for all-day wear.<br><br>
      Enjoy immersive listening with Adaptive EQ, transparency mode to stay aware of your surroundings, and effortless switching between Apple devices.<br><br>
      The upgraded H1 chip delivers low latency and voice-activated Siri access for hands-free control.`,
    },
    specification: {
      title: "AirPods 4 Specifications & Audio Features",
      description: `Battery Life: Up to 6 hours of listening time per charge, and more than 30 hours with charging case<br>
      Connectivity: Bluetooth 5.0 with Apple H1 chip for fast pairing and stable connection<br>
      Charging Case: Wireless charging compatible with Qi-certified chargers<br>
      Features: Active Noise Cancellation, Transparency mode, Adaptive EQ, Spatial audio with dynamic head tracking<br>
      Sweat and Water Resistance: IPX4 rated for sweat and water resistance<br>
      Additional Capabilities: Voice-activated Siri, Automatic device switching, Audio sharing between two sets of AirPods`,
    }
  },
];

let imageCycleInterval = null;
let currentImageIndex = 0;

const detailsButtons = document.querySelectorAll(".details-btn button");
const descriptionContainer = document.querySelector(".description");

let activeDetailType = "product";

function updateDescription() {
  const detail = activeDetailType === "product" ? "product" : "specification";
  const details = productDetails[current][detail];

  descriptionContainer.innerHTML = `
    <h1>${details.title}</h1>
    <br>
    <p>${details.description}</p>
  `;
}

detailsButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    detailsButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeDetailType = index === 0 ? "product" : "specification";
    updateDescription();
  });
});

function startImageCycle(cardIndex) {
  clearInterval(imageCycleInterval);
  currentImageIndex = 0;

  const card = cards[cardIndex];
  const img = card.querySelector("img");
  const images = cardImages[cardIndex];

  imageCycleInterval = setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    img.src = images[currentImageIndex];
  }, 2000);
}

function layout() {
  const width = window.innerWidth;

  if (width <= 400) {
    scaleLevels = [0.9, 0.8, 0.7, 0.6];
    xOffsets = [0, 100, 170, 250];
  }
  else if (width <= 480) {
    scaleLevels = [1.3, 1.1, 0.9, 0.7];
    xOffsets = [0, 140, 240, 320];
  } else if (width <= 900) {
    scaleLevels = [1, 0.85, 0.7, 0.55];
    xOffsets = [0, 120, 200, 280];
  } else {
    scaleLevels = [1, 0.85, 0.7, 0.55];
    xOffsets = [0, 230, 400, 550];
  }

  cards.forEach((card, i) => {
    let offset = (i - current + cards.length) % cards.length;

    card.classList.remove("highlight");
    card.style.zIndex = String(cards.length - offset);

    if (offset < scaleLevels.length) {
      const scale = scaleLevels[offset];
      const x = xOffsets[offset];
      const y = yOffsets[offset];

      card.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      card.style.opacity = opacityLevels[offset]; 

      if (offset === 0) {
        card.classList.add("highlight");
        startImageCycle(i);
        updateDescription();
      } else {
        const img = card.querySelector("img");
        img.src = cardImages[i][0];
      }
    } else {
      card.style.transform = "translate(-200%)";
      card.style.opacity = 0;
    }
  });

  const controls = document.querySelector(".controls");
  if (!controls) return;

  const carousel = document.querySelector(".carousel");
  const carouselWidth = carousel.offsetWidth;
  const carouselHeight = carousel.offsetHeight;

  const baseLeftPercent = 10;
  const baseTopPercent = 15;

  const baseLeftPx = carouselWidth * (baseLeftPercent / 100);
  const baseTopPx = carouselHeight * (baseTopPercent / 100);

  const scale = scaleLevels[0];
  const x = xOffsets[0];
  const y = yOffsets[0];

  const cardWidth = 300 * scale;
  const cardHeight = 400 * scale;

  const highlightCenterX = baseLeftPx + x + cardWidth / 2;
  const highlightBottomY = baseTopPx + y + cardHeight;

  if (window.innerWidth <= 900) {
    controls.style.left = "50%";
    controls.style.top = `${highlightBottomY + 20}px`;
    controls.style.transform = "translateX(-50%)";
  } else {
    controls.style.left = `${highlightCenterX}px`;
    controls.style.top = `${highlightBottomY + 35}px`;
    controls.style.transform = "translateX(-50%)";
  }

  const header = document.querySelector(".gallery-header");
  if (header) {
    const highlightTopY = baseTopPx + y;

    if (window.innerWidth <= 900) {
      header.style.left = "50%";
      header.style.top = `${highlightTopY - 30}px`;
      header.style.transform = "translateX(-50%)";
    } else {
      header.style.left = `${highlightCenterX}px`;
      header.style.top = `${highlightTopY - 30}px`;
      header.style.transform = "translateX(-50%)";
    }
  }
}

function next() {
  current = (current + 1) % cards.length;
  layout();
}

function prev() {
  current = (current - 1 + cards.length) % cards.length;
  layout();
}

const carousel = document.querySelector(".carousel");
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  const swipeThreshold = 50;

  if (touchEndX < touchStartX - swipeThreshold) {
    next();
  } else if (touchEndX > touchStartX + swipeThreshold) {
    prev();
  }
}

window.addEventListener("resize", () => {
  layout();
});

layout();
updateDescription();
