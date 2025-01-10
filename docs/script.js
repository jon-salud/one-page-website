document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('myButton');
  const output = document.getElementById('output');

  if (button) {
    button.addEventListener('click', () => {
      output.textContent = 'Button clicked! Welcome to my one-page website!';
    });
  }

  // Sample data for search
  const searchData = [
    'test',
    'testing',
    'tester',
    'template',
    'temporary',
    'attempt',
    'contest',
    'detest',
    'protest',
    'context',
  ];

  let selectedIndex = -1;

  // Search field with delayed dropdown
  $('#searchField').on('input', function () {
    let query = $(this).val().toLowerCase();
    if (query.length > 1) {
      setTimeout(function () {
        let results = searchData.filter((item) => item.includes(query));
        if (results.length > 0) {
          $('#searchResults')
            .html(
              results
                .map(
                  (item, index) =>
                    `<p class="search-item" data-index="${index}">${item}</p>`,
                )
                .join(''),
            )
            .show();
          selectedIndex = -1;
        } else {
          $('#searchResults').html('<p>No results found</p>').show();
        }
      }, 500);
    } else {
      $('#searchResults').hide();
    }
  });

  // Handle keyboard navigation
  $('#searchField').on('keydown', function (e) {
    let items = $('#searchResults .search-item');
    if (items.length > 0) {
      if (e.key === 'ArrowDown') {
        selectedIndex = (selectedIndex + 1) % items.length;
        items.removeClass('selected');
        $(items[selectedIndex]).addClass('selected');
      } else if (e.key === 'ArrowUp') {
        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
        items.removeClass('selected');
        $(items[selectedIndex]).addClass('selected');
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0) {
          $('#searchField').val($(items[selectedIndex]).text());
          $('#searchResults').hide();
        }
      }
    }
  });

  // Handle mouse click selection
  $(document).on('click', '.search-item', function () {
    $('#searchField').val($(this).text());
    $('#searchResults').hide();
  });

  // Handle tab out action
  $('#searchField').on('blur', function () {
    let items = $('#searchResults .search-item');
    if (items.length > 0) {
      if (selectedIndex === -1) {
        selectedIndex = 0;
      }
      $('#searchField').val($(items[selectedIndex]).text());
      $('#searchResults').hide();
    }
  });

  // Calendar field
  flatpickr('#calendarField', {});

  // Date and time fields
  flatpickr('#dateField', { dateFormat: 'Y-m-d' });
  flatpickr('#timeField', {
    enableTime: true,
    noCalendar: true,
    dateFormat: 'H:i',
  });

  // Login modal
  $('#loginButton').on('click', function () {
    let username = $('#username').val();
    let password = $('#password').val();
    if (username === '' || password === '') {
      $('#modalMessage').text('Invalid username or password');
      $('#loginModal').show();
    }
  });
  $('.close').on('click', function () {
    $('#loginModal').hide();
  });

  // Ensure dataRows is defined
  if (!window.dataRows) {
    console.error('dataRows is not defined');
    return;
  }

  // Sample data for table
  let data = window.dataRows || [];
  let currentPage = 1;
  let rowsPerPage = 10;

  function calculateAge(dob) {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function renderTable(page) {
    if (!Array.isArray(data)) {
      console.error('Data is not an array:', data); // Debugging step
      return;
    }

    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let rows = data.slice(start, end);
    let tbody = $('#dataTable tbody');
    tbody.empty();
    rows.forEach((row) => {
      tbody.append(
        `<tr>
          <td style="display: none;">${row.id}</td>
          <td>${row.name}</td>
          <td contenteditable="true" class="dob">${row.dob}</td>
          <td class="age">${calculateAge(row.dob)}</td>
          <td contenteditable="true" class="comment">${row.comment}</td>
        </tr>`
      );
    });
  }

  $('#prevPage').on('click', function () {
    if (currentPage > 1) {
      currentPage--;
      renderTable(currentPage);
    }
  });

  $('#nextPage').on('click', function () {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      currentPage++;
      renderTable(currentPage);
    }
  });

  $('#dataTable').on('blur input', '.dob', function () {
    const row = $(this).closest('tr');
    const dob = $(this).text();
    const ageCell = row.find('.age');
    ageCell.text(calculateAge(dob));
    const rowIndex = row.index() + (currentPage - 1) * rowsPerPage;
    data[rowIndex].dob = dob;
  });

  $('#dataTable').on('input', '.comment', function () {
    const rowIndex = $(this).closest('tr').index() + (currentPage - 1) * rowsPerPage;
    data[rowIndex].comment = $(this).text();
  });

  $('#saveChanges').on('click', function () {
    // Trigger the blur and input events on all .dob elements
    $('#dataTable .dob').trigger('blur');
    $('#dataTable .dob').trigger('input');
    
    alert('Changes saved!');
  });

  $('#refreshTable').on('click', function () {
    data = window.dataRows.map(row => ({ ...row }));
    currentPage = 1; // Reset to the first page
    renderTable(currentPage);
  });

  renderTable(currentPage);

  // Dropdown menu
  const dropdownMenu = document.getElementById('dropdownMenu');
  if (dropdownMenu) {
    dropdownMenu.addEventListener('change', (event) => {
      alert(`You selected: ${event.target.value}`);
    });
  }

  // Tooltip
  const tooltipText = document.getElementById('tooltipText');
  if (tooltipText) {
    tooltipText.addEventListener('mouseover', () => {
      tooltipText.setAttribute('title', 'This is a tooltip!');
    });
  }

  // Accordion
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
      header.classList.toggle('active');
    });
  });

  // Tabs
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tabContents.forEach((c) => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Progress bar
  const startProgress = document.getElementById('startProgress');
  const progress = document.getElementById('progress');
  if (startProgress) {
    startProgress.addEventListener('click', () => {
      let width = 0;
      const interval = setInterval(() => {
        if (width >= 100) {
          clearInterval(interval);
        } else {
          width++;
          progress.style.width = width + '%';
        }
      }, 100);
    });
  }

  // Notification toasts
  const showNotification = document.getElementById('showNotification');
  const notificationToast = document.getElementById('notificationToast');
  if (showNotification && notificationToast) {
    showNotification.addEventListener('click', () => {
      notificationToast.style.display = 'block';
      notificationToast.style.backgroundColor = '#808080'; // Ensure background color is set to grey
      notificationToast.style.color = 'white'; // Ensure text color is set
      setTimeout(() => {
        notificationToast.style.display = 'none';
      }, 3000);
    });
  }

  // File upload
  const fileUpload = document.getElementById('fileUpload');
  if (fileUpload) {
    fileUpload.addEventListener('change', (event) => {
      alert(`File uploaded: ${event.target.files[0].name}`);
    });
  }

  // Autocomplete
  const autocompleteInput = document.getElementById('autocompleteInput');
  const autocompleteResults = document.getElementById('autocompleteResults');
  const autocompleteData = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'kiwi'];
  if (autocompleteInput) {
    autocompleteInput.addEventListener('input', () => {
      const query = autocompleteInput.value.toLowerCase();
      const results = autocompleteData.filter((item) => item.includes(query));
      autocompleteResults.innerHTML = results.map((item) => `<p>${item}</p>`).join('');
    });
  }

  // Drag and drop
  const dragDropList = document.getElementById('dragDropList');
  let draggedItem = null;
  if (dragDropList) {
    dragDropList.addEventListener('dragstart', (event) => {
      draggedItem = event.target;
      setTimeout(() => {
        event.target.style.display = 'none';
      }, 0);
    });
    dragDropList.addEventListener('dragend', () => {
      setTimeout(() => {
        draggedItem.style.display = 'block';
        draggedItem = null;
      }, 0);
    });
    dragDropList.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
    dragDropList.addEventListener('dragenter', (event) => {
      if (event.target.tagName === 'LI') {
        event.target.style.border = '1px dashed #000';
      }
    });
    dragDropList.addEventListener('dragleave', (event) => {
      if (event.target.tagName === 'LI') {
        event.target.style.border = '1px solid #ddd';
      }
    });
    dragDropList.addEventListener('drop', (event) => {
      event.preventDefault();
      if (event.target.tagName === 'LI') {
        event.target.style.border = '1px solid #ddd';
        dragDropList.insertBefore(draggedItem, event.target.nextSibling);
      }
    });
  }

  // Date range picker
  flatpickr('#dateRangePicker', {
    mode: 'range',
    dateFormat: 'Y-m-d',
  });

  // Rating system
  const stars = document.querySelectorAll('.star');
  stars.forEach((star) => {
    star.addEventListener('click', () => {
      stars.forEach((s) => s.classList.remove('selected'));
      star.classList.add('selected');
      alert(`You rated: ${star.dataset.value} stars`);
    });
  });

  // Search filter
  const searchFilterInput = document.getElementById('searchFilterInput');
  const searchFilterList = document.getElementById('searchFilterList');
  if (searchFilterInput) {
    searchFilterInput.addEventListener('input', () => {
      const query = searchFilterInput.value.toLowerCase();
      const items = searchFilterList.querySelectorAll('li');
      items.forEach((item) => {
        item.style.display = item.textContent.toLowerCase().includes(query) ? 'block' : 'none';
      });
    });
  }
});
