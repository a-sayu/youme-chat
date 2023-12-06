// cria o mapa
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [-22.12060105253032, -51.40797015841152],
    zoom: 14
});

function runDirections(start, end) {

    // recria o mapa (para que nâo haja sobreposição de rotas)
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [-22.12060105253032, -51.40797015841152],
        zoom: 14
    });

    var route = MQ.routing.directions();

    route.route({
        locations: [
            start,
            end
        ]
    });

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        },

        createEndMarker: (location) => {
            var custom_icon;
            var marker;

            custom_icon = L.icon({
                iconUrl: 'img/blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });

            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);

            return marker;
        }
    });

    map.addLayer(new CustomRouteLayer({
        directions: route,
        fitBounds: true
    }));
}

// roda quando o formulário é submetido
function submitForm(event) {
    event.preventDefault();
    
    //delete o mapa antigo
    map.remove();

    //Pega os endereços do mapa
    start = document.getElementById("start").value;
    end = document.getElementById("destination").value;

    //run directions value
    runDirections(start, end);
    
    //reseta o formulário
    document.getElementById("form").reset();

}

// atribui o elemento form à uma constante
const form = document.getElementById('form');

// quando der submit no formulario, roda a funcao submitForm
form.addEventListener('submit', submitForm)