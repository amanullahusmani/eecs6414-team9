let yorkU_data = {
    type: 'scattermapbox',
    name: 'YorkU',
    lat: ['43.7735'],
    lon: ['-79.5019'],
    mode: 'markers',
    marker: {
        color: 'rgb(255, 0, 0)',
        size: 14,
    },
    text: ['YorkU']
};

let dashboard_data = [yorkU_data];
// Plotly.d3.csv('static/data/final.CSV', function (err, rows) {
//         function unpack(rows, key) {
//             return rows.map(function (row) {
//                 return row[key];
//             });
//         }
//
//         scl = [
//             [0, 'rgb(0, 25, 255)'],
//             [0.2, 'rgb(0, 152, 255)'],
//             [0.4, 'rgb(44, 255, 150)'],
//             [0.5, 'rgb(151, 255, 0)'],
//             [0.6, 'rgb(255, 234, 0)'],
//             [0.8, 'rgb(255, 111, 0)'],
//             [1, 'rgb(255, 0, 0)']];
//
//         let final_data =
//             {
//                 type: 'scattermapbox',
//                 mode: 'markers',
//                 lon: unpack(rows, 'cent_long'),
//                 lat: unpack(rows, 'cent_lat'),
//                 text: unpack(rows, 'name'),
//                 name: 'score',
//                 marker: {
//                     color: unpack(rows, 'scores'),
//                     colorscale: scl,
//                     cmin: 0,
//                     cmax: 1,
//                     reversescale: false,
//                     size: 10,
//                     opacity: 0.9,
//                     colorbar: {
//                         thickness: 10,
//                         titleside: 'right',
//                         outlinecolor: 'rgba(68,68,68,0)',
//                     }
//                 }
//             };
//         dashboard_data.push(final_data);
// });

Plotly.d3.csv('static/data/yuride_postalcodes_filtered_latlng_only.CSV', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    scl = [
        [0, 'rgb(0, 25, 255)'],
        [0.175, 'rgb(0, 152, 255)'],
        [0.375, 'rgb(44, 255, 150)'],
        [0.5, 'rgb(151, 255, 0)'],
        [0.625, 'rgb(255, 234, 0)'],
        [0.75, 'rgb(255, 111, 0)'],
        [1, 'rgb(255, 0, 0)']];

    let student_data =
        {
            type: 'scattermapbox',
            mode: 'markers',
            lon: unpack(rows, 'Longitude'),
            lat: unpack(rows, 'Latitude'),
            text: unpack(rows, 'Place Name'),
            name: 'students',
            marker: {
                color: unpack(rows, 'Count'),
                colorscale: scl,
                cmin: 0,
                cmax: 473,
                reversescale: true,
                size: 8,
                opacity: 0.5,
            }
        };

    dashboard_data.push(student_data);

});


Plotly.d3.csv('static/data/all_unique_fitness.CSV', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    let fit_data =
        {
            type: 'scattermapbox',
            mode: 'markers',
            lon: unpack(rows, 'long'),
            lat: unpack(rows, 'lat'),
            text: unpack(rows, 'name'),
            name: 'fitness',
            marker: {
                color: unpack(rows, 'rating'),
                colorscale: 'Greens',
                cmin: 0,
                cmax: 5,
                reversescale: false,
                size: 10,
                opacity: 1,
            }
        };

    dashboard_data.push(fit_data);

});

Plotly.d3.csv('static/data/all_unique_supermarkets.CSV', function (err, rows) {
    function unpack(rows, key) {
        return rows.map(function (row) {
            return row[key];
        });
    }

    let sup_data =
        {
            type: 'scattermapbox',
            mode: 'markers',
            lon: unpack(rows, 'long'),
            lat: unpack(rows, 'lat'),
            text: unpack(rows, 'name'),
            name: 'supermarkets',
            marker: {
                color: unpack(rows, 'rating'),
                colorscale: 'Blues',
                cmin: 0,
                cmax: 5,
                reversescale: false,
                size: 10,
                opacity: 1,
            }
        };

    dashboard_data.push(sup_data);

});


Plotly.d3.json('static/data/york.geojson', function (torontojson) {
    Plotly.d3.csv('static/data/all_unique_restaurants.CSV', function (err, rows) {
        function unpack(rows, key) {
            return rows.map(function (row) {
                return row[key];
            });
        }

        let rest_data =
            {
                type: 'scattermapbox',
                mode: 'markers',
                lon: unpack(rows, 'long'),
                lat: unpack(rows, 'lat'),
                text: unpack(rows, 'name'),
                name: 'restaurants',
                marker: {
                    color: unpack(rows, 'rating'),
                    colorscale: 'Reds',
                    cmin: 0,
                    cmax: 5,
                    reversescale: false,
                    size: 10,
                    opacity: 1,
                }
            };

        dashboard_data.push(rest_data);

        let data_layers = [];
        for (let feature_num = 0; feature_num < torontojson["features"].length; feature_num++) {
            let source = torontojson["features"][feature_num];

            let r_value = 255;
            let g_value = 500- source["score"] * 255;
            let b_value = 500- source["score"] * 255;

            let color = 'rgba(' + r_value + ', ' + g_value + ', ' + b_value + ', 0.6)';
            // let color = 'rgba(255, 200, 200, 0.5)';
            data_layers.push(
                {
                    sourcetype: 'geojson',
                    source: source,
                    type: 'fill',
                    color: color,
                }
            );
        }

        let layout = {
            autosize: true,
            title: "Toronto",
            height: 450,
            showlegend: true,
            hovermode: 'closest',
            margin: {
                r: 10,
                t: 10,
                b: 10,
                l: 10,
                pad: 0
            },
            yaxis: {
                fixedrange: true
            },
            xaxis: {
                fixedrange: true
            },
            mapbox: {
                center: {
                    lat: 43.7735,
                    lon: -79.5019
                },
                // style: 'light',
                zoom: 10,
                layers: data_layers,
            }
        };


        Plotly.plot('dashboardDiv', dashboard_data, layout, {
            mapboxAccessToken: 'pk.eyJ1IjoiamF5a2Fyb255b3JrIiwiYSI6ImNqa2JjZzNkeTA5ZGkzcG55OXhmcnZxMTIifQ.XotoTIdsT-bYoQpodyW3xg',
            scrollZoom: false
        });

    });


});
