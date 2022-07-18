export const FileUpload = async file => {
  const urlCloudinary = "https://api.cloudinary.com/v1_1/kellycamayo/upload";

  const formData = new FormData();
  //a donde quiero enviar la información
  formData.append("upload_preset", "imgProfile");
  //que es lo que voy a subir o cargar en esa ruta de la linea anterior
  formData.append("file", file);

  const resp = await fetch(urlCloudinary, {
    method: "POST",
    body: formData,
  });
  const data = await resp.json();
  return data.secure_url;
};
