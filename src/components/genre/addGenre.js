import React, { useEffect, useCallback } from "react";
import { Button, Form, Input, Space } from "antd";

function AddGenre({ genresEditRecord, onSubmit, isEdit, setIsEdit }) {
  const [form] = Form.useForm();
  
  const validateMessages = {
    // eslint-disable-next-line no-template-curly-in-string
    required: "${label} is required!",
  };

  const onFinish = async (values) => {
    console.log(values);
    if (genresEditRecord && Object.keys(genresEditRecord).length > 0) {
      onSubmit(values);
    } else {
      // const newGenre = { name, description };
      onSubmit(values);
    }
    ClearFields();
  };

  const ClearFields = useCallback(() => {
    setIsEdit(false);
    form.resetFields();
  }, [form, setIsEdit]);

  useEffect(() => {
    if (genresEditRecord && Object.keys(genresEditRecord).length > 0) {
      form.setFieldsValue({
        name: genresEditRecord.name,
        description: genresEditRecord.description,
      });
    } else {
      ClearFields();
    }
  }, [genresEditRecord, ClearFields, form]);

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        name="genre"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Genre" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={null}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={ClearFields}>Clear</Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
export default AddGenre;
