document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', () => {
        const keyword = document.getElementById('search').value.toLowerCase();
        const paragraphs = document.querySelectorAll('.paragraph');
        const searchType = document.getElementById('searchType').value;

        paragraphs.forEach(paragraph => {
            let text = '';
            if (searchType === 'header') { text = paragraph.querySelector('h2').textContent.toLowerCase(); }
            else if (searchType === 'main') { text = paragraph.querySelector('.text').textContent.toLowerCase(); }
            else { text = paragraph.textContent.toLowerCase(); };

            if (text.includes(keyword)) { paragraph.style.display = 'block'; }
            else { paragraph.style.display = 'none'; };
        });
    });
    document.getElementById('create').addEventListener('click', () => {
        const popup = document.createElement('div');
        popup.className = "popup";
        document.querySelector('#create').style.display = 'none';
        popup.innerHTML = `
            <h3 id="popupheader">New paragraph</h3>
            <input type="text" id="header" placeholder="Header"><br>
            <textarea id="main" placeholder="Main"></textarea><br>
            <div class="opt-mkd"><input type="checkbox"/> Markdown at main</div>
            <button id="submit">Submit</button>
            <button id="close">Close</button>
            <br>
            <p id="popuphint">It always add to first line.</p>
        `;
        document.body.appendChild(popup);

        document.getElementById('close').addEventListener('click', () => {
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
        });

        document.getElementById('submit').addEventListener('click', () => {

            const paragraph = document.createElement('div');
            paragraph.className = 'paragraph';

            const containers = document.querySelector(".container");
            const markdownCheckbox = popup.querySelector(".opt-mkd input[type=\"checkbox\"]");

            const firstChild = containers.firstChild;
            containers.insertBefore(paragraph, firstChild);

            const headerText = document.getElementById('header').value;
            const mainText = document.getElementById('main').value;

            const header = document.createElement('h2');
            header.textContent = headerText;

            const main = document.createElement('div');
            main.className = 'text';
            
            if (markdownCheckbox.checked){main.innerHTML = marked.parse(mainText); /* Use a Markdown parser like marked.js */}
            else {
                const text = document.createElement("p");
                text.innerText = mainText;
                main.appendChild(text);
            };

            paragraph.appendChild(header);
            paragraph.appendChild(main);
            
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete';
            deleteBtn.textContent = '-';
            paragraph.appendChild(deleteBtn);

            deleteBtn.addEventListener('click', () => {
                paragraph.remove();
            });
        });
    });

    const container = document.querySelector('.container');
    const sortButton = document.querySelector('.sort');
    let sort = undefined;
    document.body.appendChild(sortButton);
    sortButton.addEventListener('click', () => {
        if (!sort) {
            sort = new Sortable(container, { animation: 150 });
            sortButton.textContent = 'Complete';
        } else {
            sort.destroy();
            sort = undefined;
            sortButton.textContent = 'Drag';
        };
    });
});
