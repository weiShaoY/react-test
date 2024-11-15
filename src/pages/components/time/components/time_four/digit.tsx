import { useEffect, useState } from 'react';

import digitNum from './data';

export type DigitNumType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * Digit 组件的属性类型
 */
type PropsType = {
  /**
   * 数字
   */
  number: DigitNumType;

  /**
   * 颜色
   */
  color?: string
};


/**
 * Digit 组件
 */
function Digit({
  number,
  color = '#04A770',
}: PropsType
) {

  const [matrix, setMatrix] = useState<boolean[]>(digitNum[0]);

  /**
   *  渲染数字矩阵函数
   */
  const renderDigit = (num: DigitNumType) => {

    setMatrix(digitNum[num]);

  };


  useEffect(() => {
    renderDigit(number);
  }, [number]);

  return (
    <div className="grid grid-cols-4 scale-75 transform gap-1.5 md:scale-100">
      {matrix.map((value, index) => (
        <i
          key={index}
          className="h-2.5 w-2.5 rounded-sm transition-all"
          style={{
            opacity: value ? 1 : 0.2,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}

export default Digit;
