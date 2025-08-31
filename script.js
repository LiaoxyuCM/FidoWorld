/* FDW Scripts */

document.addEventListener('DOMContentLoaded', () => {
    /* sdfsdfsdfdsdfdsdfsdf */
    const sdfRestaurant = new Date();
    if (sdfRestaurant.getMonth() === 3 & sdfRestaurant.getDate() === 1) /* It's March 1st, not AprilFool's Day :) */ {
        document.body.innerHTML = `
            <div id="title">
                <h1>FidoWorld</h1>
                <h4>Unfortunately, we suspended our service because of an error.</h4>
                <h4>We need suggetions!!!</h4>
                <h5>Error code: 0x59 0x6F 0x75 0x20 0x66 0x6F 0x6F 0x6C 0x21</h5>
            </div>
        `;
    };

    /* Global vars */
    const container = document.querySelector(".container");

    /* When pressed enter */
    if (document.getElementById('search')) {
        document.getElementById('search').addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                /* Get keyword, search filter and every paragraphs */
                const keyword = document.getElementById('search').value.toLowerCase();
                const paragraphs = document.querySelectorAll('.paragraph');
                const searchType = document.getElementById('searchType').value;
                const waysToHideParas = document.getElementById('waysToHideParas').value;

                /* Every paragraphs should run this */
                paragraphs.forEach(paragraph => {
                    /* Get their text content */
                    let text = '';
                    if (searchType === 'header') { text = paragraph.querySelector('h2').textContent.toLowerCase(); }
                    else if (searchType === 'main') { text = paragraph.querySelector('.text').textContent.toLowerCase(); }
                    else { text = paragraph.textContent.toLowerCase(); };
                    
                    
                    paragraph.style.display = 'block';
                    paragraph.style.filter = 'none';
                    /* If text content included it, they will show; else, they will hide. */
                    if (text.includes(keyword)) {
                        paragraph.style.display = 'block';
                        paragraph.style.filter = 'none';
                    }
                    else {
                        if (waysToHideParas === 'bl') {
                            paragraph.style.filter = 'blur(5px)';
                        } else {
                            paragraph.style.display = 'none';
                        };
                    };
                });
            };
        });
    };

    /* When "New paragraph" button is clicked */
    if (document.getElementById('create')) {
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
                    <div class="mkd">
		                <input type="checkbox" name="opt-mkd" checked/>&nbsp;Enable Markdown 
	                    <p class="mkd-sts">&nbsp;Markdown status</p>
                    </div>
                    <div class="HTMLPreview"><input type="checkbox" name="opt-HTMLPreview"/> Enable HTML preview (beta)</div>
                    <div class="havefun"><input type="checkbox" name="opt-havefun"/> Have fun</div>
                </div>
                <button id="submit">Submit</button>
                <button id="close">Close</button><br>
                <p id="popuphint">It always add to first line.<br>To enable HTML preview, you should enable Markdown first</p>
            `;
            document.body.appendChild(popup);

            /* Get options check box */
            let options = [
                popup.querySelector(".opt .mkd input[type=\"checkbox\"]"),
                popup.querySelector(".opt .HTMLPreview input[type=\"checkbox\"]"),
            ];

            let markdown_status_viewer = popup.querySelector('.mkd-sts');
            let markdown_status = true;
            
            markdown_status_viewer.style.margin = "0";

            try {
                marked.parse("**Test**");
            } catch (e) {
                markdown_status = false;
            };
            
            if (markdown_status) {
                markdown_status_viewer.textContent = "Markdown is ready";
                markdown_status_viewer.style.color = "#090";
                options[0].checked = true;
            } else {
                markdown_status_viewer.textContent = "Loading Markdown failed";
                markdown_status_viewer.style.color = "#f00";
                options[0].checked = false;
            };

            /* Close the popup */
            document.getElementById('close').addEventListener('click', () => {
                document.body.removeChild(popup);
                document.querySelector('#create').style.display = 'block';
            });


            document.getElementById('header').addEventListener("input", () => {
                if (document.getElementById('header').value.toLowerCase().includes("never gonna give you up")) {
                    document.getElementById('header').style.fontWeight = "bold";
                } else {
                    document.getElementById('header').style.fontWeight = "normal";
                };
            });

            /* If clicked submit */
            document.getElementById('submit').addEventListener('click', () => {

                /* Create a new paragraph */
                const paragraph = document.createElement('article');
                paragraph.className = 'paragraph';


                /* Get first paragraph of the container and insert a new paragraph before it */
                const firstChild = container.firstChild;
                container.insertBefore(paragraph, firstChild);

                /* Get header and main */
                let headerText = document.getElementById('header').value;
                let mainText = document.getElementById('main').value;

                /* An inmportant func */
                if (headerText.toLowerCase().includes("never gonna give you up") & popup.querySelector(".opt .havefun input[type=\"checkbox\"]")) {
                    window.open("https://www.bilibili.com/video/BV1GJ411x7h7/", "_blank");
                };

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
                            <div class="mkd"><input type="checkbox" name="opt-mkd" ${options[0].checked ? 'checked' : ''}/> Enable Markdown
                            <p class="mkd-sts">&nbsp;Markdown status</p></div>
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
                                preview.textContent = page.innerText;
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
    };

    /* Sort button */
    const sortButton = document.querySelector('.sort');
    let sort = undefined;
    if (sortButton) {
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
    };

    /* Animation Set width */
    setInterval(() => {document.body.style.setProperty('--width', String(window.innerWidth - 298) + 'px')},  10);
});
