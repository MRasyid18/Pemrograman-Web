document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.image-container img');
    
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                img.classList.add('loaded');
            });
            
            img.addEventListener('error', function() {
                img.classList.add('loaded');
                // Optionally set a fallback image
                // img.src = 'placeholder.jpg';
            });
        }
    });
    const typedOptions = {
        strings: [
            "Seorang Front-End Developer.",
            "Mahasiswa Teknik Informatika.",
            "Saya suka membuat website interaktif."
        ],
        typeSpeed: 50,    // Kecepatan mengetik (dalam milidetik)
        backSpeed: 25,    // Kecepatan menghapus
        loop: true,       // Mengulang animasi
        showCursor: true, // Menampilkan kursor ketik yang berkedip
        cursorChar: '|',  // Karakter untuk kursor
    };
    const typed = new Typed('#typed-text', typedOptions);
});

// Scroll Animations (using Intersection Observer for better performance)
const sections = document.querySelectorAll('section');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Navbar Hide/Show on Scroll
let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        navbar.classList.add('navbar-hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('navbar-hidden');
    }
    
    lastScrollY = currentScrollY;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-bs-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Project Modal
const projectCards = document.querySelectorAll('.experience-card');
const modalElement = document.getElementById('project-modal');
const modal = new bootstrap.Modal(modalElement);
const modalBody = document.querySelector('.modal-body');

const projects = {
    1: {
        title: "Sistem Manajemen Kost",
        image: "pythonlogo.png",
        description: "Sistem Manajemen Kost adalah sistem yang dirancang untuk mempermudah pemilik kost dalam mengelola data penyewa dan kamar yang tersedia. Saya bertanggung jawab penuh dalam mengembangkan antarmuka pengguna (UI) yang intuitif dan fungsional menggunakan Python.",
        details: [
            "Merancang tata letak dan navigasi sistem yang user-friendly",
            "Mengimplementasikan fitur-fitur seperti manajemen data penyewa dan laporan keuangan sederhana",
            "Melakukan pengujian antarmuka untuk memastikan kompatibilitas dan pengalaman pengguna yang baik",
            "Mengintegrasikan database untuk penyimpanan data yang efisien"
        ],
        technologies: "Proyek ini dikembangkan menggunakan <strong>Python</strong>.",
        github: "https://github.com/MRasyid18/Praktikum-APD/blob/main/Post-Test/Post-Test-7/2409106042_MuhammadRasyid_A2'24_Post-Test-7.py",
        screenshot: "sspython.png"
    },
    2: {
        title: "Sistem Manajemen Kost 2",
        image: "c++logo.png",
        description: "Sistem Manajemen Kost 2 adalah pengembangan dari proyek sebelumnya dengan fitur tambahan dan perbaikan antarmuka pengguna menggunakan bahasa C++ sebagai bahan proyek akhir mata kuliah pemrograman lanjut.",
        details: [
            "Memperbaiki fitur yang sudah ada dan menambahkan fungsionalitas baru seperti sistem booking otomatis",
            "Mengoptimalkan performa sistem dengan C++",
            "Implementasi error handling yang lebih robust",
            "Membuat dokumentasi proyek yang komprehensif untuk maintenance"
        ],
        technologies: "Proyek ini dikembangkan menggunakan <strong>C++</strong> sebagai bahasa utama. Menggunakan <strong>STL (Standard Template Library)</strong> untuk manajemen data yang efisien.",
        github: "https://github.com/MRasyid18/praktikum-apl/blob/main/post-test/post-test-apl-6/2409106042-MuhammadRasyid-PT-6.cpp",
        screenshot: "ssc++.png"
    }
};

projectCards.forEach(card => {
    card.querySelector('.btn-detail').addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = card.getAttribute('data-project-id');
        const project = projects[projectId];

        let screenshotHTML = '';
        if (project.screenshot) {
            screenshotHTML = `<img src="${project.screenshot}" alt="Screenshot ${project.title}" class="img-fluid rounded mb-3 project-screenshot" style="border: 2px solid var(--vibrant-cyan);">`;
        }

        let githubHTML = '';
        if (project.github) {
            githubHTML = `
                <div class="mt-4 text-center">
                    <a href="${project.github}" target="_blank" class="btn btn-outline-cyan">
                        <i class="fab fa-github me-2"></i>Lihat di GitHub
                    </a>
                </div>
            `;
        }

        modalBody.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="img-fluid rounded mb-3" style="max-height: 200px; object-fit: contain; display: block; margin: 0 auto;">
            <h2 class="text-cyan">${project.title}</h2>
            <p class="lead">${project.description}</p>
            
            ${screenshotHTML}
            
            <h3 class="text-cyan mt-4"><i class="fas fa-tasks me-2"></i>Peran dan Tanggung Jawab</h3>
            <ul class="list-styled">
                ${project.details.map(detail => `<li class="mb-2"><i class="fas fa-check-circle text-cyan me-2"></i>${detail}</li>`).join('')}
            </ul>
            
            <h3 class="text-cyan mt-4"><i class="fas fa-code me-2"></i>Teknologi yang Digunakan</h3>
            <p>${project.technologies}</p>
            
            ${githubHTML}
        `;
        
        modal.show();
    });
});

// Contact Form Handling (Basic validation)
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Create WhatsApp message
        const whatsappMessage = `Halo! Saya ${name}%0A%0AEmail: ${email}%0A%0APesan:%0A${encodeURIComponent(message)}`;
        const whatsappNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda
        
        // Open WhatsApp
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        
        // Reset form
        this.reset();
        
        // Show success message (optional)
        alert('Pesan Anda akan dikirim melalui WhatsApp!');
    });
}

// Add active class to current nav link
const currentLocation = window.location.hash;
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.classList.add('active');
    }
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animate timeline items on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Preload critical images
const criticalImages = ['pythonlogo.png', 'c++logo.png', 'fotodiri.jpg'];
criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});