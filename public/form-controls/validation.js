'use strict';
let allow_to_navigate = true;

let FormControls = function () {
    let addNewUserValidation = function () {
        jQuery.validator.addMethod("isImage", function (value, element) {
            // Check if the file extension is one of the common image formats
            return /\.(jpg|jpeg|png)$/i.test(value);
        }, "Please select a valid image file (jpg, jpeg, png)");

        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");

        jQuery.validator.addMethod("isEighteenYearsOld", function (value, element) {
            // Parse the DoB from the input field
            const dob = new Date(value);
        
            // Get today's date
            const today = new Date();
        
            // Calculate the minimum age allowed (18 years)
            const minimumAgeInMilliseconds = 18 * 365.25 * 24 * 60 * 60 * 1000;
        
            // Check if the DoB is at least 18 years before today
            return today.getTime() - dob.getTime() >= minimumAgeInMilliseconds;
          }, "Invaild Date of birth.");

        $("#add-new-user").validate({
            ignore: "",
            rules: {
                fullName: {
                    required: true,
                    letterswithbasicpunc: true,
                    minlength: 3,
                    maxlength: 20,
                    noSpace: true
                },
              
                userName: {
                    required: true,
                    minlength: 3,
                    maxlength: 20,
                    noSpace: true
                }, 

                goverment_id: {
                    required: true,
                    minlength: 3,
                    maxlength: 20,
                    noSpace: true
                }, 
                dob: {
                    required: true,
                    isEighteenYearsOld:true
                   
                },
                email: {
                    required: true,
                    email: true,
                    noSpace: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                },
                phone: {
                    required: true,
                    noSpace: true,
                    minlength: 8,
                    maxlength: 16
                },
                password: {
                    required: true,
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,

                },
                // profile_image: {

                //     // required: function () {
                //     //     // Check if the image field has a file selected
                //     //     return $("#user-upload")[0].files.length === 0;
                //     // },

                //     isImage: true
                // },

               
                // bio: {
                //     required: true,
                //     minlength: 3,
                //     maxlength: 120,
                //     noSpace: true
                // },
            },
            messages: {
                first_name: {
                    required: "This field is required",
                    letterswithbasicpunc: "Please enter alphabets only",
                    minlength: "Please enter a valid first_name"
                },
                last_name: {
                    required: "This field is required",
                    letterswithbasicpunc: "Please enter alphabets only",
                    minlength: "Please enter a valid fullname"
                },
                userName: {
                    required: "This field is required",
                    minlength: "Please enter a valid fullname"
                },
                goverment_id: {
                    required: "This field is required",
                    minlength: "Please enter a valid Id"
                },
                dob: {
                    required: "This field is required",
                },
                email: {
                    required: "This field is required",
                    email: "Please enter a valid email",
                    pattern: "Please enter a valid email",
                },
                phone: {
                    required: "This field is required",
                    minlength: "Phone must be at least 8 digits"
                },
                password: {
                    required: "This field is required",
                    pattern: "Minimum 8 characters long, uppercase, lowercase, number & symbol between: #?!@$%^&*-"
                },
                profile_image: {
                    accept: 'Please select a valid image file (jpg, jpeg, png)',
                    required: 'Please select an image file'
                },
              
                // bio: {
                //     required: "This field is required",
                //     // letterswithbasicpunc: "Please enter alphabets only",
                //     minlength: "Please enter a valid first_name"
                // },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    }

    let editNewUserValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");

        jQuery.validator.addMethod("isImage", function (value, element) {
            // Check if the file extension is one of the common image formats
            return /\.(jpg|jpeg|png|gif)$/i.test(value);
        }, "Please select a valid image file (jpg, jpeg, png, gif)");

        jQuery.validator.addMethod("isEighteenYearsOld", function (value, element) {
            // Parse the DoB from the input field
            const dob = new Date(value);
        
            // Get today's date
            const today = new Date();
        
            // Calculate the minimum age allowed (18 years)
            const minimumAgeInMilliseconds = 18 * 365.25 * 24 * 60 * 60 * 1000;
        
            // Check if the DoB is at least 18 years before today
            return today.getTime() - dob.getTime() >= minimumAgeInMilliseconds;
          }, "Invaild Date of birth.");

        $("#editUserForm").validate({
            ignore: "",
            rules: {
                fullName: {
                    required: true,
                    letterswithbasicpunc: true,
                    minlength: 3,
                    maxlength: 20,
                    noSpace: true
                },
              
                userName: {
                    required: true,
                    minlength: 3,
                    maxlength: 20,
                    noSpace: true
                }, 

                goverment_id: {
                    required: true,
                    minlength: 3,
                    maxlength: 20,
                    noSpace: true
                }, 
                dob: {
                    required: true,
                    isEighteenYearsOld:true
                   
                },
                email: {
                    required: true,
                    email: true,
                    noSpace: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                },
                phone: {
                    required: true,
                    noSpace: true,
                    minlength: 8,
                    maxlength: 16
                },
                // bio: {
                //     required: true,
                //     minlength: 3,
                //     maxlength: 20,
                //     noSpace: true
                // },
            },
            messages: {
                fullName: {
                    required: "This field is required",
                    letterswithbasicpunc: "Please enter alphabets only",
                },
                email: {
                    required: "This field is required",
                    email: "Please enter a valid email",
                    pattern: "Please enter a valid email",
                },
                phone: {
                    required: "This field is required",
                    minlength: "Phone must be at least 8 digits"
                },
                // profile_image: {
                //     required: 'Please select an image file',
                //     accept: 'Please select a valid image file (jpg, jpeg, png)'
                // },
                // bio: {
                //     required: "This field is required",
                //     // letterswithbasicpunc: "Please enter alphabets only",
                // },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    }

    let adminAcntFrmValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");

        jQuery.validator.addMethod("nonNegative", function (value, element) {
            return value >= 0;
        }, "Please enter a non-negative value");

        jQuery.validator.addMethod("isImage", function (value, element) {
            // Check if the file extension is one of the common image formats
            return /\.(jpg|jpeg|png)$/i.test(value);
        }, "Please select a valid image file (jpg, jpeg, png)");

        $("#adminAcntFrm").validate({
            ignore: "",
            rules: {
                first_name: {
                    required: true,
                    letterswithbasicpunc: true,
                    minlength: 3,
                    noSpace: true,
                    maxlength: 15
                },
                last_name: {
                    required: true,
                    letterswithbasicpunc: true,
                    minlength: 3,
                    noSpace: true,
                    maxlength: 15
                },
                email: {
                    required: true,
                    email: true,
                    noSpace: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                },
                'profile_image': {
                    required: function () {
                        // Check if the image field has a file selected
                        return $("#account-upload")[0].files.length === 1;
                    },

                    isImage: false
                }
            },
            messages: {
                first_name: {
                    required: "Please enter your first name",
                    letterswithbasicpunc: "Please enter alphabets only",
                    minlength: "Please enter a valid first name",
                    maxlength: "Enter maximum 15 characters"
                },
                last_name: {
                    required: "Please enter your last name",
                    letterswithbasicpunc: "Please enter alphabets only",
                    minlength: "Please enter a valid last name",
                    maxlength: "Enter maximum 15 characters"
                },
                email: {
                    required: "Please enter your email",
                    email: "Please enter a valid email",
                    pattern: "Please enter a valid email",
                },
                profile_image: {
                    accept: 'Please select a valid image file (jpg, jpeg, png)',
                    required: 'Please select an image file'
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });

        // Add change event to profile_image input
        $('#profile_image').on('change', function () {
            var profileImageRule = $("#profile_image").val() ? "isImage" : false;
            $("#adminAcntFrm").rules("add", {
                'profile_image': {
                    isImage: profileImageRule
                }
            });
        });
    };
    let adminChangePasswordValidation = function () {
        $("#adminChangePassword").validate({
            rules: {
                'old_password': {
                    required: true
                },
                'password': {
                    required: true,
                    minlength: 8
                },
                'confirm-new-password': {
                    required: true,
                    minlength: 8,
                    equalTo: '#account-new-password'
                }
            },
            messages: {
                'old_password': {
                    required: 'Enter current password'
                },
                'password': {
                    required: 'Enter new password',
                    minlength: 'Enter at least 8 characters'
                },
                'confirm-new-password': {
                    required: 'Please retype new password',
                    minlength: 'Enter at least 8 characters',
                    equalTo: 'New password and confirm password do not match'
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                // $(form).submit();
                form[0].submit();
            }
        });
    };

    let formChangePasswordValidation = function () {
        $("#formChangePassword").validate({
            rules: {
                newPassword: {
                    required: true,
                    required: true,
                    pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                    minlength: 8
                },
                confirmPassword: {
                    required: true,
                    minlength: 8,
                    equalTo: '#newPassword'
                }
            },
            messages: {
                newPassword: {
                    required: 'Enter new password',
                    pattern: "Please meet password field's minimum requirements",
                    minlength: 'Enter at least 8 characters'
                },
                confirmPassword: {
                    required: 'Please confirm new password',
                    minlength: 'Enter at least 8 characters',
                    equalTo: 'New password and confirm password do not match'
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                // $(form).submit();
                form[0].submit();
            }
        });
    };

    let addNewCmsValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");

        $("#add-new-cms").validate({
            rules: {
                'title': {
                    required: true,
                    minlength: 3,
                    maxlength: 30,
                    noSpace: true
                },
                'content': {
                    required: true,
                    noSpace: true
                }
            },
            messages: {
                'title': {
                    required: 'Title is required',
                    minlength: "Please enter a valid title"
                },
                'content': {
                    required: 'Title is required',
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    }

    let settingsformValidation = function () {
        $.validator.addMethod("customEmail", function (value, element) {
            return this.optional(element) || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
        }, "Please enter a valid email");
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() != "";
        }, "This field is required");
        jQuery.validator.addMethod("linkedinUrl", function (value, element) {
            var url = value.trim();
            var validDomains = [
                'linkedin.com',
                'www.linkedin.com',
                'in.linkedin.com',
                'www.in.linkedin.com'
            ];

            // Check if the URL contains a valid LinkedIn domain
            var hasValidDomain = validDomains.some(function (domain) {
                return url.indexOf(domain) > -1;
            });

            // Check if the URL format is valid
            var urlPattern = /^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/[a-z0-9]+/i;
            var isValidFormat = urlPattern.test(url);

            return this.optional(element) || (hasValidDomain && isValidFormat);
        }, "Please enter a valid LinkedIn profile URL.");
        $("#settingsform").validate({
            rules: {
                'contactNumber': {
                    required: true,
                    noSpace: true,
                    minlength: 8,
                    maxlength: 16
                },
                'email': {
                    required: true,
                    noSpace: true,
                    customEmail: true
                },
                'address': {
                    required: true,
                    noSpace: true
                },
                'playstoreURL': {
                    required: true,
                    url: true,
                    pattern: /play\.google/
                },
                'applestoreURL': {
                    required: true,
                    url: true,
                    pattern: /apple/
                },
                'socialLinks.fb': {
                    required: true,
                    url: true,
                    pattern: /^(https?:\/\/)?((w{3}\.)?)facebook\.com\/.*/i
                },
                'socialLinks.twtr': {
                    required: true,
                    url: true,
                    pattern: /^(https?:\/\/)?((w{3}\.)?)twitter\.com\/.*/i
                },
                'socialLinks.insta': {
                    required: true,
                    url: true,
                    pattern: /^(https?:\/\/)?((w{3}\.)?)instagram\.com\/.*/i
                },
                'socialLinks.lnkdn': {
                    required: true,
                    url: true,
                    linkedinUrl: true,
                    // pattern: /^(https?:\/\/)?((w{3}\.)?)linkedin\.com\/.*/i
                },
                'time_zone': {
                    required: true
                },
                'commision': {
                    required: true,
                    noSpace: true,
                    min: 1,
                    maxlength: 2
                },
                'vat': {
                    required: true,
                    noSpace: true,
                    min: 1,
                    maxlength: 2
                },
                'radius': {
                    required: true,
                    noSpace: true,
                    min: 1,
                    max: 100
                }
            },
            messages: {
                'contactNumber': {
                    required: 'This field is required',
                    // phoneUS: "US Contact Number is required",
                    minlength: "Contact Number must be at least 8 digits",
                    maxlength: "Contact Number must be at most 16 digits",
                },
                'email': {
                    required: 'This field is required',
                    email: "Please enter a valid email"
                },
                'address': {
                    required: 'This field is required'
                },
                'playstoreURL': {
                    required: 'This field is required',
                    url: "Please enter a valid URL",
                    pattern: "Please enter a valid Google Play Store URL"
                },
                'applestoreURL': {
                    required: 'This field is required',
                    url: "Please enter a valid URL",
                    pattern: "Please enter a valid Apple App Store URL"
                },
                'socialLinks.fb': {
                    required: 'This field is required',
                    url: "Please enter a valid URL",
                    pattern: "Please enter a valid Facebook URL"
                },
                'socialLinks.twtr': {
                    required: 'This field is required',
                    url: "Please enter a valid URL",
                    pattern: "Please enter a valid Twitter URL"
                },
                'socialLinks.insta': {
                    required: 'This field is required',
                    url: "Please enter a valid URL",
                    pattern: "Please enter a valid Instagram URL"
                },
                'socialLinks.lnkdn': {
                    required: 'This field is required',
                    url: "Please enter a valid URL",
                    // pattern: "Please enter a valid LinkedIn URL"
                },
                'time_zone': {
                    required: "This field is required"
                },
                'commision': {
                    required: "This field is required",
                    maxlength: "Commision must be at most 2 digits"
                },
                'vat': {
                    required: "This field is required",
                    min: "Put the proper vat"

                },
                'radius': {
                    required: "This field is required",
                    min: "minimum radius should be 1",
                    max: "maximum radius should be 100"
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    }

    let addFaqValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");

        $("#faqAddFormValidation").validate({
            ignore: "",
            rules: {
                'question': {
                    required: true,
                    noSpace: true,
                    minlength: 2,
                },
                'answer': {
                    required: true,
                    noSpace: true
                },
            },
            messages: {
                'question': {
                    required: 'This field is required'
                },
                'answer': {
                    required: 'This field is required'
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },

            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    };

    let editFaqValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");

        $("#faqEditFormValidation").validate({
            ignore: "",
            rules: {
                'question': {
                    required: true,
                    noSpace: true,
                    minlength: 2
                },
                'answer': {
                    required: true,
                    noSpace: true
                },
            },
            messages: {
                'question': {
                    required: 'This field is required'
                },
                'answer': {
                    required: 'This field is required'
                }
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },

            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    };

    let queryReplyFromValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() != "";
        }, "This field is required");
        $("#queryReply").validate({
            rules: {
                replyText: {
                    required: true,
                    noSpace: true
                },
            },
            messages: {
                replyText: {
                    required: 'This field is required',
                },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    }

    let focusCategoryValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");

        jQuery.validator.addMethod("isImage", function (value, element) {
            // Check if the file extension is one of the common image formats
            return /\.(jpg|jpeg|png|gif)$/i.test(value);
        }, "Please select a valid image file (jpg, jpeg, png, gif)");

        $("#focusCategoryFormValidation").validate({
            ignore: "",
            rules: {
                'title': {
                    required: true,
                    noSpace: true,
                    minlength: 2,
                    maxlength: 100
                },
                'image': {
                    required: function () {
                        return $("#account-upload-img")[0].files.length === 1;
                    },
                    isImage: true
                }

            },
            messages: {
                'title': {
                    required: 'Title field is required'
                },
                'image':{
                    accept: 'Please select a valid image file (jpg, jpeg, png)',
                    required: 'Please select an image file'
                }

            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },
            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
            
        });
    };
  
    let editContactUsValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() !== "";
        }, "This field is required");
        $("#edit-contact-us-cms-form").validate({
            rules: {
                'heading': {
                    required: true,
                    noSpace: true,
                    maxlength: 50
                },
                'sub_heading': {
                    required: true,
                    noSpace: true,
                    maxlength: 50
                },
                'email': {
                    required: true,
                    noSpace: true,
                    email: true,
                    pattern: /\S+@\S+\.\S+/
                },
                'phone': {
                    required: true,
                    minlength: 8,
                    maxlength: 16
                },
                'address': {
                    required: true,
                    noSpace: true
                },
                'description': {
                    required: true,
                    noSpace: true
                }
            },
            messages: {
                'heading': {
                    required: 'This field is required',
                    maxlength: "Heading should not be more than 50 charecters"
                },
                'sub_heading': {
                    required: 'This field is required',
                    maxlength: "Heading should not be more than 50 charecters"
                },
                'email': {
                    required: 'This field is required'
                },
                'phone': {
                    required: 'This field is required',
                    minlength: "Phone number should be minimum 8 digit",
                    maxlength: "Phone number should be maximum 16 digit"
                },
                'address': {
                    required: 'This field is required'
                },
                'description': {
                    required: 'This field is required'
                },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },

            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                form[0].submit();
            }
        });
    };

    let addNewDealValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() != "";
        }, "This field is required");

        jQuery.validator.addMethod("lettersOnly", function (value, element) {
            return /^[a-zA-Z\s]+$/.test(value); // Allow only letters and spaces
        }, "Please enter only letters");

        jQuery.validator.addMethod("numbersOnly", function (value, element) {
            return /^[0-9]+$/.test(value); // Allow only letters and spaces
        }, "Please enter only numbers");

        jQuery.validator.addMethod("link", function (value, element) {
            return /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/.test(value); // Allow proper link format
        }, "Please enter proper link format");

        jQuery.validator.addMethod("ckeditorRequired", function (value, element) {
            var editorData = window.editor.getData();  // Get CKEditor data
            return editorData.trim() !== "";  // Check if CKEditor data is not empty
        }, "This field is required.");


        jQuery.validator.addMethod("imageFile", function (value, element) {
            let file = element.files[0];
            if (!file) return false; // If no file is selected, fail the validation

            let fileType = file.type;
            let validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            let maxSize = 2 * 1024 * 1024; // 2 MB limit

            if ($.inArray(fileType, validImageTypes) < 0) {
                // Invalid file type
                $("#lblError").text("Only JPG, PNG, and GIF files are allowed.");
                return false;
            } else if (file.size > maxSize) {
                // File too large
                $("#lblError").text("File size must be less than 2 MB.");
                return false;
            }

            // Clear any previous error messages
            $("#lblError").text("");
            return true;
        }, "Please upload a valid image file.");

        $("#add-new-deal").validate({
            ignore: "",
            rules: {
                'deal_title': {
                    required: true,
                    maxlength: 60,
                    noSpace: true,
                    lettersOnly: true
                },
                'deal_price': {
                    required: true,
                    noSpace: true,
                    numbersOnly:true
                },
                'deal_images': {
                    required: false,
                    imageFile:true
                },
                'categoryId': {
                    required: true,
                    noSpace: true,
                },
                // 'subCategoryId': {
                //     required: true,
                //     noSpace: true,
                // },
                'product_link': {
                    required: true,
                    noSpace: true,
                    link: true
                },
                'description': {
                    required: true,
                    // lettersOnly: true
                },
            },
            messages: {
                'deal_title': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                'deal_image': {
                    required: "Please upload an image.",  // Error message if no image is selected
                    imageFile: "Please upload a valid image file (JPG, PNG, GIF) and under 2 MB."
                },
                'description': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                'categoryId': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                'subCategoryId': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                'description': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },

            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                $('#message').val(editorInstance.getData());
                // $(form).submit();
                form[0].submit();
            }

        });

    }

    let editNewDealValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() != "";
        }, "This field is required");

        jQuery.validator.addMethod("lettersOnly", function (value, element) {
            return /^[a-zA-Z\s]+$/.test(value); // Allow only letters and spaces
        }, "Please enter only letters");

        jQuery.validator.addMethod("numbersOnly", function (value, element) {
            return /^[0-9]+$/.test(value); // Allow only letters and spaces
        }, "Please enter only numbers");

        jQuery.validator.addMethod("link", function (value, element) {
            return /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/.test(value); // Allow proper link format
        }, "Please enter proper link format");

        jQuery.validator.addMethod("ckeditorRequired", function (value, element) {
            var editorData = window.editor.getData();  // Get CKEditor data
            return editorData.trim() !== "";  // Check if CKEditor data is not empty
        }, "This field is required.");


        jQuery.validator.addMethod("imageFile", function (value, element) {
            let file = element.files[0];
            if (!file) return false; // If no file is selected, fail the validation

            let fileType = file.type;
            let validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
            let maxSize = 2 * 1024 * 1024; // 2 MB limit

            if ($.inArray(fileType, validImageTypes) < 0) {
                // Invalid file type
                $("#lblError").text("Only JPG, PNG, and GIF files are allowed.");
                return false;
            } else if (file.size > maxSize) {
                // File too large
                $("#lblError").text("File size must be less than 2 MB.");
                return false;
            }

            // Clear any previous error messages
            $("#lblError").text("");
            return true;
        }, "Please upload a valid image file.");

        $("#edit-new-deal").validate({
            ignore: "",
            rules: {
                'deal_title': {
                    required: true,
                    maxlength: 60,
                    noSpace: true,
                    lettersOnly: true
                },
                'deal_price': {
                    required: true,
                    noSpace: true,
                    numbersOnly:true
                },
            
                'categoryId': {
                    required: true,
                    noSpace: true,
                },
                'product_link': {
                    required: true,
                    noSpace: true,
                    link: true
                },
                'description': {
                    required: true,
                    lettersOnly: true
                },
            },
            messages: {
                'deal_title': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },

                'description': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                'categoryId': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                'subCategoryId': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                'description': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },

            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                $('#message').val(editorInstance.getData());
                // $(form).submit();
                form[0].submit();
            }

        });

    }

    let addCategoryValidation = function () {
        jQuery.validator.addMethod("noSpace", function (value, element) {
            return value.trim() != "";
        }, "This field is required");

        jQuery.validator.addMethod("lettersOnly", function (value, element) {
            return /^[a-zA-Z\s]+$/.test(value); // Allow only letters and spaces
        }, "Please enter only letters");

        jQuery.validator.addMethod("numbersOnly", function (value, element) {
            return /^[0-9]+$/.test(value); // Allow only letters and spaces
        }, "Please enter only numbers");

        jQuery.validator.addMethod("link", function (value, element) {
            return /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?$/.test(value); // Allow proper link format
        }, "Please enter proper link format");

        jQuery.validator.addMethod("ckeditorRequired", function (value, element) {
            var editorData = window.editor.getData();  // Get CKEditor data
            return editorData.trim() !== "";  // Check if CKEditor data is not empty
        }, "This field is required.");


        jQuery.validator.addMethod("imageFile", function (value, element) {
            let file = element.files[0];
            if (!file) return false; // If no file is selected, fail the validation

            let fileType = file.type;
            let validImageTypes = ["image/jpeg", "image/png", "image/gif"];
            let maxSize = 2 * 1024 * 1024; // 2 MB limit

            if ($.inArray(fileType, validImageTypes) < 0) {
                // Invalid file type
                $("#lblError").text("Only JPG, PNG, and GIF files are allowed.");
                return false;
            } else if (file.size > maxSize) {
                // File too large
                $("#lblError").text("File size must be less than 2 MB.");
                return false;
            }

            // Clear any previous error messages
            $("#lblError").text("");
            return true;
        }, "Please upload a valid image file.");

        $("#add-new-category").validate({
            ignore: "",
            rules: {
                'title': {
                    required: true,
                    maxlength: 60,
                    noSpace: true,
                    lettersOnly: true
                },
                // 'parentId': {
                //     required: true,
                //     noSpace: true,
                // },
                // 'image': {
                //     required: false,
                //     imageFile:true
                // },
            },
            messages: {
                'title': {
                    required: 'This field is required',
                    noSpace: 'This field can not be blank'
                },
                // 'image': {
                //     required: "Please upload an image.",  // Error message if no image is selected
                //     imageFile: "Please upload a valid image file (JPG, PNG, GIF) and under 2 MB."
                // },
                // 'parentId': {
                //     required: 'This field is required',
                //     noSpace: 'This field can not be blank'
                // },
                
            },
            invalidHandler: function (event, validator) {
                allow_to_navigate = false;
            },

            submitHandler: function (form) {
                allow_to_navigate = true;
                $(".app-content, nav, .main-menu").css("filter", "blur(5px)");
                $('#gif').css('visibility', 'visible');
                $('#message').val(editorInstance.getData());
                // $(form).submit();
                form[0].submit();
            }

        });

    }

     //add
 

// Initialize the validation when the document is ready
$(document).ready(function() {
    questionFormValidation();
});



// Initialize the validation when the document is ready
$(document).ready(function() {
    editLandingPageFormValidation();
});


    return {
        init: function () {
           addNewUserValidation();
           editNewUserValidation();
           adminAcntFrmValidation();
           adminChangePasswordValidation();
           formChangePasswordValidation();
           addNewCmsValidation();
           settingsformValidation();
           addFaqValidation();
           editFaqValidation();
           queryReplyFromValidation();
           focusCategoryValidation();
           editContactUsValidation();
           addNewDealValidation();
           editNewDealValidation();
           addCategoryValidation();

        }
    };
}();

// Form Validation Initialize
$(document).ready(function () {
    FormControls.init();

    // Handle Dirty Form
    // $('form').on('change', function() {
    //     allow_to_navigate = false;
    //     // $(this).find("button[type='reset']").prop('disabled', false);
    //     $(this).find("button[type='submit']").prop('disabled', false);
    // });

    // $("button[type='reset']").on("click", function() {
    //     allow_to_navigate = true;
    //     // $("button[type='reset']").prop('disabled', true);
    //     $("button[type='submit']").prop('disabled', true);
    // });

    // if ($(document).find("form").length) {
    //     // $("button[type='reset']").prop('disabled', true);
    //     $("button[type='submit']").prop('disabled', true);
    //     let current__active_menu = $('li.active');
    //     window.addEventListener('beforeunload', function (event) {
    //         if (!allow_to_navigate) {
    //             event.preventDefault();
    //             event.returnValue = 'You have unsaved changes. Are you sure you want to navigate anyway?';
    //         }
    //     });

    //     $('li').on('click', function () {
    //         if (!allow_to_navigate) {
    //             setTimeout(function () {
    //                 $('li').removeClass('active');
    //                 if ($(current__active_menu).length) {
    //                     for (let i=0;i<$(current__active_menu).length;i++) {
    //                         $($(current__active_menu)[i]).addClass('active');
    //                     }
    //                 }
    //             }, 10);
    //         }
    //     });

    //     $('form').submit(function(){
    //         allow_to_navigate = true;
    //     });
    // }

    // Handle Dirty Form
});

