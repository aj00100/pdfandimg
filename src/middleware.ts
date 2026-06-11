import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  
  // If the status is 404, rewrite to the custom 404 page
  if (response.status === 404 && context.url.pathname !== '/404') {
    return context.rewrite("/404");
  }
  
  return response;
});
