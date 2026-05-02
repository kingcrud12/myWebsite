const translations = {
    fr: {
        seo: {
            title: "Yann Dipita — Développeur Web, Mobile & Automatisation",
            description: "Développeur Web, Mobile & Automatisation passionné. Je conçois des applications robustes, des expériences mobiles fluides et des solutions d'automatisation intelligentes."
        },
        nav: {
            projects: "Projets",
            about: "À propos"
        },
        hero: {
            greeting: "Bonjour, Je suis",
            role: "Développeur Web, Mobile & Automatisation",
            see_projects: "→ Voir mes projets",
            more_about: "→ En savoir plus"
        },
        projects: {
            title: "Projets Sélectionnés",
            malea: {
                category: "Application Mobile — Social",
                desc: "Conception et déploiement d'un réseau social mobile dédié au partage de lieux. Architecture incluant une messagerie sécurisée, l'intégration de Google Places API et un système d'authentification multi-plateforme (Google, Apple).",
                playstore: "Play Store ↗",
                appstore: "App Store ↗"
            },
            easy: {
                category: "App iOS — Productivité",
                desc: "Assistant intelligent de productivité sur iOS. Une expérience utilisateur fluide conçue pour simplifier l'organisation quotidienne et la gestion des priorités.",
                appstore: "App Store ↗"
            },
            reconcil: {
                category: "Plateforme Web — E-commerce",
                desc: "Écosystème e-commerce complet. Développement d'une architecture API performante, d'un client web réactif et d'un back-office de gestion centralisé.",
                visit: "Voir le site ↗"
            },
            root: {
                category: "Application Web — En Vedette",
                desc: "Plateforme d'apprentissage en ligne moderne (projet en cours). Développement d'une API dédiée et d'une interface utilisateur dynamique pour une expérience éducative interactive.",
                visit: "Voir le site ↗"
            },
            automation: {
                category: "Bibliothèques — Automatisation",
                desc: "Conception de frameworks de tests E2E et d'outils d'automatisation haute performance sous Python/Selenium pour optimiser les cycles de qualité logicielle.",
                promethee: "Promethee Selenium ↗",
                uitool: "UI Test Tool ↗"
            }
        },
        about: {
            title: "À Propos",
            desc: "Je suis un Développeur Web, Mobile et Automatisation basé en France. Je me spécialise dans la création d'APIs robustes, d'applications mobiles et web évolutives et de frameworks d'automatisation avancés pour simplifier les flux de travail complexes.",
            social: "Social",
            contact: "Contact"
        },
        footer: {
            passion: "Conçu et développé avec passion"
        }
    },
    en: {
        seo: {
            title: "Yann Dipita — Web, Mobile & Automation Developer",
            description: "Passionate Web, Mobile & Automation Developer. I design robust applications, fluid mobile experiences and intelligent automation solutions."
        },
        nav: {
            projects: "Projects",
            about: "About"
        },
        hero: {
            greeting: "Hello, I am",
            role: "Web, Mobile & Automation Developer",
            see_projects: "→ See my projects",
            more_about: "→ More about me"
        },
        projects: {
            title: "Selected Projects",
            malea: {
                category: "Mobile App — Social",
                desc: "Design and deployment of a mobile social network dedicated to place sharing. Architecture includes secure messaging, Google Places API integration, and multi-platform authentication (Google, Apple).",
                playstore: "Play Store ↗",
                appstore: "App Store ↗"
            },
            easy: {
                category: "iOS App — Productivity",
                desc: "Intelligent productivity assistant on iOS. A fluid user experience designed to simplify daily organization and priority management.",
                appstore: "App Store ↗"
            },
            reconcil: {
                category: "Web Platform — E-commerce",
                desc: "Complete e-commerce ecosystem. Development of a high-performance API architecture, a responsive web client, and a centralized management back-office.",
                visit: "Visit site ↗"
            },
            root: {
                category: "Web App — Featured",
                desc: "Modern online learning platform (ongoing project). Development of a dedicated API and a dynamic user interface for an interactive educational experience.",
                visit: "Visit site ↗"
            },
            automation: {
                category: "Libraries — Automation",
                desc: "Design of E2E testing frameworks and high-performance automation tools using Python/Selenium to optimize software quality cycles.",
                promethee: "Promethee Selenium ↗",
                uitool: "UI Test Tool ↗"
            }
        },
        about: {
            title: "About",
            desc: "I am a Web, Mobile, Web and Automation Developer based in France. I specialize in building robust APIs, scalable mobile applications and advanced automation frameworks to simplify complex workflows.",
            social: "Social",
            contact: "Contact"
        },
        footer: {
            passion: "Designed and developed with passion"
        }
    }
};

window.I18n = {
    lang: 'fr',

    init: function () {
        try {
            const savedLang = localStorage.getItem('lang');
            if (savedLang) {
                this.lang = savedLang;
            } else {
                // Default to browser language if available and supported
                const browserLang = navigator.language.split('-')[0];
                if (translations[browserLang]) {
                    this.lang = browserLang;
                }
            }
            this.updateUI();

            const toggleBtn = document.getElementById('langToggle');

            const bindToggle = (btn) => {
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.lang = this.lang === 'fr' ? 'en' : 'fr';
                        localStorage.setItem('lang', this.lang);
                        this.updateUI();
                    });
                }
            }

            bindToggle(toggleBtn);

        } catch (e) {
            console.error('I18n init error:', e);
        }
    },

    updateUI: function () {
        const btn = document.getElementById('langToggle');
        if (btn) btn.textContent = this.lang === 'fr' ? 'EN' : 'FR';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.lang]) {
                const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[this.lang]);
                if (value) {
                    if (el.tagName === 'TITLE') {
                        document.title = value;
                    } else if (el.tagName === 'INPUT' && el.type === 'submit') {
                        el.value = value;
                    } else if (el.tagName === 'META' && el.getAttribute('name') === 'description') {
                        el.setAttribute('content', value);
                    } else {
                        el.innerHTML = value;
                    }
                }
            }
        });

        // Update html lang attribute
        document.documentElement.lang = this.lang;
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.I18n.init();
});
