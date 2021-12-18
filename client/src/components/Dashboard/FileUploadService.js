import http from "../../utils/axios";

const upload = (file, folder, onUploadProgress) => {
  let formData = new FormData();
  formData.append("folder", folder);
  formData.append("file", file);

  console.log(file);
  return http.post("/api/user/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return http.get("/api/user/files/");
};



export default {
  upload,
  getFiles,
  
};
