export const typesLogin = {
  login: "login",
  authenticated: "[login] authenticated",
  logout: "logout",
  loginGoogleAndFacebook: "[Login] loginGoogleAndFacebook",
  load: "[login] load",
};
export const typesForm = {
  adopcion: "Dar en adopcion",
  encontrado: "Publicar animal encontrado ",
};

export const typesMascotas = {
    addMascota: '[mascotas] addMascota',
    fillMascotas: '[mascotas] fillMascotas',
    deleteMascota: '[mascotas] deleteMascota',
    updateMascota: '[mascotas] updateMascota',
    fillMascota: '[mascotas] fillMascota',
    throwError: '[mascotas] throwError',
    selectedFilter: '[mascotas] selectedFilter',
    appliedFilters: '[mascotas] appliedFilters',
    filterMascotas: '[mascotas] filterMascotas',
    removeAppliedFilter: '[mascotas] removeAppliedFilter' 
}

export const typesUser = {
    register: "[Register-Usuario] register",
    clear: "[Register-Clear] clear",
    list: '[user] list',
    edit: '[user] edit',
    delete: '[user] delete',
    fillUser: '[user] fillUser'
}

export const typesAdopcion = {
  add : '[adopcion] add'
}

export const typesApadrinar = {
  add : '[apadrinar] add'
}

export const typesRequest ={
  addRequest: '[Request] addRequest',
  throwErrorRequest: '[Request] throwErrorRequest',
  fillUserRequests: '[Request] fillUserRequests',
  fillRequests: '[Request] fillRequests',
  fillRequest: '[Request] fillRequest',
  updateRequest: '[Request] updateRequest'
}
