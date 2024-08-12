document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const addTabButton = document.querySelector('.add-tab');
    let tabCount = tabs.length - 1; // Initial number of tabs minus the add button

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setActiveTab(tab);
        });
    });

    addTabButton.addEventListener('click', () => {
        const newTab = document.createElement('button');
        newTab.className = 'tab';
        newTab.textContent = `Title${++tabCount}`;
        document.querySelector('.tabs').insertBefore(newTab, addTabButton);
        newTab.addEventListener('click', () => {
            setActiveTab(newTab);
        });
    });

    function setActiveTab(selectedTab) {
        tabs.forEach(tab => tab.classList.remove('active'));
        selectedTab.classList.add('active');
        document.querySelector('.content-textarea').value = `This content page belongs to ${selectedTab.textContent}.`;
    }

    const addFolderButton = document.querySelector('.add-folder');
    const folderList = document.querySelector('.folder-list');

    addFolderButton.addEventListener('click', () => {
        const folderName = prompt('Enter folder name:');
        if (folderName) {
            const newFolder = createFolder(folderName);
            folderList.appendChild(newFolder);
        }
    });

    function createFolder(name) {
        const folder = document.createElement('li');
        folder.className = 'folder';
        folder.innerHTML = `
            <img src="folder-icon.png" alt="Folder" class="icon">
            <span>${name}</span>
            <button class="add-subfolder">+</button>
            <button class="add-file">Add File</button>
            <ul class="sub-folder-list"></ul>
        `;
        const addSubfolderButton = folder.querySelector('.add-subfolder');
        addSubfolderButton.addEventListener('click', () => {
            const subfolderName = prompt('Enter sub-folder name:');
            if (subfolderName) {
                const subfolder = createFolder(subfolderName);
                folder.querySelector('.sub-folder-list').appendChild(subfolder);
            }
        });

        const addFileButton = folder.querySelector('.add-file');
        addFileButton.addEventListener('click', () => {
            const fileName = prompt('Enter file name:');
            if (fileName) {
                const file = createFile(fileName);
                folder.querySelector('.sub-folder-list').appendChild(file);
            }
        });

        folder.addEventListener('click', (event) => {
            event.stopPropagation();
            if (folder.classList.contains('expanded')) {
                folder.classList.remove('expanded');
            } else {
                folder.classList.add('expanded');
            }
        });

        return folder;
    }

    function createFile(name) {
        const file = document.createElement('li');
        file.className = 'file';
        file.innerHTML = `
            <img src="file-icon.png" alt="File" class="icon">
            <span>${name}</span>
        `;
        file.addEventListener('click', (event) => {
            event.stopPropagation();
            document.querySelector('.content-textarea').value = `Editing content of ${name}.`;
        });
        return file;
    }

    // Formatting tools event listeners
    const fontSelect = document.querySelector('.font-select');
    const fontSizeSelect = document.querySelector('.font-size');
    const fontColorInput = document.querySelector('.font-color');
    const boldButton = document.querySelector('.bold');
    const italicButton = document.querySelector('.italic');
    const underlineButton = document.querySelector('.underline');
    const contentTextarea = document.querySelector('.content-textarea');

    fontSelect.addEventListener('change', () => {
        contentTextarea.style.fontFamily = fontSelect.value;
    });

    fontSizeSelect.addEventListener('change', () => {
        contentTextarea.style.fontSize = fontSizeSelect.value;
    });

    fontColorInput.addEventListener('change', () => {
        contentTextarea.style.color = fontColorInput.value;
    });

    boldButton.addEventListener('click', () => {
        toggleStyle('fontWeight', 'bold', 'normal');
    });

    italicButton.addEventListener('click', () => {
        toggleStyle('fontStyle', 'italic', 'normal');
    });

    underlineButton.addEventListener('click', () => {
        toggleStyle('textDecoration', 'underline', 'none');
    });

    function toggleStyle(style, value1, value2) {
        if (contentTextarea.style[style] === value1) {
            contentTextarea.style[style] = value2;
        } else {
            contentTextarea.style[style] = value1;
        }
    }
});
