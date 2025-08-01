import React from 'react';
import { Form, Select, Space } from 'antd';

const { Option } = Select;

const DurationSelector = ({ disabled }) => {
  return (
    <Form.Item label="Duration">
      <Space>
        <Form.Item name={['duration', 'hours']} noStyle>
          <Select defaultValue={0} disabled={disabled} style={{ width: 100 }}>
            {[...Array(13).keys()].map((h) => (
              <Option key={h} value={h}>
                {h} {h === 1 ? 'hr' : 'hrs'}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name={['duration', 'minutes']} noStyle rules={[{ required: true }]}>
          <Select defaultValue={0} disabled={disabled} style={{ width: 100 }}>
            {[0, 15, 30, 45].map((m) => (
              <Option key={m} value={m}>
                {m} mins
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Space>
    </Form.Item>
  );
};

export default DurationSelector;
