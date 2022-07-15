import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Tooltip, Affix } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const ListMascotas = () => {

    const navigate = useNavigate();

    return (
        <div>            
            <Tooltip title="Agregar nueva mascota">
                <Button shape="circle" icon={<PlusCircleOutlined />} size="large" style={{ border: 'none', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px' }} onClick={() => navigate("/addMascotas")} />
            </Tooltip>
        </div>
    );
};

export default ListMascotas;