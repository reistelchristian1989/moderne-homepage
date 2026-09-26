console.log("JavaScript funktioniert");

const button = document.getElementById("mehr-erfahren");

if (button) {
    button.addEventListener("click", function () {
        alert("Willkommen auf meiner Homepage! Diese Seite befindet sich noch in der Entwicklungs- und Aufbauphase... NEU! cr.dev.monkey!!! Unter dem reiter cr.dev.monkey-Store wird ein kleiner eigener Store entstehen in dem es zu anfang Software, Apps, WebApplicationen geben wird. Natürlich OpenSource und frei zum Download. Hier werde ich aktuelle Projekte, Arbeiten von mir Präsentieren bevor sie in anderen Stores erhältlich ist.");
        
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
            aboutSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}
