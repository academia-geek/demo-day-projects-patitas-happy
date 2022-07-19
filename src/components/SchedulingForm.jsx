import React from 'react';
import { Button, DatePicker, Form, TimePicker } from 'antd';
import { TitleAgendarV } from '../Styles/StylesDetalle';

const SchedulingForm = ({onFinish}) => {


    const formItemLayout = {
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    const config = {
        rules: [
            {
                type: 'object',
                required: true,
                message: 'Por favor seleccione!',
            },
        ],
    };

    // const onFinish = (fieldsValue) => {
    //     // Should format date value before submit.
        
    //     const values = {
            
    //         'fecha': fieldsValue['fecha'].format('YYYY-MM-DD'),
    //         'hora': fieldsValue['hora'].format('HH:mm:ss'),
    //     };
    //     console.log('Received values of form: ', values);
    // };

    return (
        <div>
            <TitleAgendarV>Agendar visita</TitleAgendarV>
            <Form name="time_related_controls" {...formItemLayout} onFinish={onFinish}>
                <Form.Item name="fecha" label="Fecha" {...config}>
                    <DatePicker />
                </Form.Item>
                <Form.Item name="hora" label="Hora" {...config}>
                    <TimePicker />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: {
                            span: 24,
                            offset: 0,
                        },
                        sm: {
                            span: 16,
                            offset: 8,
                        },
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default SchedulingForm