$(function () {
  ('use strict');
  var dtUserTable = $('.deal-list-table'),
    dealTable,
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
    });

    dealTable = dtUserTable.DataTable({
      processing: true,
      paging: true,
      sorting: true,
      serverSide: true,
      ajax: {
        url: `${window.location.protocol}//${window.location.host}/deal/getall`,
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
        // { data: 'images' },
        { data: 'deal_title' },
        { data: 'deal_price' },
        { data: 'product_link' },
        { data: 'status' },

        // { data: '' },
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
          responsivePriority: 4,
          render: function (datas, type, full, meta) {

            return full['deal_title']

          }
        },
        // {
        //   targets: 1,
        //   sortable: false,
        //   render: function (data, type, full, meta) {
        //     $images = full['images[0].image'];
        //     if ($images) {
        //       return '<img src="/uploads/DealImages/' + $images + '" width="60">';
        //     } else {
        //       return '<img src="/uploads/noImage.png' + '" width="60">';
        //     }
        //   }
        // },
        {
          // CMS Content
          targets: 2,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            const salePrice = full['sale_price'] || full['deal_price'] || '';
            const originalPrice = full['original_price'];
            const discount = full['discount_text'];

            let priceHtml = '<div class="fw-bold">' + (salePrice || 'N/A') + '</div>';
            if (originalPrice) {
              priceHtml += '<div class="text-muted text-decoration-line-through small">' + originalPrice + '</div>';
            }
            if (discount) {
              priceHtml += '<div class="text-success small">' + discount + '</div>';
            }

            return '<div style="text-align: center;">' + priceHtml + '</div>';
          }
        },
        {
          // CMS Content
          targets: 3,
          orderable: true,
          searchable: false,
          render: function (data, type, full, meta) {
            let link = full['product_link'];
            if (link.length > 100) {
              link = link.substring(0, 50) + " ...";
            }
            return '<div style="text-align: center;">' + link + '</div>';
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
        // {
        //   // CMS Content
        //   targets: -1,
        //   orderable: false,
        //   searchable: false,
        //   render: function (data, type, full, meta) {
        //     return (
        //       '<div class="btn-group">' +
        //       '<a class="btn btn-sm dropdown-toggle hide-arrow" data-bs-toggle="dropdown">' +
        //       feather.icons['more-vertical'].toSvg({ class: 'font-small-4' }) +
        //       '</a>' +
        //       '<div class="dropdown-menu dropdown-menu-end">' +

        //       '<a href="' + window.location.protocol + '//' + window.location.host + '/deal/edit/' + full["_id"] + '" class="dropdown-item delete-record deleteFAQ">' +
        //       feather.icons['edit'].toSvg({ class: 'font-small-4 me-50' }) +
        //       'Edit</a>' +
        //       '<a href="javascript:;" id="del-' + full["_id"] + '" class="dropdown-item delete-record deleteFAQ">' +
        //       feather.icons['trash-2'].toSvg({ class: 'font-small-4 me-50' }) +
        //       'Delete</a></div>' +
        //       '</div>' +
        //       '</div>'
        //     );
        //   }
        // },
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
      initComplete: function () {
        // Adding status filter once table initialized
        this.api()
          .columns(5)
          .every(function () {
            let column = this;
            $('#DealStatusDropdown').select2();
            $('#DealStatusDropdown').ready(function () {
              let val = $.fn.dataTable.util.escapeRegex($('#DealStatusDropdown').val());
              column.search(val ? val : '', false, false).draw();
            });
            $('#DealStatusDropdown').on('change', function () {
              let val = $.fn.dataTable.util.escapeRegex($(this).val());
              column.search(val ? val : '', false, false).draw();
            });
          });

      }
    });
  }

  if (dtUserTable.length) {
    dtUserTable.on('click', 'tbody tr', function () {
      const rowData = dealTable.row(this).data();
      if (!rowData) return;

      const imageUrl = rowData.Image || rowData.image || rowData.imageUrl || '/uploads/noImage.png';
      $('#deal-details-title').text(rowData.deal_title || 'N/A');
      $('#deal-details-company').text(rowData.company || 'N/A');
      $('#deal-details-type').text(rowData.mtype || 'N/A');
      $('#deal-details-subtype').text(rowData.subtype || 'N/A');
      $('#deal-details-price').text(rowData.sale_price || rowData.deal_price || 'N/A');
      $('#deal-details-original').text(rowData.original_price || 'N/A');
      $('#deal-details-discount').text(rowData.discount_text || 'N/A');

      const link = rowData.product_link || '';
      if (link) {
        $('#deal-details-link').attr('href', link).text(link);
      } else {
        $('#deal-details-link').attr('href', '#').text('N/A');
      }

      $('#deal-details-image').attr('src', imageUrl);

      $('#dealDetailsModal').modal('show');
    });
  }

  $(document).on('click', '.add-new', function () {
    window.location.href = `${window.location.protocol}//${window.location.host}/deal/add`;
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
        window.location.href = `${location.protocol}//${window.location.host}/deal/delete/${elemID}`;
      }
    });
  });

  $(document).on('click', '.dealStatusUpdate', function () {
    var elemID = $(this).data('id');

    swal.fire({
      title: 'Change Deal Status',
      text: 'Select the new status for this deal:',
      icon: 'question',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Approve',
      denyButtonText: 'Reject',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      let status = '';
      if (result.isConfirmed) {
        status = 'Approved';
      } else if (result.isDenied) {
        status = 'Rejected';
      }

      if (status) {
        window.location.href = `${window.location.protocol}//${window.location.host}/deal/status-change/${elemID}/${status}`;
      }
    });
  });

});

