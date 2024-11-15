
import { Col, Row } from 'antd';

import { useGetTime } from '@/hooks';

import Card from '@/components/card';

import TimeOne from './components/time_one';

import TimeTwo from './components/time_two';

// import TimeThree from './components/time_three';

// import TimeFour from './components/time_four';

function Time() {




  /**
   *  使用自定义 Hook 获取当前时间
   */
  const time = useGetTime();



  const is24Hour = true


  return (

    <Row
      gutter={[16, 16]}
      justify="center"
      className="w-full h-full "
    >

      <Col span={24} lg={12}>
        <Card
          className='h-full w-full flex items-center justify-center'
        >
          <TimeOne
            time={time}
            is24Hour={is24Hour}
          />
        </Card>
      </Col>

      <Col span={24} lg={12}>
        <Card
          className='h-full w-full flex items-center justify-center'
        >
          <TimeTwo
            time={time}
            is24Hour={is24Hour}
          />
        </Card>
      </Col>

      <Col span={24} lg={12}>
        <Card
          className='h-full w-full flex items-center justify-center'
        >
          <TimeOne
            time={time}
            is24Hour={is24Hour}
          />
        </Card>
      </Col>

      <Col span={24} lg={12}>
        <Card
          className='h-full w-full flex items-center justify-center'
        >
          <TimeOne
            time={time}
            is24Hour={is24Hour}
          />
        </Card>
      </Col>
    </Row>
  );
}

export default Time;
