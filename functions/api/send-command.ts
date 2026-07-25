import { SignJWT, importPKCS8 } from 'jose';

async function getAccessToken(clientEmail, privateKey) {
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

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { action, token, extraData = {} } = body;

    if (!action || !token) {
      return new Response(JSON.stringify({ error: 'Missing action or token' }), { status: 400 });
    }

    const clientEmail = env.FIREBASE_CLIENT_EMAIL;
    const privateKey = env.FIREBASE_PRIVATE_KEY;
    const projectId = env.FIREBASE_PROJECT_ID;

    if (!clientEmail || !privateKey || !projectId) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration: Missing Firebase Credentials' }), { status: 500 });
    }

    const accessToken = await getAccessToken(clientEmail, privateKey);

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
  } catch (error) {
    console.error('FCM Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
