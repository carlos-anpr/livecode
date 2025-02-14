import { EditorFile } from '../types/editor';

const contentHTML1 = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Registration</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="hero">
        <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174" alt="Hero image">
        <div class="hero-text">
            <h1>Join Our Community</h1>
            <p>Create your account and start your journey with us</p>
        </div>
    </div>

    <div class="container">
        <div class="registration-form">
            <h2><i class="fas fa-user-plus"></i> Register Now</h2>
            <form>
                <div class="form-group">
                    <i class="fas fa-user"></i>
                    <input type="text" placeholder="Full Name" required>
                </div>

                <div class="form-group">
                    <i class="fas fa-envelope"></i>
                    <input type="email" placeholder="Email Address" required>
                </div>

                <div class="form-group">
                    <i class="fas fa-lock"></i>
                    <input type="password" placeholder="Password" required>
                </div>

                <div class="form-group">
                    <i class="fas fa-phone"></i>
                    <input type="tel" placeholder="Phone Number">
                </div>

                <div class="form-group">
                    <i class="fas fa-calendar"></i>
                    <input type="date" required>
                </div>

                <div class="gender-group">
                    <label>Gender:</label>
                    <div class="gender-options">
                        <input type="radio" name="gender" id="male">
                        <label for="male">Male</label>
                        <input type="radio" name="gender" id="female">
                        <label for="female">Female</label>
                    </div>
                </div>

                <button type="submit">
                    <i class="fas fa-paper-plane"></i> Register
                </button>
            </form>

            <div class="social-login">
                <p>Or register with</p>
                <div class="social-icons">
                    <a href="#"><i class="fab fa-google"></i></a>
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

const contentCSS1 = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f5f5f5;
}

.hero {
    position: relative;
    height: 300px;
    overflow: hidden;
}

.hero img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.7);
}

.hero-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
}

.hero-text h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
}

.container {
    max-width: 800px;
    margin: -100px auto 50px;
    padding: 0 20px;
    position: relative;
}

.registration-form {
    background: white;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.registration-form h2 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
}

.registration-form h2 i {
    margin-right: 10px;
    color: #4CAF50;
}

.form-group {
    position: relative;
    margin-bottom: 20px;
}

.form-group i {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
}

.form-group input {
    width: 100%;
    padding: 12px 40px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 16px;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.gender-group {
    margin-bottom: 20px;
}

.gender-group label {
    color: #666;
    margin-right: 15px;
}

.gender-options {
    display: inline-block;
}

.gender-options input[type="radio"] {
    margin-right: 5px;
}

button {
    width: 100%;
    padding: 12px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease;
}

button:hover {
    background: #45a049;
}

button i {
    margin-right: 10px;
}

.social-login {
    text-align: center;
    margin-top: 30px;
}

.social-login p {
    color: #666;
    margin-bottom: 15px;
}

.social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
}

.social-icons a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #f5f5f5;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
}

.social-icons a:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.social-icons .fa-google:hover {
    color: #DB4437;
}

.social-icons .fa-facebook-f:hover {
    color: #4267B2;
}

.social-icons .fa-twitter:hover {
    color: #1DA1F2;
}

@media (max-width: 600px) {
    .container {
        margin-top: -50px;
    }

    .registration-form {
        padding: 20px;
    }

    .hero {
        height: 200px;
    }

    .hero-text h1 {
        font-size: 1.8em;
    }
}
`;

const contentHTML2 = `
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MAISON | Luxury Fashion</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&family=Italiana&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
</head>
<body>
    <!-- Navegación Principal -->
    <nav class="main-nav">
        <div class="nav-grid">
            <div class="nav-left">
                <a href="#featured-product">NEW IN</a>
                <a href="#categories">CATEGORÍAS</a>
                <a href="#collection-preview">COLECCIÓN</a>
            </div>

            <div class="nav-center">
                <a href="#hero" class="logo">MAISON</a>
            </div>

            <div class="nav-right">
                <a href="#search" class="icon">
                    <span class="material-symbols-outlined">search</span>
                </a>
                <a href="#account" class="icon">
                    <span class="material-symbols-outlined">person</span>
                </a>
                <a href="#cart" class="icon">
                    <span class="material-symbols-outlined">shopping_bag</span>
                </a>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
        <div class="hero-content">
            <h1>La Nueva Colección</h1>
            <p>PRIMAVERA · VERANO 2025</p>
            <a href="#collection" class="btn-primary">Descubrir</a>
        </div>
        <div class="hero-background"></div>
    </section>

    <!-- Featured Product -->
    <section id="featured-product" class="featured-product">
        <div class="featured-grid">
            <div class="featured-image">
                <img src="https://images.unsplash.com/photo-1525845859779-54d477ff291f" alt="Producto Destacado">
            </div>
            <div class="featured-content">
                <span class="overline">DESTACADO</span>
                <h2>Vestido Seda Natural</h2>
                <p class="description">
                    Confeccionado en seda natural con un diseño fluido que realza la silueta femenina.
                    Una pieza atemporal para ocasiones especiales.
                </p>
                <div class="price">598€</div>
                <a href="#product" class="btn-secondary">Ver Detalles</a>
            </div>
        </div>
    </section>

    <!-- Categories -->
    <section id="categories" class="categories">
        <div class="categories-header">
            <h2>Explora las Categorías</h2>
        </div>
        <div class="categories-grid">
            <a href="#women" class="category-card">
                <div class="category-image">
                    <img src="https://images.unsplash.com/photo-1487412912498-0447578fcca8" alt="Mujer">
                </div>
                <div class="category-content">
                    <h3>Mujer</h3>
                    <span class="category-link">Descubrir</span>
                </div>
            </a>

            <a href="#men" class="category-card">
                <div class="category-image">
                    <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2" alt="Hombre">
                </div>
                <div class="category-content">
                    <h3>Hombre</h3>
                    <span class="category-link">Descubrir</span>
                </div>
            </a>

            <a href="#accessories" class="category-card">
                <div class="category-image">
                    <img src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93" alt="Accesorios">
                </div>
                <div class="category-content">
                    <h3>Accesorios</h3>
                    <span class="category-link">Descubrir</span>
                </div>
            </a>
        </div>
    </section>

    <!-- Collection Preview -->
    <section id="collection-preview" class="collection-preview">
        <div class="collection-grid">
            <div class="collection-content">
                <h2>Nueva Colección</h2>
                <p>Descubre las últimas tendencias en moda de lujo sostenible.</p>
                <a href="#collection" class="btn-primary">Ver Colección</a>
            </div>
            <div class="collection-image">
                <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d" alt="Colección">
            </div>
        </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter">
        <div class="newsletter-content">
            <h2>Únete a Nuestra Newsletter</h2>
            <p>Sé el primero en conocer nuestras nuevas colecciones y ofertas exclusivas.</p>
            <form class="newsletter-form">
                <input type="email" placeholder="Tu email" required>
                <button type="submit" class="btn-secondary">Suscribirse</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="main-footer">
        <div class="footer-grid">
            <div class="footer-column">
                <h4>MAISON</h4>
                <p>Moda de lujo sostenible</p>
            </div>
            <div class="footer-column">
                <h4>Ayuda</h4>
                <a href="#shipping">Envíos</a>
                <a href="#returns">Devoluciones</a>
                <a href="#contact">Contacto</a>
            </div>
            <div class="footer-column">
                <h4>Legal</h4>
                <a href="#privacy">Privacidad</a>
                <a href="#terms">Términos</a>
            </div>
            <div class="footer-column">
                <h4>Síguenos</h4>
                <div class="social-links">
                    <a href="#instagram">Instagram</a>
                    <a href="#pinterest">Pinterest</a>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
`;

const contentCSS2 = `
/* styles.css */
:root {
    --color-background: #FFFFFF;
    --color-text: #1A1A1A;
    --color-accent: #937D64;
    --color-light: #F8F8F8;
    --color-dark: #2C2C2C;
    --spacing-unit: 8px;
    --container-width: 1440px;
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Jost', sans-serif;
    color: var(--color-text);
    line-height: 1.5;
    overflow-x: hidden;
}

/* Typography */
h1, h2, h3, h4 {
    font-family: 'Italiana', serif;
    font-weight: 400;
}

/* Navigation */
.main-nav {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.98);
    z-index: 1000;
    padding: calc(var(--spacing-unit) * 3) 0;
    backdrop-filter: blur(10px);
}

.nav-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 calc(var(--spacing-unit) * 3);
}

.nav-left, .nav-right {
    display: flex;
    gap: calc(var(--spacing-unit) * 4);
    align-items: center;
}

.nav-right {
    justify-content: flex-end;
}

.logo {
    font-family: 'Italiana', serif;
    font-size: 2rem;
    letter-spacing: 0.2em;
    text-decoration: none;
    color: var(--color-text);
}

.nav-grid a {
    text-decoration: none;
    color: var(--color-text);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    transition: var(--transition-smooth);
}

.nav-grid a:hover {
    color: var(--color-accent);
}

/* Hero Section */
.hero {
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://images.unsplash.com/photo-1445205170230-053b83016050') center/cover no-repeat;
    z-index: -1;
    filter: brightness(0.9);
}

.hero-content {
    text-align: center;
    color: white;
    z-index: 1;
    padding: 0 calc(var(--spacing-unit) * 3);
}

.hero-content h1 {
    font-size: clamp(3rem, 8vw, 6rem);
    margin-bottom: calc(var(--spacing-unit) * 2);
    letter-spacing: 0.1em;
}

.hero-content p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    letter-spacing: 0.3em;
    margin-bottom: calc(var(--spacing-unit) * 4);
}

/* Featured Product */
.featured-product {
    padding: calc(var(--spacing-unit) * 12) calc(var(--spacing-unit) * 3);
    background: var(--color-light);
}

.featured-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: calc(var(--spacing-unit) * 8);
    max-width: var(--container-width);
    margin: 0 auto;
}

.featured-image img {
    width: 100%;
    height: 700px;
    object-fit: cover;
}

.featured-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: calc(var(--spacing-unit) * 4);
}

.overline {
    font-size: 0.9rem;
    letter-spacing: 0.2em;
    color: var(--color-accent);
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.featured-content h2 {
    font-size: 3rem;
    margin-bottom: calc(var(--spacing-unit) * 3);
}

.price {
    font-size: 1.5rem;
    margin: calc(var(--spacing-unit) * 3) 0;
}

/* Categories */
.categories {
    padding: calc(var(--spacing-unit) * 12) calc(var(--spacing-unit) * 3);
}

.categories-header {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit) * 8);
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: calc(var(--spacing-unit) * 3);
    max-width: var(--container-width);
    margin: 0 auto;
}

.category-card {
    position: relative;
    overflow: hidden;
    text-decoration: none;
    color: white;
}

.category-image img {
    width: 100%;
    height: 600px;
    object-fit: cover;
    transition: var(--transition-smooth);
}

.category-card:hover img {
    transform: scale(1.05);
}

.category-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: calc(var(--spacing-unit) * 4);
    background: linear-gradient(transparent, rgba(0,0,0,0.7));
}

/* Buttons */
.btn-primary, .btn-secondary {
    display: inline-block;
    padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.9rem;
    transition: var(--transition-smooth);
    cursor: pointer;
}

.btn-primary {
    background: transparent;
    color: white;
    border: 1px solid white;
}

.btn-secondary {
    background: var(--color-text);
    color: white;
    border: 1px solid var(--color-text);
}

.btn-primary:hover, .btn-secondary:hover {
    background: var(--color-accent);
    border-color: var(--color-accent);
}

/* Newsletter */
.newsletter {
    padding: calc(var(--spacing-unit) * 12) calc(var(--spacing-unit) * 3);
    background: var(--color-light);
    text-align: center;
}

.newsletter-form {
    max-width: 500px;
    margin: calc(var(--spacing-unit) * 4) auto 0;
    display: flex;
    gap: calc(var(--spacing-unit) * 2);
}

.newsletter-form input {
    flex: 1;
    padding: calc(var(--spacing-unit) * 2);
    border: 1px solid var(--color-text);
    background: transparent;
}

/* Footer */
.main-footer {
    padding: calc(var(--spacing-unit) * 12) calc(var(--spacing-unit) * 3);
    background: var(--color-dark);
    color: white;
}

.footer-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: calc(var(--spacing-unit) * 6);
    max-width: var(--container-width);
    margin: 0 auto;
}

.footer-column a {
    display: block;
    color: white;
    text-decoration: none;
    margin-bottom: calc(var(--spacing-unit) * 2);
    opacity: 0.8;
    transition: var(--transition-smooth);
}

.footer-column a:hover {
    opacity: 1;
}

/* Media Queries */
@media (max-width: 1024px) {
    .featured-grid,
    .categories-grid {
        grid-template-columns: 1fr;
    }

    .footer-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .nav-grid {
        grid-template-columns: 1fr;
        text-align: center;
        gap: calc(var(--spacing-unit) * 2);
    }

    .nav-left, .nav-right {
        justify-content: center;
    }

    .featured-image img,
    .category-image img {
        height: 400px;
    }

    .footer-grid {
        grid-template-columns: 1fr;
    }
}

/* Añade estos estilos para Collection Preview */
.collection-preview {
    padding: calc(var(--spacing-unit) * 12) calc(var(--spacing-unit) * 3);
    background: var(--color-background);
}

.collection-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: calc(var(--spacing-unit) * 8);
    max-width: var(--container-width);
    margin: 0 auto;
    align-items: center;
}

.collection-content {
    padding: calc(var(--spacing-unit) * 4);
}

.collection-content h2 {
    font-size: 3rem;
    margin-bottom: calc(var(--spacing-unit) * 3);
}

.collection-content p {
    font-size: 1.1rem;
    margin-bottom: calc(var(--spacing-unit) * 4);
    color: var(--color-text);
    opacity: 0.8;
}

.collection-image {
    position: relative;
    overflow: hidden;
    height: 600px;
}

.collection-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition-smooth);
}

.collection-image:hover img {
    transform: scale(1.05);
}

@media (max-width: 1024px) {
    .collection-grid {
        grid-template-columns: 1fr;
    }

    .collection-content {
        text-align: center;
    }

    .collection-image {
        height: 500px;
    }
}

@media (max-width: 768px) {
    .collection-image {
        height: 400px;
    }

    .collection-content h2 {
        font-size: 2.5rem;
    }
}
`;

const JS2 = `
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
`;

export const initialFiles: EditorFile[][] = [
  [
    {
      id: '1',
      name: 'index.html',
      language: 'html',
      content: contentHTML1,
    },
    {
      id: '2',
      name: 'styles.css',
      language: 'css',
      content: contentCSS1,
    },
    {
      id: '3',
      name: 'script.js',
      language: 'javascript',
      content: 'console.log("Hello from JavaScript!");',
    },
    {
      id: '4',
      name: 'images',
      language: 'images',
      content: '',
    },
    {
      id: '5',
      name: 'Registro pacientes',
      language: 'html',
      content: 'html',
      tags: ['registro', 'pacientes'],
      favorite: false,
    },
  ],

  [
    {
      id: '1',
      name: 'index.html',
      language: 'html',
      content: contentHTML2,
    },
    {
      id: '2',
      name: 'styles.css',
      language: 'css',
      content: contentCSS2,
    },
    {
      id: '3',
      name: 'script.js',
      language: 'javascript',
      content: JS2,
    },
    {
      id: '4',
      name: 'images',
      language: 'images',
      content: '',
    },
    {
      id: '5',
      name: 'Tienda de moda',
      language: 'html',
      tags: ['tienda', 'moda'],
      content: 'html',
      favorite: true,
    },
  ],
];
