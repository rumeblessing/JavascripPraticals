document.addEventListener('DOMContentLoaded', function () {
    var firstName = document.getElementById("firstname");
    var lastName = document.getElementById("lastname");
    var address = document.getElementById("address");
    var email = document.getElementById("email");
    var phoneNumber = document.getElementById("phonenumber");
    var datOfBirth = document.getElementById("dateofbirth");
    var display = document.getElementById("display");
    var row = 1;
    var imageSrc1 = document.getElementById("imageInput");
    var imageSrc2 = document.getElementById("SignatureFile");
console.log(imageSrc1, 'image 1')
    // Store the original table body
    var originalTableBody = Array.from(display.tBodies[0].rows).map(row => row.cloneNode(true));

    const setError = (element, elemenName, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = message;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');

        if (elemenName == "phoneNumber") {
            // Swal.fire({
            //     title: 'Error!',
            //     text: message,
            //     icon: 'error',
            //     confirmButtonText: 'Ok'
            //   })
            const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                timer: 3000,
                timerProgressBar: true,
                background: "whitesmoke",
                showConfirmButton: false,
            });
            Toast.fire({
                type: "error",
                title: 'Error!',
                icon: 'error',

                text: message
            })
        }

    };

    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    const isValidEmail = (email) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    //hide update button
    var updateButton = document.getElementById("updateButton");
    updateButton.style.display = "none";

    function displayInputs() {
        var firstNameValue = firstName.value.trim();
        var lastNameValue = lastName.value.trim();
        var addressValue = address.value.trim();
        var emailValue = email.value.trim();
        var phoneNumberValue = phoneNumber.value.trim();
        var datOfBirthValue = datOfBirth.value.trim();
        document.getElementById("updateButton").style.display = "none";
        document.getElementById("entry").style.display = "inline-block";
        // document.getElementById('ImageViewer1').src = imageSrc1;
        // document.getElementById('ImageViewer2').src = imageSrc2;
        if (firstNameValue === '') {
            setError(firstName, "firstName", 'FirstName is required');
            return;
        } else if (!firstNameValue.match(/^[A-Za-z]*$/)) {
            setError(firstName, "firstName", 'Firstname has to contain just alphabet.');
            return;
        } else {
            setSuccess(firstName);
        }

        if (lastNameValue === '') {
            setError(lastName, "lastName", 'Surname is required');
            return;
        } else if (!lastNameValue.match(/^[A-Za-z]*$/)) {
            setError(lastName, "LastName", 'Surname has to contain just alphabets.');
            return;
        } else {
            setSuccess(lastName);
        }

        if (addressValue === '') {
            setError(address, "address", 'Address is required');
            return;
        } else if (!addressValue.match(/^[a-zA-Z0-9\s,.'-]+$/)) {
            setError(address, "address", 'Invalid address format');
            return;
        } else {
            setSuccess(address);
        }

        if (emailValue === '') {
            setError(email, "email", 'Email is required');
            return;
        } else if (!isValidEmail(emailValue)) {
            setError(email, "email", 'Provide a valid email address');
            return;
        } else {
            setSuccess(email);
        }

        if (phoneNumberValue === '') {
            setError(phoneNumber, "phoneNumber", 'Phone number is required');
            return;
        } else if (!phoneNumberValue.match(/^(080|081|070|090)\d{8}$/)) {
            setError(phoneNumber, "phoneNumber", 'Invalid phone number format');
            return;
        } else {
            setSuccess(phoneNumber);
        }


        insertRow(firstNameValue, lastNameValue, addressValue, emailValue, phoneNumberValue, datOfBirthValue, imageSrc1, imageSrc2);

        // Clear input fields
        firstName.value = '';
        lastName.value = '';
        address.value = '';
        email.value = '';
        phoneNumber.value = '';
        datOfBirth.value = '';
    }

    function insertRow(firstNameValue, lastNameValue, addressValue, emailValue, phoneNumberValue, datOfBirthValue, imageSrc1, imageSrc2) {
        var phoneExists = Array.from(display.tBodies[0].rows).some(function (row) {
            return row.cells[4].innerText === phoneNumberValue;
        });
        // var ReturnedArray =  display.tBodies[0].rows.filterRows()
        if (phoneExists) {
            setError(phoneNumber, "phoneNumber", 'Phone number already exists');
            return;
        }
        // Assign image sources to global variables
        imageSrc1 = imageSrc1;
        imageSrc2 = imageSrc2;
        //localStorage.setItem("FirstName",firstNameValue)
        var tableBody = display.tBodies[0];
        var newRow = tableBody.insertRow();
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        var cell8 = newRow.insertCell(7);
        var cell9 = newRow.insertCell(8);


        cell1.innerHTML = firstNameValue;
        cell2.innerHTML = lastNameValue;
        cell3.innerHTML = addressValue;
        cell4.innerHTML = emailValue;
        cell5.innerHTML = phoneNumberValue;
        cell6.innerHTML = datOfBirthValue;
        cell8.innerHTML =   sessionStorage.getItem("Image1")
        cell9.innerHTML =   sessionStorage.getItem("Image2")

        cell8.style.display ="none"
        cell9.style.display ="none"
        // Add delete button
        var deleteButton = createButton('Delete', 'delete', function () {
            handleDelete(newRow);
        });
        cell7.appendChild(deleteButton);

        // Add edit button
        var editButton = createButton('Edit', 'edit', function () {
            handleEdit(newRow);
        });
        cell7.appendChild(editButton);

        row++;
    }
    function updateRow(firstNameValue, lastNameValue, addressValue, emailValue, phoneNumberValue, datOfBirthValue, imageSrc1, imageSrc2) {
        // Get the row being edited
        var editedRow = document.querySelector('.editing');

        if (editedRow) {
            // Update the row with the new data
            editedRow.cells[0].innerHTML = firstNameValue;
            editedRow.cells[1].innerHTML = lastNameValue;
            editedRow.cells[2].innerHTML = addressValue;
            editedRow.cells[3].innerHTML = emailValue;
            editedRow.cells[4].innerHTML = phoneNumberValue;
            editedRow.cells[5].innerHTML = datOfBirthValue;

            // Clear the form inputs
            firstName.value = '';
            lastName.value = '';
            address.value = '';
            email.value = '';
            phoneNumber.value = '';
            datOfBirth.value = '';

            // Toggle the 'editing' class on the row
            editedRow.classList.toggle('editing');
        }


        var sectionRowIndex = localStorage.getItem("selectedRow")
        handleDeleteForUpdate(sectionRowIndex);
        insertRow(firstNameValue, lastNameValue, addressValue, emailValue, phoneNumberValue, datOfBirthValue, imageSrc1, imageSrc2);


    }
    function createButton(text, className, onClick) {
        var button = document.createElement('button');
        button.innerText = text;
        button.className = className; // Add class for styling
        button.addEventListener('click', onClick);
        return button;
    }
    function handleDelete(row) {
        var tableBody = display.tBodies[0];
        tableBody.deleteRow(row.sectionRowIndex);
        document.getElementById("updateButton").style.display = "none";
        document.getElementById("entry").style.display = "inline-block";
    }

    function handleDeleteForUpdate(row) {
        var tableBody = display.tBodies[0];
        tableBody.deleteRow(row);

    }


    function handleEdit(row) {
        firstName.value = row.cells[0].innerHTML
        phoneNumber.value = row.cells[4].innerHTML
        phoneNumber.setAttribute("readonly", true)
        lastName.value = row.cells[1].innerHTML
        address.value = row.cells[2].innerHTML
        email.value = row.cells[3].innerHTML
        datOfBirth.value = row.cells[5].innerHTML
        localStorage.setItem("selectedRow", row.sectionRowIndex)
        // Display the first image associated with the form entry during edit
        document.getElementById('ImageViewer1').src = row.cells[7].innerHTML;
      // displayImageDuringEdit('ImageViewer1', imageSrc1);

        // Display the second image associated with the form entry during edit
        document.getElementById('ImageViewer2').src = row.cells[8].innerHTML;
       // displayImageDuringEdit('ImageViewer2', imageSrc2);
        // Show the "Update" button and hide the "Save" button
        document.getElementById("updateButton").style.display = "inline-block";
        document.getElementById("entry").style.display = "none";

        firstName.value = row.cells[0].innerHTML;
        lastName.value = row.cells[1].innerHTML;
        address.value = row.cells[2].innerHTML;
        email.value = row.cells[3].innerHTML;
        phoneNumber.value = row.cells[4].innerHTML;
        datOfBirth.value = row.cells[5].innerHTML;

        // Toggle the 'editing' class on the row
        row.classList.toggle('editing');
        // Display the images during edit
      

    }

    function displayImageDuringEdit(imageViewerId, imageSrc) {
        // Code to display the image in the specified image viewer during edit
        var displayedImage = document.getElementById(imageViewerId);
        displayedImage.src = imageSrc;
    }

    var entry = document.getElementById("entry");
    entry.addEventListener('click', function () {
        displayInputs();
    });

    // Hide the "Update" button initially
    var updateButton = document.getElementById("updateButton");
    updateButton.style.display = "none";

    document.getElementById("updateButton").addEventListener("click", function () {
        var firstNameValue = document.getElementById("firstname").value;
        var lastNameValue = document.getElementById("lastname").value;
        var addressValue = document.getElementById("address").value;
        var emailValue = document.getElementById("email").value;
        var phoneNumberValue = document.getElementById("phonenumber").value;
        var datOfBirthValue = document.getElementById("dateofbirth").value;
        updateRow(firstNameValue, lastNameValue, addressValue, emailValue, phoneNumberValue, datOfBirthValue);
    });


    var searchText = document.getElementById("searchText");

    searchText.addEventListener('input', function () {
        var searchTerm = searchText.value.trim().toLowerCase();

        // Restore the original table if the search term is empty
        if (searchTerm === '') {
            restoreOriginalTable();
            return;
        }

        // Filter rows based on the search term
        filterRows(searchTerm);
    });

    function filterRows(searchTerm) {
        var tableBody = display.tBodies[0];
        Array.from(tableBody.rows).forEach(function (row) {
            var isMatch = Array.from(row.cells).some(function (cell) {
                return cell.textContent.trim().toLowerCase().includes(searchTerm);
            });

            if (isMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function restoreOriginalTable() {
        var tableBody = display.tBodies[0];
        Array.from(tableBody.rows).forEach(function (row, index) {
            row.style.display = ''; // Show all rows
        });
    }
});

function saveAndDisplayImage(ImageOrder) {
    // Get the input element
    var input
    if (ImageOrder == "FirstImage") {
        input = document.getElementById('imageInput');
    } else {

        input = document.getElementById('SignatureFile');

    }


    // Ensure a file is selected
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        // Read the selected image as a data URL
        reader.onload = function (e) {
            var imageDataUrl = e.target.result;

            // Display the image
            if (ImageOrder == "FirstImage") {
                var displayedImage = document.getElementById('ImageViewer1');
                displayedImage.src = imageDataUrl;
                sessionStorage.setItem("Image1",imageDataUrl)
            } else {
                var displayedImage = document.getElementById('ImageViewer2');
                displayedImage.src = imageDataUrl;
                sessionStorage.setItem("Image2",imageDataUrl)
            }
            // Save the image (you can modify this part based on your needs)
            
        };

        // Read the selected file as data URL
        reader.readAsDataURL(input.files[0]);
    }
}

function saveImage(imageDataUrl) {
    // Here, you can implement the logic to save the image data URL
    // For example, you can use the browser's download feature or send the data to a server
    // For simplicity, let's use a browser download

    // Create a link element
    var downloadLink = document.createElement('a');

    // Set the href attribute with the data URL
    downloadLink.href = imageDataUrl;

    // Set the download attribute with a suggested filename
    downloadLink.download = 'saved_image.png';

    // Append the link to the body
    document.body.appendChild(downloadLink);

    // Trigger a click on the link to start the download
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);
}

