// Add this at the beginning of your script.js file
console.log("Welcome to AnimaFileExplorer!");

function createGraphPattern() {
    const svg = document.querySelector('.graph-pattern');
    const nodesGroup = svg.querySelector('.nodes');
    const linksGroup = svg.querySelector('.links');
    const width = window.innerWidth;
    const height = window.innerHeight;
    const nodeCount = 20;
    const nodes = [];
    const links = [];

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        node.setAttribute('r', Math.random() * 3 + 2);
        node.setAttribute('cx', Math.random() * width);
        node.setAttribute('cy', Math.random() * height);
        node.setAttribute('class', 'node');
        nodes.push(node);
        nodesGroup.appendChild(node);
    }

    // Create links
    for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
            if (Math.random() > 0.85) {
                const link = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                link.setAttribute('x1', nodes[i].getAttribute('cx'));
                link.setAttribute('y1', nodes[i].getAttribute('cy'));
                link.setAttribute('x2', nodes[j].getAttribute('cx'));
                link.setAttribute('y2', nodes[j].getAttribute('cy'));
                link.setAttribute('class', 'link');
                links.push(link);
                linksGroup.appendChild(link);
            }
        }
    }

    // Animate nodes
    nodes.forEach((node, index) => {
        const animateX = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateX.setAttribute('attributeName', 'cx');
        animateX.setAttribute('dur', `${Math.random() * 10 + 10}s`);
        animateX.setAttribute('repeatCount', 'indefinite');
        animateX.setAttribute('values', `${node.getAttribute('cx')};${Math.random() * width};${node.getAttribute('cx')}`);
        node.appendChild(animateX);

        const animateY = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        animateY.setAttribute('attributeName', 'cy');
        animateY.setAttribute('dur', `${Math.random() * 10 + 10}s`);
        animateY.setAttribute('repeatCount', 'indefinite');
        animateY.setAttribute('values', `${node.getAttribute('cy')};${Math.random() * height};${node.getAttribute('cy')}`);
        node.appendChild(animateY);
    });

    // Update link positions
    function updateLinks() {
        links.forEach(link => {
            const startNode = nodes[links.indexOf(link) % nodeCount];
            const endNode = nodes[(links.indexOf(link) + 1) % nodeCount];
            link.setAttribute('x1', startNode.getAttribute('cx'));
            link.setAttribute('y1', startNode.getAttribute('cy'));
            link.setAttribute('x2', endNode.getAttribute('cx'));
            link.setAttribute('y2', endNode.getAttribute('cy'));
        });
        requestAnimationFrame(updateLinks);
    }

    updateLinks();
}

// Call this function when the page loads
window.addEventListener('load', createGraphPattern);
let GIPHY_API_KEY = '';

// Fetch the API key from the server
fetch('/get_api_key')
    .then(response => response.json())
    .then(data => {
        GIPHY_API_KEY = data.api_key;
        console.log('GIPHY API Key loaded');
    })
    .catch(error => console.error('Error loading GIPHY API Key:', error));

const animalKeywords = {
    cat: ['funny cat', 'cute cat', 'grumpy cat', 'sleepy cat', 'cat fail'],
    dog: ['happy dog', 'silly dog', 'excited dog', 'puppy', 'dog fail'],
    elephant: ['elephant playing', 'baby elephant', 'elephant bath', 'elephant trunk', 'clumsy elephant']
};

function getRandomKeyword(animal) {
    const keywords = animalKeywords[animal];
    return keywords[Math.floor(Math.random() * keywords.length)];
}

function fetchGif(animal) {
    const keyword = getRandomKeyword(animal);
    const gifContainer = document.getElementById('gif-container');
    gifContainer.innerHTML = '<p>Loading...</p>';

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${keyword}&limit=1&rating=g`)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.length > 0) {
                const gifUrl = data.data[0].images.original.url;
                gifContainer.innerHTML = `<img src="${gifUrl}" alt="${animal} gif">`;
            } else {
                gifContainer.innerHTML = `<p>No ${animal} GIF found. Please try again.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching GIF:', error);
            gifContainer.innerHTML = `<p>Error loading ${animal} GIF. Please try again.</p>`;
        });
}

document.querySelectorAll('input[name="animal"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const animal = e.target.value;
        fetchGif(animal);
    });
});

function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first.');
        return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const fileInfo = document.getElementById('file-info');
            fileInfo.innerHTML = `
                <strong>File Information:</strong>
                <p><span>Name:</span> ${data.name}</p>
                <p><span>Size:</span> ${data.size}</p>
                <p><span>Type:</span> ${data.type}</p>
            `;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while uploading the file.');
    });
}

// Update file input label with selected file name
document.getElementById('file-input').addEventListener('change', function(e) {
    const fileName = e.target.files[0]?.name || 'Choose a file';
    document.querySelector('.file-input-label').textContent = fileName;
});
