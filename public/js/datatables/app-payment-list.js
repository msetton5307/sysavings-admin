$(function () {
  ('use strict');
  var dtUserTable = $('.deal-list-table'),
    select = $('.select2'),
    statusObj = {
      'Approved': { title: 'Approved', class: 'badge-light-success' },
      'Rejected': { title: 'Rejected', class: 'overlay-danger' },
      'Pending': { title: 'Pending', class: 'badge-light-secondary' }
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
        url: `${window.location.protocol}//${window.location.host}/deal/getall/approvedeals`,
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
        { data: 'userName' },
        { data: 'deal_title' },
        { data: 'product_link' },
        { data: 'status' },
        // { data: 'userId' },
        { data: '' }
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
          responsivePriority: 3,
          render: function (datas, type, full, meta) {

            return full['userName']

          }
        },

        {
          // User full name and username
          targets: 2,
          responsivePriority: 4,
          render: function (datas, type, full, meta) {

            return full['deal_title']

          }
        },
        // {
        //   // CMS Content
        //   targets: 4,
        //   orderable: true,
        //   searchable: false,
        //   render: function (data, type, full, meta) {

        //     return full['status']
        //   }
        // },
        {
          // CMS Content
          targets: 3,
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            if (full['product_link'].length > 100) {
              return (full['product_link'].substring(0, 50)) + " ...";
            }
            return full['product_link']
          }
        },
        {
          // User Status
          targets: 4,
          orderable: false,
          searchable: true,
          render: function (data, type, full, meta) {
            var $status = full['status'];
            return (
              '<span class="badge rounded-pill dealStatusUpdate cursor-pointer ' +
              statusObj[$status].class +
              '" text-capitalized data-status="' + $status + '" data-id="' + full['_id'] + '">' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // CMS Content
          targets: 5,
          orderable: false,
          searchable: false,
          render: function (data, type, full, meta) {
            var $payment = full["isPaymentDone"];
            if ($payment) {
              return (
                '<div class="pay-now">' +
                '<button class="btn btn-sm btn-primary" style="text-wrap: nowrap; cursor:default; pointer-events:none;">Payment Done</button>' +
                '</div>'
              )
            }
            else {
              return (
                '<div class="btn-group">' +
                '<a href="javascript:;" id="del-' + full["_id"] + '" class="button pay-now">'
                + 'Pay Now</a> ' +
                '</div>'
              );
            }

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
        // {
        //   text: 'Add New Deal',
        //   className: 'add-new btn btn-primary',
        //   init: function (api, node, config) {
        //     $(node).removeClass('btn-secondary');
        //   }
        // }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['deal_title'];
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

    });
  }



  $(document).on('click', '.pay-now', function () {
    var elemID = $(this).attr('id').replace('del-', '');
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Pay!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then(function (result) {
      if (result.value) {
        window.location.href = `${location.protocol}//${window.location.host}/deal/payment/${elemID}`;
      }
    });
  });

  $(document).on('click', '.transaction', function () {
    window.location.href = `${window.location.protocol}//${window.location.host}/deal/add`;
  });

  //   $(document).on('click', '.dealStatusUpdate', function () {
  //     var elemID = $(this).data('id');

  //     swal.fire({
  //         title: 'Change Deal Status',
  //         text: 'Select the new status for this deal:',
  //         icon: 'question',
  //         showCancelButton: true,
  //         showDenyButton: true,
  //         confirmButtonText: 'Approve',
  //         denyButtonText: 'Reject',
  //         cancelButtonText: 'Cancel',
  //         reverseButtons: true
  //     }).then((result) => {
  //         let status = '';
  //         if (result.isConfirmed) {
  //             status = 'Approved';
  //         } else if (result.isDenied) {
  //             status = 'Rejected';
  //         }

  //         if (status) {
  //             window.location.href = `${window.location.protocol}//${window.location.host}/deal/status-change/${elemID}/${status}`;
  //         }
  //     });
  // });


});