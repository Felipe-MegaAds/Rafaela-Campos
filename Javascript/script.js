/**
 * Arquivo JS com funcionalidades simples sem dependências de bibliotecas externas.
 * Contém o menu mobile, animação de scroll, header sticky e accordions (FAQ).
 */

document.addEventListener('DOMContentLoaded', () => {

    // Log de depuração para confirmar o carregamento correto do script no navegador (Vercel/Produção)
    console.log("Dra. Rafaela Campos - script.js carregado com sucesso!");

    /* --- Mobile Menu Toggle --- */
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            
            // Animating hamburger to X (optional simple transform class)
            menuToggle.classList.toggle('open');
        });
        
        // Close menu on link click
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }

    /* --- Header Scrolled state --- */
    const header = document.getElementById('header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /* --- FAQ Accordion --- */
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = null;
                        }
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + "px";
                    } else {
                        answer.style.maxHeight = null;
                    }
                }
            });
        }
    });

    /* --- Scroll Animation (Intersection Observer) --- */
    const animatedElements = document.querySelectorAll('.fade-in-up');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: Desobservar após animar uma vez para performance
                    // observer.unobserve(entry.target); 
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('visible'));
    }

});
