export { };

declare global {
   namespace Express {
      interface Request {
         decoded: any | undefined;
         userInfo: any | undefined;
      }
   }
}
