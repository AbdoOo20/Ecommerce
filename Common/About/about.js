const LogeOutIcon = document.getElementById("LogeOutIcon");
LogeOutIcon.style.display = "none";

onAuthStateChanged(auth, (user) => {
    if (user) {
         // SingOut  
        LogeOutIcon.style.display = "inline-block";
        LogeOutIcon.addEventListener('click', function () {
            signOut(auth).then(() => {
                localStorage.clear();
                window.location.href = '../../Common/Authentication/login.html';
            }).catch((error) => {
                alert('Error signing out: ', error);
            });
        });
    }
})