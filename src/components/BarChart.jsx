import React, { useState } from 'react';
import {
  BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import propTypes from 'prop-types';
import BarTooltip from './BarTooltip';

/**
 * Renders a bar chart with the data included in the data prop.
 * For example in home the bar chart has five values, with each bar being
 * a rating value.
 * Uses the recharts library.
 *
 * !! the colors at the moment only match to this five bar chart !!
 * @property {json} data - Includes the data in json.
 * @returns a bar chart
 */
const Chart = ({ data }) => {
  const [focusBar, setFocusBar] = useState(null);
  const color = ['#D2222D', '#EE6F27', '#FFBF00', '#32A632', '#007000', '#A31A23', '#D16224', '#D49F00', '#278227', '#004A00'];

  if (data == null) {
    return null;
  }

  /**
   * Sets the hovered bar as current focus state. If none is hovered it is set to null.
   * @param {String} state - The state of the current tooltip.
   */
  const hover = (state) => {
    if (state.isTooltipActive) {
      setFocusBar(state.activeTooltipIndex);
    } else {
      setFocusBar(null);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%" id="resContainer">
      <BarChart data={data} onMouseMove={(state) => { hover(state); }} minWidth="0">
        <Tooltip cursor={false} content={<BarTooltip />} />
        <XAxis dataKey="stars" />
        <Bar dataKey="count">
          {data.map((entry, index) => (
            <Cell id="cell" cursor="pointer" key={entry} fill={focusBar === index ? color[index + 5] : color[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  data: propTypes.arrayOf(propTypes.objectOf(propTypes.any)),
};

Chart.defaultProps = {
  data: null,

};

export default Chart;
