# herokuapp-selenium-tests

This project contains automated Selenium tests for the website [https://the-internet.herokuapp.com](https://the-internet.herokuapp.com). The tests are organized into separate files based on different functionalities of the website, including login, checkboxes, and dropdowns.

## Project Structure

```
herokuapp-selenium-tests
├── src
│   └── pages
│       ├── loginPage.js
│       ├── checkboxPage.js
│       ├── dropdownPage.js
│       ├── ... (other page files)
├── tests
│   ├── login.test.js
│   ├── checkbox.test.js
│   ├── dropdown.test.js
│   ├── ... (other test files)
├── data
│   ├── credentials.json
│   └── credentials.csv
├── package.json
├── .gitignore
└── README.md
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd herokuapp-selenium-tests
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then run:
   ```
   npm install
   ```

3. **Run the tests**:
   You can run the tests using Mocha:
   ```
   npx mocha tests/*.test.js
   ```

## Usage

- Each test file contains separate functions for different test cases.
- Each function includes a static wait of 5 seconds after performing operations for manual verification.
- The page files contain classes with methods to interact with the respective elements on the website.
- Test data (such as credentials) is stored in the `data` directory.

## Contributing

Feel free to contribute by adding more tests or improving existing ones. Make sure to follow the project structure for consistency.

## License

This project is licensed under the MIT License.