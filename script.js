console.log("JavaScript funktioniert");

const button =
document.getElementById("mehr-erfahren");

button.addEventListener("click", function () {

    alert("Willkommen auf meiner Homepage! Diese Seite befindet sich noch in der Entwicklungs- und Aufbauphase");
    document
    .getElementById("about")
    .scrollIntoView({
        behavior: "smooth"
    });

});