import React from 'react';
import { Affix, Button, Tooltip } from 'antd';

const BtnFloat = ({screenHeight, iconBtn, onClick, titletooltip, btnStyle={}, affixStyle={} }) => {
  return (
    <div>
        <Affix 
        offsetBottom={screenHeight}
        style={affixStyle} 
                // onChange={affixed => console.log(affixed)}
                >
                    <Tooltip title={titletooltip}>
                        <Button shape="circle" icon={iconBtn} size="large" style={{ boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px', marginLeft: '55px', ...btnStyle }} onClick={onClick} />
                    </Tooltip>
                </Affix>
    </div>
  )
}

export default BtnFloat