import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './FileUpload.scss'
import axios from 'axios'
const baseURL = "https://blockchaintimes.live/upload";

const FileUpload = ({ files, setFiles, getFile }) => {
    const uploadHandler = (event) => {
        const file = event.target.files[0];

        if (file.size > 1e6) {
            window.alert("Please upload a file smaller than 1 MB");
            return false;
        }

        if (!file) return;
        file.isUploading = true;
        setFiles([...files, file])

        // upload file
        const formData = new FormData();
        formData.append(
            "newFile",
            file,
            file.name
        )
        axios.post(baseURL, formData)
            .then((res) => {
                file.isUploading = false;
                setFiles([...files, file])
            })
            .catch((err) => {
                // inform the user
                console.error(err)

                getFile(file.name)
            });
    }


}

export default FileUpload
