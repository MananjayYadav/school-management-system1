// ======== BLOG DATA =========
const latestBlogs = [
  { title: "Annual Science Fair 2025", category: "Science & Innovation", date: "2025-10-12", image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=900&h=400&fit=crop", desc: "Students showcased creative inventions and robotics models at the Annual Science Fair.", },
  { title: "Children's Day Celebration", category: "Events", date: "2025-11-14", image: "https://images.unsplash.com/photo-1529397934082-5e0f25c2c2ea?w=900&h=400&fit=crop", desc: "The campus was filled with laughter and fun activities as teachers performed for students.", },
  { title: "Inter-School Debate Championship", category: "Academics", date: "2025-09-28", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&h=400&fit=crop", desc: "Our debate team won first place among 15 schools with a topic on sustainability.", },
  { title: "Music Fest: Melody Night", category: "Cultural", date: "2025-08-15", image: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=900&h=400&fit=crop", desc: "The annual music fest featured bands, dance groups, and solo performances.", },
  { title: "Clean India Campaign Drive", category: "Social Service", date: "2025-07-20", image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=900&h=400&fit=crop", desc: "Students participated in a cleanliness drive across nearby public parks and streets.", },
  { title: "Annual Sports Meet 2025", category: "Sports", date: "2025-06-05", image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&h=400&fit=crop", desc: "The event concluded with the inter-house relay races and a grand closing ceremony.", },
];

const popularBlogs = [
  { title: "ISRO’s Chandrayaan-4 Announced", category: "Science & Tech", date: "2025-10-30", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=900&h=400&fit=crop", desc: "ISRO announced its next moon mission, inspiring students across India.", },
  { title: "India Wins 2025 Cricket World Cup", category: "Sports", date: "2025-11-02", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=900&h=400&fit=crop", desc: "Team India made history by winning the World Cup, creating nationwide celebration.", },
  { title: "Annual Cultural Day Highlights", category: "Cultural", date: "2025-09-18", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&h=400&fit=crop", desc: "A day filled with art, dance, and drama celebrating our diverse traditions.", },
  { title: "Alumni Meet 2025", category: "Community", date: "2025-08-08", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&h=400&fit=crop", desc: "Alumni shared inspiring stories and guided current students in career paths.", },
  { title: "Robotics Club Workshop", category: "Science & Innovation", date: "2025-06-14", image: "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=900&h=400&fit=crop", desc: "Students built their first line-following robots using Arduino kits.", },
];

// ======== PAGINATION + RENDERING =========
function renderBlogs(containerId, data, page = 1) {
  const perPage = 3;
  const start = (page - 1) * perPage;
  const paginated = data.slice(start, start + perPage);

  const container = document.getElementById(containerId);
  container.innerHTML = "";

  paginated.forEach(post => {
    const dateObj = new Date(post.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", { month: "short", year: "numeric" });
    const weekday = dateObj.toLocaleString("default", { weekday: "long" });

    container.innerHTML += `
      <div class="blog-section">
        <div class="date-badge">
          <span class="day">${day}</span>
          <span class="month">${month}</span>
          <span class="weekday">${weekday}</span>
        </div>
        <div>
          <h3 class="blog-title">${post.title}</h3>
          <span class="category-tag">${post.category}</span>
          <img class="blog-image" src="${post.image}" alt="${post.title}">
          <p class="blog-description">${post.desc}</p>
          <button class="view-details-btn">VIEW DETAILS →</button>
        </div>
      </div>
    `;
  });

  const totalPages = Math.ceil(data.length / perPage);
  container.innerHTML += `
    <div class="pagination">
      ${Array.from({ length: totalPages }, (_, i) =>
        `<button class="page-btn ${i + 1 === page ? "active" : ""}" data-page="${i + 1}">${i + 1}</button>`
      ).join("")}
    </div>
  `;

  container.querySelectorAll(".page-btn").forEach(btn => {
    btn.addEventListener("click", () => renderBlogs(containerId, data, Number(btn.dataset.page)));
  });
}

// ======== CATEGORY COUNTS =========
function renderCategories() {
  const allCategories = [...latestBlogs, ...popularBlogs].map(b => b.category);
  const counts = allCategories.reduce((acc, c) => {
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  const list = document.getElementById("category-list");
  list.innerHTML = Object.entries(counts)
    .map(([cat, count]) =>
      `<div class="category-item"><span>${cat}</span><span>${count}</span></div>`
    )
    .join("");
}

// ======== TABS =========
function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs[0].classList.add("active");
  contents[0].classList.add("active");
  renderBlogs("latest", latestBlogs);
  renderBlogs("popular", popularBlogs);

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });
}

// ======== CAROUSEL =========
let currentSlide = 0;
function moveSlide(dir) {
  const slides = document.querySelectorAll(".carousel-slide");
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  document.querySelector(".carousel-slides").style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-action='prev']").addEventListener("click", () => moveSlide(-1));
  document.querySelector("[data-action='next']").addEventListener("click", () => moveSlide(1));
  setInterval(() => moveSlide(1), 5000);
  initTabs();
  renderCategories();
});
