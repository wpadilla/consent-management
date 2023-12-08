declare module "services/Load" {
  interface Service {
    get: () => Promise<any>;
    add: (user: any) => Promise<any>;
  }

  const Load: { consents: Service, users: Service };
  export default Load;
}

declare module "main_consent/Store" {
  import {Signal} from "@angular/core";
  const Store: Signal<any>;
  export default Store;
}
