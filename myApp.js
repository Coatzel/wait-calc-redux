var app = angular.module("myApp", ['ngRoute', 'ngAnimate']).value('details', {
    subtotal: 0,
    tip: 0,
    total: 0,
    tiptotal: 0,
    count: 0,
    atpm: 0
})
app.run(function($rootScope, $location, $timeout) {
		$rootScope.$on('$routeChangeError', function() {
			$location.path('/');
		});
		$rootScope.$on('$routeChangeStart', function() {
			$rootScope.isLoading = true;
		});
		$rootScope.$on('$routeChangeSuccess', function() {
			$timeout(function() {
				$rootScope.isLoading = false;
                console.log($location);
			}, 1000);
		});
})





.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'home.html',
            controller: 'myCtrl as vm'
        }).when('/new-meal.html', {
            templateUrl: 'new-meal.html',
            controller: 'myCtrl as vm'
        }).when('/my-earn.html', {
            templateUrl: 'my-earn.html',
            controller: 'myCtrl as vm'
        })
        .otherwise('/')
    }])

app.controller("myCtrl", [
    '$rootScope',
    'details',
    function($rootScope, details) {
        vm = this;
        console.log(details);
        updateView()

        function updateView() {
            vm.subtotal = details.subtotal; //passing value in view
            vm.tip = details.tip; //passing value in view
            vm.total = details.total; //passing value in view
            vm.tiptotal = details.tiptotal;
            vm.count = details.count;
            vm.atpm = details.atpm;
        };

        vm.addTotal = function() {
            console.log("test");

            details.subtotal = vm.meal + (vm.meal * (vm.tax / 100));
            details.tip = vm.meal * (vm.tippercent / 100);
            details.total = details.subtotal + details.tip;

            details.tiptotal = details.tiptotal + details.tip;
            details.count = details.count + 1;
            details.atpm = details.tiptotal / details.count;

            updateView();
            vm.reset();
            console.log(details);

        }

        vm.reset = function() {
            vm.meal = null;
            vm.tax = null;
            vm.tippercent = null;
        }

        vm.earnReset = function() {
            details.subtotal = 0, //passing value in view
            details.tip = 0, //passing value in view
            details.total = 0, //passing value in view
            details.tiptotal = 0,
            details.count = 0,
            details.atpm = 0;
            updateView();
            console.log("test");
            console.log(details);

        }

    }
]);
