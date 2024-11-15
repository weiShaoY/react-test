import { Col, Row, Space } from 'antd';

import BannerCard from './banner-card';
import { Applications, Conversion } from './conversion_applications';


function Workbench() {
  return (
    <div className="p-2">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} lg={16}>
          <BannerCard />
        </Col>
        <Col span={24} lg={8}>
          <Space direction="vertical" size="large" className="h-full w-full justify-center">
            <Conversion />
            <Applications />
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default Workbench;
