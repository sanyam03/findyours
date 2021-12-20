import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import './Dashboard/Cases.css';

const MatchedFaces = ({ user }) => {
  const [initials, setInitials] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileInfos, setFileInfos] = useState([]);
  const [folder, setFolder] = useState(0);
  const [errors, setErrors] = useState([]);
  const [results,setResults] = useState({}); 
  useEffect(() => {
    if (user) {
      setInitials(`${user.name}`);
    }
  }, [user]);

  return (
    <>
       
    </>
  );
};

export default MatchedFaces;
