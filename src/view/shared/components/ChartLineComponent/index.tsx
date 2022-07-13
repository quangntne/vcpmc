import React, { useEffect, useRef, useState } from 'react';
import { Line } from '@ant-design/charts';
import './styles.scss';
import { IDataTestChart } from '@view/Report/test';

interface IProps {
  data: IDataTestChart[];
}
const ChartLineComponent = ({ data }: IProps) => {
  const ref = useRef(null);
  const [location, setLocation] = useState<{ x: any, y: any }>({
    x: 0,
    y: 0
  })
  const annotations: any = [
    {
      type: 'line',
      start: [location.x, 0],
      end: [location.x, location.y],
      style: {
        stroke: '#5E5CE6',
        lineWidth: 2,
        lineDash: [4, 5],
        strokeOpacity: 1,
        cursor: 'pointer'
      },
    }
  ];

  const config: any = React.useMemo(() => {
    return {
      color: '#DE7820',
      xField: 'xField',
      yField: 'yField',
      yAxis: {
        maxLimit: 10000,
        minLimit: 0,
        grid: { line: { style: { stroke: '#F7FFFE30', lineWidth: 0.2 } } },
      },
      point: {
        size: 7,
        style: {
          fill: 'white',
          stroke: '#5B8FF9',
          lineWidth: 0,
          fillOpacity: 0,
        },
        state: {
          active: {
            style: {
              shadowBlur: 4,
              fillOpacity: 1,
              stroke: 'white',
              fill: '#FF7506',
              lineWidth: 3,
            },
          },
        },
      },
      lineStyle: {
        stroke: '#DE7820',
        lineWidth: 4,
      },
      animation: false,
      smooth: true,
      tooltip: {
        position: 'top',
        showMarkers: false,
        showCrosshairs: false,
        offset: 40,
        follow: true,
        customContent: (title, items) => {
          return (
            <ul style={{ paddingLeft: 0, margin: 0 }}>
              {items?.map((item, index) => {
                const { name, value, color } = item;
                return (
                  <li
                    key={item.year}
                    className="g2-tooltip-list-item"
                    data-index={index}
                    style={{ fontSize: '20px' }}
                  >
                    <span className="g2-tooltip-list-item-value text-center">
                      <label>Lượt nghe</label>
                      {/* {value} */}
                      4.000.000
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        },
      },
      interactions: [{ type: 'marker-active' }]
    }
  }, []);

  useEffect(() => {
    ref.current.on("tooltip:show", (args: any) => {
      setLocation({ x: args.data.items[0].data.xField, y: args.data.items[0].data.yField })
    });
  }, [ref]);

  return <div>
    {data && <Line {...config}
      annotations={annotations}
      data={data} className="chart-line" chartRef={ref} >
    </Line>}

  </div>;
};
export default React.memo(ChartLineComponent);
