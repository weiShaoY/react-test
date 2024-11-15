import { useEffect, useState } from 'react';

type Props = {
  /**
   * 数字
   */
  number?: number;

};

function DotIndicator({ number = 0, }: Props) {
  const [refresh, setRefresh] = useState<boolean>(true);

  // 监听 number 变化，切换 refresh 状态
  useEffect(() => {
    setRefresh((prev) => !prev);
  }, [number]);

  return (
    <div className="h-24 flex flex-col justify-around">
      <i
        className={`block h-1.5 w-1.5 rounded transition-all bg-white`}
        style={{
          opacity: refresh ? 1 : 0.2,
        }}
      />
      <i
        className={`block h-1.5 w-1.5 rounded transition-all bg-white`}
        style={{
          opacity: refresh ? 1 : 0.2,
        }}
      />
    </div>
  );
};

export default DotIndicator;
