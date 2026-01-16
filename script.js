function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please enter username and password");
        return;
    }

    alert("Login successful!");
    // Next step:
    // window.location.href = "home.html";
}
<script>
  function goHome() {
    window.location.href = "home.html";
  }
</script>