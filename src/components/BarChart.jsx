/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import propTypes from 'prop-types';
import BarTooltip from './BarTooltip';

/**
 * Renders a bar chart.
 * @param {} props
 * @returns a bar chart
 */
const Chart = (props) => {
  const { data } = props;
  const [focusBar, setFocusBar] = useState(null);
  const color = ['#D2222D', '#EE6F27', '#FFBF00', '#32A632', '#007000', '#A31A23', '#D16224', '#D49F00', '#278227', '#004A00'];

  /**
   * Sets the hovered bar as current focus.
   * @param {*} state
   */
  const hover = (state) => {
    if (state.isTooltipActive) {
      setFocusBar(state.activeTooltipIndex);
    } else {
      setFocusBar(null);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        onMouseMove={(state) => { hover(state); }}
      >
        <Tooltip cursor={false} content={<BarTooltip />} />
        <XAxis dataKey="stars" />
        <Bar dataKey="count">
          {data.map((entry, index) => (
            <Cell cursor="pointer" key={entry.key} fill={focusBar === index ? color[index + 5] : color[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  // fix proptype
  // eslint-disable-next-line react/forbid-prop-types
  data: propTypes.arrayOf(propTypes.object),
};

Chart.defaultProps = {
  data: null,

};

export default Chart;
