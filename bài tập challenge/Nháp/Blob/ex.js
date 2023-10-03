document.addEventListener("DOMContentLoaded", function() {
    const showMenuButton = document.getElementById("show-menu");
    
    showMenuButton.addEventListener("click", function(event) {
        const menuOptions = {
            "Tạo mới văn bản": function() {
                // Xóa toàn bộ dữ liệu văn bản
                const text = "";
                const blob = new Blob([text], { type: "text/plain" });
                saveBlobAsFile(blob, "new_document.txt");
            },
            "Tải tập tin văn bản về dưới dạng TXT": function() {
                // Tạo Blob từ nội dung văn bản hiện tại
                const text = "Nội dung văn bản hiện tại.";
                const blob = new Blob([text], { type: "text/plain" });
                saveBlobAsFile(blob, "document.txt");
            },
            "Tải tập tin văn bản về dưới dạng PDF": function() {
                // Tạo Blob và tải về dưới dạng PDF
                const text = "Nội dung văn bản hiện tại.";
                const docDefinition = {
                    content: [
                        { text: text, fontSize: 14 }
                    ]
                };
                pdfMake.createPdf(docDefinition).getBlob((blob) => {
                    saveBlobAsFile(blob, "document.pdf");
                });
            }
        };

        const menu = createContextMenu(menuOptions);
        showContextMenu(event.clientX, event.clientY, menu);
    });

    function createContextMenu(options) {
        const menu = document.createElement("div");
        menu.classList.add("context-menu");
        
        for (const optionName in options) {
            const menuItem = document.createElement("div");
            menuItem.classList.add("context-menu-item");
            menuItem.textContent = optionName;
            menuItem.addEventListener("click", options[optionName]);
            menu.appendChild(menuItem);
        }
        
        return menu;
    }

    function showContextMenu(x, y, menu) {
        menu.style.left = x + "px";
        menu.style.top = y + "px";
        menu.style.display = "block";
        document.body.appendChild(menu);
        document.addEventListener("click", hideContextMenu);
    }

    function hideContextMenu() {
        const contextMenu = document.querySelector(".context-menu");
        if (contextMenu) {
            contextMenu.remove();
            document.removeEventListener("click", hideContextMenu);
        }
    }

    function saveBlobAsFile(blob, fileName) {
        saveAs(blob, fileName);
    }
});
