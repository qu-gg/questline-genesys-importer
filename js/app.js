document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const convertButton = document.getElementById('convertButton');
    const downloadButton = document.getElementById('downloadButton');
    const status = document.getElementById('status');
    
    let convertedData = null;

    fileInput.addEventListener('change', () => {
        convertButton.disabled = !fileInput.files.length;
        downloadButton.disabled = true;
        status.textContent = '';
    });

    convertButton.addEventListener('click', async () => {
        const file = fileInput.files[0];
        if (!file) return;

        try {
            status.textContent = 'Converting...';
            const fileContent = await file.text();
            const sourceData = JSON.parse(fileContent);
            
            convertedData = await convertGenesysToVTT(sourceData);
            
            downloadButton.disabled = false;
            status.textContent = 'Conversion successful!';
        } catch (error) {
            status.textContent = `Error: ${error.message}`;
            console.error(error);
        }
    });

    downloadButton.addEventListener('click', () => {
        if (!convertedData) return;

        const blob = new Blob([JSON.stringify(convertedData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted.items';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
});