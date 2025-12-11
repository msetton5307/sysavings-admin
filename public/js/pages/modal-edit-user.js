$(function () {
  $(document).on('click', '.userStatusUpdate', function () {
    var elemID = $(this).data('id');
    var status = $(this).data('status');
    var inputs = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === "Unblock") {
                let options = {
                    "Unblock": "Unblock",
                    "Block": "Block",
                    
                }
                return resolve(options);
            } else {
                let options = {
                  "Block": "Block",
                  "Unblock": "Unblock",
                   
                }
                return resolve(options);
            }
        }, 200);
    });
    swal.fire({
        title: 'Are you sure?',
        type: 'warning',
        input: 'select',
        inputOptions: inputs,
        showCancelButton: true,
        confirmButtonText: 'Yes, change it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
    }).then(function (result) {
        if (result.value) {
            window.location.href = `${window.location.protocol}//${window.location.host}/user/status-change/${elemID}?status=${result.value}&path=/user/view/${elemID}`;
        }
    });
  });
});
