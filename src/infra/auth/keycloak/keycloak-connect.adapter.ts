import IKeycloakAdapter from "../keycloak.adapter";
import Keycloak from "keycloak-connect";
import session from "express-session";
import keycloakConfig from "../config/keycloak.config";

let _keycloak: Keycloak.Keycloak;

export default class KeycloakConnectAdapter implements IKeycloakAdapter {
  init(store?: session.MemoryStore) {
    if (_keycloak) {
      console.warn("Trying to init Keycloak again!");
      return _keycloak;
    }

    console.log("Initializing Keycloak...");
    _keycloak = new Keycloak({ store }, keycloakConfig);
    return _keycloak;
  }

  getKeycloak(): Keycloak.Keycloak {
    return _keycloak;
  }
}
