const base = {
  api: "http://localhost:8180",
  usuario: "/lab-usuario-api/usuario",
  auth: "/lab-auth-api/oauth"
};

export const environment = {
  production: true,
  api: {
    usuario: base.api + base.usuario,
    auth: base.api + base.auth
  }
};
