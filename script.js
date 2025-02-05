document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchButton').addEventListener('click', function() {
        const keyword = document.getElementById('search').value.toLowerCase();
        const containers = document.querySelectorAll('.container');

        containers.forEach(container => {
            const text = container.textContent.toLowerCase();
            if (text.includes(keyword)) {
                container.style.display = 'block';
            } else {
                container.style.display = 'none';
            }
        });
    });
    document.getElementById('create').addEventListener('click', function() {
        const popup = document.createElement('div');
        document.querySelector('#create').style.display = 'none';
        popup.innerHTML = `
            <div class="popup">
                <label for="header">Header:</label>
                <input type="text" id="header"><br>
                <label for="main">Main:</label>
                <textarea id="main" placeholder="Valid markdown, edit markdown here!"></textarea><br>
                <button id="submit">Submit</button>
                <button id="close">Close</button>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById('close').addEventListener('click', function() {
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
        });

        document.getElementById('submit').addEventListener('click', function() {
            container = document.createElement('div');
            container.className = 'container';
            document.body.appendChild(container);
            
            const headerText = document.getElementById('header').value;
            const mainText = document.getElementById('main').value;

            const header = document.createElement('h2');
            header.textContent = headerText;

            const main = document.createElement('p');
            main.className = 'text';
            main.innerHTML = marked.parse(mainText); // Use a Markdown parser like marked.js

            container.appendChild(header);
            container.appendChild(main);
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
        });
    });
});

