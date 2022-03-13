import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./UserStatsGraphs.module.css";
import { VictoryPie, VictoryChart, VictoryBar } from "victory";

const UserStatsGraphs = ({ data }) => {
  const [graph, setGraph] = useState([]);
  const [totalViews, setTotalViews] = useState(0);

  useEffect(() => {
    const graphData = data.map(({ title, acessos }) => {
      return {
        x: title,
        y: Number(acessos),
      };
    });

    const totalViews = data
      .map(({ acessos }) => Number(acessos))
      .reduce((a, b) => a + b);

    setTotalViews(totalViews);
    setGraph(graphData);
  }, [data]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.totalViews} ${styles.graphItem}`}>
        <p>Views: {totalViews}</p>
      </div>
      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: { fillOpacity: 0.9, stroke: "#fff", strokeWidth: 2 },
            label: {
              fontSize: 14,
              fill: "#333",
            },
          }}
        />
      </div>

      <div className={styles.graphItem}>
        <VictoryChart>
          <VictoryBar alignment="start" data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

UserStatsGraphs.defaultProps = {};
UserStatsGraphs.propTypes = {
  data: PropTypes.array,
};

export default UserStatsGraphs;
