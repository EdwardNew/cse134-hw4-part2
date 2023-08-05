window.addEventListener('DOMContentLoaded', function() {
    loadLocalData();

    document.getElementById('loadLocal').addEventListener('click', function() {
        readLocalData();
    });

    document.getElementById('loadRemote').addEventListener('click', function() {
        readRemoteData();
    });
});

let projects = [{
    title:"Local 1",
    img: "img1.jpg",
    alt: "img1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "https://canvas.ucsd.edu/"
},
{
    title:"Local 2",
    img: "img2.jpg",
    alt: "img2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "https://www.gradescope.com/"
},
{
    title:"Local 3",
    img: "img3.jpg",
    alt: "img3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    link: "https://ucsd.edu/"
}]

function loadLocalData() {
    localStorage.setItem('projects', JSON.stringify(projects));
    console.log('local data loaded');
}

function readRemoteData() {
    let apiKey = '$2b$10$lZ.OMlyVHqpakfnxoTbIOOuFoBTiUxar2k3qlP9n27G6bpMGziDY.';
    let binId = '64ce31aab89b1e2299cbc1c6';
    fetch(`https://api.jsonbin.io/v3/b/${binId}`, {
        headers: {
            'X-Access-Key': apiKey,
            'Content-Type': 'application/json'
        }
    }).then(Response => {
        return Response.json();
    }).then(data => {
        data.record.map((project) => {
            let card = new projectCardElement(project.title, project.img, project.imgAlt, project.desc, project.link);
        document.querySelector('output').appendChild(card);
        });
    });
}

function readLocalData() {
    let localProjects = JSON.parse(localStorage.getItem('projects'));
    localProjects.map((project) => {
        let card = new projectCardElement(project.title, project.img, project.imgAlt, project.desc, project.link);
        document.querySelector('output').appendChild(card);
    });
}

class projectCardElement extends HTMLElement {
    constructor(heading, img, imgAlt, desc, link) {
        super();
        this.heading = heading;
        this.img = img;
        this.imgAlt = imgAlt;
        this.desc = desc;
        this.link = link;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                div {
                    background-color: var(--card-color);
                    border-radius: var(--card-border-radius);
                    padding: 0.25rem 2rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    max-width: var(--card-max-width);
                }
                img {
                    border-radius: var(--card-border-radius);
                }
                h2 {
                    text-align: center;
                }
                a {
                    text-decoration: none;
                    color: var(--card-link-color);
                    background-color: var(--card-link-background-color);
                    padding: 1rem;
                    border: var(--card-link-border);
                    border-radius: var(--card-border-radius);
                    transition: ease-in-out 0.2s;
                    margin-bottom: 2rem;
                }
                a:hover {
                    box-shadow: var(--card-link-hover-box-shadow);
                    transform: scale(1.01);
                }
            </style>

            <div>
                <h2>${heading}</h2>
                <img src=${img} alt=${imgAlt}>
                <p>${desc}</p>
                <a href="${link}">Read More</a>
            </div>
        `;
    }
}

customElements.define('project-card', projectCardElement);