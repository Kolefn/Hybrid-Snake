




var app = angular.module('hybridSnake', ['ionic'])

  var getWidth = window.innerWidth;

  var getHeight = window.innerHeight;

  mute = false;

  
app.run(function($ionicPlatform, sharedData) {
    
 
    
  $ionicPlatform.ready(function() {
    
    
    
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider){
    
     $stateProvider
      .state('home', {
        cache: false,
        url: '/home',
        templateUrl: 'home.html'
      })
      .state('gameBoard', {
        cache: false,
        url: '/gameBoard.html',
        templateUrl: 'gameBoard.html'
      })
    $urlRouterProvider.otherwise("/home");
    
})

app.controller("controller", function($scope, $state, $window, sharedData) {
    
    
    $scope.soundButton = function() {
        
        if (!mute){
            mute = true;
        }else {
            mute = false;
        }
        
        
    }
    
    $scope.soundIconReturn = function() {
        
        if(!mute) {
            return 'ion-volume-medium';
        }else {
            return 'ion-volume-mute';
        }
    }
        
    $scope.startSound = function(soundPath) {
        if(!mute){
            sharedData.playSound(soundPath);
        }
    }
     
    
    $scope.openBrowser = function(url){
        window.open(url, '_system')
    }
    
    $scope.displayHighScore = function(){
        return sharedData.fetchHighScore();
    }
    
    
    $scope.myKeyListenerIonic = function(event) {
        
        myKeyListener(event)
        
    };

    document.addEventListener('touchstart', function (event) {
     
        event.preventDefault();
      
    })
    
    $scope.sendSpeed = function(speed){
        
        sharedData.setSpeed(speed);
        
        
        //fixes bug where game would break if user exited game before playing again
        sharedData.clearBlockPool();
       
        $state.go("gameBoard")
       
        
        
        
    }
        
})

.controller("gameBoardCtrl", function($scope, $state, $window, $ionicHistory, $rootScope,sharedData){
    
        
    
     triggerSound = function(soundPath) {
       if (!mute) { 
        sharedData.playSound(soundPath);
       }
    }
     
    
    var doCustomBack = function() {
        $state.go("home")
        
        
        
       
        
        
    };

    var oldSoftBack = $rootScope.$ionicGoBack;
        $rootScope.$ionicGoBack = function() {
            doCustomBack();
        };
        var deregisterSoftBack = function() {
            $rootScope.$ionicGoBack = oldSoftBack;
        };  
        
    $scope.$on("$ionicView.beforeEnter", function() {
            
            var mySnakeBoard = new SNAKE.Board( {
                                            boardContainer: "game-area",
                                            fullScreen: false,
                                            width: getWidth,
                                            height: getHeight - 40
                                            
                                        });
      
        $scope.speed = sharedData.getSpeed();
        snakeSpeed = $scope.speed;
        
        
        
       
        
})
  
    
})



app.service('sharedData', function($window,$ionicPlatform){
    
    var playSound = function(sound) {
        
        if (media){
            media.pause();
        }
        
        
        
        if($window.cordova){
            ionic.Platform.ready(function(){
                var src = sound
                if(ionic.Platform.is('android')){
                    src = '/android_asset/www' + src;
                }
                
                var media = new $window.Media(src);
                media.play();

            });
        } else {
            var media = new Audio();
            media.src = sound;
            media.load();
            media.play();
          
        }
        
       
    };

  
    
    
    var fetchHighScore = function(){
        return " " + getHighScore();
    }
    var clearBlockPool = function(){
        blockPool = [];
    }
    
    var speed = 0;
    
    var setSpeed = function(modeSpeed){
        speed = modeSpeed;
    }
    
    var getSpeed = function(){
        return speed;
    }
    
    return {
      
        playSound: playSound,
        fetchHighScore: fetchHighScore,
        clearBlockPool: clearBlockPool,
        setSpeed: setSpeed,
        getSpeed: getSpeed
    };
});
