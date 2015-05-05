//This is controller for profile partial page.

app.controller('profileCtrl', function ($scope) {
    console.log('PageProfile');

    // Mockup data, to be replaced
    $scope.userProfile =
        {
            "first_name": "Sherlock",
            "last_name": "Holmes",
            "email": "sherlock.Watson@uber.com",
            "picture": "http://www.rlsandbox.com/img/profile.jpg",
            "promo_code": "teypo",
            "uuid": "91d81273-45c2-4b57-8124-d0165f8240c0"
        }

    // Sample Json Object returned here temporarily
    $scope.userHistory =
        {
            "offset": 0,
            "limit": 1,
            "count": 2,
            "history": [
              {
                  "status": "completed",
                  "distance": 1.64691465,
                  "request_time": 1428876188,
                  "start_time": 1428876374,
                  "start_city": {
                      "latitude": 37.7749295,
                      "display_name": "San Francisco",
                      "longitude": -122.4194155
                  },
                  "end_time": 1428876927,
                  "request_id": "37d57a99-2647-4114-9dd2-c43bccf4c30b",
                  "currency_code": "USD",
                  "product_id": "a1111c8c-c720-46c3-8534-2fcdd730040d"
              },
              {
                  "status": "completed",
                  "distance": 2.64691465,
                  "request_time": 1431360364,
                  "start_time": 1428897780,
                  "start_city": {
                      "latitude": 37.7749295,
                      "display_name": "San Francisco",
                      "longitude": -122.4194155
                  },
                  "end_time": 1428898200,
                  "request_id": "37d57a99-2647-4114-9dd2-c43bccf4c30b",
                  "currency_code": "USD",
                  "product_id": "a1111c8c-c720-46c3-8534-2fcdd730040d"
              }
            ]
        };

    var LocationMap = new Map();
    $scope.currentFav =
        {
            "cityName": "",
            "frequency": 0
        };
    $scope.lastTrip =
        {
            "tripInfo": null,
            "comment": ""
        };


    if ($scope.userHistory.count) {
        $scope.lastTrip.tripInfo = $scope.userHistory.history[$scope.userHistory.count - 1];
        $scope.lastTrip.comment = new Date($scope.lastTrip.tripInfo.start_time*1000);
        for (var i = 0; i < $scope.userHistory.count; i++) {
            var historyItem = $scope.userHistory.history[i];
            if (historyItem.status == "completed") {
                var cityName = historyItem.start_city.display_name;
                if (LocationMap.has(cityName)) {
                    LocationMap.set(cityName, LocationMap.get(cityName) + 1);
                    if ($scope.currentFav.frequency < LocationMap.get(cityName)) {
                        $scope.currentFav.cityName = cityName;
                        $scope.currentFav.frequency = LocationMap.get(cityName);
                    }
                }
                else
                    LocationMap.set(cityName, 1);
            }
        }
    }
    else {
        $scope.currentFav.cityName = "No data yet.";
        $scope.lastTrip.comment = "No data yet."
    }


});