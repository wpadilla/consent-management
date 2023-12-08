import "zone.js";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {ConsentListModule} from "./screens/consent-list/consent-list.module";

const mountApp = ()=> {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

const mountConsentList = ()=> {
  platformBrowserDynamic().bootstrapModule(ConsentListModule)
    .catch(err => console.error(err));
}

export {mountApp, mountConsentList}
