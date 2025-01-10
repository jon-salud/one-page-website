# One Page Website

This project is a simple one-page website designed to test various UI behaviors for demoing UI Functional automation using Playwright. It includes elements such as search fields with delayed dropdowns, calendar fields, login fields with modal notifications, date and time fields, and a paginated table.

## Project Structure

```plaintext
one-page-website
├── src
│   ├── index.html      # Main HTML document
│   ├── styles.css      # CSS styles for the website
│   └── script.js       # JavaScript code for interactivity
├── docs                # Build output for deployment
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── data
│       └── data.js
├── .github
│   └── workflows
│       └── ci.yml      # GitHub Actions CI configuration
├── package.json        # npm configuration file
└── README.md           # Project documentation
```

## Features

- **Search Field**: Key in your search criteria (e.g., "test") then select via mouse click or arrow keys and tab out.
- **Calendar Field**: Click on the input field to select a date from the calendar.
- **Login Field**: Enter the username "userone" and the password "pwordone". Any other values will raise an error modal notification.
- **Date and Time Fields**: Click on the input fields to select a date and time.
- **Paginated Table**: Use the "Previous" and "Next" buttons to navigate through the table pages.
- **Dropdown Menu**
- **Tooltip**
- **Accordion**
- **Tabs**
- **Progress Bar**
- **Notification Toasts**
- **File Upload**
- **Autocomplete**
- **Drag and Drop**
- **Date Range Picker**
- **Rating System**
- **Search Filter**

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/jonsalud/one-page-website.git
   cd one-page-website
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Project Locally

1. Open the `index.html` file in your browser:

   ```sh
   open src/index.html
   ```

### Linting

To check the code for coding standards and potential issues, run:

```sh
npm run lint
```

### Building the Project

To build the project for deployment, run:

```sh
npm run build
```

This will create a `docs` folder with the necessary files for deployment.

### Deployment

The project is set up to deploy to GitHub Pages using GitHub Actions. The deployment workflow is defined in `.github/workflows/ci.yml`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
