console.log("JavaScript funktioniert");

const button =
document.getElementById("mehr-erfahren");

button.addEventListener("click", function () {

    alert("Willkommen auf meiner Homepage!");
    document
    .getElementById("about")
    .scrollIntoView({
        behavior: "smooth"
    });

});