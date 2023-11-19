console.log('firebase is loaded.');

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js"; // this imports the firebase SDKs
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"; // imports the SDKs for anything to do with authentication
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    doc,
    getDoc,
    deleteDoc,
    updateDoc,
    setDoc,
    serverTimestamp,
    
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js"; // imports SDKs for anything related to firestore database
import { getAnalytics } from "firebase/analytics";

// Firebase configuration, which is helpful:

const firebaseConfig = {
  apiKey: "AIzaSyAVZlqQxEpGtqG1DLOXwTKAmKiTeG_ncwM",
  authDomain: "lee-vartha-website.firebaseapp.com",
  projectId: "lee-vartha-website",
  storageBucket: "lee-vartha-website.appspot.com",
  messagingSenderId: "703470173998",
  appId: "1:703470173998:web:daee84a1bd64c4400f44bf"
};



// code to initialize Firebase 
const app = initializeApp(firebaseConfig); // means that firebase is initialized
const auth = getAuth(app); // means that the authentication is initialized
const firestore = getFirestore(app); // means that the firestore database is initialized
const analytics = getAnalytics(app);


const uploadingBar = document.getElementById('uploadingBar');

// function used to handle registration for a user
// creates an element based on the HTML id tag name and adds an event listener that waits for the user to press the submit button from the HTML
// an async function means that it is asynchronous, which means that it will run the code inside the curly brackets at the same time as other code
// e = event, which is showing it is waiting for the user to press the submit button
document.getElementById('signUpForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // this is used to prevent the default behaviour of the form submission- the 'e' means its referencing the event listener above
  uploadingBar.style.width = '100%';

   // Simulate an asynchronous action (e.g., fetching data or processing something)
   setTimeout(() => {
    // Hide loading bar when the action is complete
    uploadingBar.style.width = '0';
  }, //the time it takes
  8000); 

const email = document.getElementById('upEmailInput').value; // value for the users' email
const password = document.getElementById('upPasswordInput').value; // value for the password input by the user

  try { // try means that the code will attempt to run the code inside the curly brackets  once the user has pressed the submit button
      
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User is registered as:", userCredential.user.email); // the inspect console will display this message (only the developer can see this)
      alert("Congrats, your account has been successfully registered on my website!"); // this is the message that the user will see if they inputted information correctly
      hideEditAndDeleteButtons(); // ensures that when they sign up with stuff, it loads any new comments they make instantly with the edit/delete
      console.log('New user is now being taken to the main page')
      showContent('main-page'); // this will send the user to the new spot, showing they have signed in successfully
      upEmailInput.value = ''; // clears the input boxes after signup
      upPasswordInput.value = ''; // clears the input boxes after signup

      // Store user data in Firestore
      // 'await' means this will only happen once the user has been registered (once the 'try' has been successful)
      await setDoc(doc(firestore, "users", userCredential.user.uid), { 
          email: userCredential.user.email, // sends the users' email details to the firestore database
          createdAt: serverTimestamp() // sends the timestamp on when they created the account to the database
      });
      console.log('Registration details have been sent to the database!');

      // error messages below:
      // 'catch' means that if the 'try' is unsuccessful, the code inside the curly brackets will run 
  } catch (error) { 
      console.error("Error during registration:", error.message); // if an error has been made, the inspect console will display this message (only the developer can see this)
      alert(error.message, "...Please try again."); // this is the error message that the user will see if they have made an error
      showContent('sign-up'); // it will send the user back to the same place, showing they havent made an advancement to the place that wouldve been shown if they were successful
  }
});



const inloadingBar = document.getElementById('inloadingBar');

// function used to handle login for a user
// creates an element based on the HTML id tag name for the login form and it adds another event listener (the same as the signup form) 
// waits for the user to press the submit button from the HTML
document.getElementById('signInForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  inloadingBar.style.width = '100%';


const email = document.getElementById('inEmailInput').value; // value for the users' existing email (thats registered in my websites' system)
const password = document.getElementById('inPasswordInput').value; // value for the password the user put in for their login (thats registered in my websites' system)


  // Simulate an asynchronous action (e.g., fetching data or processing something)
  setTimeout(() => {
   // Hide loading bar when the action is complete
   inloadingBar.style.width = '0';
 }, 8000); // Adjust the time according to your actual action time

  try { // means the code will attempt to run the code inside the curly brackets when the user pressed the submit button
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in as:", userCredential.user.email);
      alert("You have logged in to your account successfully!");
      hideEditAndDeleteButtons(); // ensures that as soon as they sign in, the system can instantly register its them
      // ^^ above is so they dont have to refresh to get the edit/delete button capabilities
      showContent('main-page'); // Show the main content after successful login
      inEmailInput.value = ''; // clears the input boxes after signin
      inPasswordInput.value = ''; // clears the input boxes after signin


      // Store login timestamp in Firestore
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          lastLogin: serverTimestamp()
      }, { merge: true });
      // catch means if the 'try' is unsucessful-- its like a response
      // if the inputted information is wrong when the user presses submit, the following happens:
  } catch (error) { 
      console.error("Error during login:", error.message); // this is what the inspect console will display if the user has made an error (the developer can only see this)
      alert(error.message, "...Please try again."); // this is what the user sees if they have made an error
  } 
});


// Add event listener to the account button
// creates an element to the id in the HTML file
const accountButton = document.getElementById('accountButton');
// when this element is 'clicked', it triggers that function above
accountButton.addEventListener('click', handleAccountButtonClick);

// function to handle when the user presses the 'account' button 
function handleAccountButtonClick(event) { // a reference to an event listener which is waiting for the user to press the 'account' button (in the HTML there is an 'onclick' thing)
  event.preventDefault(); // Prevent the default behavior of the link

  const user = auth.currentUser; // this means that "the user is logged in"

  if (user) { // if the user is logged in and present and the 'account' button is clicked
    console.log('User is logged in - sending them to account page')
    showContent('account');
  } else { // otherwise, if there isnt a user logged in and the 'account' button is clicked
    showContent('sign-in'); // this is where the user will be sent to
  }
}

// Check user status and update details
auth.onAuthStateChanged((user) => { // this means that it will check the user status and update the details
  updateUserDetails(user); // this means that it will update the users' details
});


// Function to update user details in the 'account' page
function updateUserDetails(user) { // creates a function based on the user details
  if (user) { // if there is a user present, it will do the following:
      const userEmailDisplay = document.getElementById('userEmailDisplay'); // this means that it will display the users' email in the 'account' page

      userEmailDisplay.textContent = `Your email: ${user.email}`; // this means that it will display the users' email in the 'account' page
  }
}


// sign out function
// creates an element based on the ID in the HTML file called 'signOutButton',
// ^^ where it then adds the event listener where once the user presses 'submit', which sends the comment through, then the following code will run:
document.getElementById('signOutButton').addEventListener('click', async () => {
  try {
    await auth.signOut();
    console.log('Current user has signed out')
    alert('You have been signed out of your account!');
    showContent('main-page');
    hideEditAndDeleteButtons(); // Call the function to hide edit and delete buttons
  } catch (error) {
    console.error('Error signing out:', error);
    alert('There was an error signing out. Please try again.');
  }
});


// const means that the variable is constant and cannot be changed
// creating a variable as a reference to the comments and stores it into a firestore database collection called "comments"
const commentsRef = collection(firestore, "comments");

// Form submission listener
// creates an element based on the ID in the HTML file called 'commentForm', 
// ^^ where it then adds the event listener where once the user presses 'submit', which sends the comment through, then the following code will run:
document.getElementById('commentForm').addEventListener('submit', async (e) => {
  e.preventDefault(); // prevent default means that it will prevent the default behaviour of the form submission
 
  // makes a constant spot in the website where the comment will be inputted (based on the ID element in the HTML file, 'commentText')
  const commentInput = document.getElementById('commentText'); 
  const commentText = commentInput.value.trim(); // this means that the comment will be trimmed (no spaces) and will be stored in the constant 'commentText' in the HTML file
  if (!commentText) return; // if there isnt a comment, then it will return to the start of the function until something does happen

  try { // try means that the code will attempt to run the code inside the curly brackets  once the user has pressed the submit button to post a comment
    // constant user is a reference to the user that is logged in
    const user = auth.currentUser; 
    // if there is a user present, then it will add the comment to the firestore database (otherwise it will show an error message)
    if (user) {
      await addDoc(commentsRef, { // it awaits for the user to press submit with a comment, then it will add the comment to the firestore database
        user: user.email, // adds the users' email to the database
        text: commentText, // adds the text to the database
        timestamp: serverTimestamp() // adds the timestamp of when the comment was posted to the database
      });
      commentInput.value = ''; // it then clears the comment input box so the comment isnt still there (makes it fresher for a new comment!!)
      console.log('Comment has been sent to database!') // sends an alert message to the user showing theyve successfully added a comment.
    } else { // if it didnt work or theyre not signed in, then the following will happen:
      console.error('User was not logged in'); // the inspect console log will show this message (only seen by developer)
      alert('Sorry, you must be logged in to be able to post a comment! ... '); // the user sees that they arent logged in
      alert('... Sending you to the login page ...'); // they are then sent to the register page to sign up or sign in
      showContent('sign-in'); // it takes them to the register page
    }
  } catch (error) { // if there is a general error, then the following will happen:
    console.error('An error with posting comment: ', error); // the inspect console log will show this message (only seen by developer)
    alert('There is an error with posting your comment... try again!'); // the user will see this message 
  }
});


// function to hide the edit and delete buttons depending
function hideEditAndDeleteButtons() {
  const user = auth.currentUser; // this means that we check the current logged in user
  const commentsList = document.getElementById('commentList'); // making a constant reference to the commentsList in the HTML file

  if (user) { // if there is a user logged
    commentsList.querySelectorAll('.comment').forEach(comment => { // for each comment in the commentsList, it will do the following:
      const commentUser = comment.querySelector('.comment-user'); // this means it will get the user that posted the comment
      const commentUserID = commentUser.textContent.split(':')[0].trim(); // this is a reference to the user that posted the comment

      const commentButtons = comment.querySelector('.comment-buttons'); // it will get the comment buttons
      const editButton = commentButtons.querySelector('.edit-button'); // getting the edit button
      const deleteButton = commentButtons.querySelector('.delete-button'); // getting the delete button

      editButton.removeEventListener('click', handleEditButtonClick); // above says 'remove' instead of 'add' because it will remove the event listener so that it doesnt duplicate

      deleteButton.removeEventListener('click', handleDeleteButtonClick); // clicking the delete button will trigger the function to delete the comment

      if (commentUserID === user.email) { // if the user that posted the comment is the same as the user that is logged in, then the following will happen:
        editButton.style.display = 'block'; // it will unhide the edit button
        deleteButton.style.display = 'block'; // it will unhide the delete button
        console.log('user email matches- enabling edit and delete buttons') // the inspect log will say this

      editButton.addEventListener('click', handleEditButtonClick); // clicking the edit button will trigger the function to edit the comment 
      deleteButton.addEventListener('click', handleDeleteButtonClick); // clicking the delete button will trigger the function to delete the comment 
      } else { // otherwise, if the user email doesnt match, then the following will happen:
        editButton.style.display = 'none'; // the edit button will stay hidden
        deleteButton.style.display = 'none'; // the delete button will stay hidden
      }
    });
  } else { // otherwise, if there isnt a user logged in, then the following will happen:
    // Nobody is logged in, hide all edit and delete buttons
    commentsList.querySelectorAll('.comment').forEach(comment => { // referencing the commentsList in the HTML file
      const commentButtons = comment.querySelector('.comment-buttons'); // referencing the comment buttons
      const editButton = commentButtons.querySelector('.edit-button'); // calling the edit button
      const deleteButton = commentButtons.querySelector('.delete-button'); // calling the delete button
 
      editButton.style.display = 'none'; // edit button will stay hidden
      deleteButton.style.display = 'none'; // edit button will stay hidden


      editButton.removeEventListener('click', handleEditButtonClick); // the event listener will be removed so that it doesnt duplicate
      deleteButton.removeEventListener('click', handleDeleteButtonClick); // the event listener will be removed so that it doesnt duplicate
    });
  }
}


// create a function to handle when the edit button is clicked
function handleEditButtonClick() {
  const comment = this.closest('.comment'); // refers to the closest comment that the user has made
  handleEditComment(comment); // it will then take them to the trigger of another function
}

// function to handle the edit comment action
function handleEditComment(comment) {
  const editedText = prompt('Edit your comment:', comment.querySelector('.comment-text').textContent);
  console.log('A comment will be edited!')

  // Get the comment ID from your comment element or another source
  const commentId = comment.getAttribute('data-comment-id');

  // Update the comment text
  if (editedText !== null) {
    comment.querySelector('.comment-text').textContent = editedText;

    // Update the comment on Firebase
    updateCommentOnFirebase(commentId, editedText);

    console.log('A comment has been edited!')
  }
}


// function to update the comment to firebase (async means that it will run the code inside the curly brackets at the same time as other code)
async function updateCommentOnFirebase(commentId, editedText) {
  if (!commentId) { // if the comment ID doesnt exist, then the following will happen:
    console.error('Invalid commentId:', commentId); 
    return; // return means that it will go back to the start of the function
  }

  const commentDocRef = doc(firestore, 'comments', commentId); // const commentDocRef is a reference to the comment in the firestore database

  try {
    // Check if the document exists before updating
    const commentDocSnapshot = await getDoc(commentDocRef);

    if (commentDocSnapshot.exists()) { // if the document does exists, it will then update
      await updateDoc(commentDocRef, { text: editedText }); // updates the comment in the firestore database
      console.log('Comment updated on Firestore!'); // inspect log saying it has been updated
    } 
  } catch (error) { // otherwise if that doesnt work, then the following will show:
    console.error('Error updating comment on Firestore:', error);
  }
}

// create a function to handle when the delete button is clicked
function handleDeleteButtonClick() { 
  const comment = this.closest('.comment'); // refers to the closest comment 
  handleDeleteComment(comment); // takes them to the trigger of another function
}

// Function to handle the delete action
function handleDeleteComment(comment) {
  const confirmDelete = confirm('Are you sure you want to delete this comment?');
  console.log('A comment will be deleted!')

  if (confirmDelete) {
    // Get the comment ID from your comment element or another source
    const commentId = comment.getAttribute('data-comment-id'); // Adjust this according to your HTML structure

    // Remove the comment from the UI
    comment.remove();

    // Delete the comment on Firebase
    deleteCommentOnFirebase(commentId);

    console.log('A comment has been deleted!')

  }
}

// function to delete and remove the comment in firebase (async means that it will run the code inside the curly brackets at the same time as other code)
async function deleteCommentOnFirebase(commentId) {
  const commentDocRef = doc(firestore, 'comments', commentId); // refers to the comment in the firestore database

  try {
    const commentDocSnapshot = await getDoc(commentDocRef); // checks if the document exists before deleting

    if (commentDocSnapshot.exists()) { // if this comment ID does exist
      await deleteDoc(commentDocRef, { deleted: true }); // then that checking doesnt need to happen again since the id matches
      console.log('Comment is deleted in Firestore!'); // the inspect log is then updated with a comment
    }
  } catch (error) { // otherwise if this doesnt work, then the following will show:
    console.error('Error deleting comment from Firestore:', error);
  }
}

// Call the function to initially hide/show edit and delete buttons
hideEditAndDeleteButtons();

// Real-time listener to display comments
// onSnapshot is a function that is used to listen to changes in the database (very helpful if you want to see if the user has posted a comment in firebase)
// they call it snapshot because it is a snapshot of the database
onSnapshot(query(commentsRef, orderBy('timestamp', 'asc')), (snapshot) => { // query is used to query the database
  // orderBy is used to order the comments by the timestamp (newest to oldest)
  const commentsList = document.getElementById('commentList'); // constant commentsList is a reference to the commentsList in the HTML file (where the comments will be displayed)

  // Map to store IDs of existing comments
  // map means that it will store the IDs of the existing comments
  const existingComments = new Map(); // this is needed so that the comments dont duplicate when the user posts a new comment!!

  // Get IDs of existing comments
  // childNodes means that it will get the IDs of the existing child comments
  commentsList.childNodes.forEach(comment => { // this means that it will get the IDs of the existing comments
    if (comment.nodeType === 1) { // Check for element nodes // if the comment is an element node, then it will do the following:
      existingComments.set(comment.id, true); // it will set the existing comments to true (meaning that they are there)
    }
  });

    snapshot.forEach((doc) => { // snapshot is referenced here, and forEach means that it will go through each comment in the database (doc is a reference to the comment)
      const comment = doc.data(); // constant comment is a reference to the comment in the database
      const commentID = doc.id; // refers to the ID of the comment in the database
      const commentUserID = comment.user

      // Check if comment already exists, then skip adding it
      if (!existingComments.has(commentID)) { // if there is an existing comment, then it will skip adding it
        const commentDiv = document.createElement('div'); // this means that it will create a div element in the HTML file
        commentDiv.id = commentID; // means that the comment will have an ID
        commentDiv.setAttribute('data-comment-id', commentID);
        commentDiv.classList.add('comment'); // it then adds the 'comment' to the div element

        const commentDate = comment.timestamp.toDate(); // this means that the comment will have a timestamp
        const timeDifference = getTimeDifference(commentDate); // it will then get a time difference between the comment and the timestamp
        comment.text = comment.text.replace(/\n/g, '<br>'); // this means that if the comment the user has made has line breaks, it will actually show in the comment as they made it

        // the following is what will be displayed on the website:
        commentDiv.innerHTML = `
          <div class="comment-user"><strong>${comment.user}:</strong><span class="time-stamp">${timeDifference}</span> <div class="comment-buttons"><button class="edit-button">Edit</button><button class="delete-button">Delete</button></div></div>
          <div class="comment-text">${comment.text}</div>
        `;
      
        commentsList.insertBefore(commentDiv, commentsList.firstChild);
        // commentsList.appendChild(commentDiv); // Append the comment to the commentsList
        hideEditAndDeleteButtons();
      }
    });
  });


// Function to calculate time difference
function getTimeDifference(commentDate) { // this calculates the time that the comment was posted (whether it was '1 day ago', '2 weeks ago' etc.)
  const now = new Date(); // constant now is a reference to the current date and time and then it will calculate the difference between the comment date and the current date
  const diff = now - commentDate; // then it shows a constant then which is the difference between the current date and the comment date

  const seconds = Math.floor(diff / 1000); // this means that it will calculate the difference in seconds
  const minutes = Math.floor(seconds / 60); // this means that it will calculate the difference in minutes
  const hours = Math.floor(minutes / 60); // this means that it will calculate the difference in hours
  const days = Math.floor(hours / 24); // this means that it will calculate the difference in days

  if (days > 0) { // if its been more than a day since the comment was posted, then it will show the following:
    return days === 1 ? '1 day ago' : `${days} days ago`;
  } else if (hours > 0) { // if its been more than an hour since the comment was posted, then it will show the following:
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (minutes > 0) { // if its been more than a minute since the comment was posted, then it will show the following:
    return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
  } else { // otherwise if it JUST happened, this will show (and then based on how long its been, itll show one of the other things above)
    return 'Just now';
  }
}


const cloadingBar = document.getElementById('cloadingBar');
const contactsRef = collection(firestore, "contacts")
document.getElementById('contactForm').addEventListener('submit', async (e)  => {
  e.preventDefault();
  cloadingBar.style.width = '100%';

   // Simulate an asynchronous action (e.g., fetching data or processing something)
   setTimeout(() => {
    // Hide loading bar when the action is complete
    cloadingBar.style.width = '0';
  }, 2000); // Adjust the time according to your actual action time

  const name = document.getElementById('cNameInput').value.trim();
  const email = document.getElementById('cEmailInput').value.trim();
  const message = document.getElementById('cMessageInput').value.trim();

  console.log('Name:', name, 'Email:', email, 'Message:', message); // Check if values are retrieved correctly

  if (!name || !email || !message) { // if there isnt any of these fields,, or all of them, then the following will happen:
    alert('Please fill in all fields.');
    return; // returns user to the start of the function
  }

  try {
    await addDoc(contactsRef, { // the contact details will be added to the firestore database
      name: name,
      email: email,
      message: message,
      timestamp: serverTimestamp()
    });

    // the following clears the fields after the user has sent the contact message
    cNameInput.value = '';
    cEmailInput.value = '';
    cMessageInput.value = '';

    console.log('Contact message sent to database!');
    alert('Your message has been sent successfully!');
    showContent('main-page');

  } catch (error) {
    console.error('Error sending contact message:', error);
    alert('There was an error sending your message. Please try again.');
  }
});