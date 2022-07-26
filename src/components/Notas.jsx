import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentRequestAsync, fillComentarioSolicitudesAsync } from '../Redux/actions/actionsCommentRequest';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(item) => {
            const props = {
                author: item.author,
                avatar: item.avatar,
                content: item.content,
                datetime: moment(new Date(item.datetime)).fromNow()
            };

            return <Comment {...props} />
        }}
    />
);

const Notas = ({ idSolicitud }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const loggedUser = useSelector(store => store.userStore);
    const { comentarioSolicitudes } = useSelector(store => store.comentariosSolicitudesStore);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fillComentarioSolicitudesAsync(idSolicitud));
    }, [idSolicitud]);

    useEffect(() => {
        form.resetFields();
    }, [comentarioSolicitudes.length]);

    const handleSubmit = (values) => {
        if (!values) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);

            dispatch(addCommentRequestAsync({
                idSolicitud,
                authorId: loggedUser.id,
                author: loggedUser.fullname,
                avatar: loggedUser.photoURL,
                content: values.comment,
                datetime: moment().format('LLL'),
            }));

        }, 1000);
    };

    if (!loggedUser || Object.keys(loggedUser).length === 0) return <>Loading...</>

    return (
        <>
            {comentarioSolicitudes.length > 0 && <CommentList comments={comentarioSolicitudes} />}
            <Comment
                avatar={<Avatar src={loggedUser.photoURL || ''} alt={loggedUser.fullname || ''} />}
                content={
                    <Form
                        form={form}
                        name="Add"
                        layout="horizontal"
                        size={'default'}
                        onFinish={handleSubmit}
                    >
                        <Form.Item name="comment">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" loading={submitting} type="primary">
                                Comentar
                            </Button>
                        </Form.Item>
                    </Form>
                }
            />
        </>
    );
};

export default Notas;