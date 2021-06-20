importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
);
if (workbox) 
  console.log(`workbox sukses`);
else 
  console.log(`workbok gagal`);
workbox.precaching.precacheAndRoute( 
[
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },
  { url: '/pages/dashboard.html', revision: '1' },
  { url: '/pages/team.html', revision: '1' },
  { url: '/pages/saved.html', revision: '1' },
  { url: '/pages/contact.html', revision: '1' },
  { url: '/bundle.js', revision: '1' },
  { url: '/assets/css/materialize.min.css', revision: '1' },
  { url: '/assets/css/style.css', revision: '1' },
  { url: '/assets/img/bundesliga.jpg', revision: '1' },
  { url: '/assets/img/ligue1.jpg', revision: '1' },
  { url: '/assets/img/premier league.jpg', revision: '1' },
  { url: '/assets/img/primera division.png', revision: '1' },
  { url: '/assets/img/icon192.png', revision: '1' },
  { url: '/assets/img/icon512.png', revision: '1' },
  { url: '/assets/img/default.png', revision: '1' },
  { url: '/manifest.json', revision: '1' },
  { url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css', revision: '1' },
  { url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?v=4.7.0', revision: '1' },
  { url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.eot?#iefix&v=4.7.0', revision: '1' },
  { url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2?v=4.7.0', revision: '1' },
  { url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.woff?v=4.7.0', revision: '1' },
  { url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.ttf?v=4.7.0', revision: '1' },
  { url: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular', revision: '1' },
  { url: 'https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2', revision: '1' },
  { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
  { url: '/ico/apple-touch-icon-114x114.png', revision: '1' },
  { url: '/ico/apple-touch-icon-120x120.png', revision: '1' },
  { url: '/ico/apple-touch-icon-152x152.png', revision: '1' },
  { url: '/ico/apple-touch-icon-144x144.png', revision: '1' },
  { url: '/ico/apple-touch-icon-72x72.png', revision: '1' },
  { url: '/ico/apple-touch-icon-57x57.png', revision: '1' },
  { url: '/ico/apple-touch-icon-60x60.png', revision: '1' },
  { url: '/ico/apple-touch-icon-76x76.png', revision: '1' },
  { url: '/ico/favicon-128.png', revision: '1' },
  { url: '/ico/favicon-16x16.png', revision: '1' },
  { url: '/ico/favicon-196x196.png', revision: '1' },
  { url: '/ico/favicon-32x32.png', revision: '1' },
  { url: '/ico/favicon-96x96.png', revision: '1' },
  { url: '/ico/favicon.ico', revision: '1' },
  { url: '/ico/mstile-144x144.png', revision: '1' },
  { url: '/ico/mstile-150x150.png', revision: '1' },
  { url: '/ico/mstile-310x150.png', revision: '1' },
  { url: '/ico/mstile-310x310.png', revision: '1' },
  { url: '/ico/mstile-70x70.png', revision: '1'}

],
  {
    ignoreUrlParametersMatching: [/.*/],
  }
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.networkFirst({
    cacheName: 'fetch',
  })
);

  self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: '/assets/img/icon192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });
  
