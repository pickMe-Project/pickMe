import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    google: any;
  }
}

function GoogleLogin() {
   const route = useRouter()
  useEffect(() => {
    // Check if Google API script is already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => initializeGoogleLogin();
      document.body.appendChild(script);
    } else {
      initializeGoogleLogin();
    }
  }, []);

  const initializeGoogleLogin = () => {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      callback: async (response: any) => {
        try {
          console.log("Encoded JWT ID token: " + response.credential);
          const { data } = await axios.post('http://localhost:3000/api/auth/google', {
            googleToken: response.credential,
          });

          localStorage.setItem('access_token', data.access_token);

          const responseBody = await response.json();

          if (responseBody && responseBody.access_token) {
            document.cookie = `Authorization=Bearer ${responseBody.access_token}; path=/`;
            window.location.href = "/";
          } else {
            console.error("Invalid response body:", responseBody);
            window.location.href = "/login?error=Invalid+response+from+server";
          }


          // Navigate to the home page or perform other actions
          // For example, redirect:
          // window.location.href = '/home';
        } catch (error) {
          console.error('Error during Google login:', error);
        }
      },
    });

    window.google.accounts.id.renderButton(
      document.getElementById('buttonDiv')!,
      { theme: 'outline', size: 'large' },
    );

    // Display the One Tap dialog
    window.google.accounts.id.prompt();
  };

  return <div id="buttonDiv"></div>;
}

export default GoogleLogin;
