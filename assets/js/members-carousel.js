'use strict';

class Carousel {
  constructor(el) {
    this.el = el;

    // Master data (in display order)
    this.carouselData = [
      { name: "Neal Nakano", rank: "4 Dan", img: "assets/img/Nakano Sensei.jpg" },
      { name: "Bill Chung", rank: "4 Dan", img: "assets/img/No Photo Available.png" },
      { name: "Terry Kondo", rank: "6 Dan", img: "assets/img/Kondo Sensei.png" },
      { name: "Ray Murao", rank: "7 Dan", img: "assets/img/Murao Sensei.png" },
      { name: "Philip Nishikihama", rank: "5 Dan", img: "assets/img/No Photo Available.png" },
      { name: "Wendy Robillard", rank: "5 Dan", img: "assets/img/Robillard Sensei.png" },
      { name: "G. Ohara", rank: "5 Dan", img: "assets/img/Ohara Sensei.png" },
      { name: "K. Iwai", rank: "5 Dan", img: "assets/img/Iwai Sensei.png" }
    ];

    this.carouselInView = [1, 2, 3, 4, 5];
    this.carouselContainer = null;
  }

  mounted() {
    this.setupCarousel(); 
  }

  setupCarousel() {
    const container = document.createElement('div');
    const controls = document.createElement('div');
    container.className = 'carousel-container';
    controls.className = 'carousel-controls';
    this.el.append(container, controls);

    // Create first 5 visible items
    this.carouselData.slice(0, 5).forEach((member, i) => {
      const item = document.createElement('div');
      item.className = `carousel-item carousel-item-${i + 1}`;
      item.setAttribute('data-index', `${i + 1}`);

      const img = document.createElement('img');
      img.src = member.img;
      img.alt = member.name;
      img.loading = 'lazy';

      item.appendChild(img);
      container.appendChild(item);
    });

    ['previous', 'next'].forEach((name) => {
      const btn = document.createElement('button');
      const span = document.createElement('span');
      span.innerText = name;
      span.className = 'ax-hidden';
      btn.className = `carousel-control carousel-control-${name}`;
      btn.setAttribute('data-name', name);
      btn.appendChild(span);
      controls.appendChild(btn);
    });

    this.carouselContainer = container;
    this.setControls([...controls.children]);
    this.updateView(); // Initial render
  }

  setControls(controls) {
    controls.forEach(control => {
      control.onclick = (event) => {
        event.preventDefault();
        const name = control.dataset.name;
        if (name === 'previous') this.previous();
        if (name === 'next') this.next();
      };
    });
  }

  next() {
    this.carouselData.push(this.carouselData.shift());
    this.updateView();
  }

  previous() {
    this.carouselData.unshift(this.carouselData.pop());
    this.updateView();
  }

  updateView() {
    const items = this.carouselContainer.querySelectorAll('.carousel-item');

    items.forEach((itemEl, i) => {
      const viewClass = `carousel-item-${this.carouselInView[i]}`;
      const member = this.carouselData[i];

      itemEl.className = `carousel-item ${viewClass}`;
      const img = itemEl.querySelector('img');

      if (img && member) {
        img.src = member.img;
        img.alt = member.name;
      }
    });

    this.updateInfo(2); // Center item
  }

  updateInfo(index) {
    const member = this.carouselData[index];
    const infoBox = document.getElementById('member-info');
    if (member && infoBox) {
      infoBox.innerHTML = `<span class="member-name">${member.name}  </span><span class="member-rank">|  ${member.rank}</span>`;
    }
  }


}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.carousel');
  if (el) {
    const carousel = new Carousel(el);
    carousel.mounted();
  }
});
