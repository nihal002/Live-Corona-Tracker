



const start = document.querySelector("#start");
const stop = document.querySelector("stop");


// variables


var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3');
var currentlatitude;
var currentlongitude;
var currentlatituderadian;
var currentlongituderadian;
var latituderadian;
var longituderadian;
var ans;
var flag;
// ans = 6;
// console.log(ans);
var R = 6371;

// start.addEventListener("click", () => {
navigator.geolocation.getCurrentPosition(meta => {
    // navigator.geolocation.watchPosition(data => {
    console.log(meta);
    // coordinates.push([data.coords.longitude, data.coords.latitude]);
    currentlatitude = meta.coords.latitude;
    currentlongitude = meta.coords.longitude;

    // console.log(currentlongitude);

    currentlatituderadian = (currentlatitude / 57.29577951);
    currentlongituderadian = (currentlongitude / 57.29577951);

    // window.localStorage.setItem(
    //     "coordinates",
    //     JSON.stringify(coordinates)
    // );
}, (error) => console.log(error),
    {
        enableHighAccuracy: true
    }
);
// });





// console.log(ans);
// Loop2:

function UpdateMap() {
    setTimeout(function () {
        fetch("data.json")
            .then(response => response.json())
            .then(rsp => {
                // console.log(rsp)
                rsp.data.forEach(element => {

                    latitude = element.latitude;
                    longitude = element.longitude;


                    latituderadian = (latitude / 57.29577951);
                    longituderadian = (longitude / 57.29577951);

                    var dlong = currentlongituderadian - longituderadian;
                    var dlat = currentlatituderadian - latituderadian;



                    var ans = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(latituderadian) * Math.cos(currentlatituderadian) * Math.pow(Math.sin(dlong / 2), 2);

                    ans = 2 * Math.asin(Math.sqrt(ans));

                    ans = ans * R;

                    // console.log(ans);

                    if (ans <= 500) {
                        alert(`stay safe you are in red zone your nearest red zone area is ${element.name} `);
                        flag = 1;
                        new mapboxgl.Marker({
                            draggable: false,
                            color: "rgb(255, 0 , 0)"
                        })
                            .setLngLat([longitude, latitude])
                            .addTo(map);

                        // alert(element.name);

                        // break Loop2;
                    }
                    if (flag == 1 && ans <=500) {
                        audio.play();
                    }


                    cases = element.infected;



                    
                    if (cases >= 1000) {
                        color = "rgb(255, 0 , 0)";
                    }
                    else if (cases >= 500 && cases < 1000) {
                        color = "rgb(255,128,0)";
                    }
                    else {
                        color = "rgb(0,255,0";
                    }


                    // mark each location given in data.json file
                    // yha map paste krna hai
                    // new mapboxgl.Marker({
                    //     draggable: false,
                    //     color: color
                    // })
                    //     .setLngLat([longitude, latitude])
                    //     .addTo(map);

                });


            })

    }, 10000);
}
UpdateMap();
