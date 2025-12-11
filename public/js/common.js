('use strict');
// Revoke User Access
$(document).on('click', '.revoke_access', function () {
    let location = $(this).attr('data-location');
    let path = $(this).attr('data-url');
    if (location) {
        window.location.href = window.location.protocol + '//' + window.location.host + location + (path ? '?path=' + path : '');
    }
});
// Revoke User Access

// handle-date-time start

$(document).ready(function () {
    let allDates = document.querySelectorAll('.handle-date-time');
    if (allDates) {
        allDates.forEach((item, index, parent) => {
            let dateTime = $(item).attr('data-time');
            if (dateTime) {
                let timeText = '';
                let past24HrStartTime = moment().subtract(24, 'hours');
                if (moment(past24HrStartTime).isSameOrBefore(dateTime)) {
                    timeText = moment(dateTime).fromNow();
                } else {
                    timeText = moment(dateTime).format('YYYY-MM-DD hh:mm A');
                }
                $(item).text(timeText);
            }
        });
    }



    let select2 = $('.select2'),
        accountNumberMask = $('.dt-contact'),
        accountZipCode = $('.account-zip-code'),
        accountUploadImg = $('#account-upload-img'),
        accountUploadBtn = $('#account-upload'),
        accountUserImage = $('.uploadedAvatar'),
        accountResetBtn = $('#account-reset');
        focousDuration = $('.duration');
        focousReps = $('.reps');

    //phone
    if (accountNumberMask.length) {
        accountNumberMask.each(function () {
            new Cleave($(this), {
                phone: false,
                // phoneRegionCode: 'US'
                blocks: [12],
                numericOnly: true ,// Allow only numeric input

            });
        });
    }

      //Focus duration
      if (focousDuration.length) {
        focousDuration.each(function () {
            new Cleave($(this), {
                phone: false,
                // phoneRegionCode: 'US'
                blocks: [2],
                numericOnly: true ,// Allow only numeric input

            });
        });
    }

      //Focus reps 
      if (focousReps.length) {
        focousReps.each(function () {
            new Cleave($(this), {
                phone: false,
                // phoneRegionCode: 'US'
                blocks: [3],
                numericOnly: true ,// Allow only numeric input

            });
        });
    }

    //zip code
    if (accountZipCode.length) {
        accountZipCode.each(function () {
            new Cleave($(this), {
                delimiter: '',
                numeral: true
            });
        });
    }

    // For all Select2
    if (select2.length) {
        select2.each(function () {
            let $this = $(this);
            $this.wrap('<div class="position-relative"></div>');
            $this.select2({
                dropdownParent: $this.parent()
            });
        });
    }

    // Update user photo on click of button
    if (accountUserImage) {
        let resetImage = accountUserImage.attr('src');
        accountUploadBtn.on('change', function (e) {
            let reader = new FileReader(),
                files = e.target.files;
            reader.onload = function () {
                if (accountUploadImg) {
                    accountUploadImg.attr('src', reader.result);
                }
            };
            reader.readAsDataURL(files[0]);
            accountResetBtn.removeClass("d-none");
        });

        accountResetBtn.on('click', function () {
            accountUserImage.attr('src', resetImage);
            $('#account-upload').val('');
            accountResetBtn.addClass("d-none");
            return false;
        });
    }


    // $(".btn-outline-secondary").on("click", function () {
    //    window.location.reload()
    // });


});

// $(document).ready(function () {
//     $("#reset_btn").click(function () {
//         location.reload(true);

//     });
// });


$(document).ready(function () {
    $("#account-reset").on("click", function () {
        $('#account-upload-error').empty()
    });
});


// $(document).ready(function() {
//     $(document).on("click", ".btn-outline-secondary", function() {
//         window.location.reload();
//     });
// });

$(document).ready(function() {
    $(document).on("click", ".btn-close", function() {
        window.location.reload();
    });
});
// handle-date-time ends