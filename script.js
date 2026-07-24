function showMessage(){

    const date = new Date();

    document.getElementById("message").innerHTML =
        "✅ Website is running successfully.<br><br>" +
        "Deployment Time: " +
        date.toLocaleString();

}