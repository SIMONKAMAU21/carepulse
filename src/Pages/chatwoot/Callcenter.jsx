import { Box, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Callcenter = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('user', user)
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

          // Automatically open the Chatwoot widget when it loads
          setTimeout(() => {
            if (window.$chatwoot) {
              window.$chatwoot.toggle();

              // Find the Chatwoot iframe and add the full-screen CSS class
              const chatwootIframe = document.querySelector("iframe[title='chatwoot-web-widget']");
              if (chatwootIframe) {
                chatwootIframe.classList.add("chatwoot-fullscreen");
              }
            }
          }, 200);
        };
      })(document, "script");
    }

    // Optional cleanup to remove the script on unmount
    return () => {
      const chatwootScript = document.querySelector(`script[src="https://app.chatwoot.com/packs/js/sdk.js"]`);
      if (chatwootScript) {
        chatwootScript.remove();
      }
    };
  }, []);
  return(
    <>
    <Box>
      <Text>hey</Text>
    </Box>
    
    </>
  )
};

export default Callcenter;
