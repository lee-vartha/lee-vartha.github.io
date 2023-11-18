// loads the main page as first thing
document.addEventListener("DOMContentLoaded", function() {
    showContent("main-page");
});


// function to show the content of the page
function showContent(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
        if (section.id === sectionId) {
            section.style.display = "block";
        } else {
            section.style.display = "none";
        }
    });
}


    // like button data
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            button.classList.toggle('liked');
        });
    });







// document.getElementById('register_form_button').addEventListener('click', function (event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     var signUpLink = document.querySelector('a[href="#sign-up"]');
//     var isRequiredConditionMet = checkRequiredFields(); // Check the REQUIRED condition

//     if (isRequiredConditionMet) {
//         signUpLink.innerHTML = '<img src="images/user.png" alt="account" class="image-account">';
//         signUpLink.setAttribute('href', '#account');
//         signUpLink.setAttribute('onclick', "showContent('account')");
//         showContent('account');

//         // Modify the URL without reloading the page
//         var stateObj = { page: "account" }; // You can provide more data if needed
//         history.pushState(stateObj, "User Account", window.location.pathname + "#account");
//     }
// });


    //     // Handle the registration process here
    //     // You can submit the form via AJAX or take the appropriate actions
    // } else {
    //     // Handle the case when the REQUIRED condition is not met
    //     alert("You haven't added proper information in each field - Try again please!");







    
// function replaceButton(event) {

//     var signUpLink = document.querySelector('a[href="#sign-up"]');
//     var isRequiredConditionMet = checkRequiredFields(); // Check the REQUIRED condition

//     if (isRequiredConditionMet) {
//         signUpLink.innerHTML = '<img src="images/user.png" alt="account" class="image-account">';
//         signUpLink.setAttribute('href', '#account');
//         signUpLink.setAttribute('onclick', "showContent('account')");
//         showContent('account');

//         // Modify the URL without reloading the page
//         var stateObj = { page: "account" }; // You can provide more data if needed
//         history.pushState(stateObj, "User Account", window.location.pathname + "#account");

//         // Handle the registration process here
//         // You can submit the form via AJAX or take the appropriate actions
//     } 
// }

// function checkRequiredFields() {
//     // You should implement logic to check if all required fields are filled out
//     // Return true if the condition is met, and false otherwise
//     var name = document.getElementById('upNameInput').value;
//     var email = document.getElementById('upEmailInput').value;
//     var password = document.getElementById('upPasswordInput').value;

//     return name.trim() !== '' && email.trim() !== '' && password.trim() !== '';
// }


// // reverting what that changed button is -- once the user logs out
// function replaceButtons(event) {

//     var accountLink = document.querySelector('a[href="#account"]');
//     accountLink.innerHTML = '<img src="images/signup.png" alt="signup">';
//     accountLink.setAttribute('href', '#sign-up');
//     accountLink.setAttribute('onclick', "showContent('sign-up')");

//     showContent('main-page'); // This line will immediately show the user account content after clicking "Submit".

//     // Modify the URL without reloading the page
//     var stateObj = { page: "main-page" }; 
//     history.pushState(stateObj, "Main", window.location.pathname + "#sign-up");
// }











// thing for the navbar
const navCheck = document.getElementById("navcheck");
        const menu = document.getElementById("menu");
        
        navCheck.addEventListener("change", () => {
            if (navCheck.checked) {
                menu.classList.add("active");
            } else {
                menu.classList.remove("active");
            }
        });
        


     
    // // Add an event listener to the form to update the user's name in the account section
    // document.addEventListener("DOMContentLoaded", function () {
    //     const nameInput = document.getElementById("name_input");
    //     const userNamePlaceholder = document.getElementById("userNamePlaceholder");

    //     // Add an event listener for form submission
    //     document.getElementById("signup_form").addEventListener("submit", function (event) {
    //         event.preventDefault(); // Prevent the form from submitting

    //         // Update the placeholder with the user's name
    //         userNamePlaceholder.textContent = nameInput.value;
    //     });
    // });

  



// function showCommentForm() {
//     var commentOverlay = document.getElementById('commentOverlay')
//     commentOverlay.style.display = 'block';
// }

// function closeCommentForm() {
//     var commentOverlay = document.getElementById('commentOverlay');
//     commentOverlay.style.display = 'none';
// }


// document.getElementById('commentForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Get values from the comment form
//     const username = document.getElementById('username').value;
//     const comment = document.getElementById('commentText').value;

//     // Here, you can add the comment to the page dynamically
//     const commentList = document.getElementById('commentList');
//     const newComment = document.createElement('div');
//     newComment.className = 'comment';
//     newComment.innerHTML = `<strong>${username}:</strong> ${comment}`;
//     commentList.appendChild(newComment);

//     // Reset form fields
//     document.getElementById('username').value = '';
//     document.getElementById('commentText').value = '';
    
//     // Hide the comment form
//     document.getElementById('commentOverlay').style.display = 'none';
// });










