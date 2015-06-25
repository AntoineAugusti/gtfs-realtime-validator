/**
 * **********************************************************************************************************************
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this fileexcept in compliance with the License. You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 * **********************************************************************************************************************
 */

//function to calculate the time elapsed from entering the page.
var start = new Date();

function getTimeElapsed(){
    var elapsed = new Date() - start;

    var seconds = Math.round(elapsed / 1000);
    var minutes = Math.round(seconds / 60);
    var hours = Math.round(minutes / 60);

    var sec = TrimSecondsMinutes(seconds);
    var min = TrimSecondsMinutes(minutes);

    function TrimSecondsMinutes(elapsed) {
        if (elapsed >= 60)
            return TrimSecondsMinutes(elapsed - 60);
        return elapsed;
    }

    $("#time-elapsed").text(hours + "h "+ min + "m " + sec + "s");
}

setInterval(getTimeElapsed,1000);

//function that draws the graph using Flot graph
$(function() {

    var updateInterval = 5000;
    var countData = [];

    //TODO: Change to get number of vehicles
    function getVehicleCount() {
        //TODO: Add servelet to get vehicle count from the feed
        //TODO: In the background process keep current
        //TODO: Ajax call to the servlet to get the json with the count
        $.get("http://localhost:8080/count").done(function (data) {
            //var counts = $.parseJSON(data);

            countData = [];
            for(var count in data) {
                countData.push([count, data[count].tripCountCount])
                //alert(data[count].tripCountCount);
            }

        }).then(function(){
            update();
        });
    }

    var plot = $.plot("#placeholder", [ countData ], {
        series: {
            shadowSize: 0	// Drawing is faster without shadows
        },
        yaxis: {
            min: 0,
            max: 500
        },
        xaxis: {
            show: true,
            min: 0,
            max: 10
        }
    });

    setInterval(getVehicleCount, updateInterval);

    function update() {
        plot.setData([ countData ]);
        plot.draw();
    }

});