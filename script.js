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
                <h3 id="popupheader">New paragraph</h3>
                <label for="header">Header:</label>
                <input type="text" id="header"><br>
                <label for="main">Main:</label>
                <textarea id="main" placeholder="Valid markdown, edit markdown here!"></textarea><br>
                <button id="submit">Submit</button>
                <button id="close">Close</button>
                <input type="checkbox" id="addToFirstLine">
                <p id="popuphint">↑ [New features] Add to first line.</p>
            </div>
        `;
        document.body.appendChild(popup);

        document.getElementById('close').addEventListener('click', function() {
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
        });

        document.getElementById('submit').addEventListener('click', function() {
            const needAddToFirstLine = document.querySelector("#addToFirstLine")

            const container = document.createElement('div');
            container.className = 'container';

            const containers = document.querySelector(".containers")
            if (needAddToFirstLine.checked){
                const firstChild = containers.firstChild;
                containers.insertBefore(container, firstChild);
            } else {
                containers.appendChild(container);
            }
            const headerText = document.getElementById('header').value;
            const mainText = document.getElementById('main').value;

            const header = document.createElement('h2');
            header.textContent = headerText;

            const main = document.createElement('div');
            main.className = 'text';
            main.innerHTML = marked.parse(mainText); // Use a Markdown parser like marked.js

            container.appendChild(header);
            container.appendChild(main);
            
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
        });
    });
});
