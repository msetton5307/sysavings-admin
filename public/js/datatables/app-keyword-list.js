$(function () {
  ('use strict');
  var dtUserTable = $('.deal-list-table'),
    select = $('.select2'),
    statusObj = {
      'Active': { title: 'Active', class: 'badge-light-success' },
      'Inactive': { title: 'Inactive', class: 'badge-light-secondary' }
    };

  select.each(function () {
    var $this = $(this);
    $this.wrap('<div class="position-relative"></div>');
    $this.select2({
      // the following code is used to disable x-scrollbar when click in select input and
      // take 100% width in responsive also
      dropdownAutoWidth: true,
      width: '100%',
      dropdownParent: $this.parent()
    });
  });

  // Users List datatable
  if (dtUserTable.length) {
    dtUserTable.on('preXhr.dt', function (e, settings, data) {
      $('#loader').css("display", "");
    }).on('draw.dt', function () {
      $('#loader').css("display", "none");
    }).DataTable({
      processing: true,
      paging: true,
      sorting: true,
      serverSide: true,
      ajax: {
        url: `${window.location.protocol}//${window.location.host}/keyword/getall`,
        method: 'post',
        dataFilter: function (data) {
          var json = JSON.parse(data);
          json.recordsTotal = json.data.recordsTotal;
          json.recordsFiltered = json.data.recordsFiltered;
          json.data = json.data.data;
          return JSON.stringify(json);
        }
      },
      // ajax: assetPath + 'data/user-list.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'keyword' },
        { data: 'category' },
        { data: 'status' },
        { data: '' },
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          orderable: false,
          searchable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // User full name and username
          targets: 1,
          orderable:true,
          sortable:true,
          responsivePriority: 4,
          render: function (datas, type, full, meta) {

            return full['keyword']

          }
        },
        {
          targets: 2,
          sortable: false,
          render: function (data, type, full, meta) {
              return full['category']
          }
      },
        {
          // User Status
          targets: 3,
          orderable: false,
          searchable: true,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            return (
              '<span class="badge rounded-pill keywordStatusUpdate cursor-pointer ' +
              statusObj[$status].class +
              '" text-capitalized data-status="' + $status + '" data-id="' + full['_id'] + '">' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // CMS Content
          targets: -1,
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="btn-group">' +
              '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
              feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
              '</a>' +
              '<div class="dropdown-menu dropdown-menu-end">' +
              
              '<a href="' + window.location.protocol + '//' + window.location.host + '/keyword/edit/' + full["_id"] + '" class="dropdown-item delete-record deleteFAQ">' +
              feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
              'Edit</a>' +
              '<a href="javascript:;" id="del-' + full["_id"] + '" class="dropdown-item delete-record deleteFAQ">' +
              feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
              'Delete</a></div>' +
              '</div>' +
              '</div>'
            );
          }
        },
      ],
      order: [],
      dom:
        '<"d-flex justify-content-between align-items-center header-actions mx-2 row mt-75"' +
        '<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start" l>' +
        '<"col-sm-12 col-lg-8 ps-xl-75 ps-0"<"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap"<"me-1"f>B>>' +
        '>t' +
        '<"d-flex justify-content-between mx-2 row mb-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: 'Search',
        searchPlaceholder: 'Search..',
        "processing": 'Loading...',
        "loadingRecords": "Please wait - loading...",
        "zeroRecords": "No records to display",
        "emptyTable": "No data is currently available",
        paginate: {
          // remove previous & next text from pagination
          // previous: '&nbsp;',
          // next: '&nbsp;'
        }
      },
      // Buttons with Dropdown
      buttons: [
        // Add New Button
        {
          text: 'Add Keyword',
          className: 'add-new btn btn-primary',
          init: function (api, node, config) {
            $(node).removeClass('btn-secondary');
          }
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['keyword'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.columnIndex !== 6 // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIdx +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                '<td>' +
                col.title +
                ':' +
                '</td> ' +
                '<td>' +
                col.data +
                '</td>' +
                '</tr>'
                : '';
            }).join('');
            return data ? $('<table class="table"/>').append('<tbody>' + data + '</tbody>') : false;
          }
        }
      },
      initComplete: function () {
        // Adding status filter once table initialized
        this.api()
          .columns(3)
          .every(function () {
            let column = this;
            $('#KeywordStatusDropdown').select2();
            $('#KeywordStatusDropdown').ready(function () {
              let val = $.fn.dataTable.util.escapeRegex($('#DealStatusDropdown').val());
              column.search(val ? val : '', false, false).draw();
            });
            $('#KeywordStatusDropdown').on('change', function () {
              let val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? val : '', false, false).draw();
            });
          });

      }
    });
  }

  $(document).on('click', '.add-new', function () {
    window.location.href = `${window.location.protocol}//${window.location.host}/keyword/add`;
  });

  // $(document).on('click', '.edit-faq-modal', function () {
  //   let elemID = $(this).data('id').replace('edit-', '');
  //   let question = $(this).data('question');
  //   let answer = $(this).data('answer');

  //   $('#faq-edit-question').val(question);
  //   $('#faq-edit-answer').val(answer);
  //   $('#faq-edit-id').val(elemID);
  // });

  $(document).on('click', '.deleteFAQ', function () {
    var elemID = $(this).attr('id').replace('del-', '');
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${location.protocol}//${window.location.host}/keyword/delete/${elemID}`;
      }
    });
  });

  $(document).on('click', '.keywordStatusUpdate', function () {
    var elemID = $(this).data('id');
    swal.fire({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${window.location.protocol}//${window.location.host}/keyword/status-change/${elemID}`;
      }
    });
  });

});