// community.js

// Store posts
let posts = [];

// Function to display posts
function displayPosts() {
  const ul = document.getElementById("postList");
  ul.innerHTML = "";

  if (posts.length === 0) {
    ul.innerHTML = "<li>No community posts yet. Be the first!</li>";
    return;
  }

  posts.forEach(post => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${post.name}</strong><br>${post.content}`;
    if (post.image) {
      const img = document.createElement("img");
      img.src = post.image;
      img.style.maxWidth = "100%";
      img.style.borderRadius = "5px";
      img.style.marginTop = "5px";
      li.appendChild(img);
    }
    ul.appendChild(li);
  });
}

// Function to add a new post
function addNewPost() {
  const content = document.getElementById("postContent").value.trim();
  const imageFile = document.getElementById("postImage").files[0];

  // Get logged-in user from localStorage
  const name = localStorage.getItem("loggedInUser") || "Anonymous";

  if (!content) {
    alert("Please enter content");
    return;
  }

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      posts.unshift({name, content, image: e.target.result});
      displayPosts();
      resetForm();
    };
    reader.readAsDataURL(imageFile);
  } else {
    posts.unshift({name, content, image: null});
    displayPosts();
    resetForm();
  }
}

// Reset input fields
function resetForm() {
  document.getElementById("postContent").value = "";
  document.getElementById("postImage").value = "";
}

// Display initial posts on page load
window.onload = displayPosts;