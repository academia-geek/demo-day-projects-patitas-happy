import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import React, { useState } from 'react';

const UploadImage = ({ onUpload }) => {
    const cloudName = "dspyfujx0";
    const uploadPreset = "demo-day-project";
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => resolve(reader.result);

            reader.onerror = (error) => reject(error);
        });

    const uploadToCloudinary = (file, uploadPreset, cloudName) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);
        data.append("cloud_name", cloudName);

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                onUpload(data.url);
            })
            .catch(err => console.log(err))
    }

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList)
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Carga una imagen
            </div>
        </div>
    );
    return (
        <>
            <Upload
                listType="picture-card"
                beforeUpload={(file) => {
                    uploadToCloudinary(file, uploadPreset, cloudName);
                    // Prevent upload
                    return false;
                }}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};



export default UploadImage;