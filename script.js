console.log("JavaScript funktioniert");

const button = document.getElementById("mehr-erfahren");

if (button) {
    button.addEventListener("click", function () {
        alert("Willkommen auf meiner Homepage! Diese Seite befindet sich noch in der Entwicklungs- und Aufbauphase");
        
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}
