# Ghost Publication Directory Table

A lightweight, shareable sortable table for listing Ghost publications. The markup, styles, and
JavaScript are framework-free, making it easy to drop into a Ghost custom HTML card, portal page,
or reusable snippet.

## Features
- Accessible, keyboard-friendly column sorting with numeric support
- Minimal, theme-agnostic styling that you can override in your theme
- Drop-in HTML snippet ready for Ghost's editor or site-wide code injection

## Repo structure
- `index.html` — demo page that showcases the table and sample rows
- `assets/css/directory-table.css` — scoped styles for the table wrapper and headers
- `assets/js/sortable-table.js` — dependency-free sorter that binds to tables marked with `data-sortable-table`

## Quick start
1. Clone or download this directory.
2. Open `index.html` in your browser to see the table in action.
3. Replace the sample `<tbody>` rows with your own publication data.

## Using inside Ghost
### Option 1: Custom HTML card (per page)
1. In the Ghost editor, add a **HTML** card.
2. Paste the snippet below, replacing the sample rows with your own.
3. Publish/update the post.

```html
<style>
.directory-table-wrap{width:100%;max-width:960px;margin:0 auto 24px;overflow-x:auto}
.directory-table{border-collapse:collapse;width:100%;min-width:320px;background:#fff;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:1.4}
.directory-table caption{text-align:left;font-weight:600;font-size:16px;margin-bottom:12px}
.directory-table th,.directory-table td{border:1px solid #d0d0d0;padding:8px 10px;text-align:left;vertical-align:top;background:#fff}
.directory-table th{background:#f6f6f6;font-weight:600}
.directory-table a{color:inherit;text-decoration:underline}
.directory-table a:hover,.directory-table a:focus{text-decoration:none}
.directory-table [data-sortable]{cursor:pointer;position:relative;user-select:none}
.directory-table [data-sortable]::after{content:'';display:inline-block;border:5px solid transparent;border-top-color:#888;margin-left:6px;opacity:0;transform:translateY(2px)}
.directory-table [data-sort-direction=asc]::after,.directory-table [data-sort-direction=desc]::after{opacity:1}
.directory-table [data-sort-direction=desc]::after{transform:rotate(180deg) translateY(-2px)}
.directory-table tbody tr:nth-child(even) td{background:#fafafa}
@media (max-width:640px){.directory-table th,.directory-table td{padding:6px 8px;font-size:13px}}
</style>
<div class="directory-table-wrap">
  <table class="directory-table" data-sortable-table>
    <thead>
      <tr>
        <th scope="col" data-sort-type="number">Year</th>
        <th scope="col">Publication</th>
        <th scope="col">Focus</th>
        <th scope="col">Link</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>2024</td>
        <td>Starter Weekly</td>
        <td>Newsletters</td>
        <td><a href="https://example.com/starter-weekly" rel="noopener">View publication</a></td>
      </tr>
      <tr>
        <td>2022</td>
        <td>Creator Stories</td>
        <td>Case Studies</td>
        <td><a href="https://example.com/creator-stories" rel="noopener">View publication</a></td>
      </tr>
    </tbody>
  </table>
</div>
<script>
(function(){
  'use strict';
  function toArray(list){ return Array.prototype.slice.call(list || []); }
  function getCellText(row, index){
    var cell = row.cells[index];
    return cell ? (cell.textContent || cell.innerText || '').trim() : '';
  }
  function parseNumber(value){
    var number = Number(String(value).replace(/[^0-9.+-]/g, ''));
    return isFinite(number) ? number : NaN;
  }
  function compareFactory(index, direction, type){
    var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });
    return function(rowA, rowB){
      var valueA = getCellText(rowA, index);
      var valueB = getCellText(rowB, index);
      if (type === 'number'){
        var numberA = parseNumber(valueA);
        var numberB = parseNumber(valueB);
        if (!isNaN(numberA) && !isNaN(numberB)){
          return direction === 'asc' ? numberA - numberB : numberB - numberA;
        }
      }
      var comparison = collator.compare(valueA, valueB);
      return direction === 'asc' ? comparison : -comparison;
    };
  }
  function bindTable(table){
    if (!table || !table.tBodies || !table.tBodies[0]) return;
    var headers = toArray(table.querySelectorAll('thead th'));
    var body = table.tBodies[0];
    headers.forEach(function(header, index){
      if (header.getAttribute('data-sort-disabled') === 'true') return;
      header.setAttribute('data-sortable', 'true');
      header.setAttribute('tabindex', '0');
      header.setAttribute('role', 'button');
      function toggleSort(){
        var direction = header.getAttribute('data-sort-direction') === 'asc' ? 'desc' : 'asc';
        headers.forEach(function(other){ other.removeAttribute('data-sort-direction'); });
        header.setAttribute('data-sort-direction', direction);
        var rows = toArray(body.rows).sort(compareFactory(index, direction, header.getAttribute('data-sort-type')));
        rows.forEach(function(row){ body.appendChild(row); });
      }
      header.addEventListener('click', toggleSort);
      header.addEventListener('keydown', function(event){
        if (event.key === 'Enter' || event.key === ' '){
          event.preventDefault();
          toggleSort();
        }
      });
    });
  }
  function init(){
    toArray(document.querySelectorAll('[data-sortable-table]')).forEach(bindTable);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
</script>
```

### Option 2: Site-wide code injection
1. Add the CSS block to **Settings → Code injection → Site header**.
2. Add the script to **Site footer**.
3. Wherever you want the directory, insert the HTML table (without repeating the style/script blocks).

## Customisation tips
- Use `data-sort-type="number"` on headers that contain numeric values (years, counts, etc.).
- Add `data-sort-disabled="true"` to any header that should stay unsortable.
- Override the default look by adding your own CSS targeting `.directory-table` in your Ghost theme.

## License
Released under the MIT License. See `LICENSE` if you plan to share or fork.
