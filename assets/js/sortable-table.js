(function () {
  'use strict';

  function toArray(list) {
    return Array.prototype.slice.call(list || []);
  }

  function parseValue(value, type) {
    if (type === 'number') {
      var numeric = Number(String(value).replace(/[^0-9.+-]/g, ''));
      return isFinite(numeric) ? numeric : NaN;
    }
    return String(value || '').toLowerCase();
  }

  function getCellText(row, index) {
    var cell = row.cells[index];
    return cell ? (cell.textContent || cell.innerText || '').trim() : '';
  }

  function compareFactory(index, direction, type) {
    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    return function (rowA, rowB) {
      var valueA = getCellText(rowA, index);
      var valueB = getCellText(rowB, index);

      if (type === 'number') {
        var numberA = parseValue(valueA, 'number');
        var numberB = parseValue(valueB, 'number');
        if (!isNaN(numberA) && !isNaN(numberB)) {
          return direction === 'asc' ? numberA - numberB : numberB - numberA;
        }
      }

      var comparison = collator.compare(valueA, valueB);
      return direction === 'asc' ? comparison : -comparison;
    };
  }

  function bindTable(table) {
    if (!table || !table.tBodies || !table.tBodies[0]) {
      return;
    }

    var headers = toArray(table.querySelectorAll('thead th'));
    var body = table.tBodies[0];

    headers.forEach(function (header, index) {
      if (header.getAttribute('data-sort-disabled') === 'true') {
        return;
      }

      header.setAttribute('data-sortable', 'true');
      header.setAttribute('tabindex', '0');
      header.setAttribute('role', 'button');

      function toggleSort() {
        var direction = header.getAttribute('data-sort-direction') === 'asc' ? 'desc' : 'asc';
        headers.forEach(function (otherHeader) {
          otherHeader.removeAttribute('data-sort-direction');
        });
        header.setAttribute('data-sort-direction', direction);

        var rows = toArray(body.rows).sort(
          compareFactory(index, direction, header.getAttribute('data-sort-type'))
        );
        rows.forEach(function (row) {
          body.appendChild(row);
        });
      }

      header.addEventListener('click', toggleSort);
      header.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleSort();
        }
      });
    });
  }

  function init() {
    toArray(document.querySelectorAll('[data-sortable-table]')).forEach(bindTable);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
