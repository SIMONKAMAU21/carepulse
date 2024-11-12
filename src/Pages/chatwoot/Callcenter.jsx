import React, { useEffect } from 'react';
import '../chatwoot/callcenter.css'
const Callcenter = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const userLoggedIn = !!user;


    if (userLoggedIn) {
      (function(d, t) {
        const BASE_URL = "https://app.chatwoot.com";
        const g = d.createElement(t), s = d.getElementsByTagName(t)[0];
        g.src = BASE_URL + "/packs/js/sdk.js";
        g.async = true;
        g.defer = true;
        s.parentNode.insertBefore(g, s);
        g.onload = function() {
          window.chatwootSDK.run({
            websiteToken: "y3UBr9K1hNusY3hknPK6TGGa", 
            baseUrl: BASE_URL,
            locale: 'en',
          });
         
          setTimeout(() => {
            window.$chatwoot && window.$chatwoot.toggle();
          }, 500); 
        };
      })(document, "script");
    }

    // Optional cleanup
    return () => {
      const chatwootScript = document.querySelector(`script[src="https://app.chatwoot.com/packs/js/sdk.js"]`);
      if (chatwootScript) {
        chatwootScript.remove();
      }
    };
  }, []);

};

export default Callcenter;
