import type { APIRoute } from 'astro';
import { SignJWT, importPKCS8 } from 'jose';

// Helper to get Google OAuth2 Access Token using JWT
async function getAccessToken(clientEmail: string, privateKey: string) {
  // Format private key correctly if passed as single line
  const formattedPrivateKey = privateKey.replace(/\\n/g, '\n');
  const privateKeyObj = await importPKCS8(formattedPrivateKey, 'RS256');
  
  const jwt = await new SignJWT({
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: 'https://oauth2.googleapis.com/token',
  })
    .setProtectedHeader({ alg: 'RS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKeyObj);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Token fetch failed: ${data.error_description || JSON.stringify(data)}`);
  }
  return data.access_token;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { action, token, extraData = {} } = body;

    if (!action || !token) {
      return new Response(JSON.stringify({ error: 'Missing action or token' }), { status: 400 });
    }

    // Since Astro 4+, process.env is supported natively or via import.meta.env
    // Cloudflare Pages supplies env via context.locals on edge, but we'll try import.meta.env first
    const clientEmail = import.meta.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = import.meta.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY;
    const projectId = import.meta.env.FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID;

    if (!clientEmail || !privateKey || !projectId) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing Firebase Credentials' }), { status: 500 });
    }

    // 1. Get OAuth Access Token
    const accessToken = await getAccessToken(clientEmail, privateKey);

    // 2. Send FCM Push Notification
    const fcmResponse = await fetch(`https://fcm.googleapis.com/v1/projects/${projectId}/messages:send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: {
          token: token,
          data: {
            action: action,
            ...extraData
          }
        }
      })
    });

    const result = await fcmResponse.json();
    
    if (!fcmResponse.ok) {
      throw new Error(`FCM API Error: ${JSON.stringify(result)}`);
    }

    return new Response(JSON.stringify({ success: true, message: 'FCM sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('FCM Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
