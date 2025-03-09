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
            <div class="opt">
                <div class="mkd"><input type="checkbox" name="opt-mkd" checked/> Enable Markdown</div>
                <div class="HTMLPreview"><input type="checkbox" name="opt-HTMLPreview"/> Enable HTML preview (beta)</div>
            </div>
            <button id="submit">Submit</button>
            <button id="close">Close</button><br>
            <p id="popuphint">It always add to first line.<br>To enable HTML preview, you should enable Markdown first</p>
        `;
        document.body.appendChild(popup);

        /* Close the popup */
        document.getElementById('close').addEventListener('click', () => {
            document.body.removeChild(popup);
            document.querySelector('#create').style.display = 'block';
        });

        /* If clicked submit */
        document.getElementById('submit').addEventListener('click', () => {

            /* Create a new paragraph */
            const paragraph = document.createElement('div');
            paragraph.className = 'paragraph';

            /* Get container and options check box */
            const containers = document.querySelector(".container");
            let options = [
                popup.querySelector(".opt .mkd input[type=\"checkbox\"]"),
                popup.querySelector(".opt .HTMLPreview input[type=\"checkbox\"]"),
            ];

            /* Get first paragraph of the container and insert a new paragraph before it */
            const firstChild = containers.firstChild;
            containers.insertBefore(paragraph, firstChild);

            /* Get header and main */
            let headerText = document.getElementById('header').value;
            let mainText = document.getElementById('main').value;

            /* Create header element and main element */
            const header = document.createElement('h2');
            header.textContent = headerText;

            const main = document.createElement('div');
            main.className = 'text';
            
            /* Handle selections */
            if (options[0].checked) {main.innerHTML = marked.parse(mainText); }
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
             
            /* Edit */
            const editBtn = document.createElement('button');
            editBtn.className = 'edit';
            editBtn.textContent = 'Edit';
            paragraph.appendChild(editBtn);

            /* Delete */
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete';
            deleteBtn.textContent = 'Delete';
            paragraph.appendChild(deleteBtn);

            /* If user enabled HTML preview */
            if (options[1].checked) {
                /* HTML preview */
                const htmlPages = paragraph.querySelectorAll('div.text pre code.language-html');
                const htmlPreview = document.createElement('div');
                htmlPreview.className = 'html-preview';
                let cnt = 1;
                document.body.appendChild(htmlPreview);
                htmlPages.forEach(page => {
                    const preview = document.createElement('div');
                    preview.className = 'preview';
                    preview.innerHTML = page.innerText;
                    const previewHint = document.createElement('p');
                    previewHint.className = 'HTMLPreviewHint';
                    previewHint.textContent = `HTMLCodeBlock No. ${cnt} Preview`;
                    paragraph.appendChild(previewHint);
                    paragraph.appendChild(preview);
                    cnt += 1;
                });
            };

            /* Edit paragraph */
            editBtn.addEventListener('click', () => {
                /* Show popup */
                const popup = document.createElement('div');
                popup.className = "popup";
                editBtn.style.display = 'none';
                deleteBtn.style.display = 'none';
                popup.innerHTML = `
                    <h3 id="popupheader">Edit paragraph</h3>
                    <input type="text" id="header" placeholder="Header" value="${headerText}"><br>
                    <textarea id="main" placeholder="Main">${mainText}</textarea><br>
                    <div class="opt">
                        <div class="mkd"><input type="checkbox" name="opt-mkd" ${options[0].checked ? 'checked' : ''}/> Enable Markdown</div>
                        <div class="HTMLPreview"><input type="checkbox" name="opt-HTMLPreview" ${options[1].checked ? 'checked' : ''}/> Enable HTML preview (beta)</div>
                    </div>
                    <button id="submitEdit">Submit</button>
                    <button id="close">Close</button><br>
                    <p id="popuphint">It always add to first line.<br>To enable HTML preview, you should enable Markdown first</p>
                `;
                document.body.appendChild(popup);

                /* Close the popup */
                document.getElementById('close').addEventListener('click', () => {
                    document.body.removeChild(popup);
                    editBtn.style.display = 'block';
                    deleteBtn.style.display = 'block';
                });

                /* If clicked submit */
                document.getElementById('submitEdit').addEventListener('click', () => {
                    /* Update header and main */
                    headerText = document.getElementById('header').value;
                    mainText = document.getElementById('main').value;

                    options = [
                        popup.querySelector(".opt .mkd input[type=\"checkbox\"]"),
                        popup.querySelector(".opt .HTMLPreview input[type=\"checkbox\"]"),
                    ];

                    /* Handle selections */
                    if (options[0].checked) {main.innerHTML = marked.parse(mainText); }
                    else {
                        const text = document.createElement("p");
                        text.innerText = mainText;
                        main.appendChild(text);
                    };

                    /* Attach header element and main element to the paragraph */
                    header.textContent = headerText;
                    editBtn.style.display = 'block';
                    deleteBtn.style.display = 'block';
                    
                    /* Remove the last html preview */
                    const previewHintsWillRemove = paragraph.querySelectorAll('.HTMLPreviewHint');
                    const htmlPreviewsWillRemove = paragraph.querySelectorAll('.preview');
                    htmlPreviewsWillRemove.forEach(preview => {
                        paragraph.removeChild(preview);
                    });
                    previewHintsWillRemove.forEach(previewHint => {
                        paragraph.removeChild(previewHint);
                    });

                    /* If user enabled HTML preview */
                    if (options[1].checked) {
                        /* HTML preview */
                        const htmlPages = paragraph.querySelectorAll('div.text pre code.language-html');
                        const htmlPreview = document.createElement('div');
                        htmlPreview.className = 'preview';
                        let cnt = 1;
                        document.body.appendChild(htmlPreview);
                        htmlPages.forEach(page => {
                            const preview = document.createElement('div');
                            preview.className = 'preview';
                            preview.innerHTML = page.innerText;
                            const previewHint = document.createElement('p');
                            previewHint.className = 'HTMLPreviewHint';
                            previewHint.textContent = `HTMLCodeBlock No. ${cnt} Preview`;
                            paragraph.appendChild(previewHint);
                            paragraph.appendChild(preview);
                            cnt += 1;
                        });
                    };

                    /* Remove popup */
                    document.body.removeChild(popup);
                    document.querySelector('#create').style.display = 'block';
                });
            });


            /* When user clicked the button */
            deleteBtn.addEventListener('click', () => {
                if (confirm('Are you sure?')) {
                    /* Remove paragraph */
                    paragraph.remove();
                };
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
