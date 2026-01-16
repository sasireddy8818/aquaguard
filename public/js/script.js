// Login function
function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Login success:", userCredential.user.email);
      window.location.replace("home.html");
    })
    .catch((error) => {
      console.error(error);
      alert(error.message);
    });
}

// Logout function
function logout() {
  auth.signOut()
    .then(() => window.location.href = "login.html")
    .catch(err => alert(err.message));
}

// Redirect if not logged in
auth.onAuthStateChanged(user => {
  if (!user) window.location.href = "login.html";
});