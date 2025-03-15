import helmet from "helmet"


const helemtSecretConfig = (app)=>{
  app.use(helmet.frameguard({ action: 'sameorigin' }));

app.use(helmet.xssFilter());

app.use(helmet.noSniff());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"]
  }
}));

}
export default helemtSecretConfig;