import Left from './left';
import Right from './right';
import { Col, Row } from 'antd';

function Clock() {

  return (


    <Row gutter={[16, 16]} justify="center">

      <Col span={24} lg={12}>
        <Left />
      </Col>

      <Col span={24} lg={12}>
        <Right />
      </Col>
    </Row>
  );
}

export default Clock;
