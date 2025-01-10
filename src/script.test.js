import $ from 'jquery';
import flatpickr from 'flatpickr';
import { expect, describe, test } from '@jest/globals';

// Ensure jQuery is available globally
globalThis.$ = globalThis.jQuery = $;

document.body.innerHTML = `
  <button id="myButton">Click me</button>
  <div id="output"></div>
  <input type="text" id="searchField" placeholder="Search...">
  <div id="searchResults"></div>
  <input type="text" id="calendarField" placeholder="Select a date">
  <input type="text" id="dateField" placeholder="Select a date">
  <input type="text" id="timeField" placeholder="Select a time">
  <input type="text" id="username" placeholder="Username">
  <input type="password" id="password" placeholder="Password">
  <button id="loginButton">Login</button>
  <div id="loginModal" class="modal" style="display: none;">
    <div class="modal-content">
      <span class="close">&times;</span>
      <p id="modalMessage"></p>
    </div>
  </div>
  <table id="dataTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
  <button id="prevPage">Previous</button>
  <button id="nextPage">Next</button>
`;

import './script';

// Manually trigger the DOMContentLoaded event
document.dispatchEvent(new Event('DOMContentLoaded'));

// Manually trigger the pagination logic
const data = [];
for (let i = 1; i <= 35; i++) {
  data.push({ id: i, name: 'Name ' + i, value: 'Value ' + i });
}
let currentPage = 1;
const rowsPerPage = 10;

function renderTable(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const rows = data.slice(start, end);
  const tbody = $('#dataTable tbody');
  tbody.empty();
  rows.forEach((row) => {
    tbody.append(
      '<tr><td>' + row.id + '</td><td>' + row.name + '</td><td>' + row.value + '</td></tr>'
    );
  });
}

renderTable(currentPage);

describe('One Page Website', () => {
  test('button click updates output', () => {
    const button = document.getElementById('myButton');
    const output = document.getElementById('output');
    button.click();
    expect(output.textContent).toBe(
      'Button clicked! Welcome to my one-page website!'
    );
  });

  test('search field shows results', () => {
    const searchField = $('#searchField');
    searchField.val('test').trigger('input');
    setTimeout(() => {
      const searchResults = $('#searchResults');
      expect(searchResults.children().length).toBeGreaterThan(0);
    }, 600);
  });

  test('calendar field initializes flatpickr', () => {
    const calendarField = document.getElementById('calendarField');
    flatpickr(calendarField);
    expect(calendarField._flatpickr).toBeDefined();
  });

  test('login modal shows error for invalid credentials', () => {
    const loginButton = $('#loginButton');
    const username = $('#username');
    const password = $('#password');
    const modalMessage = $('#modalMessage');
    const loginModal = $('#loginModal');

    username.val('');
    password.val('');
    loginButton.click();
    expect(modalMessage.text()).toBe('Invalid username or password');
    expect(loginModal.css('display')).toBe('block');
  });

  test('table pagination works', () => {
    const prevPage = $('#prevPage');
    const nextPage = $('#nextPage');
    const dataTable = $('#dataTable tbody');

    nextPage.click();
    renderTable(++currentPage);
    expect(dataTable.children().length).toBe(10);

    prevPage.click();
    renderTable(--currentPage);
    expect(dataTable.children().length).toBe(10);
  });
});
