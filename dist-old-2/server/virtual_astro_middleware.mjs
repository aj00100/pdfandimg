import { d as defineMiddleware, s as sequence } from "./chunks/sequence_AEcFSQau.mjs";
const onRequest$1 = defineMiddleware(async (context, next) => {
  const response = await next();
  if (response.status === 404 && context.url.pathname !== "/404") {
    return context.rewrite("/404");
  }
  return response;
});
const onRequest = sequence(
  onRequest$1
);
export {
  onRequest
};
