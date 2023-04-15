export { };

declare global {
   namespace Express {
      interface Request {
         user: any | undefined;
         decoded: any | undefined;
      }
   }
}
