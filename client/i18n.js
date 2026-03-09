// Language System
const translations = {
    fr: {
        skills: {
            title_start: "Mes",
            title_end: "Compétences",
            subtitle: "Expertise technique et méthodologique pour la réussite de sites web et d'applications mobiles.",
            qa_title: "1. Quality Assurance (QA)",
            qa_1: "Rédaction et maintien des cahiers de tests, étude des nouvelles fonctionnalités.",
            qa_2: "Mise en place de campagnes de tests inter-sprint et démo.",
            qa_3: "Création de frameworks sur mesure (ATLAS API, Promethee-Selenium, Selenium UI Test Tool).",
            qc_title: "2. Quality Control (QC)",
            qc_1: "Test des fonctionnalités en cours de développement, lancements des tests (Manuels/Auto/Régression).",
            qc_2: "Détection de bugs, transcription détaillée, et analyse des résultats. Suivi dans JIRA.",
            qc_3: "Récupération des appels WS et automatisation des APIs et scénarios via Postman.",
            auto_dev_title: "3. Automatisation & Tests E2E",
            auto_dev_1: "Mise en place de scripts de tests réutilisables, robustes et évolutifs (Python, Selenium).",
            auto_dev_2: "Factorisation du code de tests pour réduire la duplication et faciliter la maintenance.",
            auto_dev_3: "Développement des packages open source (Promethee-selenium) basés sur le pattern POM.",
            agile_title: "4. Collaboration Agile",
            agile_1: "Collaboration étroite avec les équipes développement, produit et QA.",
            agile_2: "Participation active aux rituels Agile / Scrum (planning, refinement, reviews, rétrospectives).",
            agile_3: "Contribution continue à l’amélioration de la qualité logicielle et des processus de tests de l'équipe.",
            python_title: "5. Expertise Python",
            python_1: "Développement backend robuste en Python et scripts d'automatisation divers.",
            python_2: "Intégration d'outils et orchestration des tests au sein des environnements d'intégration continue (CI/CD).",
            python_3: "Gestion et documentation des anomalies avec clarté, optimisation des builds test.",

            // --- Subpages Titles ---
            qa_sub_title: "1. Quality Assurance (QA)",
            qc_sub_title: "2. Quality Control (QC)",
            auto_sub_title: "3. Automatisation & Tests E2E",
            agile_sub_title: "4. Collaboration Agile",
            python_sub_title: "5. Expertise Python",
            sub_return: "Retour"

        },
        // --- QA Subpage ---
        qa_sub: {
            desc: "Garantir la qualité logicielle dès la conception.",
            doc_title: "Cahiers de Tests et Analyse",
            doc_1: "Création de cahiers de tests exhaustifs pour couvrir tous les cas d'usage.",
            doc_1_strong: "Rédaction et maintien:",
            doc_2: "Analyse approfondie des nouvelles fonctionnalités pour anticiper les failles potentielles.",
            doc_2_strong: "Étude des fonctionnalités:",
            camp_title: "Campagnes de Tests",
            camp_1: "Mise en place de campagnes structurées tout au long du cycle de développement agile.",
            camp_1_strong: "Tests inter-sprint:",
            camp_2: "Validation des parcours utilisateurs pour garantir des démonstrations fluides.",
            camp_2_strong: "Préparation de démos:",
            frame_title: "Frameworks Sur-Mesure",
            frame_desc: "Plutôt que d'utiliser des solutions génériques, je conçois des frameworks adaptés aux besoins spécifiques de chaque projet :",
            frame_1: "Framework sur mesure pour l'automatisation des tests API.",
            frame_2: "Mes propres bibliothèques pour simplifier et fiabiliser drastiquement les tests E2E.",
            cta: "Me confier votre QA"
        },
        // --- QC Subpage ---
        qc_sub: {
            desc: "Validation rigoureuse des livrables et suivi des anomalies.",
            exec_title: "Exécution des Tests",
            exec_1: "Test des fonctionnalités en cours de développement.",
            exec_1_strong: "Lancements manuels et automatisés :",
            exec_2: "Validation systématique pour s'assurer que les nouvelles fonctionnalités n'impactent pas l'existant.",
            exec_2_strong: "Tests de non-régression :",
            bug_title: "Gestion des Anomalies",
            bug_1: "Détection de bugs, transcription détaillée, et analyse des résultats.",
            bug_1_strong: "Identification :",
            bug_2: "Création et suivi rigoureux des tickets de bugs dans JIRA jusqu'à leur résolution.",
            bug_2_strong: "Suivi JIRA :",
            api_title: "Tests API",
            api_1: "Récupération des appels WS et automatisation des scénarios.",
            api_1_strong: "Postman :",
            api_2: "Mise en place de collections Postman pour validation continue logicielle.",
            api_2_strong: "Validation :",
            cta: "Assurer la qualité"
        },
        // --- Automation Subpage ---
        auto_sub: {
            desc: "Scripts réutilisables, factorisation et création de frameworks open source.",
            scripts_title: "Scripts Robustes & Évolutifs",
            scripts_1: "Mise en place de scripts de tests automatisés (Python, Selenium) conçus pour durer.",
            scripts_1_strong: "Développement:",
            scripts_2: "Architecture pensée pour éviter les tests flakies et garantir des résultats constants.",
            scripts_2_strong: "Fiabilité:",
            facto_title: "Factorisation et Maintenance",
            facto_1: "Factorisation systématique du code de tests pour réduire la duplication.",
            facto_1_strong: "Clean Code:",
            facto_2: "Code plus clair et plus facile à adapter lors des évolutions de l'application.",
            facto_2_strong: "Maintenabilité:",
            pom_title: "Packages Open Source (POM)",
            pom_desc: "Je crois en la création d'outils standards. Développer des bibliothèques réutilisables permet de standardiser la qualité :",
            pom_1: "Intégration systématique du pattern POM pour séparer la logique de test de la structure de l'UI.",
            pom_2: "Développement de packages open source complets pour simplifier massivement la création de tests d'UI complexes.",
            pom_2_strong: "Promethee-selenium:",
            cta: "Automatiser votre SI"
        },
        // --- Agile Subpage ---
        agile_sub: {
            desc: "Intégration transparente dans les processus agiles de vos équipes.",
            collab_title: "Synergie d'Équipe",
            collab_1: "Communication fluide entre les testeurs, les développeurs et le Product Owner.",
            collab_1_strong: "Alignement :",
            collab_2: "Assistance et conseil pour améliorer la qualité de testabilité dès la phase de conception.",
            collab_2_strong: "Shift-Left :",
            rituals_title: "Rituels Scrum",
            rituals_1: "Participation active pour estimer l'effort de test et soulever les risques.",
            rituals_1_strong: "Planning & Refinement :",
            rituals_2: "Présentation des résultats de tests et proposition d'améliorations continues.",
            rituals_2_strong: "Reviews & Rétrospectives :",
            improve_title: "Amélioration Continue",
            improve_1: "Optimisation de la vélocité par l'automatisation intelligente.",
            improve_1_strong: "Efficacité :",
            improve_2: "Partage de connaissances sur la qualité logicielle avec les développeurs.",
            improve_2_strong: "Formation :",
            cta: "Intégrer vos équipes"
        },
        // --- Python Subpage ---
        python_sub: {
            desc: "Création d'outils maison, automatisation de tâches et scripts back-end.",
            tools_title: "Outils Dédiés",
            tools_1: "Conception de scripts Python pour automatiser des processus CI/CD spécifiques.",
            tools_1_strong: "Scripts Internes :",
            tools_2: "Traitement de données de test, préparation d'environnements.",
            tools_2_strong: "Opérations de données :",
            backend_title: "Briques Back-end",
            backend_1: "Consommation et tests intensifs d'API REST / GraphQL.",
            backend_1_strong: "Intégration API :",
            backend_2: "Écriture de scripts interagissant avec SQL ou NoSQL pour la validation.",
            backend_2_strong: "Bases de données :",
            best_title: "Bonnes Pratiques",
            best_1: "Respect strict des normes PEP8 pour un code Python lisible et maintenable.",
            best_1_strong: "Code Quality :",
            best_2: "Déploiement de projets sous forme de packages (ex: via PyPI).",
            best_2_strong: "Packaging :",
            cta: "Créer vos outils"
        },
        seo: {
            title: "Yann Dipita - Développeur Python & QA Automation Engineer"
        },
        nav: {
            home: "Accueil",
            skills: "Compétences",
            about: "À Propos",
            projects: "Projets",
            activity: "Activité",
            live: "Live",
            contact: "Contact"
        },
        hero: {
            greeting: "Bonjour, je suis",
            role: "Développeur python et QA automation engineer passionné de solutions innovantes et performantes.",
            button_projects: "Voir mes projets",
            button_contact: "Me contacter",
            cta_automation: "Divisez votre code de test par 3"
        },
        about: {
            description: "J'accompagne les équipes pour mettre en place des processus QA robustes et fiables. Bien que j'aie développé mes propres solutions (Promethee-selenium, Selenium-ui-test-tool) pour faciliter l'automatisation, je m'intègre tout aussi efficacement aux environnements utilisant Cypress, Robot Framework, Postman ou Playwright.",
            technologies: "Technologies maîtrisées"
        },
        projects: {
            title_start: "Projets",
            title_end: "Réalisés",
            subtitle: "Une sélection de mes travaux récents en développement web et mobile.",
            filter_all: "Tous",
            featured: "Projet du moment",
            pmt_desc: "Une plateforme SaaS complète pour la gestion de projets agile, permettant aux équipes de collaborer en temps réel avec des outils de visualisation avancés.",
            promethee_desc: "Bibliothèque robuste basée sur le pattern Page Object Model pour les tests UI automatisés avec Selenium.",
            easytask_desc: "Une application iOS intuitive pour gérer vos tâches quotidiennes et vos échéances importantes.",
            course_desc: "Plateforme de formation en ligne interactive.",
            selenium_desc: "Bibliothèque Python pour simplifier l'automatisation des tests UI.",
            hashtag_impact_desc: "Plateforme de valorisation des biens immobiliers vacants.",
            filter_library: "Librairie"
        },
        virtuallab: {
            badge: "Live Streaming",
            title_start: "Le",
            title_end: "Laboratoire Virtuel",
            description: "Rejoignez-moi en direct pour des sessions de code, des expériences et des échanges. Partage d'écran et chat en temps réel."
        },
        blog_preview: {
            badge: "Blog & Ressources",
            title_start: "Mettez en place une",
            title_end: "QA automatisée",
            description: "Guides pratiques, tutoriels et retours d'expérience pour mettre en place sereinement une QA automatisée pour fiabiliser vos tests.",
            cta: "Accéder au Blog"
        },
        pricing: {
            badge: "Forfaits & Tarifs",
            title_start: "Des offres adaptées à",
            title_end: "Vos besoins QA",
            description: "Stop aux tests manuels répétitifs. Discutons de l'automatisation de vos processus QA pour vous permettre de livrer plus vite et plus sereinement. De l'audit à l'intégration continue.",
            card1_title: "Setup Framework QA",
            card1_desc: "Audit et mise en place initiale",
            card2_title: "Accompagnement Continu",
            card2_desc: "Intégration CI/CD & Maintenance",
            card_tooltip: "Mise en place d'un socle de tests robuste pour votre app.",
            card_tooltip2: "Suivi régulier de la qualité et évolution des scripts.",
            learn_title: "Mes domaines d'intervention",
            learn_1: "Automatisation E2E & API (Selenium, Postman, Pytest)",
            learn_2: "Intégration continue (CI/CD) et reporting",
            learn_3: "Développement d'outils internes Python sur mesure",
            book_title: "Demander un audit ou devis",
            confirm_booking: "Planifier un appel préliminaire"
        },
        modal: {
            success_title: "Demande envoyée !",
            success_msg: "Votre demande de créneau a bien été reçue. Je reviens vers vous très rapidement pour confirmer le rendez-vous.",
            error_title: "Oups !",
            error_msg: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
            btn_success: "Super !",
            btn_error: "Fermer",
            select_session_error: "Veuillez sélectionner un type de session (1h ou 2h) avant de valider."
        },
        contact: {
            title_start: "Parlons de votre",
            title_end: "Projet",
            description: "Vous avez une idée ou un besoin spécifique ? Je suis disponible pour discuter de vos futurs défis techniques.",
            location: "Localisation",
            field_name: "Nom Complet",
            field_email: "Email",
            field_subject: "Sujet",
            field_message: "Message",
            btn_send: "Envoyer le message"
        },
        blog_qa: {
            badge: "Blog & Ressources",
            title_start: "Mettez en place une",
            title_end: "QA automatisée",
            subtitle: "Guides pratiques, tutoriels et retours d'expérience pour mettre en place sereinement une QA automatisée pour fiabiliser vos tests.",
            card1_title: "Penser comme un QA",
            card1_desc: "Adopter le bon mindset pour résoudre des problèmes complexes et progresser rapidement.",
            card2_title: "QA Manuel",
            card2_desc: "La base de l'automatisation. Maîtriser les concepts fondamentaux pour mieux automatiser.",
            card3_title: "Automatiser avec Promethee",
            card3_desc: "Automatiser votre QA avec Promethee-selenium. Découvrez comment mettre en place des tests robustes.",
            read_more: "Lire les articles",
            mindset_title: "Think like a QA",
            mindset_content: "Le mindset d'un QA ne se limite pas à chercher des bugs. C'est une approche globale focalisée sur la prévention, l'analyse et l'anticipation des risques pour garantir la meilleure expérience utilisateur possible.",
            manual_title: "QA Manuel : La base de l'automatisation",
            manual_content: "L'automatisation ne remplace pas l'intelligence humaine. Avant de coder un seul test, il est crucial de maîtriser la création de cas de tests robustes, l'analyse des besoins et l'exécution manuelle rigoureuse.",
            promethee_title: "Automatiser votre QA avec Promethee-selenium",
            promethee_content: "Promethee-selenium est un framework puissant basé sur le pattern Page Object Model. Il permet de structurer vos tests UI de manière claire, maintenable et incroyablement rapide à déployer."
        }
    },
    en: {
        skills: {
            title_start: "My",
            title_end: "Skills",
            subtitle: "Technical and methodological expertise for the success of your websites and mobile apps.",
            qa_title: "1. Quality Assurance (QA)",
            qa_1: "Writing and maintaining test plans, analyzing new features.",
            qa_2: "Setting up inter-sprint and demo testing campaigns.",
            qa_3: "Creating custom frameworks (ATLAS API, Promethee-Selenium, Selenium UI Test Tool).",
            qc_title: "2. Quality Control (QC)",
            qc_1: "Testing features currently in development, running tests (Manual/Auto/Regression).",
            qc_2: "Bug detection, detailed reporting, and results analysis. Tracking in JIRA.",
            qc_3: "Extracting WS calls and automating APIs and scenarios via Postman.",
            auto_dev_title: "3. Automation & E2E Tests",
            auto_dev_1: "Implementing reusable, robust, and scalable test scripts (Python, Selenium).",
            auto_dev_2: "Refactoring test code to reduce duplication and ease maintenance.",
            auto_dev_3: "Development of open source packages (Promethee-selenium) based on the POM pattern.",
            agile_title: "4. Agile Collaboration",
            agile_1: "Close collaboration with development, product, and QA teams.",
            agile_2: "Active participation in Agile / Scrum rituals (planning, refinement, reviews, retrospectives).",
            agile_3: "Continuous contribution to improving software quality and the team's testing processes.",
            python_title: "5. Python Expertise",
            python_1: "Robust backend development in Python and various automation scripts.",
            python_2: "Tool integration and test orchestration within continuous integration environments (CI/CD).",
            python_3: "Clear management and documentation of anomalies, optimization of test builds.",

            // --- Subpages Titles ---
            qa_sub_title: "1. Quality Assurance (QA)",
            qc_sub_title: "2. Quality Control (QC)",
            auto_sub_title: "3. Automation & E2E Tests",
            agile_sub_title: "4. Agile Collaboration",
            python_sub_title: "5. Python Expertise",
            sub_return: "Back"
        },
        // --- QA Subpage ---
        qa_sub: {
            desc: "Ensuring software quality from conception.",
            doc_title: "Test Cases and Analysis",
            doc_1: "Creation of exhaustive test cases to cover all usage scenarios.",
            doc_1_strong: "Writing and maintenance:",
            doc_2: "In-depth analysis of new features to anticipate potential flaws.",
            doc_2_strong: "Feature study:",
            camp_title: "Testing Campaigns",
            camp_1: "Setup of structured campaigns throughout the agile development cycle.",
            camp_1_strong: "Inter-sprint tests:",
            camp_2: "Validation of user journeys to ensure smooth demonstrations.",
            camp_2_strong: "Demo preparation:",
            frame_title: "Custom Frameworks",
            frame_desc: "Rather than using generic solutions, I design frameworks tailored to each project's specific needs:",
            frame_1: "Custom framework for API test automation.",
            frame_2: "My own libraries to radically simplify and reliable E2E tests.",
            cta: "Hand over your QA"
        },
        // --- QC Subpage ---
        qc_sub: {
            desc: "Rigorous validation of deliverables and anomaly tracking.",
            exec_title: "Test Execution",
            exec_1: "Testing features currently under development.",
            exec_1_strong: "Manual and automated runs:",
            exec_2: "Systematic validation to ensure new features don't impact existing ones.",
            exec_2_strong: "Non-regression tests:",
            bug_title: "Anomaly Management",
            bug_1: "Bug detection, detailed transcription, and results analysis.",
            bug_1_strong: "Identification:",
            bug_2: "Creation and rigorous tracking of bug tickets in JIRA until resolved.",
            bug_2_strong: "JIRA Tracking:",
            api_title: "API Tests",
            api_1: "Retrieval of WS calls and scenario automation.",
            api_1_strong: "Postman:",
            api_2: "Setup of Postman collections for continuous software validation.",
            api_2_strong: "Validation:",
            cta: "Ensure quality"
        },
        // --- Automation Subpage ---
        auto_sub: {
            desc: "Reusable scripts, refactoring, and creation of open source frameworks.",
            scripts_title: "Robust & Scalable Scripts",
            scripts_1: "Implementation of automated test scripts (Python, Selenium) built to last.",
            scripts_1_strong: "Development:",
            scripts_2: "Architecture designed to avoid flaky tests and guarantee consistent results.",
            scripts_2_strong: "Reliability:",
            facto_title: "Refactoring and Maintenance",
            facto_1: "Systematic refactoring of test code to reduce duplication.",
            facto_1_strong: "Clean Code:",
            facto_2: "Clearer code, easier to adapt during application evolutions.",
            facto_2_strong: "Maintainability:",
            pom_title: "Open Source Packages (POM)",
            pom_desc: "I believe in creating standard tools. Developing reusable libraries standardizes quality:",
            pom_1: "Systematic integration of the POM pattern to separate test logic from UI structure.",
            pom_2: "Development of comprehensive open-source packages to massively simplify complex UI tests.",
            pom_2_strong: "Promethee-selenium:",
            cta: "Automate your IS"
        },
        // --- Agile Subpage ---
        agile_sub: {
            desc: "Seamless integration into your teams' agile processes.",
            collab_title: "Team Synergy",
            collab_1: "Fluid communication between testers, developers, and the Product Owner.",
            collab_1_strong: "Alignment:",
            collab_2: "Assistance and advice to improve testability quality right from the design phase.",
            collab_2_strong: "Shift-Left:",
            rituals_title: "Scrum Rituals",
            rituals_1: "Active participation to estimate test effort and raise risks.",
            rituals_1_strong: "Planning & Refinement:",
            rituals_2: "Presentation of test results and proposals for continuous improvement.",
            rituals_2_strong: "Reviews & Retrospectives:",
            improve_title: "Continuous Improvement",
            improve_1: "Velocity optimization through intelligent automation.",
            improve_1_strong: "Efficiency:",
            improve_2: "Knowledge sharing on software quality with developers.",
            improve_2_strong: "Training:",
            cta: "Integrate your teams"
        },
        // --- Python Subpage ---
        python_sub: {
            desc: "Creation of in-house tools, task automation, and back-end scripts.",
            tools_title: "Dedicated Tools",
            tools_1: "Design of Python scripts to automate specific CI/CD processes.",
            tools_1_strong: "Internal Scripts:",
            tools_2: "Test data processing, environment preparation.",
            tools_2_strong: "Data Operations:",
            backend_title: "Back-end Building Blocks",
            backend_1: "Consumption and intensive testing of REST / GraphQL APIs.",
            backend_1_strong: "API Integration:",
            backend_2: "Writing scripts interacting with SQL or NoSQL for validation.",
            backend_2_strong: "Databases:",
            best_title: "Best Practices",
            best_1: "Strict adherence to PEP8 standards for readable and maintainable Python code.",
            best_1_strong: "Code Quality:",
            best_2: "Deployment of projects as packages (e.g., via PyPI).",
            best_2_strong: "Packaging:",
            cta: "Create your tools"
        },
        seo: {
            title: "Yann Dipita - Python Developer & QA Automation Engineer"
        },
        nav: {
            home: "Home",
            skills: "Skills",
            about: "About",
            projects: "Projects",
            activity: "Activity",
            live: "Live",
            contact: "Contact"
        },
        hero: {
            greeting: "Hello, I am",
            role: "Python Developer & QA Automation Engineer who likes innovative and high-performance solutions.",
            button_projects: "View my projects",
            button_contact: "Contact me",
            cta_automation: "Cut your testing code by 3"
        },
        about: {
            description: "I help teams build robust QA processes. While I have developed custom solutions (Promethee-selenium, Selenium-ui-test-tool) to streamline automation, I am fully proficient and adaptable to environments using Cypress, Robot Framework, Postman, or Playwright.",
            technologies: "Technologies mastered"
        },
        projects: {
            title_start: "Selected",
            title_end: "Projects",
            subtitle: "A selection of my recent work in web and mobile development.",
            filter_all: "All",
            featured: "Featured Project",
            pmt_desc: "A complete SaaS platform for agile project management, allowing teams to collaborate in real-time with advanced visualization tools.",
            promethee_desc: "Robust library based on the Page Object Model pattern for automated UI tests with Selenium.",
            easytask_desc: "An intuitive iOS application to manage your daily tasks and important deadlines.",
            course_desc: "Interactive online training platform.",
            selenium_desc: "Python library to simplify UI test automation.",
            hashtag_impact_desc: "Platform for evaluating vacant real estate properties.",
            filter_library: "Library"
        },
        virtuallab: {
            badge: "Live Streaming",
            title_start: "The",
            title_end: "Virtual Lab",
            description: "Join me live for coding sessions, experiments, and discussions. Real-time screen sharing and chat."
        },
        blog_preview: {
            badge: "Blog & Resources",
            title_start: "Implement an",
            title_end: "Automated QA",
            description: "Practical guides, tutorials, and insights to serenely implement an automated QA to make your tests reliable.",
            cta: "Visit Blog"
        },
        pricing: {
            badge: "Packages & Pricing",
            title_start: "Offers tailored to",
            title_end: "Your QA Needs",
            description: "Stop repetitive manual testing. Let's discuss automating your QA processes to let you ship faster and with confidence. From audit to Continuous Integration.",
            card1_title: "QA Framework Setup",
            card1_desc: "Audit & Initial implementation",
            card2_title: "Continuous Support",
            card2_desc: "CI/CD Integration & Maintenance",
            card_tooltip: "Implementation of a robust test foundation for your app.",
            card_tooltip2: "Regular quality monitoring and scripts evolution.",
            learn_title: "My areas of expertise",
            learn_1: "E2E & API Automation (Selenium, Postman, Pytest)",
            learn_2: "Continuous Integration (CI/CD) and Reporting",
            learn_3: "Tailor-made Python internal tools development",
            book_title: "Request an audit or quote",
            confirm_booking: "Schedule a discovery call"
        },
        modal: {
            success_title: "Request Sent!",
            success_msg: "Your booking request has been received. I will get back to you very quickly to confirm the appointment.",
            error_title: "Oops!",
            error_msg: "An error occurred while sending. Please try again.",
            btn_success: "Great!",
            btn_error: "Close",
            select_session_error: "Please select a session type (1h or 2h) before confirming."
        },
        contact: {
            title_start: "Let's talk about your",
            title_end: "Project",
            description: "Do you have an idea or a specific need? I am available to discuss your future technical challenges.",
            location: "Location",
            field_name: "Full Name",
            field_email: "Email",
            field_subject: "Subject",
            field_message: "Message",
            btn_send: "Send message"
        },
        blog_qa: {
            badge: "Blog & Resources",
            title_start: "Implement an",
            title_end: "Automated QA",
            subtitle: "Practical guides, tutorials, and insights to serenely implement an automated QA to make your tests reliable.",
            card1_title: "Think Like a QA",
            card1_desc: "Adopt the right mindset to solve complex problems and progress quickly.",
            card2_title: "Manual QA",
            card2_desc: "The foundation of automation. Master fundamental concepts to better automate.",
            card3_title: "Automate with Promethee",
            card3_desc: "Automate your QA with Promethee-selenium. Discover how to set up robust tests.",
            read_more: "Read articles",
            mindset_title: "Think like a QA",
            mindset_content: "A QA's mindset isn't just about finding bugs. It's a comprehensive approach focused on prevention, analysis, and anticipating risks to ensure the best possible user experience.",
            manual_title: "Manual QA: The Foundation of Automation",
            manual_content: "Automation doesn't replace human intelligence. Before coding a single test, it's crucial to master the creation of robust test cases, needs analysis, and rigorous manual execution.",
            promethee_title: "Automate your QA with Promethee-selenium",
            promethee_content: "Promethee-selenium is a powerful framework based on the Page Object Model pattern. It allows you to structure your UI tests in a clear, maintainable, and incredibly fast way to deploy."
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
        // Update Main Button (index-qa.html)
        const btn = document.getElementById('langToggle');
        if (btn) btn.textContent = this.lang.toUpperCase();

        // Update Text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[this.lang]) {
                const value = key.split('.').reduce((obj, k) => obj && obj[k], translations[this.lang]);
                if (value) {
                    if (el.tagName === 'TITLE') {
                        document.title = value; // update document.title properly
                    } else if (el.tagName === 'INPUT' && el.type === 'submit') {
                        el.value = value;
                    } else {
                        // Allow HTML in translations (useful for dynamic spans inside text)
                        el.innerHTML = value;
                    }
                }
            }
        });

        // Update specific dynamic components if needed
        if (window.Mentorship && typeof window.Mentorship.renderCalendar === 'function') {
            // Force calendar re-render to update locale
            window.Mentorship.renderCalendar();
        }
    }
};

window.addEventListener('DOMContentLoaded', () => {
    window.I18n.init();
});
