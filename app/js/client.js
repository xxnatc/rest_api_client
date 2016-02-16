const angular = require('angular');
const salemApp = angular.module('salemApp', []);

salemApp.controller('usersController', ['$scope', '$http', ($scope, $http) => {
  $scope.signup = (user) => {
    $scope.authWarning = null;
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/signup',
      data: user
    })
      .then((res) => {
        $scope.token = res.data.token;
      }, (err) => {
        console.log(err);
        $scope.authWarning = err.data.msg;
      });
  };

  $scope.signin = (user) => {
    $scope.authWarning = null;
    $http({
      method: 'GET',
      url: 'http://localhost:3000/api/signin',
      headers: { 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password) }
    })
      .then((res) => {
        $scope.token = res.data.token;
      }, (err) => {
        console.log(err);
        $scope.authWarning = err.data.msg;
      });
  };

  $scope.logout = () => {
    $scope.token = null;
  };
}]);


salemApp.controller('townsController', ['$scope', '$http', ($scope, $http) => {
  $scope.towns = [];
  $http.get('http://localhost:3000/api/towns')
    .then((res) => {
      $scope.towns = res.data;
    }, (err) => {
      console.log(err);
    });

  function errorMsg(msg) {
    if (msg === 'invalid token')
      return $scope.townsWarning = 'Please sign in or register to customize your characters';
  }

  $scope.createTown = (newTown) => {
    $scope.townsWarning = null;
    if ($scope.token && (typeof newTown.braveness === 'undefined' || newTown.braveness === null))
      newTown.braveness = Math.floor(Math.random() * 101);

    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/towns',
      headers: { 'token': $scope.token },
      data: newTown
    })
      .then((res) => {
        $scope.towns.push(res.data);
        $scope.newTown = null;
      }, (err) => {
        console.log(err);
        errorMsg(err.data.msg);
      });
  };

  $scope.deleteTown = (town) => {
    $scope.townsWarning = null;
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/towns/' + town._id,
      headers: { 'token': $scope.token }
    })
      .then(() => {
        $scope.towns = $scope.towns.filter((el) => el !== town);
      }, (err) => {
        console.log(err);
        errorMsg(err.data.msg);
      });
  };

  $scope.updateCheck = (town) => {
    if (!$scope.token) return errorMsg('invalid token');
    $scope.townsWarning = null;
    town.editing = true;
  };

  $scope.updateTown = (town) => {
    $http({
      method: 'PUT',
      url: 'http://localhost:3000/api/towns/' + town._id,
      headers: { 'token': $scope.token },
      data: town
    })
      .then(() => {
        town.editing = false;
      }, (err) => {
        console.log(err);
        town.editing = false;
        errorMsg(err.data.msg);
      });
  };
}]);


salemApp.controller('mafiasController', ['$scope', '$http', ($scope, $http) => {
  $scope.mafias = [];
  $http.get('http://localhost:3000/api/mafias')
    .then((res) => {
      $scope.mafias = res.data;
    }, (err) => {
      console.log(err);
    });

  function errorMsg(msg) {
    if (msg === 'invalid token')
      return $scope.mafiasWarning = 'Please sign in or register to customize your characters';
  }

  $scope.createMafia = (newMafia) => {
    $scope.mafiaWarning = null;
    if ($scope.token && (typeof newMafia.skill === 'undefined' || newMafia.skill === null))
      newMafia.skill = Math.floor(Math.random() * 101);

    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/towns',
      headers: { 'token': $scope.token },
      data: newMafia
    })
      .then((res) => {
        $scope.mafias.push(res.data);
        $scope.newMafia = null;
      }, (err) => {
        console.log(err);
        errorMsg(err.data.msg);
      });
  };

  $scope.deleteMafia = (mafia) => {
    $scope.mafiaWarning = null;
    $http({
      method: 'DELETE',
      url: 'http://localhost:3000/api/mafias/' + mafia._id,
      headers: { 'token': $scope.token }
    })
      .then(() => {
        $scope.mafias = $scope.mafias.filter((el) => el !== mafia);
      }, (err) => {
        console.log(err);
        errorMsg(err.data.msg);
      });
  };

  $scope.updateCheck = (mafia) => {
    if (!$scope.token) return errorMsg('invalid token');
    $scope.mafiaWarning = null;
    mafia.editing = true;
  };

  $scope.updateMafia = (mafia) => {
    $http({
      method: 'PUT',
      url: 'http://localhost:3000/api/mafias/' + mafia._id,
      headers: { 'token': $scope.token },
      data: mafia
    })
      .then(() => {
        mafia.editing = false;
      }, (err) => {
        console.log(err);
        mafia.editing = false;
        errorMsg(err.data.msg);
      });
  };
}]);
