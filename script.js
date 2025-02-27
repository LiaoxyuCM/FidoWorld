/* FidoWorld Scripts */

document.addEventListener('DOMContentLoaded', () => {

    /* When search button is clicked */
    document.getElementById('searchButton').addEventListener('click', () => {

        /* Get keyword, search filter and every paragraphs */
        const keyword = document.getElementById('search').value.toLowerCase();
        const paragraphs = document.querySelectorAll('.paragraph');
        const searchType = document.getElementById('searchType').value;

        /* Every paragraphs should run this */
        paragraphs.forEach(paragraph => {

            /*
                Get their text content:
                Something just get header,
                something just get main,
                something must get all text contents.
                This is determined by the search filter.
            */
            let text = '';
            if (searchType === 'header') { text = paragraph.querySelector('h2').textContent.toLowerCase(); }
            else if (searchType === 'main') { text = paragraph.querySelector('.text').textContent.toLowerCase(); }
            else { text = paragraph.textContent.toLowerCase(); };
            
            /* If text content included it, they will show; else, they wil hide. */
            if (text.includes(keyword)) { paragraph.style.display = 'block'; }
            else { paragraph.style.display = 'none'; };
        });
    });

    /* When "New paragraph" button is clicked */
    document.getElementById('create').addEventListener('click', () => {

        /* Show popup */
        const popup = document.createElement('div');
        popup.className = "popup";
        document.querySelector('#create').style.display = 'none';
        popup.innerHTML = `
            <h3 id="popupheader">New paragraph</h3>
            <input type="text" id="header" placeholder="Header"><br>
            <textarea id="main" placeholder="Main"></textarea><br>
            <div class="opt-mkd"><input type="checkbox"/> Markdown at main</div>
            <button id="submit">Submit</button>
            <button id="close">Close</button><br>
            <p id="popuphint">It always add to first line.</p>
        `;
        document.body.appendChild(popup);

        document.getElementById('close').addEventListener('click', () => {
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
        });

        /* If clicked submit */
        document.getElementById('submit').addEventListener('click', () => {

            /* Create a new paragraph */
            const paragraph = document.createElement('div');
            paragraph.className = 'paragraph';

            /* Get container and markdown check box */
            const containers = document.querySelector(".container");
            const markdownCheckbox = popup.querySelector(".opt-mkd input[type=\"checkbox\"]");

            /* Get first paragraph of the container and insert a new paragraph before it */
            const firstChild = containers.firstChild;
            containers.insertBefore(paragraph, firstChild);

            /* Get header and main */
            const headerText = document.getElementById('header').value;
            const mainText = document.getElementById('main').value;

            /* Create header element and main element */
            const header = document.createElement('h2');
            header.textContent = headerText;

            const main = document.createElement('div');
            main.className = 'text';
            
            /* If markdown check box is checked, use a Markdown parser liked marked.js
               Else, just be a plain text */
            if (markdownCheckbox.checked) {main.innerHTML = marked.parse(mainText); }
            else {
                const text = document.createElement("p");
                text.innerText = mainText;
                main.appendChild(text);
            };

            /* Attach header element and main element to the paragraph */
            paragraph.appendChild(header);
            paragraph.appendChild(main);
            
            /* Remove popup */
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
            
            /* Add delete button: When user want to delete it, just click the button */
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete';
            deleteBtn.textContent = '-';
            paragraph.appendChild(deleteBtn);

            /* When user clicked the button */
            deleteBtn.addEventListener('click', () => {
                /* Remove paragraph */
                paragraph.remove();
            });
        });
    });

    /* Sort button */
    const container = document.querySelector('.container');
    const sortButton = document.querySelector('.sort');
    let sort = undefined;
    document.body.appendChild(sortButton);
    /* When clicked */
    sortButton.addEventListener('click', () => {
        if (!sort) {
            sort = new Sortable(container, { animation: 150 });
            sortButton.textContent = 'Complete';
        } else {
            sort.destroy();
            sort = undefined;
            sortButton.textContent = 'Sort';
        };
    });
});
