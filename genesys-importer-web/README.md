# Quagg's Genesys x Questline VTT Importer

This project is a web application that allows users to upload a Genesys JSON file and download the converted Questline VTT format JSON file. The application is designed to be simple and user-friendly, featuring an upload button for selecting the JSON file and a download button for the generated output.

## Features

- Upload a Genesys JSON file.
- Download the converted Questline VTT format JSON file.

## Project Structure

```
genesys-importer-web
├── src
│   ├── js
│   │   ├── app.js          # Main JavaScript logic for UI interactions
│   │   └── importer.js     # Logic for processing the uploaded JSON file
│   ├── css
│   │   └── styles.css      # Styles for the web application
├── index.html              # Main HTML file for the web application
├── package.json            # Configuration file for npm
└── README.md               # Documentation for the project
```

## Setup Instructions

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the necessary dependencies using npm:
   ```
   npm install
   ```
4. Open `index.html` in your web browser to run the application.

## Usage

1. Click the "Upload" button to select a Genesys JSON file from your computer.
2. After the file is uploaded, click the "Download" button to get the converted Questline VTT format JSON file.

## License

This project is licensed under the MIT License.